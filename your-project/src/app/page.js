export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-zinc-900 dark:text-zinc-50">Welcome</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">Get started by logging in or visiting the dashboard.</p>
        <div className="mt-8 flex gap-4 justify-center">
          <a
            href="/login"
            className="rounded-md bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Login
          </a>
          <a
            href="/dashboard"
            className="rounded-md border border-zinc-300 px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
