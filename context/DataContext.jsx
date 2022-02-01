import { createContext, useEffect, useState } from "react";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
export const DataContext = createContext();

export default function DataProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  // addTask : used to add a new document to the collection
  const addTask = (newTask) => addDoc(collection(db, "tasks"), newTask);

  // updateTask : used to update a document in the collection
  const updateTask = (id, updatedTask) =>
    updateDoc(doc(db, "tasks", id), updatedTask);

  // deleteTask : used to delete a document from the collection
  const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

  // onSnapshot : used to listen to changes in the collection
  const onSnapshotTasks = () =>
    onSnapshot(collection(db, "tasks"), (querySnapshot) => {
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasks);
    });

  // Ejecuta la función onSnapshotTasks() cuando el componente se monta
  useEffect(onSnapshotTasks, []);

  return (
    <DataContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </DataContext.Provider>
  );
}
