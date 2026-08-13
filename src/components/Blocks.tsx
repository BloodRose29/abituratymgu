import type { Block, TableRow } from '../content/types';
import { RichText, SmartLink } from '../lib/richtext';

function rowSpan(rows: TableRow[], r: number, c: number): number {
  let span = 1;
  while (r + span < rows.length && rows[r + span][c] === null) span++;
  return span;
}

function Table({ head, rows }: { head: string[]; rows: TableRow[] }) {
  return (
    <div className="table-wrap">
      <table>
        {head.length > 0 && (
          <thead>
            <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {rows.map((row, r) => (
            <tr key={r}>
              {row.map((cell, c) => {
                if (cell === null) return null;
                const span = rowSpan(rows, r, c);
                return (
                  <td key={c} rowSpan={span > 1 ? span : undefined}>
                    <RichText text={String(cell)} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function List({ items, ordered, className }: { items: string[]; ordered?: boolean; className?: string }) {
  const itemsEl = items.map((item, i) => <li key={i}><RichText text={item} /></li>);
  return ordered
    ? <ol className={className}>{itemsEl}</ol>
    : <ul className={className}>{itemsEl}</ul>;
}

export function BlockRow({ b }: { b: Block }) {
  switch (b.t) {
    case 'h2': return <h2 id={b.id}>{b.text}</h2>;
    case 'h3': return <h3 id={b.id}>{b.text}</h3>;
    case 'p': return <p><RichText text={b.text} /></p>;
    case 'ul': return <List items={b.items} />;
    case 'ol': return <List items={b.items} ordered />;
    case 'steps': return <List items={b.items} ordered className="steps" />;
    case 'table': return <Table head={b.head} rows={b.rows} />;
    case 'tip': return <div className="tip"><RichText text={b.text} /></div>;
    case 'warn': return <div className="warn"><RichText text={b.text} /></div>;
    case 'danger': return <div className="danger"><RichText text={b.text} /></div>;
    case 'adr': return <div className="adr"><span className="pin">📍</span> <span><RichText text={b.text} /></span></div>;
    case 'links':
      return (
        <ul className="links">
          {b.items.map((link, i) => (
            <li key={i}>
              <a className="link" href={link.url} target="_blank" rel="noopener noreferrer">
                <span><span className="link-title">{link.title}</span>{link.sub && <span className="link-sub">{link.sub}</span>}</span>
                <span className="link-go">↗</span>
              </a>
            </li>
          ))}
        </ul>
      );
    case 'tggrid':
      return (
        <ul className="tg-grid">
          {b.items.map((item, i) => (
            <li key={i}>
              <a className="tg" href={item.url} target="_blank" rel="noopener noreferrer">
                <span className="tg-name">{item.name}</span>
                <span className="tg-go">{item.sub} ↗</span>
              </a>
            </li>
          ))}
        </ul>
      );
    case 'team':
      return (
        <div className="team">
          {b.cards.map((card, i) => (
            <div className="team-card" key={i}>
              <div className="avatar">
                {card.photo ? (
                  <img className={'avatar-photo' + (card.imgClass ? ' ' + card.imgClass : '')} src={card.photo} alt={card.name} />
                ) : (
                  card.avatar
                )}
              </div>
              <h3>{card.name}</h3>
              {card.role && <div className="role">{card.role}</div>}
              {card.tg && (
                <a className="tg-link" href={card.tg.url} target="_blank" rel="noopener noreferrer">
                  <img
                    className="tg-ico"
                    src={import.meta.env.BASE_URL + 'telegram_icon.webp'}
                    alt=""
                    aria-hidden="true"
                  />{' '}
                  {card.tg.user}
                </a>
              )}
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => <BlockRow key={i} b={b} />)}
    </>
  );
}

export { SmartLink };