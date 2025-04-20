"use client";

import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface LoginResponse {
  id: string;
  // Добавьте другие поля ответа по необходимости
}

const handleLogin = async (e: FormEvent<HTMLFormElement>, email: string, password: string) => {
  e.preventDefault();
  
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LoginResponse = await response.json();
    Cookies.set('userId', data.id);
    
    const router = useRouter();
    router.push('/dashboard');

  } catch (error) {
    console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
    // Добавьте обработку ошибок (например, показ сообщения пользователю)
  }
};