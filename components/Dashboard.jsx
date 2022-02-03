import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Note from "./Note";

export default function Dashboard() {
  const { tasks } = useContext(DataContext);

  return (
    <ul className="gap-4 mb-5 columns-1 sm:columns-2 md:columns-3">
      {tasks.map((task) => (
        <Note key={task.id} {...task} />
      ))}
    </ul>
  );
}
