declare module 'html2pdf.js' {
  interface Html2PdfInstance {
    set(options: unknown): Html2PdfInstance;
    from(el: Element | null): Html2PdfInstance;
    save(): Promise<unknown>;
  }
  interface Html2PdfFactory {
    (): Html2PdfInstance;
  }
  const html2pdf: Html2PdfFactory;
  export default html2pdf;
}