'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

type Props = {
  children: ReactNode;
};

const privateRoutes = ['/profile', '/notes'];

export default function AuthProvider({ children }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route)
      );

      try {
        await checkSession();

        const user = await getMe();
        setUser(user);
      } catch {
        clearIsAuthenticated();

        if (isPrivateRoute) {
          router.push('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) {
    return <p>Loading, please wait...</p>;
  }

  return <>{children}</>;
}