import { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import Button from "./Button";
import { FaSave } from "react-icons/fa";

export default function TaskForm({ noteToEdit, closeModal }) {
  const editMode = noteToEdit ? true : false;
  const { addTask, updateTask } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [currentTask, setCurrentTask] = useState({
    title: noteToEdit?.title || "",
    description: noteToEdit?.description || "",
  });

  const handleChange = ({ target: { name, value } }) =>
    setCurrentTask({ ...currentTask, [name]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newTask = {
      title: currentTask.title,
      description: currentTask.description,
      creationDate: new Date().toLocaleString(),
    };

    try {
      if (editMode) await updateTask(noteToEdit.id, newTask);
      else await addTask(newTask);
    } catch (error) {
      console.warn(error);
    }

    setLoading(false);
    closeModal();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-lg bg-slate-50 text-slate-900 w-80"
    >
      <label
        className="block font-semibold uppercase text-slate-300"
        htmlFor="title"
      >
        title
      </label>
      <input
        className="w-full p-3 mb-4 h-[3.125rem] rounded-lg border-[1px] border-slate-300 focus:border-blue-500 outline-none placeholder:text-slate-300"
        type="text"
        id="title"
        name="title"
        placeholder="..."
        value={currentTask.title}
        onChange={handleChange}
      />

      <label
        className="block font-semibold uppercase text-slate-300"
        htmlFor="description"
      >
        description
      </label>
      <textarea
        className="w-full h-20 p-3 rounded-lg border-[1px] resize-none border-slate-300 focus:border-blue-500 outline-none placeholder:text-slate-300"
        type="text"
        id="description"
        name="description"
        placeholder="..."
        value={currentTask.description}
        onChange={handleChange}
      />

      <div className="flex justify-end mt-3">
        <Button
          className="flex items-center justify-center h-10 gap-2 px-4 text-white bg-blue-500 rounded-lg"
          type="submit"
          loading={loading}
        >
          <FaSave />
          Save
        </Button>
      </div>
    </form>
  );
}
