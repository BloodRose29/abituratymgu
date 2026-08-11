import { Link } from 'react-router-dom';
import { STUDENT_BLOCKS } from '../content/student';
import { Blocks } from '../components/Blocks';
import Cta from '../components/Cta';

export default function StudentPage() {
  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumbs"><Link to="/">Главная</Link> → Студентам</div>
          <h1>Студентам и первокурснику</h1>
          <p>
            Пакет первокурсника, цифровая среда университета, отзывы о предметах и чаты институтов —
            всё, что пригодится после зачисления.
          </p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content">
            <Blocks blocks={STUDENT_BLOCKS} />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}