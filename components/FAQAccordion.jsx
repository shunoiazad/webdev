import { useState } from 'react';
import FAQItem from './FAQItem';

/** Accordion: clicking a question opens its answer and closes the previous one. */
export default function FAQAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className="faq-list sm-card p-2 p-md-3">
      {items.map((item) => (
        <FAQItem key={item.id} item={item} isOpen={openId === item.id} onToggle={handleToggle} />
      ))}
    </div>
  );
}
