import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MoreHorizontal,
  Pencil,
  Plus,
  SearchX,
  Trash2,
} from 'lucide-react'
import { useState } from 'react'

import TaskFilters from '../components/tasks/TaskFilters'
import StatCard from '../components/ui/StatCard'

function getCurrentDate() {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date())
}

function formatDueDate(dueDate) {
  if (!dueDate) {
    return 'Sin fecha límite'
  }

  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${dueDate}T00:00:00`))
}

function isOverdue(task) {
  const today = new Date().toISOString().slice(0, 10)

  return Boolean(
    task.dueDate
    && task.dueDate < today
    && task.status !== 'Completada',
  )
}

function getPriorityClass(priority) {
  const classes = {
    Alta: 'bg-red-50 text-red-700',
    Media: 'bg-amber-50 text-amber-700',
    Baja: 'bg-emerald-50 text-emerald-700',
  }

  return classes[priority] ?? 'bg-slate-100 text-slate-700'
}

function getStatusClass(status) {
  const classes = {
    Pendiente: 'bg-slate-100 text-slate-700',
    'En progreso': 'bg-amber-50 text-amber-700',
    Completada: 'bg-emerald-50 text-emerald-700',
  }

  return classes[status] ?? 'bg-slate-100 text-slate-700'
}

function Dashboard({
  viewMode = 'summary',
  tasks,
  searchTerm,
  onCreateTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onSearchChange,
}) {
  const [openMenuId, setOpenMenuId] = useState(null)
  const [statusFilter, setStatusFilter] = useState('Todas')
  const [priorityFilter, setPriorityFilter] = useState('Todas')
  const isTaskView = viewMode === 'tasks'
  const completedTasks = tasks.filter(
    (task) => task.status === 'Completada',
  ).length
  const inProgressTasks = tasks.filter(
    (task) => task.status === 'En progreso',
  ).length
  const overdueTasks = tasks.filter(isOverdue).length
  const completionPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0
  const progressDegrees = completionPercentage * 3.6
  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es-MX')
  const hasActiveFilters = Boolean(
    normalizedSearch
    || statusFilter !== 'Todas'
    || priorityFilter !== 'Todas',
  )

  const filteredTasks = tasks.filter((task) => {
    const searchableText = `${task.title} ${task.description ?? ''}`
      .toLocaleLowerCase('es-MX')
    const matchesSearch = !normalizedSearch
      || searchableText.includes(normalizedSearch)
    const matchesStatus = statusFilter === 'Todas'
      || task.status === statusFilter
    const matchesPriority = priorityFilter === 'Todas'
      || task.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  function clearFilters() {
    onSearchChange('')
    setStatusFilter('Todas')
    setPriorityFilter('Todas')
  }

  const statistics = [
    {
      title: 'Total de tareas',
      value: tasks.length,
      description: tasks.length === 1 ? 'Tarea registrada' : 'Tareas registradas',
      icon: ClipboardList,
      iconClassName: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Completadas',
      value: completedTasks,
      description: `${completionPercentage}% del total`,
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
          <p className="text-sm font-medium capitalize text-indigo-600">
  {isTaskView ? 'Gestión de actividades' : getCurrentDate()}
</p>

<h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
  {isTaskView ? 'Mis tareas' : 'Hola, Henry 👋'}
</h2>

<p className="mt-2 text-slate-500">
  {isTaskView
    ? 'Consulta, filtra y administra todas tus tareas.'
    : 'Aquí tienes un resumen de tus actividades.'}
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

      <section
  className={`${isTaskView ? 'hidden' : 'grid'} gap-4 sm:grid-cols-2 xl:grid-cols-4`}
>
        {statistics.map((statistic) => (
          <StatCard
            key={statistic.title}
            {...statistic}
          />
        ))}
      </section>

      <section
  className={
    isTaskView
      ? 'grid gap-6'
      : 'mt-8 grid gap-6 xl:grid-cols-[1fr_340px]'
  }
>
        <article className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 p-5">
            <div>
              <h3 className="font-bold text-slate-900">
                {isTaskView ? 'Todas las tareas' : 'Tareas recientes'}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {hasActiveFilters
                  ? `${filteredTasks.length} resultado${filteredTasks.length === 1 ? '' : 's'}`
                  : 'Actividades próximas a realizar'}
              </p>
            </div>
          </div>

          <TaskFilters
            status={statusFilter}
            priority={priorityFilter}
            hasActiveFilters={hasActiveFilters}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
            onClear={clearFilters}
          />

          {filteredTasks.length ? (
            <div className="divide-y divide-slate-100">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                >
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    aria-label={`Completar ${task.title}`}
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${
                      task.status === 'Completada'
                        ? 'text-emerald-600'
                        : 'border-2 border-slate-300 hover:border-indigo-500'
                    }`}
                  >
                    {task.status === 'Completada' && (
                      <CheckCircle2 size={23} />
                    )}
                  </button>

                  <div className="min-w-0 flex-1">
                    <h4
                      className={`truncate font-semibold ${
                        task.status === 'Completada'
                          ? 'text-slate-400 line-through'
                          : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="mt-1 truncate text-sm text-slate-500">
                        {task.description}
                      </p>
                    )}

                    <p className="mt-1 text-xs text-slate-400">
                      {task.project} · {formatDueDate(task.dueDate)}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(task.priority)}`}
                    >
                      {task.priority}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(task.status)}`}
                    >
                      {task.status}
                    </span>

                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenuId(
                          openMenuId === task.id ? null : task.id,
                        )}
                        aria-label={`Opciones de ${task.title}`}
                        aria-expanded={openMenuId === task.id}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {openMenuId === task.id && (
                        <div className="absolute right-0 top-10 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              onEditTask(task)
                              setOpenMenuId(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Pencil size={16} />
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onDeleteTask(task)
                              setOpenMenuId(null)
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center px-5 py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                {hasActiveFilters
                  ? <SearchX size={26} />
                  : <ClipboardList size={26} />}
              </div>

              <h4 className="mt-4 font-bold text-slate-800">
                {hasActiveFilters
                  ? 'No encontramos coincidencias'
                  : 'Aún no tienes tareas'}
              </h4>

              <p className="mt-2 max-w-sm text-sm text-slate-500">
                {hasActiveFilters
                  ? 'Prueba otra búsqueda o limpia los filtros seleccionados.'
                  : 'Crea tu primera tarea para comenzar a organizar tus actividades.'}
              </p>

              <button
                type="button"
                onClick={hasActiveFilters ? clearFilters : onCreateTask}
                className="mt-5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                {hasActiveFilters ? 'Limpiar filtros' : 'Crear primera tarea'}
              </button>
            </div>
          )}
        </article>

        <article
  className={`${isTaskView ? 'hidden' : ''} rounded-2xl border border-slate-200 bg-white p-6 shadow-sm`}
>
          <h3 className="font-bold text-slate-900">
            Progreso semanal
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Objetivo de tareas completadas
          </p>

          <div className="my-7 flex justify-center">
            <div
              className="relative flex h-44 w-44 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#4f46e5 0deg ${progressDegrees}deg, #e2e8f0 ${progressDegrees}deg 360deg)`,
              }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-slate-900">
                  {completionPercentage}%
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
                {completedTasks} tareas
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                Meta semanal
              </span>

              <span className="font-semibold text-slate-800">
                {tasks.length} tareas
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-slate-500">
                En progreso
              </span>

              <span className="font-semibold text-slate-800">
                {inProgressTasks} tareas
              </span>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default Dashboard
