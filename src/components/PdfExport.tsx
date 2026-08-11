import { useState } from 'react';
import type { RefObject } from 'react';

interface PdfExportProps {
  targetRef: RefObject<HTMLElement | null>;
  filename: string;
  label: string;
  busyLabel: string;
}

/** Кнопка «Скачать памятку PDF» — экспортирует переданный элемент через html2pdf.js. */
export default function PdfExport({ targetRef, filename, label, busyLabel }: PdfExportProps) {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (!targetRef.current) return;
    setBusy(true);
    try {
      // html2pdf.js тяжелый (~1 МБ) — подгружается только по клику
      const { default: html2pdf } = await import('html2pdf.js');
      await html2pdf()
        .set({
          margin: 10,
          filename,
          image: { type: 'jpeg' as const, quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
        })
        .from(targetRef.current)
        .save();
    } catch (e) {
      console.error('Failed to create PDF:', e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button className="export-pdf-btn" onClick={onClick} disabled={busy}>
      <span aria-hidden="true">⬇️</span>
      <span>{busy ? busyLabel : label}</span>
    </button>
  );
}