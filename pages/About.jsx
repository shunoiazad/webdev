import { Link } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import SectionHeading from '../components/SectionHeading';
import FeatureCard from '../components/FeatureCard';
import { aboutValues, scoringFactors } from '../data/content';

export default function About() {
  return (
    <>
      <HeroBanner
        compact
        eyebrow="ℹ️ About SpecMate"
        title="Helping students choose with confidence."
        subtitle="We are a group of students who wanted laptop shopping to be less confusing for everyone who comes after us."
        illustration={
          <img
            src="./images/about.png"
            alt="SpecMate: helping students choose a laptop"
            className="img-fluid"
          />
        }
      />

      <section className="section-pad pt-3" aria-labelledby="who-heading">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <article className="sm-card story-card h-100">
                <p className="text-primary fw-bold small text-uppercase">Who we are</p>
                <h2 id="who-heading" className="h3 fw-bold">
                  A student team with a practical goal
                </h2>
                <p className="text-secondary">
                  SpecMate was created by a group of college students as a class project. We built it to solve a
                  problem we and our classmates actually had: figuring out which laptop to buy without being laptop
                  experts.
                </p>
                <p className="text-secondary">
                  SpecMate is a simple, static web platform. It does not sell laptops or collect your information. It
                  only helps you decide.
                </p>
              </article>
            </div>
            <div className="col-lg-6">
              <article className="sm-card story-card h-100">
                <p className="text-primary fw-bold small text-uppercase">Why we made it</p>
                <h2 className="h3 fw-bold">Because the wrong laptop is expensive</h2>
                <p className="text-secondary">
                  Technology plays a big part in higher education, and different programs need different software and
                  processing power. A student of business does not need the same machine as a student of animation or
                  engineering.
                </p>
                <p className="text-secondary">
                  Without guidance, students either overspend on features they will never use or buy a laptop that
                  cannot handle their coursework. SpecMate helps you avoid both.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-light" aria-labelledby="values-heading">
        <div className="container">
          <SectionHeading
            id="values-heading"
            eyebrow="💡 What we believe"
            title="Our guiding ideas"
          />
          <div className="row g-4">
            {aboutValues.map((value) => (
              <div className="col-md-4" key={value.id}>
                <FeatureCard icon={value.icon} title={value.title} text={value.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="scoring-heading">
        <div className="container">
          <SectionHeading
            id="scoring-heading"
            eyebrow="🛠️ Under the hood"
            title="How recommendations are made"
            subtitle="Your program and software choices set the specs you need. Then every laptop in our list is scored on these six things."
          />
          <div className="row g-4">
            {scoringFactors.map((factor) => (
              <div className="col-sm-6 col-lg-4" key={factor.id}>
                <FeatureCard icon={factor.icon} title={factor.title} text={factor.text} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="about-cta-heading">
        <div className="container">
          <div className="sm-card text-center">
            <h2 id="about-cta-heading" className="fw-bold">
              Ready to find your laptop?
            </h2>
            <p className="text-secondary">Answer a few questions and get a curated shortlist.</p>
            <Link to="/find" className="btn btn-primary">
              Find my laptop →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
