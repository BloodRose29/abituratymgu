import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { BRAND, NAV } from '../content/site';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <div className="brand-logo">{BRAND.logo}</div>
          <div className="brand-text">
            <strong>{BRAND.name}</strong>
            <span>{BRAND.tagline}</span>
          </div>
        </Link>
        <button
          className="menu-toggle"
          aria-label="Меню"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
        <nav className={open ? 'main-nav open' : 'main-nav'}>
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="nav-hint">{BRAND.hint}</div>
        </nav>
      </div>
    </header>
  );
}