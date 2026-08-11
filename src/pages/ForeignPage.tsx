import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  FOREIGN_SECTIONS,
  FOREIGN_TOP,
  FOREIGN_BOTTOM,
  FOREIGN_INTRO,
} from '../content/foreign';
import type { TabSection } from '../content/types';
import { Blocks, BlockRow } from '../components/Blocks';
import { RouteCompact } from '../components/RouteMarkers';
import PdfExport from '../components/PdfExport';
import Cta from '../components/Cta';

/** Вкладка, в которой лежит целевой раздел (по якорю адреса). */
function tabForAnchor(anchor?: string, sections: TabSection[] = FOREIGN_SECTIONS): string {
  if (!anchor) return sections[0].id;
  const hit = sections.find((s) =>
    s.blocks.some((b) => (b.t === 'h2' || b.t === 'h3') && b.id === anchor)
  );
  return hit ? hit.id : sections[0].id;
}

export default function ForeignPage() {
  const params = useParams();
  const anchor = params.anchor;
  const [tab, setTab] = useState(() => tabForAnchor(anchor));

  useEffect(() => {
    setTab(tabForAnchor(anchor));
  }, [anchor]);

  const section = FOREIGN_SECTIONS.find((s) => s.id === tab) ?? FOREIGN_SECTIONS[0];

  return (
    <>
      <section className="page-head">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Главная</Link> → Иностранным студентам
          </div>
          <h1>Иностранным студентам</h1>
          <p>{FOREIGN_INTRO}</p>
          <RouteCompact caption="Путь абитуриента · вы здесь" />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="content">
            <BlockRow b={FOREIGN_TOP} />

            <div className="pdf-export-toolbar">
              <PdfExport
                filename="Памятка_иностранному_студенту_ТюмГУ.pdf"
                label="Скачать памятку (PDF)"
                busyLabel="Создание PDF…"
              >
                <section className="pdf-cover">
                  <h1>Памятка иностранному студенту</h1>
                  <p>Тюменский государственный университет · актуально на 2026 год</p>
                </section>
                {FOREIGN_SECTIONS.map((s) => (
                  <section key={s.id}>
                    <Blocks blocks={s.blocks} />
                  </section>
                ))}
                <Blocks blocks={FOREIGN_BOTTOM} />
              </PdfExport>
            </div>

            <div className="tabbar" aria-label="Разделы страницы">
              {FOREIGN_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={'tabbar-item' + (s.id === tab ? ' active' : '')}
                  aria-pressed={s.id === tab}
                  onClick={() => setTab(s.id)}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>

            <div id={section.id}>
              <Blocks blocks={section.blocks} />
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}