import { db } from "../firebase/config";
import {
  doc,
  collection,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

// 🔹 Create or Overwrite a Project
export const addProject = async (pid, data) => {
  try {
    const ref = doc(db, "Projects", pid); // Consistent lowercase
    await setDoc(ref, data);
    return pid; // Return the project ID
  } catch (error) {
    console.error("Error adding project:", error);
    throw error;
  }
};

// 🔹 Get all projects 
export const getAllProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Projects'));
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
  } catch (error) {
    console.error("Error getting projects:", error);
    throw error;
  }
};

// 🔹 Read a Project
export const getProject = async (pid) => {
  try {
    const ref = doc(db, "Projects", pid); // Consistent lowercase
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null; // Consistent return format
  } catch (error) {
    console.error("Error getting project:", error);
    throw error;
  }
};

//get last project ID
export const getProjectsCount = async () => {
  try {
    const snapshot = await db.collection('projects').count().get();
    return snapshot.data().count;
  } catch (error) {
    console.error("Error getting project count:", error);
    throw error; // This will trigger the fallback
  }
};
// 🔹 Update a Project
export const updateProject = async (pid, updates) => {
  try {
    const ref = doc(db, "Projects", pid); // Consistent lowercase
    await updateDoc(ref, updates);
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// 🔹 Delete a Project
export const deleteProject = async (pid) => {
  try {
    const ref = doc(db, "Projects", pid); // Consistent lowercase
    await deleteDoc(ref);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
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

//----------------------------------------------------------------Admin--------------------------------------
export async function verifyAdminCredentials(Name, Password) {
  // Validate inputs
  if (typeof Name !== 'string' || typeof Password !== 'string') {
    throw new Error('Invalid input types - both Name and Password must be strings');
  }

  const q = query(
    collection(db, "Admins"),
    where("Name", "==", Name),
    where("Password", "==", Password)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
}