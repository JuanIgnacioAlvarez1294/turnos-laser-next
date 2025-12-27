// src/services/turnos.service.ts
import { db } from "@/lib/firebaseConfig";
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
import { CreateTurnoInput, EstadoPago, Turno } from "@/types";
import { Timestamp } from "firebase/firestore";

/* ==============================
   SERVICIOS
============================== */

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
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as any),
  }));
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
  return snap.docs.map((d) => ({
    ...(d.data() as Turno),
    turnoId: d.id,
  }));
};

/* ---------------------------------------------
   OBTENER TURNO POR ID (ID REAL)
---------------------------------------------- */
export const getTurnoById = async (
  turnoId: string
): Promise<Turno | null> => {
  if (!turnoId) throw new Error("ID no proporcionado");

  const ref = doc(db, "turnos", turnoId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data() as Turno;

  return {
    ...data,
    turnoId: snap.id,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : data.createdAt,
  };
};
/* ---------------------------------------------
   CREAR TURNO (ID AUTOMÁTICO 🔥)
---------------------------------------------- */

export const createTurno = async (
  data: CreateTurnoInput & { pago: EstadoPago}
): Promise<string> => {
  // 🔥 Firebase genera el ID
  const ref = doc(collection(db, "turnos"));

  const turno: Turno = {
    turnoId: ref.id,

    userId: "public",
    sucursal: "principal",

    nombre: data.nombre,
    apellido: data.apellido,
    telefono: data.telefono,
    emailContacto: data.emailContacto,

    servicioId: data.servicioId,
    fecha: data.fecha,
    hora: data.hora,

    estado: "pendiente",
    pago: data.pago,

    createdAt: new Date(),
  };

  await setDoc(ref, turno);
  return ref.id;
};

/* ---------------------------------------------
   ACTUALIZAR TURNO
---------------------------------------------- */

export const updateTurno = async (
  turnoId: string,
  data: Partial<Turno>
) => {
  const ref = doc(db, "turnos", turnoId);
  return await updateDoc(ref, data);
};

/* ---------------------------------------------
   ELIMINAR TURNO
---------------------------------------------- */

export const deleteTurno = async (turnoId: string) => {
  const ref = doc(db, "turnos", turnoId);
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
  return snap.docs.map((d) => ({
    ...(d.data() as Turno),
    turnoId: d.id,
  }));
};

/* ---------------------------------------------
   MAPA DE SERVICIOS
---------------------------------------------- */

export const getServiciosMap = async () => {
  const snap = await getDocs(collection(db, "servicios"));
  const map: Record<string, string> = {};

  snap.docs.forEach((d) => {
    const data = d.data() as ServicioFromDB;
    map[d.id] = data.nombre;
  });

  return map;
};