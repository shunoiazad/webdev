import { useEffect } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Recommender from './pages/Recommender';
import Catalog from './pages/Catalog';
import About from './pages/About';
import Contact from './pages/Contact';

// Scroll back to the top and update the page title whenever the page changes.
const pageTitles = {
  '/': 'SpecMate | Find the right laptop for your program',
  '/find': 'Find My Laptop | SpecMate',
  '/catalog': 'Laptop Catalog | SpecMate',
  '/about': 'About | SpecMate',
  '/contact': 'Contact and FAQs | SpecMate',
};

function PageEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitles[pathname] || 'SpecMate';
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <section className="section-pad text-center">
      <div className="container">
        <h1 className="fw-bold">Page not found</h1>
        <p className="text-secondary">That page does not exist. Let's get you back on track.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </section>
  );
}

export default function App() {
  const skipToContent = (event) => {
    event.preventDefault();
    document.getElementById('main')?.focus();
  };

  return (
    <>
      <a href="#main" className="skip-link" onClick={skipToContent}>
        Skip to main content
      </a>
      <PageEffects />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find" element={<Recommender />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
