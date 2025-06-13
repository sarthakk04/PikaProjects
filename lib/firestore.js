import { db } from "../firebase/config";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

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

//----------------------------- Buyers ----------------------------------

// 🔹 Get all buyers
export const getAllBuyers = async () => {
  const snapshot = await getDocs(collection(db, "Buyers"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// 🔹 Get buyer by email
export const getBuyerByEmail = async (email) => {
  const buyers = await getAllBuyers();
  return buyers.find((b) => b.b_email === email);
};

// 🔹 Get next buyer ID
export const getNextBuyerId = async () => {
  const buyers = await getAllBuyers();
  const count = buyers.length;
  const nextNum = count + 1;
  return `B${String(nextNum).padStart(3, "0")}`;
};

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

// 🔹 Update a Buyer
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
