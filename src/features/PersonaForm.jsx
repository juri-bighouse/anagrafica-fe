import { useForm } from "react-hook-form";
import { usePersone } from "../services/usePersone";

function PersonaForm() {
  const { register, handleSubmit, reset } = useForm();
  const { addPersona } = usePersone();

  const onSubmit = (data) => {
    addPersona(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-xl shadow-primary/20 backdrop-blur-sm"
    >
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Anagrafica
        </p>
        <h2 className="text-2xl font-bold text-slate-900">
          Aggiungi una nuova persona
        </h2>
        <p className="text-sm text-slate-500">
          Compila i campi per registrare rapidamente una nuova anagrafica.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-sm font-medium text-slate-700">
            Nome
          </label>
          <input
            id="nome"
            {...register("nome", { required: true })}
            placeholder="Mario"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="cognome"
            className="text-sm font-medium text-slate-700"
          >
            Cognome
          </label>
          <input
            id="cognome"
            {...register("cognome", { required: true })}
            placeholder="Rossi"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex flex-col gap-2 md:col-span-1">
          <label
            htmlFor="codiceFiscale"
            className="text-sm font-medium text-slate-700"
          >
            Codice fiscale
          </label>
          <input
            id="codiceFiscale"
            {...register("codiceFiscale", { required: true })}
            placeholder="RSSMRA80A01H501U"
            className="w-full uppercase tracking-[0.2em] rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="dataNascita"
            className="text-sm font-medium text-slate-700"
          >
            Data di nascita
          </label>
          <input
            id="dataNascita"
            type="date"
            {...register("dataNascita")}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/40 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/30"
        >
          Aggiungi persona
        </button>
      </div>
    </form>
  );
}

export default PersonaForm;
