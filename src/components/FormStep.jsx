import OptionGroup from './OptionGroup';

/**
 * Renders one step of the recommender form: a heading, a short description,
 * and the question groups listed in step.fields.
 * The heading receives focus when the step changes (headingRef) for keyboard and screen reader users.
 */
export default function FormStep({ step, answers, onChange, headingRef }) {
  return (
    <div>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
        <h2 className="h3 fw-bold mb-0" tabIndex={-1} ref={headingRef}>
          {step.icon && <span aria-hidden="true">{step.icon} </span>}
          {step.title}
        </h2>
        {step.optional && <span className="badge text-bg-light border">Optional</span>}
      </div>
      <p className="text-secondary mb-4">{step.description}</p>

      {step.fields.map((field) => (
        <OptionGroup
          key={field.name}
          name={field.name}
          legend={field.legend}
          hint={field.hint}
          type={field.type}
          options={field.options}
          value={answers[field.name]}
          required={field.required}
          columns={field.columns}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
