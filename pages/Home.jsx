import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import { problems, howItWorks, benefits } from '../data/content';

export default function Home() {
  // A plain button (not an #anchor link) is used here because anchor links would
  // change the HashRouter address and take the visitor to the wrong page.
  const scrollToIntro = () => {
    document.getElementById('what-is-specmate')?.scrollIntoView();
  };

  return (
    <>
      <HeroBanner
        compact
        eyebrow="💻 Laptop recommendations for college students"
        title="The right laptop for your program, without the guesswork."
        subtitle="SpecMate matches your course, budget, and lifestyle to laptops that will actually keep up with your studies."
        illustration={
          <img
            src="./images/hero-laptop.png"
            alt="A laptop seen from above"
            className="img-fluid"
          />
        }
      >
        <button type="button" className="btn btn-primary" onClick={scrollToIntro}>
          See how it works ↓
        </button>
      </HeroBanner>

      <section className="section-pad" aria-labelledby="what-is-specmate">
        <div className="container">
          <div className="sm-card">
            <div className="row align-items-center g-4">
              <div className="col-12">
                <SectionHeading
                  id="what-is-specmate"
                  align="start"
                  eyebrow="🤔 What is SpecMate?"
                  title="A simple way to choose a laptop"
                />
                <p className="text-secondary">
                  Different academic programs need different software, processing power, and specifications. But
                  choosing a laptop is hard when you are not sure what "16 GB RAM" or "dedicated graphics" really
                  means for your course.
                </p>
                <p className="text-secondary mb-0">
                  SpecMate is a simple web platform that asks about your program, budget, preferred operating system,
                  and portability needs, then recommends laptops that fit. No accounts, no jargon, and no overpaying
                  for features you will never use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-light" aria-labelledby="problem-heading">
        <div className="container">
          <SectionHeading
            id="problem-heading"
            eyebrow="⚠️ The problem"
            title="Buying a laptop is harder than it looks"
            subtitle="Most students run into at least one of these before they even open a store page."
          />
          <div className="row g-4">
            {problems.map((problem) => (
              <div className="col-md-4" key={problem.id}>
                <FeatureCard icon={problem.icon} title={problem.title} text={problem.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="how-heading">
        <div className="container">
          <SectionHeading
            id="how-heading"
            eyebrow="🚀 How it works"
            title="Three steps to your shortlist"
            subtitle="Answer a few friendly questions. Anything you are unsure about can be skipped."
          />
          <div className="row g-4">
            {howItWorks.map((step) => (
              <div className="col-md-4" key={step.id}>
                <FeatureCard icon={step.icon} badge={step.badge} title={step.title} text={step.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-light" aria-labelledby="why-heading">
        <div className="container">
          <SectionHeading
            id="why-heading"
            eyebrow="⭐ Why SpecMate"
            title="Built to be useful for students"
          />
          <div className="row g-4">
            {benefits.map((benefit) => (
              <div className="col-sm-6 col-lg-3" key={benefit.id}>
                <FeatureCard icon={benefit.icon} title={benefit.title} text={benefit.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="cta-heading">
        <div className="container">
          <div className="sm-card">
            <div className="row align-items-center g-4">
              <div className="col-12">
                <p className="text-primary fw-bold small text-uppercase">Ready?</p>
                <h2 id="cta-heading" className="fw-bold">
                  Find the laptop that fits you
                </h2>
                <p className="text-secondary">
                  It takes about two minutes. Tell us about your program and budget, and we will do the rest.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Link to="/find" className="btn btn-primary">
                    Find my laptop →
                  </Link>
                  <Link to="/catalog" className="btn btn-outline-primary">
                    Browse the catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
