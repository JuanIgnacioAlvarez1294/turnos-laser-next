import { Turno } from "@/types";

interface Props {
  turno?: Turno;
  servicios: { id: string; nombre: string }[];
  onSubmit: (data: Turno) => void;
}

export default function TurnoForm({ turno, servicios, onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (turno) onSubmit(turno);
      }}
    >
      <select>
        {servicios.map((srv: { id: string; nombre: string }) => (
          <option key={srv.id} value={srv.id}>
            {srv.nombre}
          </option>
        ))}
      </select>
    </form>
  );
}