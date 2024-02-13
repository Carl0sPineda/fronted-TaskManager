import { useEffect, useRef } from "react";
import { Task } from "../interfaces/task.interface";
import { usePutTask } from "../hooks/task.mutations";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditProps {
  task: Task;
  onEditSuccess: () => void;
}

const EditTask = ({ task, onEditSuccess }: EditProps) => {
  const putTaskMutation = usePutTask();
  const modalRef = useRef<HTMLDivElement>(null);
  const { register, handleSubmit } = useForm<Task>({
    defaultValues: task,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onEditSuccess();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onEditSuccess]);

  const onSubmit = async (data: Task) => {
    try {
      await putTaskMutation.mutateAsync(data);
      onEditSuccess();
      toast.success(`Tarea actualizada con éxito!`);
    } catch (error) {
      toast.error("Ha ocurrido un error!");
    }
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="w-full max-w-md" ref={modalRef}>
          <form
            onSubmit={handleSubmit(onSubmit)}
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
                id="title"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Ingresa el título de la tarea"
                {...register("title")}
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
                  id="statusTask"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...register("statusTask")}
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
                  id="autor"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Carlos"
                  {...register("autor")}
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
                  id="startDate"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  {...register("startDate")}
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
                  id="endDate"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="date"
                  {...register("endDate")}
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
                id="description"
                required
                className="shadow appearance-none border h-[7rem] resize-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Agrega una descripción para la tarea..."
                {...register("description")}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-slate-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default EditTask;
