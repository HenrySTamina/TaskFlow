import { Bell, Menu, Search } from 'lucide-react'
import { useState } from 'react'

import NotificationPanel from './NotificationPanel'
import { getTaskNotifications } from '../../utils/notifications'
import { getInitials } from '../../utils/profile'

const VIEW_CONTENT = {
  summary: {
    title: 'Panel principal',
    subtitle: 'Administra tus actividades y avances',
  },
  tasks: {
    title: 'Mis tareas',
    subtitle: 'Consulta y administra todas tus actividades',
  },
  calendar: {
    title: 'Calendario',
    subtitle: 'Organiza tus actividades por fecha',
  },
  statistics: {
    title: 'Estadísticas',
    subtitle: 'Analiza el avance de tus tareas',
  },
  settings: {
    title: 'Configuración',
    subtitle: 'Personaliza tu experiencia en TaskFlow',
  },
}

function Navbar({
  activeView,
  tasks,
  notificationsEnabled,
  searchTerm,
  displayName,
  onOpenMenu,
  onSearchChange,
  onOpenTask,
  onOpenSettings,
}) {
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false)
  const notifications = getTaskNotifications(tasks)
  const notificationCount = notificationsEnabled
    ? notifications.length
    : 0
  const viewContent = (
    VIEW_CONTENT[activeView]
    ?? VIEW_CONTENT.summary
  )
  const showSearch = [
    'summary',
    'tasks',
    'calendar',
  ].includes(activeView)

  return (
    <header className="sticky top-0 z-40 flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Abrir menú lateral"
          className="taskflow-interactive rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu className="taskflow-icon" size={21} />
        </button>

        <div
          key={activeView}
          className="taskflow-title-swap"
        >
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            {viewContent.title}
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            {viewContent.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {showSearch && (
          <label className="taskflow-search order-3 flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 md:order-none md:w-auto">
            <Search
              size={18}
              className="taskflow-icon text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => (
                onSearchChange(event.target.value)
              )}
              placeholder="Buscar tareas..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 md:w-48"
            />
          </label>
        )}

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(
                (currentValue) => !currentValue,
              )
            }}
            aria-label="Ver notificaciones"
            aria-expanded={isNotificationsOpen}
            className="taskflow-interactive relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100"
          >
            <Bell
              size={20}
              className={
                notificationCount > 0
                  ? 'taskflow-bell-has-alert'
                  : 'taskflow-icon'
              }
            />

            {notificationCount > 0 && (
              <span className="taskflow-badge-pop absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {notificationCount > 9
                  ? '9+'
                  : notificationCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <NotificationPanel
              notifications={notifications}
              enabled={notificationsEnabled}
              onClose={() => setIsNotificationsOpen(false)}
              onOpenTask={onOpenTask}
              onOpenSettings={onOpenSettings}
            />
          )}
        </div>

        <div className="taskflow-avatar flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
          {getInitials(displayName)}
        </div>
      </div>
    </header>
  )
}

export default Navbar
