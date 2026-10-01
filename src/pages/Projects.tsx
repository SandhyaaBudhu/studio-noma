import { useSearchParams } from "react-router-dom";
import { ArrowDown, SlidersHorizontal } from "lucide-react";
import { categories, projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
export default function Projects() {
  const [params, setParams] = useSearchParams();
  const category =
    categories.find((c) => c === params.get("type")) || "All projects";
  const filtered = projects.filter(
    (p) => category === "All projects" || p.type === category,
  );
  function choose(value: string) {
    setParams(value === "All projects" ? {} : { type: value }, {
      preventScrollReset: true,
    });
  }
  return (
    <div className="page-container projects-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">THE PORTFOLIO / 2023–2025</span>
          <h1>
            Places with
            <br />
            <em>purpose.</em>
          </h1>
        </div>
        <div>
          <p>
            Homes, gathering places, and spaces for new ideas. Each project
            begins with a question: how do we want to live?
          </p>
          <span className="intro-note">
            A COLLECTION OF CONSIDERED SPACES{" "}
            <ArrowDown aria-hidden="true" size={16} />
          </span>
        </div>
      </div>
      <div className="project-filters">
        <div className="filter-label">
          <SlidersHorizontal aria-hidden="true" size={16} />
          <span>EXPLORE BY</span>
        </div>
        <div
          className="filter-buttons"
          role="group"
          aria-label="Filter projects by type"
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => choose(c)}
              aria-pressed={category === c}
              className={category === c ? "active" : ""}
            >
              {c}
              <sup>
                {c === "All projects"
                  ? projects.length
                  : projects.filter((p) => p.type === c).length}
              </sup>
            </button>
          ))}
        </div>
        <span className="filter-count" aria-live="polite">
          {String(filtered.length).padStart(2, "0")} PROJECTS
        </span>
      </div>
      <div
        className={`portfolio-grid ${filtered.length === 1 ? "single-result" : ""}`}
        key={category}
      >
        {filtered.map((p) => (
          <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} />
        ))}
      </div>
      <div className="portfolio-end">
        <span className="small-dot" />
        <p>Every space has a story. Yours could be next.</p>
        <span>LET’S START WITH A CONVERSATION ↓</span>
      </div>
    </div>
  );
}
