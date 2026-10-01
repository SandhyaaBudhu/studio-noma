import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowDown, ArrowLeft, ArrowUpRight, Maximize2 } from "lucide-react";
import { projects } from "../data/projects";
import Image from "../components/Image";
import Lightbox from "../components/Lightbox";
import NotFound from "./NotFound";
export default function CaseStudy() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);
  const [lightbox, setLightbox] = useState<number | null>(null);
  if (!project) return <NotFound />;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article className="case-study">
      <div className="case-heading page-container">
        <Link to="/projects" className="text-link">
          <ArrowLeft aria-hidden="true" size={16} />
          All projects
        </Link>
        <div>
          <span className="eyebrow">
            {project.type.toUpperCase()} / {project.year}
          </span>
          <h1>{project.title}</h1>
          <p>{project.subtitle}</p>
        </div>
        <a
          className="icon-button"
          href="#concept"
          aria-label="Read project story"
        >
          <ArrowDown aria-hidden="true" size={23} />
        </a>
      </div>
      <button
        className="case-hero image-expand"
        onClick={() => setLightbox(0)}
        aria-label={`Open ${project.title} image gallery`}
      >
        <Image
          src={project.images[0]}
          alt={`${project.title} — architectural overview`}
          fetchPriority="high"
        />
        <span className="expand-tag">
          <Maximize2 aria-hidden="true" size={16} />
          EXPLORE THE GALLERY
        </span>
        <span className="case-image-location">
          {project.location.toUpperCase()}
        </span>
      </button>
      <div className="project-facts page-container">
        {[
          { name: "LOCATION", value: project.location },
          { name: "COMPLETED", value: project.year },
          { name: "TYPOLOGY", value: project.type },
          { name: "AREA", value: project.area },
          { name: "SERVICES", value: "Architecture & interiors" },
        ].map((f) => (
          <div key={f.name}>
            <span className="eyebrow">{f.name}</span>
            <p>{f.value}</p>
          </div>
        ))}
      </div>
      <section className="case-concept page-container" id="concept">
        <span className="eyebrow">01 / THE CONCEPT</span>
        <div>
          <h2>{project.subtitle}</h2>
          <p>{project.concept}</p>
        </div>
      </section>
      <div className="case-split-images page-container">
        <button
          className="image-expand"
          onClick={() => setLightbox(1)}
          aria-label="Expand interior view"
        >
          <Image
            src={project.images[1]}
            alt={`${project.title} — interiors and natural light`}
            loading="lazy"
          />
          <Maximize2 aria-hidden="true" className="corner-icon" size={20} />
        </button>
        <div>
          <button
            className="image-expand"
            onClick={() => setLightbox(2)}
            aria-label="Expand material detail"
          >
            <Image
              src={project.images[2]}
              alt={`${project.title} — a closer look at materials and details`}
              loading="lazy"
            />
            <Maximize2 aria-hidden="true" className="corner-icon" size={20} />
          </button>
          <p>
            <span>02 /</span> Honest materials. Thoughtful details.
          </p>
        </div>
      </div>
      <section className="materials-section page-container">
        <div>
          <span className="eyebrow">02 / MATERIAL LANGUAGE</span>
          <h2>
            A palette you
            <br />
            can feel.
          </h2>
        </div>
        <div className="material-palette">
          {project.materials.map((m, i) => (
            <div key={m.name}>
              <span
                className={`material-chip texture-${i}`}
                style={{ backgroundColor: m.color }}
              />
              <span>0{i + 1}</span>
              <h3>{m.name}</h3>
            </div>
          ))}
        </div>
      </section>
      <button
        className="case-full-image image-expand"
        onClick={() => setLightbox(3)}
        aria-label="Expand full project view"
      >
        <Image
          src={project.images[3]}
          alt={`${project.title} — spaces connected to their surroundings`}
          loading="lazy"
        />
        <span className="expand-tag">
          <Maximize2 aria-hidden="true" size={16} />
          VIEW FULL IMAGE
        </span>
      </button>
      <section className="challenge-section page-container">
        <span className="eyebrow">03 / THOUGHT INTO FORM</span>
        <div>
          <h2>The challenge.</h2>
          <p>{project.challenge}</p>
        </div>
        <div>
          <h2>Our response.</h2>
          <p>{project.solution}</p>
        </div>
      </section>
      <div className="case-quote">
        <span>“</span>
        <blockquote>
          It’s the quiet moments that make a space extraordinary.
        </blockquote>
        <p>THE STUDIO NOMA DESIGN PHILOSOPHY</p>
      </div>
      <Link
        to={`/projects/${next.id}`}
        className="next-project page-container"
        onClick={() => setLightbox(null)}
      >
        <div>
          <span className="eyebrow">CONTINUE EXPLORING / NEXT PROJECT</span>
          <h2>
            {next.title}
            <ArrowUpRight aria-hidden="true" size={46} strokeWidth={1} />
          </h2>
          <p>
            {next.location} · {next.year}
          </p>
        </div>
        <Image src={next.image} alt={next.title} loading="lazy" />
      </Link>
      {lightbox !== null && (
        <Lightbox
          images={project.images}
          index={lightbox}
          setIndex={setLightbox}
          onClose={() => setLightbox(null)}
          title={project.title}
        />
      )}
    </article>
  );
}
