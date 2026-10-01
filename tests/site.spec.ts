import { test, expect } from "@playwright/test";
test("every main route renders without broken images or horizontal overflow", async ({
  page,
}, info) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of [
    "/",
    "/projects",
    "/projects/the-courtyard-house",
    "/studio",
    "/contact",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      )
      .toBe(true);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (node) =>
              (node as HTMLImageElement).complete &&
              (node as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `artifacts/${info.project.name}-${route === "/" ? "home" : route.replaceAll("/", "-").slice(1)}.png`,
      fullPage: true,
    });
  }
  expect(errors).toEqual([]);
});
test("project filtering updates results and the shareable URL", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByRole("button", { name: "Hospitality" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText("Dune House");
  await expect(page).toHaveURL(/type=Hospitality/);
  await page.reload();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("button", { name: "All projects" }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
});
test("gallery keyboard navigation, focus restoration, and next project work", async ({
  page,
}) => {
  await page.goto("/projects/the-courtyard-house");
  const open = page.getByRole("button", {
    name: "Open The Courtyard House image gallery",
  });
  await open.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
    "alt",
    /view 2/,
  );
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("dialog").locator("img")).toHaveAttribute(
    "alt",
    /view 1/,
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(open).toBeFocused();
  await page.locator(".next-project").click();
  await expect(page).toHaveURL(/stillwater-residence/);
  await expect(page.locator("h1")).toHaveText("Stillwater Residence");
});
test("theme survives a reload and spatial controls update the model", async ({
  page,
}, info) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Terracotta", exact: true }).click();
  await expect(
    page.getByRole("img", { name: /Terracotta pavilion/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Show roof" }).click();
  await expect(page.getByRole("img", { name: /roof on/ })).toBeVisible();
  await page.getByRole("button", { name: "Reset pavilion view" }).click();
  await expect(
    page.getByRole("img", {
      name: /Limestone pavilion at 32 degrees, roof removed/,
    }),
  ).toBeVisible();
  await page.screenshot({
    path: `artifacts/${info.project.name}-dark-spatial.png`,
  });
});
test("contact validation leads to an honest local confirmation", async ({
  page,
}) => {
  await page.goto("/contact");
  await page
    .getByRole("button", { name: "Let’s start a conversation" })
    .click();
  await expect(page.getByText("Please tell us your name.")).toBeVisible();
  await expect(page.locator("#name")).toBeFocused();
  await page.getByLabel("Your name").fill("Alex Taylor");
  await page.getByLabel("Email address").fill("alex@example.com");
  await page.getByLabel("Project type").selectOption("Residential");
  await page.getByLabel("Project location").fill("Cape Town");
  await page
    .getByLabel("When would you like to start?")
    .selectOption("In 3–6 months");
  await page.getByLabel("Architecture", { exact: true }).check();
  await page
    .getByLabel("The story so far")
    .fill(
      "We would like to reimagine a family home around a garden courtyard.",
    );
  await page.getByLabel("I understand this is a demo").check();
  await page
    .getByRole("button", { name: "Let’s start a conversation" })
    .click();
  await expect(page.getByRole("status")).toContainText("Thank you,Alex.");
  await expect(page.getByRole("status")).toContainText("no message was sent");
  await page.getByRole("button", { name: "Another idea?" }).click();
  await expect(page.getByLabel("Your name")).toHaveValue("");
});
test("mobile menu opens, navigates and closes", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).toBeVisible();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Studio", exact: true })
    .click();
  await expect(page).toHaveURL("/studio");
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toHaveAttribute("aria-expanded", "false");
});

test("an unavailable photograph uses the designed local fallback", async ({
  page,
}) => {
  await page.route("**/images/hero.jpg", (route) => route.abort());
  await page.goto("/");
  const hero = page.locator(".hero-image");
  await expect(hero).toHaveAttribute("src", "/fallback.svg");
  await expect
    .poll(() =>
      hero.evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  const frame = await page.locator(".hero-image-link").boundingBox();
  expect(frame?.height).toBeGreaterThan(300);
  await expect(
    page.getByText("The Courtyard House", { exact: true }).first(),
  ).toBeVisible();
});

test("tablet layouts and the studio anchor remain usable", async ({
  page,
}, info) => {
  test.skip(info.project.name !== "desktop");
  for (const width of [768, 1024]) {
    await page.setViewportSize({ width, height: 1024 });
    for (const route of ["/", "/projects", "/studio", "/contact"]) {
      await page.goto(route);
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
        )
        .toBe(true);
    }
  }
  await page.goto("/studio#capabilities");
  await expect
    .poll(() =>
      page
        .locator("#capabilities")
        .evaluate((element) => Math.abs(element.getBoundingClientRect().top)),
    )
    .toBeLessThan(60);
  await expect(page.locator("#capabilities h2")).toBeVisible();
  await page.goto("/projects/unknown-project");
  await expect(
    page.getByRole("link", { name: "Explore our projects", exact: true }),
  ).toBeVisible();
});
