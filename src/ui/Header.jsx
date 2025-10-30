import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-white text-primaryText p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">ResiApp</h1>
      <div className="flex gap-4 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-semibold pb-1 ${isActive ? "border-b-2 border-primary" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/persone"
          className={({ isActive }) =>
            `pb-1 ${isActive ? "border-b-2 border-primary" : ""}`
          }
        >
          Persone
        </NavLink>
        <button className="ml-4 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all shadow-sm">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Header;
