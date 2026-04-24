'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/clientApi';
import Modal from '@/components/Modal/Modal';

type Props = {
  id: string;
};

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <Modal onClose={handleClose}>
        <p>Loading...</p>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal onClose={handleClose}>
        <p>Error loading notes</p>
      </Modal>
    );
  }

  if (!data) {
    return (
      <Modal onClose={handleClose}>
        <p>No data</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClose}>
      <h2>{data.title}</h2>
      <p>{data.content}</p>
    </Modal>
  );
}