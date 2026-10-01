import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import Image from "./Image";
export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="project-card group"
      aria-label={`Explore ${project.title}`}
    >
      <div className="project-photo">
        <Image
          src={project.image}
          alt={`${project.title}, ${project.type.toLowerCase()} architecture in ${project.location}`}
          loading="lazy"
        />
        <span className="project-number">0{index + 1} /</span>
        <span className="project-hover">
          <ArrowUpRight aria-hidden="true" size={23} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.title}</h3>
          <p>{project.location}</p>
        </div>
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
      </div>
    </Link>
  );
}
