export default function ProgressBar({ current, total, label }) {
  return (
    <p className="text-secondary mb-3" aria-live="polite">
      Step {current} of {total}: {label}
    </p>
  );
}
