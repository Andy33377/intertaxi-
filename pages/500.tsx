export default function Error500() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-2xl font-bold mb-2">Ошибка сервера</h1>
        <p className="text-slate-600">
          Мы уже работаем над проблемой. Попробуйте позже.
        </p>
      </div>
    </div>
  );
}
