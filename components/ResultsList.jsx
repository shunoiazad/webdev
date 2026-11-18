import { Link } from 'react-router-dom';
import LaptopCard from './LaptopCard';

/**
 * The curated list shown after the recommender form is finished.
 *  - results: array of { laptop, score, label, reasons, notes }
 *  - summary: array of strings describing the student's answers
 */
export default function ResultsList({ results, relaxed, summary, onSelect, onEdit, onRestart }) {
  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h2 className="h3 fw-bold mb-1" tabIndex={-1} id="results-heading">
            🎯 Your curated laptops
          </h2>
          <p className="text-secondary mb-0">
            Ranked from best to least fit based on your answers.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary" onClick={onEdit}>
            Edit my answers
          </button>
          <button type="button" className="btn btn-outline-primary" onClick={onRestart}>
            Start over
          </button>
        </div>
      </div>

      <ul className="list-unstyled d-flex flex-wrap gap-2 mb-4" aria-label="Your answers">
        {summary.map((item) => (
          <li key={item} className="badge text-bg-secondary">
            {item}
          </li>
        ))}
      </ul>

      {relaxed && (
        <div className="alert alert-warning" role="status">
          Nothing in our list fits that budget, so these are the most affordable options for your other answers.
          Try a higher budget range for better matches.
        </div>
      )}

      {results.length === 0 ? (
        <div className="sm-card text-center p-5">
          <h3 className="h5 fw-bold">No laptops found</h3>
          <p className="text-secondary">Try changing your operating system or budget and we will search again.</p>
          <button type="button" className="btn btn-primary" onClick={onEdit}>
            Edit my answers
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {results.map((item) => (
            <div className="col-12 col-md-6 col-xl-4" key={item.laptop.id}>
              <LaptopCard
                laptop={item.laptop}
                match={{ score: item.score, label: item.label, reasons: item.reasons, notes: item.notes }}
                onDetails={onSelect}
              />
            </div>
          ))}
        </div>
      )}

      <p className="text-secondary small mt-4 mb-0">
        Want to compare with everything we have? <Link to="/catalog">Browse the full catalog</Link>.
      </p>
    </div>
  );
}
