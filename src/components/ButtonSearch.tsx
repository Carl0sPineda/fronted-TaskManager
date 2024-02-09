import { ChangeEvent, useState } from "react";

interface ButtonSearchProps {
  setSearchTerm: (term: string) => void;
}

const ButtonSearch = ({ setSearchTerm }: ButtonSearchProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    setSearchTerm(value);
  };

  return (
    <input
      className="flex items-center h-10 px-4 ml-10 text-sm bg-gray-200 rounded-full focus:outline-none focus:ring"
      type="search"
      placeholder="Buscar una tarea…"
      value={searchValue}
      onChange={handleInputChange}
    />
  );
};

export default ButtonSearch;
