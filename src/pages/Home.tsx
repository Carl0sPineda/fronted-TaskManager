import Card from "../components/Card";
import AddTask from "../components/AddTask";
import {
  useTaskCompleted,
  useTaskPostponed,
  useTaskProgress,
} from "../hooks/task.queries";

interface HomeProps {
  searchTerm: string;
}

const Home = ({ searchTerm }: HomeProps) => {
  const { data: completed } = useTaskCompleted();
  const { data: progress } = useTaskProgress();
  const { data: postponed } = useTaskPostponed();

  const filteredCompleted = completed?.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const taskInProgress = progress?.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredPosponed = postponed?.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="px-10 mt-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Lista de actividades</h1>
        <AddTask />
      </div>
      <div className="flex flex-grow px-10 mt-4 space-x-6 ">
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Pendiente</span>
          </div>
          {taskInProgress?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">En proceso</span>
          </div>
          {taskInProgress?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Completado</span>
          </div>
          {filteredCompleted?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
        <div className="flex flex-col flex-shrink-0 w-72">
          <div className="flex items-center flex-shrink-0 h-10 px-2">
            <span className="block text-sm font-semibold">Postergado</span>
          </div>
          {filteredPosponed?.map((task) => (
            <Card key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
