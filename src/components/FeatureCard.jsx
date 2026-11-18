/** A simple bordered card with an emoji icon, a title and text. */
export default function FeatureCard({ icon, badge, title, text }) {
  return (
    <article className="sm-card h-100">
      {icon && (
        <div className="feature-icon" aria-hidden="true">
          {icon}
        </div>
      )}
      {badge && <p className="text-secondary small mb-1">Step {badge}</p>}
      <h3 className="h5">{title}</h3>
      <p className="mb-0">{text}</p>
    </article>
  );
}
