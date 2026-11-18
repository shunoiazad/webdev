import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/find', label: 'Find My Laptop' },
  { to: '/catalog', label: 'Catalog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky-top bg-light border-bottom">
      <nav className="navbar navbar-expand-lg" aria-label="Main navigation">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold" onClick={close}>
            <img src="./images/Specmate.png" alt="SpecMate" height="36" className="d-inline-block align-middle" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="main-menu"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div id="main-menu" className={`collapse navbar-collapse ${open ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <NavLink to={link.to} end={link.end} className="nav-link" onClick={close}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
