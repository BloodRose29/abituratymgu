import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { KB, CHIPS, type KbEntry } from '../content/assistantKB';
import { RichText } from '../lib/richtext';

interface Msg {
  who: 'bot' | 'user';
  node: ReactNode;
}

/** Поиск ответа по ключевым словам (та же логика, что была в js/assistant.js). */
function normalize(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/ё/g, 'е')
    .replace(/[.,!?;:()"'«»]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function findAnswer(text: string): KbEntry | null {
  const q = normalize(text);
  if (!q) return null;
  let best: KbEntry | null = null;
  let bestScore = 0;
  for (const entry of KB) {
    let score = 0;
    for (const key of entry.keys) {
      if (q.indexOf(normalize(key)) !== -1) score += key.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best && bestScore > 0 ? best : null;
}

/** Ответ помощника: <b> → жирный, переводы строк → переносы. */
function AnswerText({ text }: { text: string }) {
  const bolded = text.replace(/<b>/g, '**').replace(/<\/b>/g, '**');
  const lines = bolded.split('\n');
  return (
    <>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          <RichText text={line} />
        </span>
      ))}
    </>
  );
}

function AnswerLink({ entry }: { entry: KbEntry }) {
  if (!entry.link) return null;
  const { to, label } = entry.link;
  const cls = 'nav-btn';
  if (to.startsWith('http')) {
    return (
      <a className={cls} href={to} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }
  return <Link className={cls} to={to}>{label}</Link>;
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [chips, setChips] = useState<string[]>(CHIPS);
  const [showBadge, setShowBadge] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  useEffect(() => {
    const openHandler = () => openPanel();
    window.addEventListener('abitura:openAssistant', openHandler);
    return () => window.removeEventListener('abitura:openAssistant', openHandler);
  }, [open, msgs]);

  const addMsg = (node: ReactNode, who: 'bot' | 'user') => {
    setMsgs((prev) => [...prev, { who, node }]);
  };

  const ask = (text: string) => {
    if (!text.trim()) return;
    addMsg(text, 'user');
    setInput('');
    const entry = findAnswer(text);
    const result = entry
      ? (
        <span>
          <AnswerText text={entry.answer} />
          {entry.link && (
            <>
              <br />
              <AnswerLink entry={entry} />
            </>
          )}
        </span>
      )
      : (
        <span>
          🤔 Я пока не знаю ответа на этот вопрос.{'\n'}
          Попробуйте перефразировать, выберите подсказку ниже или напишите так: «что взять в общагу», «медосмотр», «цены».
        </span>
      );
    window.setTimeout(() => {
      addMsg(result, 'bot');
      setChips(entry?.link ? [entry.link.label] : CHIPS);
    }, 350);
  };

  const openPanel = () => {
    const next = !open;
    setOpen(next);
    setShowBadge(false);
    if (next && msgs.length === 0) {
      const hello = findAnswer('зачем сайт');
      addMsg(hello ? <AnswerText text={hello.answer} /> : '👋 Привет!', 'bot');
      setChips(CHIPS);
    }
  };

  return (
    <>
      <button className="assist-fab" title="Помощник абитуриента" onClick={openPanel}>
        💬{showBadge && <span className="badge" />}
      </button>

      <div className={open ? 'assist-panel open' : 'assist-panel'}>
        <div className="assist-head">
          <div className="robot">🤖</div>
          <div>
            <strong>АбитуВит</strong>
            <span>онлайн по всем вопросам</span>
          </div>
          <button className="assist-close" title="Закрыть" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>
        <div className="assist-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={'msg ' + m.who}>
              {m.node}
            </div>
          ))}
        </div>
        <div className="chips">
          {chips.map((c, i) => (
            <button key={i} className="chip" onClick={() => ask(c)}>
              {c}
            </button>
          ))}
        </div>
        <div className="assist-input">
          <input
            type="text"
            placeholder="Задайте вопрос…"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ask(input)}
          />
          <button title="Отправить" onClick={() => ask(input)}>
            ➤
          </button>
        </div>
      </div>
    </>
  );
}