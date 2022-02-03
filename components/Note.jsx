import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import useToggle from "../hooks/useToggle";
import TaskFrom from "./TaskForm";
import Modal from "./Modal";

import { FaTrash, FaPen } from "react-icons/fa";

export default function Note(task) {
  const { deleteTask, onSnapshot } = useContext(DataContext);
  const [visibleModal, toggleModal] = useToggle();

  const handleDeleteTask = () => {
    try {
      deleteTask(task.id);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <>
      {visibleModal && (
        <Modal closeModal={toggleModal}>
          <TaskFrom noteToEdit={task} closeModal={toggleModal} />
        </Modal>
      )}

      <li className="inline-flex relative w-full p-4 mb-3 overflow-auto rounded-lg shadow-lg border-[1px] border-slate-300 bg-slate-50 shadow-slate-300">
        <div className="w-full">
          <button
            title="Edit"
            onClick={toggleModal}
            className="absolute p-2 text-xs uppercase text-slate-700 right-1 top-1"
          >
            <FaPen />
          </button>
          <h1 className="text-lg font-semibold text-slate-600">{task.title}</h1>
          <p className="text-slate-400">{task.description}</p>
          {/* <span className="block text-xs">ID: {task.id}</span> */}

          <div className="flex justify-between w-full pt-2 mt-3 border-t-[1px] border-slate-300">
            <div className="flex items-center px-2 py-1 rounded-md bg-slate-200">
              <span className="block text-[8px] hover:text-xs transition-all">
                {task.creationDate}
              </span>
            </div>

            <div className="flex gap-1">
              <button
                title="Delete"
                className="flex items-center gap-[5px] p-2 text-xs text-white bg-red-400 rounded-lg"
                onClick={handleDeleteTask}
              >
                <FaTrash />
                <span className="font-semibold uppercase">delete</span>
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
