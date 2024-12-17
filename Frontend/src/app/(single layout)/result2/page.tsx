'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Res2 = dynamic(() => import('./res2Component'), { ssr: false });

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Res2 />
    </Suspense>
  );
}
