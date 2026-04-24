'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api/clientApi';

type Props = {
  id: string;
};

export default function NoteDetailsClient({ id }: Props) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data) return <p>Note not found.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
      <p>{data.tag}</p>
    </div>
  );
}