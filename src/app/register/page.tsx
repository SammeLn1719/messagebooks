import RegisterForm from "@/presentation/components/RegisterForm";


export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Создайте аккаунт
          </h2>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
