import { useEffect, useState } from "react";
import { db } from "@/lib/firestore";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { Turno } from "@/types";

const useTurnos = () => {
  const [turnos, setTurnos] = useState<Turno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const turnosRef = collection(db, "turnos");

  // Escuchar en tiempo real
  useEffect(() => {
    const q = query(turnosRef);

    const unsub = onSnapshot(
      q,
      (snap) => {
        const data: Turno[] = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Turno),
        }));

        setTurnos(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  // Crear
  const createTurno = async (turno: Turno) => {
    try {
      await addDoc(turnosRef, turno);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Actualizar
  const updateTurno = async (id: string, turno: Partial<Turno>) => {
    try {
      await updateDoc(doc(db, "turnos", id), turno);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Eliminar
  const deleteTurno = async (id: string) => {
    try {
      await deleteDoc(doc(db, "turnos", id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    turnos,
    loading,
    error,
    createTurno,
    updateTurno,
    deleteTurno,
  };
};

export default useTurnos;