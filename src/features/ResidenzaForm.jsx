import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

const EMPTY_RESIDENZA = {
  indirizzo: "",
  cap: "",
  citta: "",
};

function ResidenzaForm({ persona, onSave }) {
  const residenza = useMemo(
    () => persona?.residenza ?? persona?.residenze?.[0] ?? null,
    [persona?.residenza, persona?.residenze]
  );
  const { register, handleSubmit, reset } = useForm({
    defaultValues: EMPTY_RESIDENZA,
  });

  useEffect(() => {
    reset(residenza ?? EMPTY_RESIDENZA);
  }, [residenza, reset]);

  const onSubmit = (data) => {
    const payload = residenza ? { ...residenza, ...data } : data;
    onSave(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-primary/15 backdrop-blur"
    >
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Residenza
        </p>
        <h3 className="text-2xl font-bold text-slate-900">
          {residenza ? "Modifica residenza" : "Aggiungi residenza"}
        </h3>
        <p className="text-sm text-slate-500">
          Inserisci indirizzo, CAP e città per collegare una residenza alla
          persona selezionata.
        </p>
      </header>

      <div className="grid gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="indirizzo"
            className="text-sm font-medium text-slate-700"
          >
            Indirizzo
          </label>
          <input
            id="indirizzo"
            {...register("indirizzo", { required: true })}
            placeholder="Via Roma 10"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="cap" className="text-sm font-medium text-slate-700">
              CAP
            </label>
            <input
              id="cap"
              {...register("cap", { required: true })}
              placeholder="00100"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="citta"
              className="text-sm font-medium text-slate-700"
            >
              Città
            </label>
            <input
              id="citta"
              {...register("citta", { required: true })}
              placeholder="Roma"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/35"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/25"
        >
          {residenza ? "Aggiorna residenza" : "Salva residenza"}
        </button>
      </div>
    </form>
  );
}

export default ResidenzaForm;
