import { Suspense } from 'react';
import Step2Client from './Step2Client';

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Cargando...</div>}>
      <Step2Client />
    </Suspense>
  );
}
