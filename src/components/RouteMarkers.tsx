import { Link } from 'react-router-dom';
import { ROUTE_STEPS_HERO, ROUTE_STEPS_COMPACT, type RouteStep } from '../content/route';

function Step({ step, isHere }: { step: RouteStep; isHere?: boolean }) {
  return (
    <li className={isHere ? 'is-here' : ''}>
      <Link className="route-stop" to={step.to}>
        <span className="route-num">{step.num}</span>
        <span className="route-label">{step.label}</span>
      </Link>
    </li>
  );
}

/** «Путь абитуриента» — крупный маршрут на главной. */
export function RouteHero({ caption }: { caption: string }) {
  return (
    <nav className="route" aria-label="Путь абитуриента">
      <span className="route-caption">{caption}</span>
      <ol className="route-list route-list--hero">
        {ROUTE_STEPS_HERO.map((s) => (
          <Step key={s.num} step={s} />
        ))}
      </ol>
    </nav>
  );
}

/** Компактный маршрут на странице «Иностранцам» (все шаги — здесь). */
export function RouteCompact({ caption }: { caption: string }) {
  return (
    <div className="route-marker">
      <span className="route-caption">{caption}</span>
      <ol className="route-list route-list--compact">
        {ROUTE_STEPS_COMPACT.map((s) => (
          <Step key={s.num} step={s} isHere />
        ))}
      </ol>
    </div>
  );
}