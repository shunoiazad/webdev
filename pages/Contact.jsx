import { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import FAQAccordion from '../components/FAQAccordion';
import { contactInfo } from '../data/content';
import faqs from '../data/faqs';

const topics = ['General question', 'Laptop suggestion', 'Report a mistake', 'Feedback about the website'];

const emptyForm = { name: '', email: '', topic: topics[0], message: '' };

// Client-side validation only: the form does not send or save anything.
function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10) errors.message = 'Your message should be at least 10 characters long.';
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
    if (errors[name]) setErrors((previous) => ({ ...previous, [name]: undefined }));
    setSubmitted(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      setSubmitted(true);
      setValues(emptyForm);
    }
  };

  const fieldClass = (name) => `form-control ${errors[name] ? 'is-invalid' : ''}`;

  return (
    <>
      <HeroBanner
        compact
        eyebrow="✉️ Contact"
        title="We'd love to hear from you."
        subtitle="Have a question, a laptop suggestion, or found a mistake? Send us a message."
      />

      <section className="section-pad pt-3" aria-labelledby="contact-heading">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-5">
              <h2 id="contact-heading" className="h4 fw-bold mb-3">
                📬 Ways to reach us
              </h2>
              <div className="d-grid gap-3">
                {contactInfo.map((item) => (
                  <FeatureCard key={item.id} icon={item.icon} title={item.title} text={item.text} />
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <form className="sm-card form-card" onSubmit={handleSubmit} noValidate>
                <h2 className="h4 fw-bold mb-3">💬 Send us a message</h2>

                {submitted && (
                  <div className="alert alert-success" role="status">
                    Thank you! Your message looks good. (This demo site does not send messages, but with a backend it
                    would be delivered to the team.)
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="contact-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={fieldClass('name')}
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name && (
                    <div id="contact-name-error" className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={fieldClass('email')}
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email && (
                    <div id="contact-email-error" className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="contact-topic" className="form-label">
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    name="topic"
                    className="form-select"
                    value={values.topic}
                    onChange={handleChange}
                  >
                    {topics.map((topic) => (
                      <option key={topic} value={topic}>
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="contact-message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    className={fieldClass('message')}
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  />
                  {errors.message && (
                    <div id="contact-message-error" className="invalid-feedback d-block">
                      {errors.message}
                    </div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-light" aria-labelledby="faq-heading">
        <div className="container">
          <SectionHeading
            id="faq-heading"
            eyebrow="❓ FAQs"
            title="Frequently asked questions"
            subtitle="Quick answers to the things students ask us most."
          />
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
