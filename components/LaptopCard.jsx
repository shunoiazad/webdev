import { formatPrice, formatStorage, osLabel } from '../utils/format';

/**
 * One laptop shown as a card.
 *  - laptop: the laptop object from data/laptops.js
 *  - match:  optional { score, label, reasons, notes } when shown as a recommendation
 *  - onDetails: called with the laptop when "View details" is clicked
 */
export default function LaptopCard({ laptop, match, onDetails }) {
  const specs = [
    { label: '🧠 Processor', value: laptop.cpu },
    { label: '💾 Memory', value: `${laptop.ram} GB RAM, ${formatStorage(laptop.storage)} storage` },
    { label: '🎮 Graphics', value: laptop.gpu },
    { label: '⚖️ Weight', value: `${laptop.weight} kg · ${laptop.screen}" screen` },
  ];

  return (
    <article className="sm-card laptop-card h-100">
      <img
        src={laptop.image}
        alt={`${laptop.name} laptop`}
        className="laptop-img"
        loading="lazy"
        onError={(event) => {
          // If the photo file is missing, show the placeholder instead.
          event.currentTarget.onerror = null;
          event.currentTarget.src = './images/laptop-placeholder.svg';
        }}
      />
      {match && <span className="badge text-bg-primary align-self-start m-3 mb-0">{match.score}% match</span>}

      <div className="laptop-body">
        <p className="text-primary fw-bold small text-uppercase mb-1">
          {laptop.brand} · {osLabel(laptop.os)}
        </p>
        <h3 className="h5 fw-bold mb-1">{laptop.name}</h3>
        <p className="fs-4 fw-bold mb-3">{formatPrice(laptop.price)}</p>

        <dl className="spec-list">
          {specs.map((spec) => (
            <div className="spec-row" key={spec.label}>
              <dt>{spec.label}</dt>
              <dd>{spec.value}</dd>
            </div>
          ))}
        </dl>

        {match ? (
          <div className="match-box">
            <p className="fw-bold small mb-1">{match.label}</p>
            <ul className="reason-list">
              {match.reasons.map((reason) => (
                <li key={reason} className="reason-good">
                  <span aria-hidden="true">✓ </span>
                  {reason}
                </li>
              ))}
              {match.notes.map((note) => (
                <li key={note} className="reason-note">
                  <span aria-hidden="true">! </span>
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="d-flex flex-wrap gap-1 mb-3">
            {laptop.bestFor.map((tag) => (
              <span className="badge text-bg-light border" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <button type="button" className="btn btn-outline-primary mt-auto" onClick={() => onDetails(laptop)}>
          View details
        </button>
      </div>
    </article>
  );
}
