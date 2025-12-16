// src/services/turnos.service.ts
import { db } from "@/lib/firestore";
import {
  collection,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { CreateTurnoInput, Turno } from "@/types";

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

export const getServicioById = async (id: string) => {
  const ref = doc(db, "servicios", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return {
    id: snap.id,
    ...(snap.data() as any),
  };
};


/* ---------------------------------------------
   OBTENER TODOS LOS TURNOS
---------------------------------------------- */
export const getTurnos = async (): Promise<Turno[]> => {
  const snap = await getDocs(collection(db, "turnos"));
  return snap.docs.map((d) => {
    const data = d.data() as Turno;
    return {
      ...data,
      turnoId: d.id // fuerza a usar el ID del documento
    };
  });
};

/* ---------------------------------------------
   OBTENER UN TURNO POR ID
---------------------------------------------- */
export const getTurnoById = async (id: string): Promise<Turno | null> => {
  const safeId = id.includes("%40") ? id : encodeURIComponent(id.toLowerCase());
  const ref = doc(db, "turnos", safeId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  return snap.data() as Turno;
};

/* ---------------------------------------------
   CREAR TURNO (email como ID del documento)
---------------------------------------------- */
export const createTurno = async (
  data: CreateTurnoInput
): Promise<string> => {
  const id = encodeURIComponent(data.email.toLowerCase());

  const ref = doc(db, "turnos", id);

  const turno: Turno = {
    turnoId: id,
    userId: "public",
    sucursal: "principal",
    tiempoEstimado: "30",
    createdAt: new Date(),

    ...data,
  };

  await setDoc(ref, turno);
  return id;
};

/* ---------------------------------------------
   ACTUALIZAR TURNO
---------------------------------------------- */
export const updateTurno = async (id: string, data: Partial<Turno>) => {
  const safeId = id.includes('%40') ? id : encodeURIComponent(id.toLowerCase());
  const ref = doc(db, "turnos", safeId);
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

export const getServiciosMap = async () => {
  const snap = await getDocs(collection(db, "servicios"));
  const map: Record<string, string> = {};

  snap.docs.forEach((d) => {
    const data = d.data() as ServicioFromDB;
    map[d.id] = data.nombre;
  });

  return map;
};