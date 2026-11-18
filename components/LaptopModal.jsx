import { useEffect, useRef } from 'react';
import { formatPrice, formatStorage, osLabel } from '../utils/format';

/**
 * A simple accessible dialog showing the full specs of one laptop.
 * Closes with the X button, the Close button, a click on the dark backdrop, or the Escape key.
 */
export default function LaptopModal({ laptop, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.classList.add('modal-open');

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.classList.remove('modal-open');
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const rows = [
    { label: 'Brand', value: laptop.brand },
    { label: 'Operating system', value: osLabel(laptop.os) },
    { label: 'Processor', value: laptop.cpu },
    { label: 'Memory (RAM)', value: `${laptop.ram} GB` },
    { label: 'Storage', value: formatStorage(laptop.storage) },
    { label: 'Graphics', value: laptop.gpu },
    { label: 'Screen size', value: `${laptop.screen} inches` },
    { label: 'Weight', value: `${laptop.weight} kg` },
    { label: 'Battery life', value: `Up to ${laptop.battery} hours` },
  ];

  return (
    <div className="sm-modal-backdrop" onClick={onClose}>
      <div
        className="sm-modal sm-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="laptop-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <p className="text-primary fw-bold small text-uppercase mb-1">{laptop.brand}</p>
            <h2 id="laptop-modal-title" className="h3 fw-bold mb-1">
              {laptop.name}
            </h2>
            <p className="fs-4 fw-bold mb-0">{formatPrice(laptop.price)}</p>
          </div>
          <button type="button" className="btn-close" aria-label="Close details" onClick={onClose} />
        </div>

        <img
          src={laptop.image}
          alt={`${laptop.name} laptop`}
          className="img-fluid mb-3"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = './images/laptop-placeholder.svg';
          }}
        />

        <dl className="spec-list spec-list-large">
          {rows.map((row) => (
            <div className="spec-row" key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="d-flex flex-wrap gap-1 mb-4">
          {laptop.bestFor.map((tag) => (
            <span className="badge text-bg-light border" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <p className="small text-secondary">Sample data: confirm the current price and exact specs with the seller.</p>

        <button type="button" className="btn btn-primary" ref={closeRef} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
