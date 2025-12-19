/* ==============================
   ESTADOS
============================== */

export type EstadoTurno =
  | "pendiente"
  | "reservado"
  | "cancelado"
  | "completado"
  | 'confirmado';

export type EstadoPago = 'pendiente' | 'sena' | 'total';

/* ==============================
   TURNO (MODELO COMPLETO – ADMIN)
============================== */

export interface Turno {
  turnoId: string;

  // Relación / sistema
  userId: string;              // "public" para reservas web
  sucursal: string;            // "principal"
  createdAt?: Date;

  // Cliente
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  emailContacto: string;

  // Reserva
  servicioId: string;
  fecha: string;               // YYYY-MM-DD
  hora: string;                // HH:mm
  tiempoEstimado: string;      // "30"

  // Estados
  estado: 'pendiente' | 'reservado' | 'completado' | 'cancelado';
  pago: EstadoPago;
}

/* ==============================
   INPUT PARA CREAR TURNO (WEB)
============================== */

export interface CreateTurnoInput {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  emailContacto: string;

  servicioId: string;
  fecha: string;
  hora: string;

  estado: EstadoTurno;
  pago: EstadoPago;
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