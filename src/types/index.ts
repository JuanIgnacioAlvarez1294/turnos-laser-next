export type EstadoTurno =
  | "pendiente"
  | "reservado"
  | "cancelado"
  | "completado";

export type EstadoPago = "pendiente" | "aprobado";

export interface Turno {
  turnoId: string;
  userId: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;

  servicioId: string;
  fecha: string;
  hora: string;

  estado: EstadoTurno;
  sucursal: string;
  pago: EstadoPago;

  tiempoEstimado: string;
  emailContacto: string; 
  createdAt?: Date;
}

export interface Servicio {
  id: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
  promo?: boolean;
}