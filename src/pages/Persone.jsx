import PersonaList from "../features/PersonaList";
import PersonaForm from "../features/PersonaForm";
import PersonaByAddress from "../features/PersonaByAddress";

function Persone() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <PersonaList />
      <PersonaForm />
      <PersonaByAddress className="md:col-span-2" />
    </div>
  );
}

export default Persone;
