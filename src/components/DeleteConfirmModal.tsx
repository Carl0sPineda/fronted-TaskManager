import { useDeleteTask } from "../hooks/task.mutations";
import toast from "react-hot-toast";
import deleteSvg from "../assets/delete.svg";

interface DeleteConfirmationModalProps {
  taskId: number;
  onClose: () => void;
}

const DeleteConfirmationModal = ({
  taskId,
  onClose,
}: DeleteConfirmationModalProps) => {
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = async () => {
    try {
      await deleteTaskMutation.mutateAsync(taskId);
      toast.success("Tarea eliminado con éxito!!");
      onClose();
    } catch (error) {
      toast.error("Error al eliminar la tarea:");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-25 flex justify-center items-center">
      <div className="bg-white p-7 rounded-lg shadow-lg">
        <img
          src={deleteSvg}
          className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          alt="delete.svg"
          loading="lazy"
        />
        <span className="font-2xl font-semibold">
          ¿Estás seguro de que deseas eliminar esta tarea?
        </span>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 font-bold text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleDeleteTask}
            className="px-4 py-2 bg-red-600 font-bold text-white rounded-lg hover:bg-red-700"
          >
            Sí, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
