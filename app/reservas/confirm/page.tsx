import { Suspense } from 'react';
import ConfirmClient from './ConfirmClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Cargando...</div>}>
      <ConfirmClient />
    </Suspense>
  );
}