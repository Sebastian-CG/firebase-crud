import { createContext, useContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { AuthContext } from "./AuthContext";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const userUID = user?.uid || "no user";

  // addTask : used to add a new document to the collection
  const addTask = (newTask) => addDoc(collection(db, userUID), newTask);

  // updateTask : used to update a document in the collection
  const updateTask = (id, updatedTask) =>
    updateDoc(doc(db, userUID, id), updatedTask);

  // deleteTask : used to delete a document from the collection
  const deleteTask = (id) => deleteDoc(doc(db, userUID, id));

  // onSnapshot : used to listen to changes in the collection
  const onSnapshotNotes = () => {
    console.log("---------------------------");
    console.log("onSnapshotNotes");
    console.log("---------------------------");

    onSnapshot(collection(db, userUID), (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasks);
    });
  };

  useEffect(() => {
    onSnapshotNotes();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        onSnapshotNotes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
