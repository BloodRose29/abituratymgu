import { Link } from 'react-router-dom';
import { ABOUT_BLOCKS, ABOUT_INTRO } from '../content/about';
import { Blocks } from '../components/Blocks';
import Cta from '../components/Cta';

export default function AboutPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumbs"><Link to="/">Главная</Link> → О нас</div>
          <h1>О нас</h1>
          <p>{ABOUT_INTRO}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content">
            <Blocks blocks={ABOUT_BLOCKS} />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}