import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container-page py-32 text-center">
      <p className="font-display text-7xl shimmer-text">404</p>
      <h1 className="font-display text-3xl md:text-4xl mt-4">
        This scent has drifted away.
      </h1>
      <p className="text-ink-900/60 mt-3 max-w-md mx-auto">
        The page you were seeking no longer lingers. Let us guide you back.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Return home
      </Link>
    </div>
  );
}
