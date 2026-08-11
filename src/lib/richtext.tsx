import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

/**
 * Мини-разметка текста: контент хранится в данных как обычные строки,
 * `**жирный**`, `[текст](url)` и `(#anchor)` превращаются в разметку.
 * Внешние ссылки открываются в новой вкладке, внутренние — роутером.
 */

function parseBold(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part === '' ? null : <span key={i}>{part}</span>;
  });
}

export function SmartLink({ href, children }: { href: string; children: ReactNode }) {
  if (href.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  }
  if (href.startsWith('#')) {
    const id = href.slice(1);
    return (
      <a
        href={href}
        onClick={(e) => {
          const el = id ? document.getElementById(id) : null;
          if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {children}
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} ↗
    </a>
  );
}

export function RichText({ text }: { text: string }) {
  // Сначала ссылки, потом жирный внутри текста и внутри подписей ссылок
  const parts = text.split(/(\[[^\]]*\](?:\([^)]*\))?)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([\s\S]*)\]\(([^)]*)\)$/);
        if (m) {
          return <SmartLink key={i} href={m[2]}>{parseBold(m[1])}</SmartLink>;
        }
        return <span key={i}>{parseBold(part)}</span>;
      })}
    </>
  );
}