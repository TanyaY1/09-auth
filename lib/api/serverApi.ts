import { cookies } from 'next/headers';
import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchServerNotes = async (params: FetchNotesParams) => {
  const cookieStore = await cookies();

  const res = await nextServer.get('/notes', {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return res.data;
};