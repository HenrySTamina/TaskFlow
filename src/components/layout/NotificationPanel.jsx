import {
  AlertTriangle,
  BellOff,
  CalendarClock,
  CheckCircle2,
  X,
} from 'lucide-react'
import { formatDueLabel } from '../../utils/notifications'
function NotificationPanel({
  notifications,
  enabled,
  onClose,
  onOpenTask,
  onOpenSettings,
}) {
  return (
    <section className="taskflow-panel-enter fixed left-4 right-4 top-32 z-50 w-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:absolute sm:left-auto sm:right-0 sm:top-14 sm:w-[min(24rem,calc(100vw-2rem))]">
      <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h3 className="font-bold text-slate-900">
            Notificaciones
          </h3>

          <p className="mt-0.5 text-xs text-slate-500">
            Tareas vencidas y próximas
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar notificaciones"
          className="taskflow-interactive rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="taskflow-icon" size={18} />
        </button>
      </header>

      {!enabled ? (
        <div className="flex flex-col items-center px-6 py-9 text-center">
          <div className="taskflow-empty-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
            <BellOff className="taskflow-icon" size={24} />
          </div>

          <h4 className="mt-4 font-bold text-slate-800">
            Notificaciones desactivadas
          </h4>

          <p className="mt-2 text-sm text-slate-500">
            Puedes activarlas nuevamente desde Configuración.
          </p>

          <button
            type="button"
            onClick={() => {
              onOpenSettings()
              onClose()
            }}
            className="taskflow-interactive mt-5 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700"
          >
            Abrir configuración
          </button>
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-9 text-center">
          <div className="taskflow-empty-icon flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="taskflow-check-complete" size={24} />
          </div>

          <h4 className="mt-4 font-bold text-slate-800">
            Todo está al día
          </h4>

          <p className="mt-2 text-sm text-slate-500">
            No tienes tareas vencidas ni próximas.
          </p>
        </div>
      ) : (
        <>
          <div className="taskflow-notification-list max-h-80 divide-y divide-slate-100 overflow-y-auto">
            {notifications.map((notification) => {
              const { task, dueDate, isOverdue } = notification
              const NotificationIcon = isOverdue
                ? AlertTriangle
                : CalendarClock

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    onOpenTask(task)
                    onClose()
                  }}
                  className="taskflow-notification-item flex w-full gap-3 px-5 py-4 text-left transition hover:bg-slate-50"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isOverdue
                        ? 'bg-red-50 text-red-600'
                        : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    <NotificationIcon className="taskflow-icon" size={20} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold text-slate-800">
                      {task.title}
                    </span>

                    <span
                      className={`mt-1 block text-xs font-medium ${
                        isOverdue
                          ? 'text-red-600'
                          : 'text-slate-500'
                      }`}
                    >
                      {formatDueLabel(dueDate)}
                    </span>
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                    {task.priority}
                  </span>
                </button>
              )
            })}
          </div>

          <footer className="border-t border-slate-100 bg-slate-50 px-5 py-3 text-center text-xs text-slate-500">
            Próximos 7 días
          </footer>
        </>
      )}
    </section>
  )
}

export default NotificationPanel
