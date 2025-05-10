import LoginForm from "@/presentation/components/LoginForm";


export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Вход в систему</h1>
        <LoginForm />
      </div>
    </div>
  )
}
