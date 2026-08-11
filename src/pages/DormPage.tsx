import { Link } from 'react-router-dom';
import { DORM_BLOCKS, DORM_INTRO } from '../content/dorm';
import { Blocks } from '../components/Blocks';
import Cta from '../components/Cta';

export default function DormPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumbs"><Link to="/">Главная</Link> → Общежития</div>
          <h1>Общежития ТюмГУ 🏠</h1>
          <p>{DORM_INTRO}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content">
            <Blocks blocks={DORM_BLOCKS} />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}