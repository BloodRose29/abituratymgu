import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO, TOPICS, FAQ } from '../content/home';
import { RichText } from '../lib/richtext';
import { RouteHero } from '../components/RouteMarkers';
import Cta from '../components/Cta';

function FaqRow({ q, a, open }: { q: string; a: string; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(!!open);
  return (
    <div className={isOpen ? 'faq-item open' : 'faq-item'}>
      <button className="faq-q" onClick={() => setIsOpen((v) => !v)}>
        {q}
      </button>
      <div className="faq-a">
        <RichText text={a} />
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow eyebrow--on-dark">{HERO.eyebrow}</p>
          <h1>
            {HERO.title.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </h1>
          <p className="lead">{HERO.lead}</p>
          <div className="hero-actions">
            <button
              className="btn btn-light"
              onClick={() =>
                document.getElementById('topics')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              ☰ Разделы сайта
            </button>
            <Link className="btn btn-outline btn-outline--light" to="/about">
              О нас
            </Link>
          </div>
          <div className="tagline">
            <span className="dot" /> {HERO.tagline}
          </div>
          <RouteHero caption={HERO.routeCaption} />
        </div>
      </section>

      <section id="topics">
        <div className="container">
          <p className="eyebrow">{TOPICS.eyebrow}</p>
          <h2 className="section-title">{TOPICS.title}</h2>
          <p className="section-sub">{TOPICS.sub}</p>
          <div className="grid grid-4">
            {TOPICS.cards.map((card) => (
              <div className="card" key={card.title}>
                <div className="icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
                <Link className="card-link" to={card.to}>
                  {card.link}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section--compact">
        <div className="container">
          <p className="eyebrow">{FAQ.eyebrow}</p>
          <h2 className="section-title">{FAQ.title}</h2>
          <p className="section-sub">{FAQ.sub}</p>
          {FAQ.items.map((item, i) => (
            <FaqRow key={i} q={item.q} a={item.a} open={i === 0} />
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}