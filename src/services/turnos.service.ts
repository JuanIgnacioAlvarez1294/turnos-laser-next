// src/services/turnos.service.ts
import { db } from "@/lib/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { Turno } from "@/types";

// Tipo de servicios (promociones)
export type ServicioFromDB = {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  promo?: boolean;
};

/* ---------------------------------------------
   OBTENER SERVICIOS
---------------------------------------------- */
export const getServicios = async (): Promise<ServicioFromDB[]> => {
  const snap = await getDocs(collection(db, "servicios"));
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
};

/* ---------------------------------------------
   OBTENER TODOS LOS TURNOS
---------------------------------------------- */
export const getTurnos = async (): Promise<Turno[]> => {
  const snap = await getDocs(collection(db, "turnos"));
  return snap.docs.map((d) => ({ ...(d.data() as Turno) }));
};

/* ---------------------------------------------
   OBTENER UN TURNO POR ID
---------------------------------------------- */
export const getTurnoById = async (id: string): Promise<Turno | null> => {
  const ref = doc(db, "turnos", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return snap.data() as Turno;
};

/* ---------------------------------------------
   CREAR TURNO (Firestore genera turnoId)
---------------------------------------------- */
export const createTurno = async (
  turno: Omit<Turno, "turnoId">
): Promise<string> => {
  const docRef = await addDoc(collection(db, "turnos"), turno);

  // Usamos el ID generado para almacenarlo dentro del documento
  await updateDoc(docRef, { turnoId: docRef.id });

  return docRef.id;
};

/* ---------------------------------------------
   ACTUALIZAR TURNO
---------------------------------------------- */
export const updateTurno = async (id: string, data: Partial<Turno>) => {
  const ref = doc(db, "turnos", id);
  return await updateDoc(ref, data);
};

/* ---------------------------------------------
   ELIMINAR TURNO
---------------------------------------------- */
export const deleteTurno = async (id: string) => {
  const ref = doc(db, "turnos", id);
  return await deleteDoc(ref);
};

/* ---------------------------------------------
   OBTENER TURNOS POR FECHA
---------------------------------------------- */
export const getTurnosByFecha = async (
  fecha: string
): Promise<Turno[]> => {
  const q = query(collection(db, "turnos"), where("fecha", "==", fecha));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...(d.data() as Turno) }));
};