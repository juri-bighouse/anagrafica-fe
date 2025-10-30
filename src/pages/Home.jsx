import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="space-y-24">
      <section className="grid min-h-[60vh] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Benvenuto in ResiApp
          </p>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            Gestisci l'anagrafica in modo semplice e veloce
          </h2>
          <p className="text-lg text-slate-600">
            Centralizza i dati delle persone, monitora le attività principali e
            offri un'esperienza fluida al tuo team amministrativo.
          </p>
          <Link
            to="/persone"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
          >
            Inizia ora
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-2xl aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
            alt="Dashboard di gestione"
            className="h-full w-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Home;
