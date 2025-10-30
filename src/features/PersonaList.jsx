import { Link } from "react-router-dom";
import { usePersone } from "../services/usePersone";

function PersonaList() {
  const { persone, isLoading, deletePersona } = usePersone();

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-inner shadow-primary/10">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Caricamento elenco persone…
        </p>
      </section>
    );
  }

  return (
    <section className="flex h-[32rem] flex-col gap-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-primary/10 backdrop-blur-sm">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Archivio persone
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Elenco completo</h2>
          <p className="text-sm text-slate-500">
            {persone.length} {persone.length === 1 ? "persona" : "persone"}{" "}
            registrate.
          </p>
        </div>
      </header>

      {persone.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-slate-500">
          Nessuna persona ancora presente. Aggiungi la prima dal form accanto.
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <ul className="grid h-full gap-4 overflow-y-auto pr-2">
            {persone.map((p) => {
              const residenze = Array.isArray(p?.residenze)
                ? p.residenze
                : p?.residenza
                ? [p.residenza]
                : [];
              const residenzaPrincipale = residenze[0] ?? null;
              const haResidenza = Boolean(residenzaPrincipale);

              return (
                <li
                  key={p.id}
                  className="group grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg md:grid-cols-[1fr_auto_auto] md:items-center"
                >
                  <div className="space-y-1">
                    <Link
                      to={`/persone/${p.id}`}
                      className="text-lg font-semibold text-slate-900 transition group-hover:text-primary"
                    >
                      {p.nome} {p.cognome}
                    </Link>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      {p.codiceFiscale || "Codice fiscale non disponibile"}
                    </p>
                  </div>

                  <div className="flex items-center justify-start md:justify-center">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-semibold ring-1 ring-inset ${
                        haResidenza
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : "bg-amber-50 text-amber-700 ring-amber-200"
                      } max-w-full overflow-hidden`}
                    >
                      <span className="text-base">
                        {haResidenza ? "🏠" : "📭"}
                      </span>
                      <span className="truncate">
                        {haResidenza
                          ? residenzaPrincipale.indirizzo
                          : "Residenza mancante"}
                      </span>
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <Link
                      to={`/persone/${p.id}`}
                      className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                    >
                      Dettagli
                    </Link>
                    <button
                      type="button"
                      onClick={() => deletePersona(p.id)}
                      className="inline-flex items-center justify-center rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-100"
                    >
                      Elimina
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default PersonaList;
