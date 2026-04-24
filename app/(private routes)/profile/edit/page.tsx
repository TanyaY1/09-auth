'use client';

import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const EditProfilePage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      setUsername(user.username);
      setEmail(user.email);
      setAvatar(user.avatar);
      setUser(user);
    };

    fetchUser();
  }, [setUser]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser = await updateMe({ username });
    setUser(updatedUser);

    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {avatar && (
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={handleChange}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;