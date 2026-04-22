'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import type { Note } from '@/types/note';

type Props = {
  tag?: string;
};

type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, debouncedSearch, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
        tag,
      }),
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data && page < data.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <main>
      <div>
        <Link href="/notes/action/create">Create note +</Link>
      </div>

      <div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search notes"
        />
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong while loading notes.</p>}

      {!isLoading && !isError && data?.notes?.length === 0 && <p>No notes found.</p>}

      {data?.notes?.length ? (
        <ul>
          {data.notes.map((note: Note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <p>{note.tag}</p>
              <Link href={`/notes/${note.id}`}>Open note</Link>
            </li>
          ))}
        </ul>
      ) : null}

      {data && data.totalPages > 1 && (
        <div>
          <button type="button" onClick={handlePrevPage} disabled={page === 1}>
            Prev
          </button>

          <span>
            Page {page} of {data.totalPages}
          </span>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={page === data.totalPages}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}