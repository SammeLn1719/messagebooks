"use client";

import { useState, FormEvent, ChangeEvent } from 'react';
import type { AxiosError } from 'axios';
import bcrypt from 'bcryptjs';

interface RegisterResponse {
  message: string;
  // Добавьте другие поля ответа по необходимости
}

interface ErrorResponse {
  message: string;
}

export default function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Хеширование пароля (рекомендуется делать на сервере!)
      const hashedPassword = bcrypt.hashSync(password, 10);

      const response = await axios.post<RegisterResponse>('https://your-api.com/api/auth/register',
        {
          email,
          password: hashedPassword,
        }
      );

      console.log('Успешная регистрация:', response.data);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response) {
        console.error('Ошибка регистрации:', axiosError.response.data.message);
      } else {
        console.error('Неизвестная ошибка:', axiosError.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl mb-4">Регистрация</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="mb-4 p-2 w-full border rounded"
          required
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
          className="mb-4 p-2 w-full border rounded"
          required
          minLength={6}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}
