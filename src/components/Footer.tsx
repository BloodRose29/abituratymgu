import { Link } from 'react-router-dom';
import { BRAND, FOOTER } from '../content/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>{BRAND.name}</h4>
            <p>{FOOTER.about}</p>
          </div>
          <div>
            <h4>Разделы</h4>
            <ul>
              {FOOTER.sections.map((s, i) => (
                <li key={i}>
                  <Link to={s.to}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Помощь</h4>
            <ul>
              {FOOTER.help.map((h, i) => (
                <li key={i}>
                  <Link to={h.to}>{h.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">{FOOTER.bottom}</div>
      </div>
    </footer>
  );
}