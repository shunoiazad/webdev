export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', id }) {
  return (
    <div className={`section-heading text-${align} ${align === 'start' ? 'mb-3' : 'mb-4 mb-lg-5'}`}>
      {eyebrow && <p className="text-primary fw-bold small text-uppercase">{eyebrow}</p>}
      <h2 id={id} className="fw-bold">
        {title}
      </h2>
      {subtitle && <p className="text-secondary">{subtitle}</p>}
    </div>
  );
}
