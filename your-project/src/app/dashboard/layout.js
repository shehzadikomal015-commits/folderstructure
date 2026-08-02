export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <aside className="w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Dashboard</h2>
        </div>
        <nav className="flex flex-col gap-1 p-2">
          <a href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Overview</a>
          <a href="/dashboard/orders" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Orders</a>
          <a href="/dashboard/customers" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Customers</a>
          <a href="/dashboard/products" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Products</a>
          <a href="/dashboard/problems" className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">Problems</a>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
