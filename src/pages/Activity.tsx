import { PieChart, ResponsiveContainer, Pie, Tooltip, Cell } from "recharts";
import {
  useTaskCompleted,
  useTaskPostponed,
  useTaskProgress,
} from "../hooks/task.queries";

const COLORS = ["#ce93d8", "#F6F6F6", "#8785A2"];
// const COLORS = ["#8785A2", "#F6F6F6", "#FFE2E2"];

const Activity = () => {
  const { data: completed } = useTaskCompleted();
  const { data: progress } = useTaskProgress();
  const { data: postponed } = useTaskPostponed();

  const combinedData = [
    { name: "Completadas", value: completed?.length },
    { name: "En progreso", value: progress?.length },
    { name: "Pospuestas", value: postponed?.length },
  ];

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div>
        <h2 className="text-center text-2xl">Estadisticas de las tareas</h2>
      </div>

      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={combinedData}
            innerRadius={50}
            outerRadius={200}
            fill="#8884d8"
            label={{ fontWeight: "bold", fontSize: 20 }}
          >
            {combinedData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Activity;
