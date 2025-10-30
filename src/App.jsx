import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./ui/Header";
import Persone from "./pages/Persone";
import PersonaDettaglio from "./pages/PersonaDettaglio";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <div className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/persone" element={<Persone />} />
          <Route path="/persone/:id" element={<PersonaDettaglio />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
