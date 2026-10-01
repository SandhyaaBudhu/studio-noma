import { writeFile } from "node:fs/promises";
const images = {
  hero: "photo-1600210492486-724fe5c67fb0",
  courtyard: "photo-1600607687920-4e2a09cf159d",
  residence: "photo-1600585154340-be6161a56a0c",
  atelier: "photo-1497366754035-f200968a6e72",
  lodge: "photo-1613977257363-707ba9348227",
  detail: "photo-1600607687939-ce8a6c25118c",
  studio: "photo-1497366811353-6870744d04b2",
  gallery: "photo-1774021802726-6be306836635",
  mira: "photo-1580489944761-15a19d654956",
  leo: "photo-1500648767791-00dcc994a43e",
  aya: "photo-1534528741775-53994a69daeb",
};
await Promise.all(
  Object.entries(images).map(async ([name, id]) => {
    try {
      const response = await fetch(
        `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${["mira", "leo", "aya"].includes(name) ? 700 : 2000}&q=85`,
      );
      if (!response.ok) throw new Error(response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      await writeFile(`public/images/${name}.jpg`, bytes);
      console.log(name, bytes.length);
    } catch (error) {
      console.log(name, error.message);
    }
  }),
);
