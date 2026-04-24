'use client';

import type { ReactNode } from 'react';
import { useEffect, useState, startTransition } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    router.refresh();

    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}