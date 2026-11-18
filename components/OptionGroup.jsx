/**
 * A group of selectable "option cards" built from real radio buttons or checkboxes,
 * wrapped in a <fieldset> with a <legend> so screen readers announce the question.
 *
 *  - type 'radio'    -> value is a string
 *  - type 'checkbox' -> value is an array of strings
 */
const COLUMN_CLASSES = {
  1: 'col-12',
  2: 'col-12 col-sm-6',
  3: 'col-12 col-sm-6 col-md-4',
  4: 'col-6 col-md-3',
};

export default function OptionGroup({ name, legend, hint, type, options, value, required, columns = 2, onChange }) {
  const hintId = `${name}-hint`;

  const isChecked = (optionValue) => (type === 'checkbox' ? value.includes(optionValue) : value === optionValue);

  const handleChange = (optionValue) => {
    if (type === 'checkbox') {
      const next = value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue];
      onChange(name, next);
    } else {
      onChange(name, optionValue);
    }
  };

  return (
    <fieldset className="option-group mb-4">
      <legend className="h6 fw-bold mb-1">
        {legend}
        {required && (
          <span className="text-primary ms-1" aria-hidden="true">
            *
          </span>
        )}
        {required && <span className="visually-hidden"> (required)</span>}
      </legend>
      {hint && (
        <p id={hintId} className="small text-secondary mb-2">
          💡 {hint}
        </p>
      )}
      <div className="row g-2">
        {options.map((option) => {
          const id = `${name}-${option.value || 'none'}`;
          const checked = isChecked(option.value);
          return (
            <div className={COLUMN_CLASSES[columns] || COLUMN_CLASSES[2]} key={option.value || 'none'}>
              <label className={`option-card ${checked ? 'is-selected' : ''}`} htmlFor={id}>
                <input
                  id={id}
                  className="visually-hidden"
                  type={type}
                  name={name}
                  value={option.value}
                  checked={checked}
                  aria-describedby={hint ? hintId : undefined}
                  onChange={() => handleChange(option.value)}
                />
                <span className="option-title">
                  {option.icon && <span aria-hidden="true">{option.icon} </span>}
                  {option.label}
                </span>
                {option.description && <span className="option-desc">{option.description}</span>}
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
