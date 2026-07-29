import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MoreHorizontal,
  Plus,
} from 'lucide-react'

import StatCard from '../components/ui/StatCard'

const statistics = [
  {
    title: 'Total de tareas',
    value: '24',
    description: '4 nuevas esta semana',
    icon: ClipboardList,
    iconClassName: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Completadas',
    value: '16',
    description: '67% del total',
    icon: CheckCircle2,
    iconClassName: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'En progreso',
    value: '5',
    description: 'Actualmente activas',
    icon: Clock3,
    iconClassName: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Vencidas',
    value: '3',
    description: 'Requieren atención',
    icon: AlertTriangle,
    iconClassName: 'bg-red-50 text-red-600',
  },
]

const tasks = [
  {
    title: 'Diseñar interfaz del dashboard',
    project: 'TaskFlow',
    dueDate: 'Hoy, 10:00 p. m.',
    priority: 'Alta',
    priorityClass: 'bg-red-50 text-red-700',
    status: 'En progreso',
    statusClass: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Crear módulo de autenticación',
    project: 'TaskFlow',
    dueDate: 'Miércoles',
    priority: 'Alta',
    priorityClass: 'bg-red-50 text-red-700',
    status: 'Pendiente',
    statusClass: 'bg-slate-100 text-slate-700',
  },
  {
    title: 'Documentar instalación del proyecto',
    project: 'Documentación',
    dueDate: 'Jueves',
    priority: 'Media',
    priorityClass: 'bg-amber-50 text-amber-700',
    status: 'Pendiente',
    statusClass: 'bg-slate-100 text-slate-700',
  },
  {
    title: 'Realizar pruebas responsivas',
    project: 'TaskFlow',
    dueDate: 'Jueves',
    priority: 'Baja',
    priorityClass: 'bg-emerald-50 text-emerald-700',
    status: 'Pendiente',
    statusClass: 'bg-slate-100 text-slate-700',
  },
]

function getCurrentDate() {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

function Dashboard() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium capitalize text-indigo-600">
            {getCurrentDate()}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Hola, Henry 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Aquí tienes un resumen de tus actividades.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <Plus size={19} />
          <span>Nueva tarea</span>
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => (
          <StatCard
            key={statistic.title}
            {...statistic}
          />
        ))}
      </section>

      <section className="mt-8 grid gap-6 xl:grid-cols-[1fr_340px]">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="font-bold text-slate-900">
                Tareas recientes
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Actividades próximas a realizar
              </p>
            </div>

            <button
              type="button"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Ver todas
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {tasks.map((task) => (
              <div
                key={task.title}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <button
                  type="button"
                  aria-label={`Completar ${task.title}`}
                  className="h-5 w-5 shrink-0 rounded-full border-2 border-slate-300 hover:border-indigo-500"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-semibold text-slate-800">
                    {task.title}
                  </h4>

                  <p className="mt-1 text-sm text-slate-500">
                    {task.project} · {task.dueDate}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${task.priorityClass}`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${task.statusClass}`}
                  >
                    {task.status}
                  </span>

                  <button
                    type="button"
                    aria-label={`Opciones de ${task.title}`}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-bold text-slate-900">
            Progreso semanal
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Objetivo de tareas completadas
          </p>

          <div className="my-7 flex justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#4f46e5_0deg_252deg,#e2e8f0_252deg_360deg)]">
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-slate-900">
                  70%
                </span>

                <span className="text-sm text-slate-500">
                  Completado
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Completadas
              </span>

              <span className="font-semibold text-slate-800">
                14 tareas
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Meta semanal
              </span>

              <span className="font-semibold text-slate-800">
                20 tareas
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Días restantes
              </span>

              <span className="font-semibold text-slate-800">
                4 días
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Dashboard