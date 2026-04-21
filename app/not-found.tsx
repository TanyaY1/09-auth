import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found | NoteHub',
  description: 'This page does not exist',
  openGraph: {
    title: 'Page not found | NoteHub',
    description: 'This page does not exist',
    url: 'https://notehub.app/404',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function NotFound() {
  return <h1>404 - Page not found</h1>;
}