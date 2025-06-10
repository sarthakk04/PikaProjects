// CRUD functions (projects, users, etc.)

// lib/firestore.js
import { db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const addProject = async (pid, data) => {
  const ref = doc(db, "Projects", pid);
  await setDoc(ref, data);
};

export const getProject = async (pid) => {
  const ref = doc(db, "Projects", pid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};
