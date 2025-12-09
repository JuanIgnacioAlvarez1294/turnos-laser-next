import { db } from "@/lib/firestore";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const getServicios = async () => {
  const snap = await getDocs(collection(db, "servicios"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const createServicio = async (data: any) => {
  return await addDoc(collection(db, "servicios"), data);
};

export const updateServicio = async (id: string, data: any) => {
  return await updateDoc(doc(db, "servicios", id), data);
};

export const deleteServicio = async (id: string) => {
  return await deleteDoc(doc(db, "servicios", id));
};