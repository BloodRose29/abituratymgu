import { CTA_MAIN } from '../content/site';

/** Призыв внизу страниц — кнопка открывает помощника. */
export default function Cta() {
  const onAsk = () => window.dispatchEvent(new Event('abitura:openAssistant'));
  return (
    <section className="section--compact">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>{CTA_MAIN.title}</h2>
            <p>{CTA_MAIN.text}</p>
          </div>
          <button className="btn" onClick={onAsk}>
            {CTA_MAIN.button}
          </button>
        </div>
      </div>
    </section>
  );
}