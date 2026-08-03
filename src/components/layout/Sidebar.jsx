import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  ListTodo,
  Settings,
  X,
} from 'lucide-react'

const menuItems = [
  {
    id: 'summary',
    label: 'Resumen',
    icon: LayoutDashboard,
  },
  {
    id: 'tasks',
    label: 'Mis tareas',
    icon: ListTodo,
  },
  {
    id: 'calendar',
    label: 'Calendario',
    icon: CalendarDays,
  },
  {
    id: 'statistics',
    label: 'Estadísticas',
    icon: BarChart3,
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: Settings,
  },
]

function Sidebar({
  isOpen,
  activeView,
  onClose,
  onNavigate,
}) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-200">
              TF
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                TaskFlow
              </h1>

              <p className="text-xs text-slate-500">
                Gestión de tareas
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar menú lateral"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          <p className="px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Menú principal
          </p>

          {menuItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeView === id

            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  onNavigate(id)
                  onClose()
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </button>
            )
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              HA
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                Henry Alvaro
              </p>

              <p className="truncate text-xs text-slate-500">
                Administrador
              </p>
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-slate-400">
            TaskFlow v1.1
          </p>
        </div>
      </aside>
    </>
  )
}

export default Sidebar