import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create note | NoteHub',
  description: 'Create a new note',
};

export default function CreateNotePage() {
  return (
    <main>
      <h1>Create note</h1>

      <form>
        <input placeholder="Title" />
        <textarea placeholder="Content" />
        <input placeholder="Tag" />

        <button type="submit">Create</button>
      </form>
    </main>
  );
}