'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
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

  const handleSearchChange = (value: string): void => {
    setSearch(value);
    setPage(1);
  };

  const handlePageChange = (selectedPage: number): void => {
    setPage(selectedPage);
  };

  return (
    <main>
      <div>
        <Link href="/notes/action/create">Create note +</Link>
        <SearchBox value={search} onChange={handleSearchChange} />
      </div>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Something went wrong while loading notes.</p>}

      {!isLoading && !isError && data?.notes.length === 0 && (
        <p>No notes found.</p>
      )}

      {data?.notes.length ? <NoteList notes={data.notes} /> : null}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
}