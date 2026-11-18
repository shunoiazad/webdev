/**
 * Big intro banner used on the Home page, and a smaller "compact" version used
 * as the page header on the other pages.
 *  - illustration: an element shown on the right
 *  - children: buttons or extra content placed under the subtitle
 */
export default function HeroBanner({ eyebrow, title, subtitle, illustration, compact = false, children }) {
  return (
    <section className={`hero ${compact ? 'hero-compact' : ''}`}>
      <div className="container">
        <div className="row align-items-center g-4">
          <div className={illustration ? 'col-lg-6' : 'col-12'}>
            {eyebrow && <p className="text-primary fw-bold small text-uppercase">{eyebrow}</p>}
            <h1 className={compact ? 'display-6 fw-bold' : 'display-5 fw-bold'}>{title}</h1>
            {subtitle && <p className="lead hero-subtitle">{subtitle}</p>}
            {children && <div className="mt-4 d-flex flex-wrap gap-2">{children}</div>}
          </div>
          {illustration && <div className="col-lg-6 text-center">{illustration}</div>}
        </div>
      </div>
    </section>
  );
}
