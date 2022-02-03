import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import useToggle from "../hooks/useToggle";
import DataProvider from "../context/DataContext";
import Dashboard from "../components/Dashboard";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";
import { FaPlus } from "react-icons/fa";

export default function index() {
  const [visibleModal, toggleModal] = useToggle();
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user && router.pathname === "/login") router.push("/");
    if (!user) router.push("/login");
  }, []);

  return (
    <DataProvider>
      <div>
        {visibleModal && (
          <Modal closeModal={toggleModal}>
            <TaskForm closeModal={toggleModal} />
          </Modal>
        )}
        <div className="relative w-full max-w-4xl min-h-screen p-4 m-auto">
          <Dashboard />

          <button
            title="Create new Note"
            onClick={toggleModal}
            className="sticky flex items-center gap-3 px-4 py-2 text-white bg-blue-500 rounded-full shadow-lg shadow-blue-300 bottom-3 left-3"
          >
            <FaPlus />
            <span className="font-semibold">Create new note</span>
          </button>
        </div>
      </div>
    </DataProvider>
  );
}
