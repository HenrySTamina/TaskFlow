import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  Plus,
} from 'lucide-react'

import StatCard from '../components/ui/StatCard'

function getDateKey(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getPercentage(value, total) {
  return total ? Math.round((value / total) * 100) : 0
}

function MetricBar({
  label,
  value,
  total,
  colorClass,
}) {
  const percentage = getPercentage(value, total)

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-slate-600">
          {label}
        </span>

        <span className="font-bold text-slate-900">
          {value} · {percentage}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

function StatisticsView({
  tasks,
  onCreateTask,
}) {
  const todayDate = new Date()
  const today = getDateKey(todayDate)
  const nextWeekDate = new Date(todayDate)
  nextWeekDate.setDate(nextWeekDate.getDate() + 7)
  const nextWeek = getDateKey(nextWeekDate)

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(
    (task) => task.status === 'Completada',
  ).length
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'En progreso',
  ).length
  const pendingTasks = tasks.filter(
    (task) => task.status === 'Pendiente',
  ).length
  const overdueTasks = tasks.filter((task) => (
    task.dueDate
    && task.dueDate < today
    && task.status !== 'Completada'
  )).length

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === 'Alta',
  ).length
  const mediumPriorityTasks = tasks.filter(
    (task) => task.priority === 'Media',
  ).length
  const lowPriorityTasks = tasks.filter(
    (task) => task.priority === 'Baja',
  ).length

  const tasksForToday = tasks.filter(
    (task) => task.dueDate === today,
  ).length
  const upcomingTasks = tasks.filter((task) => (
    task.dueDate
    && task.dueDate > today
    && task.dueDate <= nextWeek
    && task.status !== 'Completada'
  )).length
  const tasksWithoutDate = tasks.filter(
    (task) => !task.dueDate,
  ).length
  const tasksWithDate = totalTasks - tasksWithoutDate

  const completionPercentage = getPercentage(
    completedTasks,
    totalTasks,
  )
  const completionDegrees = completionPercentage * 3.6

  const statistics = [
    {
      title: 'Total de tareas',
      value: totalTasks,
      description: totalTasks === 1 ? 'Tarea registrada' : 'Tareas registradas',
      icon: ClipboardList,
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Completadas',
      value: completedTasks,
      description: `${completionPercentage}% de cumplimiento`,
      icon: CheckCircle2,
      iconClassName: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'En progreso',
      value: inProgressTasks,
      description: 'Actualmente activas',
      icon: Clock3,
      iconClassName: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Vencidas',
      value: overdueTasks,
      description: 'Requieren atención',
      icon: AlertTriangle,
      iconClassName: 'bg-red-50 text-red-600',
    },
  ]

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Rendimiento
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Estadísticas
          </h2>

          <p className="mt-2 text-slate-500">
            Analiza el estado, prioridad y planificación de tus tareas.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateTask}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          <Plus size={19} />
          <span>Nueva tarea</span>
        </button>
      </section>

      {totalTasks > 0 ? (
        <>
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statistics.map((statistic) => (
              <StatCard
                key={statistic.title}
                {...statistic}
              />
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h3 className="font-bold text-slate-900">
                  Cumplimiento general
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Porcentaje de tareas completadas.
                </p>
              </div>

              <div className="my-8 flex justify-center">
                <div
                  className="relative flex h-52 w-52 items-center justify-center rounded-full"
                  style={{
                    background: `conic-gradient(var(--color-emerald-500) 0deg ${completionDegrees}deg, var(--color-slate-200) ${completionDegrees}deg 360deg)`,
                  }}
                >
                  <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
                    <span className="text-4xl font-bold text-slate-900">
                      {completionPercentage}%
                    </span>

                    <span className="mt-1 text-sm text-slate-500">
                      Completado
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-center text-sm text-slate-500">
                {completedTasks} de {totalTasks} tareas finalizadas
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Distribución por estado
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Situación actual de todas las actividades.
              </p>

              <div className="mt-8 space-y-7">
                <MetricBar
                  label="Pendientes"
                  value={pendingTasks}
                  total={totalTasks}
                  colorClass="bg-slate-500"
                />

                <MetricBar
                  label="En progreso"
                  value={inProgressTasks}
                  total={totalTasks}
                  colorClass="bg-amber-500"
                />

                <MetricBar
                  label="Completadas"
                  value={completedTasks}
                  total={totalTasks}
                  colorClass="bg-emerald-500"
                />
              </div>
            </article>
          </section>

          <section className="mt-6 grid gap-6 xl:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Distribución por prioridad
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Nivel de importancia asignado a las tareas.
              </p>

              <div className="mt-8 space-y-7">
                <MetricBar
                  label="Prioridad alta"
                  value={highPriorityTasks}
                  total={totalTasks}
                  colorClass="bg-red-500"
                />

                <MetricBar
                  label="Prioridad media"
                  value={mediumPriorityTasks}
                  total={totalTasks}
                  colorClass="bg-amber-500"
                />

                <MetricBar
                  label="Prioridad baja"
                  value={lowPriorityTasks}
                  total={totalTasks}
                  colorClass="bg-emerald-500"
                />
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">
                Resumen de planificación
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Distribución de las fechas límite.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-indigo-50 p-4">
                  <div className="flex items-center gap-3 text-indigo-700">
                    <CalendarDays size={20} />
                    <span className="text-sm font-semibold">
                      Con fecha límite
                    </span>
                  </div>

                  <span className="font-bold text-indigo-800">
                    {tasksWithDate}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-amber-50 p-4">
                  <div className="flex items-center gap-3 text-amber-700">
                    <Clock3 size={20} />
                    <span className="text-sm font-semibold">
                      Para hoy
                    </span>
                  </div>

                  <span className="font-bold text-amber-800">
                    {tasksForToday}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-3 text-emerald-700">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-semibold">
                      Próximos 7 días
                    </span>
                  </div>

                  <span className="font-bold text-emerald-800">
                    {upcomingTasks}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-slate-100 p-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <BarChart3 size={20} />
                    <span className="text-sm font-semibold">
                      Sin fecha límite
                    </span>
                  </div>

                  <span className="font-bold text-slate-800">
                    {tasksWithoutDate}
                  </span>
                </div>
              </div>
            </article>
          </section>
        </>
      ) : (
        <section className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
          <BarChart3 className="mx-auto text-indigo-500" size={42} />

          <h3 className="mt-4 text-lg font-bold text-slate-900">
            Aún no hay estadísticas
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Crea tareas para comenzar a visualizar tu progreso, prioridades
            y planificación.
          </p>

          <button
            type="button"
            onClick={onCreateTask}
            className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Crear primera tarea
          </button>
        </section>
      )}
    </main>
  )
}

export default StatisticsView
