import { useMemo, useState } from "react";
import { usePersone } from "../services/usePersone";

function PersonaByAddress({ className }) {
  const [indirizzoInput, setIndirizzoInput] = useState("");
  const [indirizzoSelezionato, setIndirizzoSelezionato] = useState("");
  const { usePersoneByAddress } = usePersone();
  const {
    data: personeByAddress = [],
    isFetching,
    isFetched,
  } = usePersoneByAddress(indirizzoSelezionato.trim());

  const handleSubmit = (event) => {
    event.preventDefault();
    setIndirizzoSelezionato(indirizzoInput.trim());
  };

  const handleReset = () => {
    setIndirizzoInput("");
    setIndirizzoSelezionato("");
  };

  const mostraRisultati = isFetched && indirizzoSelezionato;

  const sectionClassName = useMemo(() => {
    const baseClassName =
      "space-y-6 rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-xl shadow-primary/10 backdrop-blur-sm";
    return className ? `${baseClassName} ${className}` : baseClassName;
  }, [className]);

  return (
    <section className={sectionClassName}>
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Ricerca per indirizzo
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Trova persone residenti
          </h2>
          <p className="text-sm text-slate-500">
            Inserisci l'indirizzo completo o una parte per filtrare rapidamente
            le anagrafiche.
          </p>
        </div>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-100 bg-white/60 p-6 shadow-inner shadow-primary/10 md:grid-cols-[1fr_auto] md:items-center"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="indirizzo"
            className="text-sm font-medium text-slate-700"
          >
            Indirizzo
          </label>
          <input
            id="indirizzo"
            type="text"
            value={indirizzoInput}
            onChange={(event) => setIndirizzoInput(event.target.value)}
            placeholder="Es. Via Roma 10"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
          />
        </div>

        <div className="flex items-end gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/25"
          >
            Cerca
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
          >
            Svuota
          </button>
        </div>
      </form>

      {mostraRisultati ? (
        personeByAddress.length ? (
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {personeByAddress.map((persona) => {
              const residenze = Array.isArray(persona.residenze)
                ? persona.residenze
                : persona.residenza
                ? [persona.residenza]
                : [];
              const residenzaPrincipale = residenze[0] ?? null;

              return (
                <li
                  key={persona.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
                >
                  <p className="text-lg font-semibold text-slate-900">
                    {persona.nome} {persona.cognome}
                  </p>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                    {persona.codiceFiscale || "Codice fiscale non disponibile"}
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    📍{" "}
                    {residenzaPrincipale?.indirizzo ||
                      indirizzoSelezionato ||
                      "Indirizzo non disponibile"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {residenzaPrincipale
                      ? `${residenzaPrincipale.cap} · ${residenzaPrincipale.citta}`
                      : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-slate-500">
            Nessuna persona trovata per "{indirizzoSelezionato}".
          </div>
        )
      ) : (
        <div className="rounded-2xl border border-slate-100 bg-white/50 p-8 text-sm text-slate-500">
          Digita un indirizzo e avvia la ricerca per visualizzare i risultati.
        </div>
      )}

      {isFetching && (
        <div className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center bg-slate-900/10">
          <span className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-primary/30 border-t-primary">
            <span className="sr-only">Caricamento</span>
          </span>
        </div>
      )}
    </section>
  );
}

export default PersonaByAddress;
