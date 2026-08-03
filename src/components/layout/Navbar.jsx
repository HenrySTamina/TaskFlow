import { Bell, Menu, Search } from 'lucide-react'
import { getInitials } from '../../utils/profile'

function Navbar({
  searchTerm,
  displayName,
  onOpenMenu,
  onSearchChange,
}) {
  return (
    <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menú lateral"
          className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Panel principal
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            Administra tus actividades y avances
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="order-3 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:order-none md:w-auto">
          <Search size={18} className="text-slate-400" />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar tareas..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 md:w-48"
          />
        </label>

        <button
          type="button"
          aria-label="Ver notificaciones"
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          {getInitials(displayName)}code src\pages\Dashboard.jsx
        </div>
      </div>
    </header>
  )
}

export default Navbar
