import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface PdfExportProps {
  filename: string;
  label: string;
  busyLabel: string;
  /** Контент памятки для PDF — рендерится в скрытом контейнере. */
  children: ReactNode;
}

/**
 * Кнопка «Скачать памятку (PDF)».
 * html2canvas не умеет рисовать элементы за пределами экрана, поэтому во время
 * экспорта контейнер на короткое время перемещается в левый верхний угол
 * (position: fixed), захватывается в PDF и снова прячется за экран.
 * html2pdf.js подгружается только по клику (dynamic import).
 */
export default function PdfExport({ filename, label, busyLabel, children }: PdfExportProps) {
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const onClick = async () => {
    if (!rootRef.current || busy) return;
    setBusy(true);
    setActive(true);
    try {
      // Ждём перерисовку (класс .pdf-export-active) и готовность шрифтов,
      // иначе html2canvas поймает элементы до перекомпоновки.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (document.fonts && document.fonts.ready) await document.fonts.ready;

      const { default: html2pdf } = await import('html2pdf.js');
      await html2pdf()
        .set({
          margin: 10,
          filename,
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        })
        .from(rootRef.current)
        .save();
    } catch (e) {
      console.error('Failed to create PDF:', e);
      alert('Не удалось создать PDF. Попробуйте ещё раз.');
    } finally {
      setActive(false);
      setBusy(false);
    }
  };

  return (
    <>
      <button className="export-pdf-btn" onClick={onClick} disabled={busy}>
        <span aria-hidden="true">⬇️</span>
        <span>{busy ? busyLabel : label}</span>
      </button>
      <div
        ref={rootRef}
        className={active ? 'pdf-export-root pdf-export-active' : 'pdf-export-root'}
        aria-hidden={active ? undefined : 'true'}
      >
        {children}
      </div>
    </>
  );
}