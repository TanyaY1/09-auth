import { nextServer } from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

interface AuthRequest {
  email: string;
  password: string;
}

interface UpdateUserRequest {
  username?: string;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

export const register = async (data: AuthRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: AuthRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await nextServer.get('/auth/session');
  return res.data;
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: UpdateUserRequest): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (params: FetchNotesParams) => {
  const res = await nextServer.get('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const res = await nextServer.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await nextServer.delete(`/notes/${id}`);
  return res.data;
};