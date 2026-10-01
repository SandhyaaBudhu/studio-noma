import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <section className="not-found page-container">
      <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
      <h1>
        A little
        <br />
        <em>off the plan.</em>
      </h1>
      <p>This space hasn’t been built. Let’s take you somewhere inspiring.</p>
      <Link className="text-link" to="/projects">
        Explore our projects
        <ArrowUpRight aria-hidden="true" size={20} />
      </Link>
    </section>
  );
}
