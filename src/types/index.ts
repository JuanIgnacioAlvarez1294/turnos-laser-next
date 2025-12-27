
export type EstadoTurno =
  | "pendiente"
  | "confirmado"
  | "cancelado"
  | "completado";

export type EstadoPago = "pendiente" | "sena" | "total";

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

export interface CreateTurnoInput {
  nombre: string;
  apellido: string;
  telefono: string;
  emailContacto: string;

  servicioId: string;
  fecha: string;
  hora: string;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  promo?: boolean;
}