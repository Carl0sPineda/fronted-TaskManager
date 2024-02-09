import { FormEvent, useEffect, useRef, useState } from "react";
import { FormData } from "../interfaces/task.interface";
import { useAddTask } from "../hooks/task.mutations";
import toast from "react-hot-toast";

const AddTask = () => {
  const addTaskMutation = useAddTask();
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    autor: "",
    statusTask: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowModal(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTaskMutation.mutateAsync(formData);
      setFormData({
        title: "",
        autor: "",
        statusTask: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setShowModal(false);
      toast.success("Tarea agregada con éxito!");
    } catch (error) {
      toast.error("Ha ocurrido un error!");
    }
  };

  return (
    <>
      <button
        className="flex mr-11 items-center justify-center w-6 h-6 ml-auto rounded bg-indigo-500 text-indigo-100"
        aria-label="Agregar tarea"
        onClick={() => setShowModal(true)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-full max-w-md" ref={modalRef}>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Título
                  </label>
                  <input
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ingresa el título de la tarea"
                  />
                </div>
                <div className="flex">
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="statusTask"
                    >
                      Estado
                    </label>
                    <select
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="statusTask"
                      name="statusTask"
                      value={formData.statusTask} // Aquí se establece el valor seleccionado
                      onChange={handleChange}
                    >
                      <option value="">Seleccione un estado</option>
                      <option value="completado">Completado</option>
                      <option value="en progreso">En progreso</option>
                      <option value="postergado">Postergado</option>
                    </select>
                  </div>
                  <div className="mb-4 w-1/2 ml-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="autor"
                    >
                      Autor
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="autor"
                      type="text"
                      name="autor"
                      value={formData.autor}
                      onChange={handleChange}
                      placeholder="Carlos"
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="mb-4 w-1/2 mr-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Fecha de inicio
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4 w-1/2 ml-2">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endDate"
                    >
                      Fecha de fin
                    </label>
                    <input
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Descripción
                  </label>
                  <textarea
                    required
                    className="shadow appearance-none border h-[7rem] resize-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Agrega una descripción para la tarea..."
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Agregar
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default AddTask;
