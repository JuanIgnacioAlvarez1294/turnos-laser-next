import { NextResponse } from 'next/server';
import { getServicioById } from '@/services/turnos.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: 'Falta id del servicio' },
      { status: 400 }
    );
  }

  const servicio = await getServicioById(id);

  if (!servicio) {
    return NextResponse.json(
      { error: 'Servicio no encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    nombre: servicio.nombre,
    precio: servicio.precio,
  });
}
