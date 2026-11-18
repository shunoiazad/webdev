export default function FAQItem({ item, isOpen, onToggle }) {
  const panelId = `faq-panel-${item.id}`;
  const buttonId = `faq-button-${item.id}`;

  return (
    <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
      <h3 className="h6 mb-0">
        <button
          type="button"
          id={buttonId}
          className="faq-question"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(item.id)}
        >
          <span>{item.question}</span>
          <span className="faq-icon" aria-hidden="true">
            {isOpen ? '−' : '+'}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="faq-answer">
        <p className="mb-0 text-secondary">{item.answer}</p>
      </div>
    </div>
  );
}
