import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
export default function LinkArrow({
  to,
  children,
  className = "",
  straight = false,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  straight?: boolean;
}) {
  return (
    <Link to={to} className={`text-link ${className}`}>
      {children}
      {straight ? (
        <ArrowRight aria-hidden="true" size={18} />
      ) : (
        <ArrowUpRight aria-hidden="true" size={18} />
      )}
    </Link>
  );
}
