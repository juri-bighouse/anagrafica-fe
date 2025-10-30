import { useNavigate, useParams } from "react-router-dom";
import ResidenzaForm from "../features/ResidenzaForm";
import { usePersonaDettaglio } from "../services/usePersonaDettaglio";

function PersonaDettaglio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { persona, isLoading, addResidenza, updateResidenza } =
    usePersonaDettaglio(id);

  if (isLoading) {
    return (
      <section className="mx-auto flex h-[60vh] max-w-3xl items-center justify-center rounded-3xl border border-slate-200 bg-white/70 p-12 text-sm font-semibold uppercase tracking-wide text-slate-500 shadow-inner shadow-primary/10">
        Caricamento dati persona…
      </section>
    );
  }

  if (!persona) {
    return (
      <section className="mx-auto max-w-3xl space-y-4 rounded-3xl border border-rose-200 bg-rose-50/80 p-10 text-center shadow-lg shadow-rose-200/40">
        <h2 className="text-2xl font-bold text-rose-700">
          Persona non trovata
        </h2>
        <p className="text-sm text-rose-600">
          L'ID richiesto non corrisponde a nessuna anagrafica registrata.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700"
        >
          Torna indietro
        </button>
      </section>
    );
  }

  const residenze = Array.isArray(persona.residenze)
    ? persona.residenze
    : persona.residenza
    ? [persona.residenza]
    : [];
  const residenzaPrincipale = residenze[0] ?? null;

  return (
    <div className="mx-auto max-w-6xl space-y-8 py-10">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-primary hover:text-primary"
      >
        <span aria-hidden>←</span>
        Torna indietro
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,theme(colors.primary)/0.45,transparent_55%)]" />
          <div className="relative z-10 space-y-8 p-10">
            <header className="space-y-3">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
                Scheda persona
              </span>
              <h1 className="text-4xl font-bold leading-tight">
                {persona.nome} {persona.cognome}
              </h1>
              <p className="text-sm text-slate-200">
                ID anagrafico #{persona.id} · Ultimo aggiornamento automatico al
                salvataggio della residenza.
              </p>
            </header>

            <dl className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1 rounded-2xl bg-white/10 p-4">
                <dt className="text-xs font-medium uppercase tracking-widest text-slate-200">
                  Codice fiscale
                </dt>
                <dd className="text-lg font-semibold tracking-[0.25em] text-white">
                  {persona.codiceFiscale || "Non disponibile"}
                </dd>
              </div>

              <div className="space-y-1 rounded-2xl bg-white/10 p-4">
                <dt className="text-xs font-medium uppercase tracking-widest text-slate-200">
                  Data di nascita
                </dt>
                <dd className="text-lg font-semibold text-white">
                  {persona.dataNascita || "Dato assente"}
                </dd>
              </div>
            </dl>

            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-200">
                Stato residenze
              </h2>
              {residenze.length ? (
                <ul className="grid gap-4">
                  {residenze.map((res, index) => (
                    <li
                      key={res.id ?? index}
                      className="rounded-2xl bg-white/15 p-5 shadow-inner shadow-black/10"
                    >
                      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-slate-200">
                        <span>{index === 0 ? "Principale" : "Secondaria"}</span>
                        {res.id && <span>ID {res.id}</span>}
                      </div>
                      <p className="mt-3 text-base font-semibold text-white">
                        {res.indirizzo}
                      </p>
                      <p className="text-sm text-slate-200">
                        {res.cap} · {res.citta}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/40 bg-white/5 p-5 text-sm text-slate-200">
                  Nessuna residenza associata. Compila il modulo per
                  aggiungerla.
                </div>
              )}
            </section>
          </div>
        </section>

        <ResidenzaForm
          persona={persona}
          onSave={residenzaPrincipale ? updateResidenza : addResidenza}
        />
      </div>
    </div>
  );
}

export default PersonaDettaglio;
