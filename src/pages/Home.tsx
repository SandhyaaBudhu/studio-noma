import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import Image from "../components/Image";
import ProjectCard from "../components/ProjectCard";
import LinkArrow from "../components/LinkArrow";
import SpatialStudy from "../components/SpatialStudy";
import { useState } from "react";
const services = [
  {
    name: "Architecture",
    text: "From the first sketch to the final threshold. Buildings that respond to their surroundings and the people who call them home.",
    tags: "Residential · Hospitality · Commercial",
  },
  {
    name: "Interior design",
    text: "Thoughtful interiors, where texture, light, and the details you touch every day create a quietly distinctive experience.",
    tags: "Spatial planning · Materials · Bespoke furniture",
  },
  {
    name: "Creative direction",
    text: "One clear vision, carried through every layer. We connect architecture, interiors, and identity into a coherent whole.",
    tags: "Concept development · Art curation · Styling",
  },
];
export default function Home() {
  const [service, setService] = useState<number | null>(0);
  return (
    <>
      <section className="home-hero page-container">
        <div className="hero-heading">
          <div>
            <div className="eyebrow">
              <span className="small-dot" /> INDEPENDENT BY DESIGN. HUMAN BY
              NATURE.
            </div>
            <h1>
              Spaces that
              <br />
              stay with <em>you.</em>
            </h1>
          </div>
          <div className="hero-manifesto">
            <span className="hero-coordinate">
              CAPE TOWN · WORKING EVERYWHERE
            </span>
            <p>Architecture & interiors for a more considered way of living.</p>
            <a href="#selected" className="text-link">
              Discover our work <ArrowDown aria-hidden="true" size={17} />
            </a>
          </div>
        </div>
        <Link to="/projects/the-courtyard-house" className="hero-image-link">
          <Image
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            alt="Sunlit living space with sculptural timber furniture, natural textures, and windows opening to the garden"
            fetchPriority="high"
            className="hero-image"
          />
          <span className="hero-image-shade" />
          <span className="hero-image-label">
            <span>FEATURED PROJECT — 01</span>
            <strong>The Courtyard House</strong>
            <span>Cape Town, South Africa · 2025</span>
          </span>
          <span className="hero-image-action">
            A closer look{" "}
            <span>
              <ArrowUpRight aria-hidden="true" size={25} strokeWidth={1.4} />
            </span>
          </span>
          <span className="hero-image-note">
            A little less noise. A little more life.
          </span>
        </Link>
        <div className="hero-bottom">
          <span>THOUGHTFULLY MADE. BUILT TO LAST.</span>
          <span>
            SCROLL TO EXPLORE <ArrowDown aria-hidden="true" size={13} />
          </span>
        </div>
      </section>
      <section id="selected" className="selected-section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / SELECTED WORK</span>
            <h2>A sense of place.</h2>
          </div>
          <div>
            <p>
              Different stories. A shared belief in
              <br />
              the power of thoughtful design.
            </p>
            <LinkArrow to="/projects">View all projects</LinkArrow>
          </div>
        </div>
        <div className="selected-grid">
          {[projects[0], projects[1], projects[2], projects[3]].map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </section>
      <section className="manifesto-section">
        <div className="page-container manifesto-inner">
          <span className="eyebrow">LESS, BUT WITH MEANING.</span>
          <p>
            We believe the best spaces don’t shout.
            <br />
            They <em>listen.</em> To the light. To the landscape.
            <br />
            To the way you want to live.
          </p>
          <span className="manifesto-sign">
            THE NOMA APPROACH <span>↗</span>
          </span>
        </div>
      </section>
      <section className="services-section page-container">
        <div className="services-intro">
          <span className="eyebrow">02 / WHAT WE DO</span>
          <h2>
            One vision.
            <br />
            Every detail.
          </h2>
          <p>
            From the big picture to the smallest gesture, we shape spaces with
            care.
          </p>
          <LinkArrow to="/studio#capabilities">
            Explore our capabilities
          </LinkArrow>
        </div>
        <div className="service-list">
          {services.map((s, i) => (
            <div
              className={`service-item ${service === i ? "expanded" : ""}`}
              key={s.name}
            >
              <button
                aria-expanded={service === i}
                aria-controls={`service-${i}`}
                onClick={() => setService(service === i ? null : i)}
              >
                <span>0{i + 1}</span>
                <h3>{s.name}</h3>
                <Plus aria-hidden="true" size={24} />
              </button>
              <div
                id={`service-${i}`}
                className="service-detail"
                hidden={service !== i}
              >
                <p>{s.text}</p>
                <span>{s.tags}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <SpatialStudy />
      <section className="process-section page-container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">03 / THE PROCESS</span>
            <h2>
              A conversation,
              <br />
              then a collaboration.
            </h2>
          </div>
          <p>
            Good design starts with listening.
            <br />
            Here’s how we move from possibility to place.
          </p>
        </div>
        <div className="process-grid">
          {[
            {
              name: "Discover",
              text: "We listen, ask questions, and get to know your world. The people, the place, the possibilities.",
            },
            {
              name: "Imagine",
              text: "Ideas become sketches. Sketches become a direction. Together, we find the story your space wants to tell.",
            },
            {
              name: "Refine",
              text: "Materials, proportions, and every last detail. We bring clarity and care to the whole picture.",
            },
            {
              name: "Make",
              text: "Working closely with our craftspeople and collaborators, we bring the vision into the real world.",
            },
          ].map((p, i) => (
            <div key={p.name}>
              <span className="process-number">
                0{i + 1}
                <ArrowUpRight aria-hidden="true" size={22} />
              </span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="studio-preview page-container">
        <div className="studio-photo">
          <Image
            src={`${import.meta.env.BASE_URL}images/studio.jpg`}
            alt="An open, plant-filled creative studio with shared desks and abundant daylight"
            loading="lazy"
          />
          <span>OUR STUDIO · CAPE TOWN</span>
        </div>
        <div className="studio-preview-copy">
          <span className="eyebrow">04 / THE PEOPLE BEHIND THE PLACES</span>
          <h2>
            Small studio.
            <br />
            Open minds.
          </h2>
          <p>
            We’re architects, designers, and endlessly curious people. A
            close-knit team, brought together by a shared love of spaces that
            feel as good as they look.
          </p>
          <p>Rooted in Cape Town. Inspired by the world.</p>
          <LinkArrow to="/studio">Meet the studio</LinkArrow>
        </div>
      </section>
      <section className="recognition-row page-container">
        <span className="eyebrow">
          IDEAS WORTH
          <br />
          TAKING NOTICE OF
        </span>
        <div>
          <span>FRAME</span>
          <span>Architecture & Design</span>
        </div>
        <div>
          <span>THE LOCAL EDIT</span>
          <span>Spaces & Stories</span>
        </div>
        <div>
          <span>HABITAT</span>
          <span>The New South African Home</span>
        </div>
        <div>
          <span>DESIGN ANTHOLOGY</span>
          <span>Emerging Practices</span>
        </div>
      </section>
    </>
  );
}
