/* ==============================
   ESTADOS
============================== */

export type EstadoTurno =
  | "pendiente"
  | "confirmado"
  | "cancelado"
  | "completado";

export type EstadoPago = "pendiente" | "sena" | "total";

/* ==============================
   TURNO (MODELO COMPLETO – DB)
============================== */

export interface Turno {
  turnoId: string;

  userId: string;
  sucursal: string;

  nombre: string;
  apellido: string;
  telefono: string;
  emailContacto: string;

  servicioId: string;
  fecha: string;
  hora: string;

  estado: EstadoTurno;
  pago: EstadoPago;

  montoTotal?: number;
  montoPagado?: number;
  metodoPago?: string;

  tiempoEstimado?: string;
  createdAt: Date;
}

/* ==============================
   INPUT PARA CREAR TURNO (FORM)
============================== */

export interface CreateTurnoInput {
  nombre: string;
  apellido: string;
  telefono: string;
  emailContacto: string;

  servicioId: string;
  fecha: string;
  hora: string;
}

/* ==============================
   SERVICIOS
============================== */

export interface Servicio {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  promo?: boolean;
}