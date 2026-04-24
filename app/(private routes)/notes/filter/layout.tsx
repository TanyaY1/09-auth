import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <>
      {sidebar}
      {children}
    </>
  );
}