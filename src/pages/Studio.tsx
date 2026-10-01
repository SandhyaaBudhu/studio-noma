import { ArrowUpRight } from "lucide-react";
import { team } from "../data/projects";
import Image from "../components/Image";
import LinkArrow from "../components/LinkArrow";
export default function Studio() {
  return (
    <div className="studio-page">
      <section className="page-intro page-container">
        <div>
          <span className="eyebrow">A SHARED CURIOSITY. A COMMON PURPOSE.</span>
          <h1>
            People first.
            <br />
            <em>Always.</em>
          </h1>
        </div>
        <div>
          <p>
            We are STUDIO NOMA. An independent architecture and interiors
            practice creating thoughtful spaces for the way we live.
          </p>
          <span className="intro-note">
            CAPE TOWN, SOUTH AFRICA · EST. 2018
          </span>
        </div>
      </section>
      <div className="studio-banner page-container">
        <Image
          src={`${import.meta.env.BASE_URL}images/studio.jpg`}
          alt="The studio's bright, collaborative workspace with natural materials and indoor plants"
          fetchPriority="high"
        />
        <span>A SPACE FOR THINKING. A PLACE FOR MAKING.</span>
      </div>
      <section className="studio-story page-container">
        <span className="eyebrow">01 / OUR STORY</span>
        <div>
          <h2>
            A small team.
            <br />
            An expansive outlook.
          </h2>
          <p>
            We started Noma with a simple belief: good design should make
            everyday life feel better. Since 2018, that belief has guided
            everything we make — from intimate homes to places that bring people
            together.
          </p>
          <p>
            Our practice sits at the intersection of architecture, interiors,
            and craft. We work as one studio, keeping the conversation open from
            first idea to final detail. That means fewer handovers, more shared
            thinking, and a clear thread through every project.
          </p>
          <p>
            We’re rooted in Cape Town, but our curiosity takes us everywhere.
          </p>
        </div>
      </section>
      <section className="team-section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / THE PEOPLE</span>
            <h2>Meet the minds.</h2>
          </div>
          <p>
            Different perspectives.
            <br />
            One considered approach.
          </p>
        </div>
        <div className="team-grid">
          {team.map((t) => (
            <article key={t.name}>
              <div className="team-photo">
                <Image src={t.image} alt={t.name} loading="lazy" />
              </div>
              <h3>{t.name}</h3>
              <span>{t.role}</span>
              <p>{t.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="principles-section">
        <div className="page-container">
          <span className="eyebrow">03 / WHAT GUIDES US</span>
          <h2>
            Our principles.
            <br />
            In practice.
          </h2>
          <div className="principles-grid">
            {[
              {
                name: "Listen to the place.",
                text: "Every site has a story. We begin by understanding its light, landscape, history, and the life it already holds.",
              },
              {
                name: "Make room for life.",
                text: "People are the starting point. We design for real rituals, changing needs, and the unexpected moments in between.",
              },
              {
                name: "Choose with care.",
                text: "Materials should be honest, details should have purpose, and our choices should be kind to the world around us.",
              },
              {
                name: "Think beyond today.",
                text: "Trends pass. We seek enduring proportions, flexible spaces, and a quality of making that grows richer with time.",
              },
            ].map((p, i) => (
              <div key={p.name}>
                <span>0{i + 1}</span>
                <h3>{p.name}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="capabilities-section page-container"
        id="capabilities"
      >
        <div>
          <span className="eyebrow">04 / OUR CAPABILITIES</span>
          <h2>
            From first thought
            <br />
            to finishing touch.
          </h2>
          <p>A complete design service, shaped to your project.</p>
          <LinkArrow to="/contact">Tell us what you’re imagining</LinkArrow>
        </div>
        <div className="capabilities-list">
          {[
            {
              name: "Architecture",
              items: [
                "Concept & feasibility",
                "Planning & spatial design",
                "Technical documentation",
                "Construction coordination",
              ],
            },
            {
              name: "Interiors",
              items: [
                "Interior architecture",
                "Material & finish palettes",
                "Bespoke joinery & furniture",
                "Lighting & furniture selection",
              ],
            },
            {
              name: "Creative direction",
              items: [
                "Visual & spatial identity",
                "Art & object curation",
                "Styling & installation",
                "Collaborative design workshops",
              ],
            },
          ].map((c) => (
            <div key={c.name}>
              <h3>
                {c.name}
                <ArrowUpRight aria-hidden="true" size={20} />
              </h3>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="recognition-section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">05 / SELECTED RECOGNITION</span>
            <h2>Part of the conversation.</h2>
          </div>
          <span className="demo-note">Illustrative studio milestones</span>
        </div>
        {[
          {
            year: "2025",
            title: "Emerging voices in architecture",
            source: "Design Anthology · Editorial feature",
          },
          {
            year: "2024",
            title: "A new perspective on the South African home",
            source: "Habitat · Studio profile",
          },
          {
            year: "2023",
            title: "Spaces that bring us together",
            source: "The Local Edit · Project feature",
          },
        ].map((r) => (
          <div className="recognition-item" key={r.year}>
            <span>{r.year}</span>
            <h3>{r.title}</h3>
            <p>{r.source}</p>
            <ArrowUpRight aria-hidden="true" size={20} />
          </div>
        ))}
      </section>
      <section className="timeline-section page-container">
        <span className="eyebrow">06 / THE JOURNEY SO FAR</span>
        <div className="timeline">
          {[
            {
              year: "2018",
              title: "A shared idea.",
              text: "Studio Noma opens its doors in Cape Town.",
            },
            {
              year: "2020",
              title: "Growing together.",
              text: "Interiors joins the practice. One vision, all the way through.",
            },
            {
              year: "2023",
              title: "New conversations.",
              text: "Our first hospitality and workplace projects take shape.",
            },
            {
              year: "2025",
              title: "Looking forward.",
              text: "A growing portfolio. The same curiosity that started it all.",
            },
          ].map((t) => (
            <div key={t.year}>
              <span>{t.year}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
