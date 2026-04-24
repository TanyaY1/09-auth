import type { ReactNode } from 'react';
import './globals.css';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function RootLayout({ children, modal }: Props) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <AuthProvider>
            {children}
            {modal}
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}