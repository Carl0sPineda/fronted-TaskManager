import { Link, useLocation } from "react-router-dom";
import task from "../assets/task.svg";
import ButtonSearch from "./ButtonSearch";

interface NavbarProps {
  setSearchTerm: (term: string) => void;
}

const Navbar = ({ setSearchTerm }: NavbarProps) => {
  const location = useLocation();

  return (
    <div className="flex items-center flex-shrink-0 w-full h-16 px-10 bg-white bg-opacity-75">
      <Link to={"/"}>
        <img src={task} alt="tasks.png" loading="lazy" height={32} width={32} />
      </Link>
      <ButtonSearch setSearchTerm={setSearchTerm} />
      <div className="ml-10">
        <Link
          className={`mx-2 text-sm font-semibold ${
            location.pathname === "/"
              ? "text-indigo-700"
              : "text-gray-600 hover:text-gray-400"
          }`}
          to={"/"}
        >
          Inicio
        </Link>
        <Link
          className={`mx-2 text-sm font-semibold ${
            location.pathname === "/actividad"
              ? "text-indigo-700"
              : "text-gray-600 hover:text-gray-400"
          }`}
          to={"/actividad"}
        >
          Actividades
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
