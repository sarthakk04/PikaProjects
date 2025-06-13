import { db } from "../firebase/config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// 🔹 Create or Overwrite a Project
export const addProject = async (pid, data) => {
  const ref = doc(db, "Projects", pid);
  await setDoc(ref, data);
};

// 🔹 Read a Project
export const getProject = async (pid) => {
  const ref = doc(db, "Projects", pid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// 🔹 Update a Project (only specified fields)
export const updateProject = async (pid, updates) => {
  const ref = doc(db, "Projects", pid);
  await updateDoc(ref, updates);
};

// 🔹 Delete a Project
export const deleteProject = async (pid) => {
  const ref = doc(db, "Projects", pid);
  await deleteDoc(ref);
};



//----------------------------------Buyers----------------------------------------------

// 🔹 Create or Overwrite a Buyer
export const addBuyer = async (bid, data) => {
  const ref = doc(db, "Buyers", bid);
  await setDoc(ref, data);
};

// 🔹 Read a Buyer
export const getBuyer = async (bid) => {
  const ref = doc(db, "Buyers", bid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// 🔹 Update a Buyer (only specified fields)
export const updateBuyer = async (bid, updates) => {
  const ref = doc(db, "Buyers", bid);
  await updateDoc(ref, updates);
};

// 🔹 Delete a Buyer
export const deleteBuyer = async (bid) => {
  const ref = doc(db, "Buyers", bid);
  await deleteDoc(ref);
};







//----------------------------------Sellers----------------------------------------------

// 🔹 Create or Overwrite a Seller
export const addSeller = async (sid, data) => {
  const ref = doc(db, "Sellers", sid);
  await setDoc(ref, data);
};

// 🔹 Read a Seller
export const getSeller = async (sid) => {
  const ref = doc(db, "Sellers", sid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

// 🔹 Update a Seller (only specified fields)
export const updateSeller = async (sid, updates) => {
  const ref = doc(db, "Sellers", sid);
  await updateDoc(ref, updates);
};

// 🔹 Delete a Seller
export const deleteSeller = async (sid) => {
  const ref = doc(db, "Sellers", sid);
  await deleteDoc(ref);
};

