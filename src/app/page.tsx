import { Suspense } from 'react';
import MainContent from '@/components/MainContent';

interface PageProps {
  searchParams: Promise<{ guest?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const guestName = params.guest;

  return (
    <Suspense>
      <MainContent guestName={guestName} />
    </Suspense>
  );
}
