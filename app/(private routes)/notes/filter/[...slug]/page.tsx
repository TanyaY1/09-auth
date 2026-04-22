import type { Metadata } from 'next';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const filter = params.slug?.join('/') || 'all';

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

export default function FilteredNotesPage() {
  return <div>Filtered notes page</div>;
}