import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchServerNotes } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  const title = `Notes: ${filter} | NoteHub`;
  const description = `Viewing notes filtered by ${filter}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.app/notes/filter/${filter}`,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function FilteredNotesPage({ params }: Props) {
  const { slug } = await params;
  const filter = slug?.[0] ?? 'all';

  const tag = filter === 'all' ? undefined : filter;

  const data = await fetchServerNotes({
    page: 1,
    perPage: 12,
    tag,
  });

  return (
    <main>
      <h1>{filter === 'all' ? 'All notes' : `${filter} notes`}</h1>

      <Link href="/notes/action/create">Create note +</Link>

      {data.notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {data.notes.map((note) => (
            <li key={note.id}>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <p>{note.tag}</p>
              <Link href={`/notes/${note.id}`}>Open note</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}