const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError('')

  try {
    console.log('Sending login request...') // Логирование

    const res = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    console.log('Response status:', res.status) // Логирование

    if (!res.ok) {
      const text = await res.text()
      console.error('Error response:', text) // Логирование сырого ответа
      throw new Error(text || 'Login failed')
    }

    const data = await res.json()
    console.log('Success:', data) // Логирование успешного ответа

    router.refresh()
    router.push('/')
  } catch (err) {
    console.error('Login error:', err) // Логирование ошибки
    setError(err instanceof Error ? err.message : 'Login failed')
  }
}
