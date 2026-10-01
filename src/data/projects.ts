export type ProjectType =
  "Residential" | "Hospitality" | "Workplace" | "Retail";
export interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  type: ProjectType;
  image: string;
  images: string[];
  area: string;
  subtitle: string;
  concept: string;
  challenge: string;
  solution: string;
  materials: { name: string; color: string }[];
}
export const projects: Project[] = [
  {
    id: "the-courtyard-house",
    title: "The Courtyard House",
    location: "Cape Town, South Africa",
    year: "2025",
    type: "Residential",
    image: `${import.meta.env.BASE_URL}images/courtyard.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/courtyard.jpg`,
      `${import.meta.env.BASE_URL}images/hero.jpg`,
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/residence.jpg`,
    ],
    area: "320 m²",
    subtitle: "A quiet retreat. An open conversation with nature.",
    concept:
      "Some homes ask you to look outward. This one invites you to slow down. Conceived around a sheltered courtyard, the house draws the garden into everyday rituals. A palette of warm oak, mineral plaster, and pale stone creates a backdrop for changing light — and a life well lived.",
    challenge:
      "A narrow urban plot, close neighbours, and a desire for absolute openness. Our brief was to bring generous daylight into the heart of the home without sacrificing the feeling of retreat.",
    solution:
      "We turned the house inward. A planted courtyard connects the shared spaces, while deep reveals and carefully placed openings frame the sky. Sliding glass dissolves the boundary between the garden and the living room.",
    materials: [
      { name: "Lime plaster", color: "#d6ccba" },
      { name: "Natural oak", color: "#ae8158" },
      { name: "Travertine", color: "#cbbba3" },
      { name: "Bronzed steel", color: "#605448" },
    ],
  },
  {
    id: "stillwater-residence",
    title: "Stillwater Residence",
    location: "Stellenbosch, South Africa",
    year: "2024",
    type: "Residential",
    image: `${import.meta.env.BASE_URL}images/residence.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/residence.jpg`,
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/courtyard.jpg`,
      `${import.meta.env.BASE_URL}images/hero.jpg`,
    ],
    area: "460 m²",
    subtitle: "Grounded in the landscape. Open to possibility.",
    concept:
      "Set at the edge of a vineyard, Stillwater is an exercise in restraint. Low horizontal volumes settle into the landscape, and generous terraces follow the movement of the sun. Inside, tactile materials and expansive views make the surrounding hills part of the home.",
    challenge:
      "A sloping site and an exposed position demanded a home that felt sheltered while maintaining an uninterrupted relationship with the landscape.",
    solution:
      "Stepped floor levels follow the natural contours. A series of deep overhangs and garden walls creates protected outdoor rooms and gentle transitions from inside to out.",
    materials: [
      { name: "Local sandstone", color: "#c4b496" },
      { name: "White oak", color: "#b48c5a" },
      { name: "Cast concrete", color: "#a8a89d" },
      { name: "Blackened steel", color: "#43433e" },
    ],
  },
  {
    id: "the-quiet-atelier",
    title: "The Quiet Atelier",
    location: "Johannesburg, South Africa",
    year: "2025",
    type: "Workplace",
    image: `${import.meta.env.BASE_URL}images/atelier.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/atelier.jpg`,
      `${import.meta.env.BASE_URL}images/studio.jpg`,
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/gallery.jpg`,
    ],
    area: "680 m²",
    subtitle: "Room for good work. Space for new ideas.",
    concept:
      "A workplace can be both productive and restorative. The Quiet Atelier trades the conventional grid for a collection of neighbourhoods: spaces to gather, concentrate, and exchange ideas. Light, planting, and natural textures introduce a sense of rhythm to the working day.",
    challenge:
      "Transform a deep commercial floorplate into a flexible studio that supports both focused work and a collaborative creative culture.",
    solution:
      "A central social spine connects smaller work zones. Translucent partitions carry daylight deeper into the plan, while acoustic surfaces and planted thresholds create moments of calm.",
    materials: [
      { name: "Birch plywood", color: "#d5ba8f" },
      { name: "Sage felt", color: "#8d9b87" },
      { name: "Terrazzo", color: "#c3bfb3" },
      { name: "Powder-coated steel", color: "#555e52" },
    ],
  },
  {
    id: "dune-house",
    title: "Dune House",
    location: "Paternoster, South Africa",
    year: "2024",
    type: "Hospitality",
    image: `${import.meta.env.BASE_URL}images/lodge.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/lodge.jpg`,
      `${import.meta.env.BASE_URL}images/hero.jpg`,
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/residence.jpg`,
    ],
    area: "840 m²",
    subtitle: "Where the coast sets the pace.",
    concept:
      "A small coastal guesthouse shaped by the wind, the sand, and the horizon. Dune House brings a sense of understated generosity to hospitality, with spaces that feel personal, honest, and deeply connected to place.",
    challenge:
      "Balance the privacy of individual guest suites with a warm sense of community, in a landscape shaped by strong coastal winds.",
    solution:
      "A cluster of low buildings shelters shared gardens. Each suite has its own outdoor threshold, while the communal dining room opens toward the sea.",
    materials: [
      { name: "Limewash", color: "#e1d9c9" },
      { name: "Reclaimed timber", color: "#8e7056" },
      { name: "Woven linen", color: "#b9aa90" },
      { name: "Clay tile", color: "#b67453" },
    ],
  },
  {
    id: "form-and-field",
    title: "Form & Field",
    location: "Cape Town, South Africa",
    year: "2023",
    type: "Retail",
    image: `${import.meta.env.BASE_URL}images/gallery.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/gallery.jpg`,
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/studio.jpg`,
      `${import.meta.env.BASE_URL}images/courtyard.jpg`,
    ],
    area: "210 m²",
    subtitle: "A gallery for the objects of everyday life.",
    concept:
      "A considered setting for a collection of locally crafted objects. Form & Field bridges gallery and shop, using quiet architectural gestures to give each piece room to breathe. The space invites discovery, touch, and conversation.",
    challenge:
      "Create a flexible retail environment in a compact footprint, with a strong identity that would never compete with the changing collections.",
    solution:
      "A sequence of sculptural plinths and movable partitions creates a gently unfolding journey. A single continuous material palette allows objects, people, and light to take centre stage.",
    materials: [
      { name: "Microcement", color: "#bcb8ac" },
      { name: "Clay plaster", color: "#bf957c" },
      { name: "Ash timber", color: "#cfb98e" },
      { name: "Brushed aluminium", color: "#a9aaa4" },
    ],
  },
  {
    id: "house-of-light",
    title: "House of Light",
    location: "Durban, South Africa",
    year: "2023",
    type: "Residential",
    image: `${import.meta.env.BASE_URL}images/detail.jpg`,
    images: [
      `${import.meta.env.BASE_URL}images/detail.jpg`,
      `${import.meta.env.BASE_URL}images/courtyard.jpg`,
      `${import.meta.env.BASE_URL}images/hero.jpg`,
      `${import.meta.env.BASE_URL}images/residence.jpg`,
    ],
    area: "290 m²",
    subtitle: "An everyday celebration of light.",
    concept:
      "A family home reimagined around the small moments that make a day. A sunlit stair, a window seat, a kitchen opening to the garden. House of Light uses modest interventions to create a generous and lasting sense of home.",
    challenge:
      "An existing house had generous proportions but a disconnected plan and very little natural light in its central spaces.",
    solution:
      "Selective openings and a new skylit stair connect the home vertically and horizontally. Existing materials were retained wherever possible, grounding the new spaces in the history of the house.",
    materials: [
      { name: "Warm plaster", color: "#d5c5af" },
      { name: "Oak flooring", color: "#b79264" },
      { name: "Cream stone", color: "#d6cbb5" },
      { name: "Aged brass", color: "#9c8554" },
    ],
  },
];
export const categories = [
  "All projects",
  "Residential",
  "Hospitality",
  "Workplace",
  "Retail",
] as const;
export const team = [
  {
    name: "Mira van der West",
    role: "Founding partner · Architecture",
    image: `${import.meta.env.BASE_URL}images/mira.jpg`,
    bio: "Mira brings a thoughtful eye for place, light, and the quiet possibilities of everyday life.",
  },
  {
    name: "Leo Mokoena",
    role: "Partner · Interiors",
    image: `${import.meta.env.BASE_URL}images/leo.jpg`,
    bio: "Leo connects material craft with the way people inhabit a space, from the first gesture to the last detail.",
  },
  {
    name: "Aya Petersen",
    role: "Associate · Spatial design",
    image: `${import.meta.env.BASE_URL}images/aya.jpg`,
    bio: "Aya explores the relationship between landscape and built form, always with a curiosity for what comes next.",
  },
];
