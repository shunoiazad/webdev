import { useEffect, useRef, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ProgressBar from '../components/ProgressBar';
import FormStep from '../components/FormStep';
import ResultsList from '../components/ResultsList';
import LaptopModal from '../components/LaptopModal';
import { steps, initialAnswers } from '../data/questions';
import laptops from '../data/laptops';
import { getRecommendations, summarizeAnswers } from '../utils/recommend';

export default function Recommender() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState(initialAnswers);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [selectedLaptop, setSelectedLaptop] = useState(null);

  const cardRef = useRef(null);
  const headingRef = useRef(null);
  const [moves, setMoves] = useState(0); // counts button clicks that change the step or results

  // When the step (or the results) changes, bring the form into view and move focus
  // to its heading so keyboard and screen reader users know something changed.
  useEffect(() => {
    if (moves === 0) return;
    cardRef.current?.scrollIntoView({ block: 'start' });
    const heading = headingRef.current || document.getElementById('results-heading');
    heading?.focus({ preventScroll: true });
  }, [moves]);

  const step = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const handleChange = (name, value) => {
    setAnswers((previous) => ({ ...previous, [name]: value }));
    setError('');
  };

  const handleNext = () => {
    const missing = step.fields.find((field) => field.required && !answers[field.name]);
    if (missing) {
      setError(`Please choose an option for "${missing.legend}" to continue.`);
      return;
    }
    if (isLastStep) {
      setResult(getRecommendations(answers, laptops));
    } else {
      setStepIndex((index) => index + 1);
    }
    setMoves((count) => count + 1);
  };

  const handleBack = () => {
    setError('');
    setStepIndex((index) => Math.max(0, index - 1));
    setMoves((count) => count + 1);
  };

  const handleEdit = () => {
    setResult(null);
    setStepIndex(0);
    setMoves((count) => count + 1);
  };

  const handleRestart = () => {
    setAnswers(initialAnswers);
    setResult(null);
    setStepIndex(0);
    setError('');
    setMoves((count) => count + 1);
  };

  return (
    <>
      <HeroBanner
        compact
        eyebrow="🧭 Find My Laptop"
        title="Answer a few questions, get a curated list."
        subtitle="Only your program and budget are required. Everything else is optional, so skip anything you are not sure about."
      />

      <section className="section-pad pt-3" aria-label="Laptop recommendation form">
        <div className="container">
          <div className="sm-card form-card" ref={cardRef}>
            {result ? (
              <ResultsList
                results={result.results}
                relaxed={result.relaxed}
                summary={summarizeAnswers(answers)}
                onSelect={setSelectedLaptop}
                onEdit={handleEdit}
                onRestart={handleRestart}
              />
            ) : (
              <form onSubmit={(event) => event.preventDefault()} noValidate>
                <ProgressBar current={stepIndex + 1} total={steps.length} label={step.title} />

                <FormStep step={step} answers={answers} onChange={handleChange} headingRef={headingRef} />

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <div className="d-flex flex-wrap justify-content-between gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleBack}
                    disabled={stepIndex === 0}
                  >
                    ← Back
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleNext}>
                    {isLastStep ? 'Show my laptops' : step.optional ? 'Next (or skip) →' : 'Next →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {selectedLaptop && <LaptopModal laptop={selectedLaptop} onClose={() => setSelectedLaptop(null)} />}
    </>
  );
}
