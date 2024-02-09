import { Task } from "../interfaces/task.interface";
import { useDeleteTask } from "../hooks/task.mutations";
import avatar from "../assets/avatar.svg";
import ModalSvg from "../assets/ModalSvg";
import formatDate from "../utils/DateFormat";

interface TaskCardProps {
  task: Task;
}

const Card = ({ task }: TaskCardProps) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = async () => {
    try {
      await deleteTaskMutation.mutateAsync(task.id);
      console.log("Tarea eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div className="flex flex-col pb-2 overflow-auto">
      <div className="relative h-[9rem] flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100">
        <button
          className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex "
          aria-label="Acciones"
          onClick={handleDeleteTask}
        >
          <ModalSvg />
        </button>
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full ${
            task.statusTask === "completado"
              ? "text-red-500 bg-red-100"
              : task.statusTask === "en progreso"
              ? "text-green-500 bg-green-100"
              : task.statusTask === "postergado"
              ? "text-blue-500 bg-blue-100"
              : "text-black bg-gray-200"
          }`}
        >
          {task.statusTask}
        </span>

        <h4 className="mt-3 text-sm font-medium">{task.description}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {formatDate(task.startDate)}
            </span>
          </div>
          <div className="relative flex items-center ml-4">
            <svg
              className="relative w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {formatDate(task.endDate)}
            </span>
          </div>
          <img
            className="w-6 h-6 ml-auto rounded-full"
            src={avatar}
            alt="avatar.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
