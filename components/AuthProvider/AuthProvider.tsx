'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

interface Props {
  children: ReactNode;
}

const privateRoutes = ['/profile', '/notes'];

const AuthProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
        const session = await checkSession();

        if (session) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();

          if (isPrivate) {
            router.push('/sign-in');
            return;
          }
        }
      } catch {
        clearIsAuthenticated();

        if (privateRoutes.some((route) => pathname.startsWith(route))) {
          router.push('/sign-in');
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AuthProvider;