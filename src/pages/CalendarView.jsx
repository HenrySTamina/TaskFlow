import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Pencil,
  Plus,
} from 'lucide-react'
import { useState } from 'react'

const WEEK_DAYS = [
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
  'Dom',
]

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
]

const WITHOUT_DATE_KEY = 'without-date'

function getDateKey(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')

  return `${year}-${month}-${day}`
}

function getMonthDays(visibleMonth) {
  const year = visibleMonth.getFullYear()
  const month = visibleMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekDay = (new Date(year, month, 1).getDay() + 6) % 7
  const calendarDays = Array.from(
    { length: firstWeekDay },
    () => null,
  )

  for (let day = 1; day <= daysInMonth; day += 1) {
    calendarDays.push({
      day,
      dateKey: getDateKey(new Date(year, month, day)),
    })
  }

  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null)
  }

  return calendarDays
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`))
}

function getGroupLabel(date, today) {
  if (date === WITHOUT_DATE_KEY) {
    return 'Sin fecha límite'
  }

  const tomorrowDate = new Date()
  tomorrowDate.setDate(tomorrowDate.getDate() + 1)
  const tomorrow = getDateKey(tomorrowDate)
  const formattedDate = formatLongDate(date)

  if (date === today) {
    return `Hoy · ${formattedDate}`
  }

  if (date === tomorrow) {
    return `Mañana · ${formattedDate}`
  }

  if (date < today) {
    return `${formattedDate} · Vencida`
  }

  return formattedDate
}

function getTaskClass(task, today) {
  if (task.status === 'Completada') {
    return 'border-emerald-200 bg-emerald-50 text-emerald-700'
  }

  if (task.dueDate && task.dueDate < today) {
    return 'border-red-200 bg-red-50 text-red-700'
  }

  const classes = {
    Alta: 'border-red-100 bg-red-50 text-red-700',
    Media: 'border-amber-100 bg-amber-50 text-amber-700',
    Baja: 'border-indigo-100 bg-indigo-50 text-indigo-700',
  }

  return classes[task.priority]
    ?? 'border-slate-200 bg-slate-50 text-slate-700'
}

function getPriorityClass(priority) {
  const classes = {
    Alta: 'bg-red-50 text-red-700',
    Media: 'bg-amber-50 text-amber-700',
    Baja: 'bg-emerald-50 text-emerald-700',
  }

  return classes[priority] ?? 'bg-slate-100 text-slate-700'
}

function CalendarView({
  tasks,
  searchTerm,
  onCreateTask,
  onEditTask,
  onToggleTask,
}) {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const today = getDateKey(currentDate)

  const [visibleMonth, setVisibleMonth] = useState(
    () => new Date(currentYear, currentDate.getMonth(), 1),
  )

  const normalizedSearch = searchTerm.trim().toLocaleLowerCase('es-MX')
  const calendarDays = getMonthDays(visibleMonth)
  const visibleYear = visibleMonth.getFullYear()
  const visibleMonthNumber = visibleMonth.getMonth()
  const monthPrefix = `${visibleYear}-${`${visibleMonthNumber + 1}`.padStart(2, '0')}`

  const taskYears = tasks
    .filter((task) => task.dueDate)
    .map((task) => Number(task.dueDate.slice(0, 4)))

  const yearOptions = [
    ...new Set([
      ...Array.from(
        { length: 11 },
        (_, index) => currentYear - 5 + index,
      ),
      ...taskYears,
    ]),
  ].sort((firstYear, secondYear) => firstYear - secondYear)

  const filteredTasks = tasks.filter((task) => {
    const searchableText = `${task.title} ${task.description ?? ''}`
      .toLocaleLowerCase('es-MX')

    return !normalizedSearch || searchableText.includes(normalizedSearch)
  })

  const monthTasks = tasks.filter(
    (task) => task.dueDate?.startsWith(monthPrefix),
  )

  const sortedTasks = [...filteredTasks].sort((firstTask, secondTask) => {
    const firstDate = firstTask.dueDate || '9999-12-31'
    const secondDate = secondTask.dueDate || '9999-12-31'

    return firstDate.localeCompare(secondDate)
  })

  const groupedTasks = new Map()

  for (const task of sortedTasks) {
    const groupKey = task.dueDate || WITHOUT_DATE_KEY
    const currentGroup = groupedTasks.get(groupKey) ?? []

    groupedTasks.set(groupKey, [...currentGroup, task])
  }

  const overdueTasks = tasks.filter((task) => (
    task.dueDate
    && task.dueDate < today
    && task.status !== 'Completada'
  )).length

  const todayTasks = tasks.filter(
    (task) => task.dueDate === today,
  ).length

  function changeMonth(monthDifference) {
    setVisibleMonth((currentMonth) => new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + monthDifference,
      1,
    ))
  }

  function changeSelectedMonth(event) {
    setVisibleMonth(new Date(
      visibleYear,
      Number(event.target.value),
      1,
    ))
  }

  function changeSelectedYear(event) {
    setVisibleMonth(new Date(
      Number(event.target.value),
      visibleMonthNumber,
      1,
    ))
  }

  function showCurrentMonth() {
    const now = new Date()

    setVisibleMonth(new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    ))
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <section className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Planificación mensual
          </p>

          <h2 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Calendario
          </h2>

          <p className="mt-2 text-slate-500">
            Consulta tus tareas en el calendario y en la agenda cronológica.
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

      <section className="mb-8 grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-indigo-600">
            <CalendarDays size={21} />
            <span className="text-sm font-semibold">
              En el mes seleccionado
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {monthTasks.length}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-amber-600">
            <Circle size={21} />
            <span className="text-sm font-semibold">
              Para hoy
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {todayTasks}
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 text-red-600">
            <AlertTriangle size={21} />
            <span className="text-sm font-semibold">
              Vencidas
            </span>
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {overdueTasks}
          </p>
        </article>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <header className="flex flex-col gap-4 border-b border-slate-100 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {MONTHS[visibleMonthNumber]} {visibleYear}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {monthTasks.length} tarea{monthTasks.length === 1 ? '' : 's'} programada{monthTasks.length === 1 ? '' : 's'}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="grid grid-cols-2 gap-2">
              <select
                value={visibleMonthNumber}
                onChange={changeSelectedMonth}
                aria-label="Seleccionar mes"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-500"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                value={visibleYear}
                onChange={changeSelectedYear}
                aria-label="Seleccionar año"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 outline-none focus:border-indigo-500"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={showCurrentMonth}
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Hoy
              </button>

              <button
                type="button"
                onClick={() => changeMonth(-1)}
                aria-label="Mes anterior"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
              >
                <ChevronLeft size={19} />
              </button>

              <button
                type="button"
                onClick={() => changeMonth(1)}
                aria-label="Mes siguiente"
                className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        </header>

        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {WEEK_DAYS.map((weekDay) => (
                <div
                  key={weekDay}
                  className="px-3 py-3 text-center text-xs font-bold uppercase tracking-wide text-slate-500"
                >
                  {weekDay}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {calendarDays.map((calendarDay, index) => {
                if (!calendarDay) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-32 border-b border-r border-slate-100 bg-slate-50/60"
                    />
                  )
                }

                const dayTasks = filteredTasks.filter(
                  (task) => task.dueDate === calendarDay.dateKey,
                )
                const isToday = calendarDay.dateKey === today

                return (
                  <div
                    key={calendarDay.dateKey}
                    className={`min-h-32 border-b border-r border-slate-100 p-2 ${
                      isToday ? 'bg-indigo-50/60' : 'bg-white'
                    }`}
                  >
                    <div className="mb-2 flex justify-end">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                          isToday
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600'
                        }`}
                      >
                        {calendarDay.day}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {dayTasks.map((task) => (
                        <button
                          key={task.id}
                          type="button"
                          onClick={() => onEditTask(task)}
                          title={`${task.title} · ${task.status}`}
                          className={`flex w-full items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left text-xs font-semibold transition hover:brightness-95 ${getTaskClass(task, today)}`}
                        >
                          {task.status === 'Completada' && (
                            <CheckCircle2 className="shrink-0" size={14} />
                          )}

                          <span className="truncate">
                            {task.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-5">
          <p className="text-sm font-medium text-indigo-600">
            Vista cronológica
          </p>

          <h3 className="mt-1 text-xl font-bold text-slate-900">
            Agenda de tareas
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Todas tus actividades ordenadas por fecha límite.
          </p>
        </div>

        {groupedTasks.size > 0 ? (
          <div className="space-y-5">
            {[...groupedTasks.entries()].map(([date, dateTasks]) => {
              const isOverdueDate = (
                date !== WITHOUT_DATE_KEY
                && date < today
                && dateTasks.some((task) => task.status !== 'Completada')
              )

              return (
                <article
                  key={date}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <header className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        isOverdueDate
                          ? 'bg-red-50 text-red-600'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      <CalendarDays size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold capitalize text-slate-900">
                        {getGroupLabel(date, today)}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {dateTasks.length} tarea{dateTasks.length === 1 ? '' : 's'}
                      </p>
                    </div>
                  </header>

                  <div className="divide-y divide-slate-100">
                    {dateTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
                      >
                        <button
                          type="button"
                          onClick={() => onToggleTask(task.id)}
                          aria-label={`Cambiar estado de ${task.title}`}
                          className={
                            task.status === 'Completada'
                              ? 'text-emerald-600'
                              : 'text-slate-300 hover:text-indigo-600'
                          }
                        >
                          {task.status === 'Completada'
                            ? <CheckCircle2 size={25} />
                            : <Circle size={25} />}
                        </button>

                        <div className="min-w-0 flex-1">
                          <h5
                            className={`font-semibold ${
                              task.status === 'Completada'
                                ? 'text-slate-400 line-through'
                                : 'text-slate-800'
                            }`}
                          >
                            {task.title}
                          </h5>

                          {task.description && (
                            <p className="mt-1 text-sm text-slate-500">
                              {task.description}
                            </p>
                          )}

                          <p className="mt-1 text-xs text-slate-400">
                            {task.project ?? 'TaskFlow'} · {task.status}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(task.priority)}`}
                          >
                            {task.priority}
                          </span>

                          <button
                            type="button"
                            onClick={() => onEditTask(task)}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
                          >
                            <Pencil size={16} />
                            <span>Editar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <article className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
            <CalendarDays className="mx-auto text-indigo-500" size={38} />

            <h4 className="mt-4 font-bold text-slate-900">
              {normalizedSearch
                ? 'No encontramos tareas'
                : 'Tu agenda está vacía'}
            </h4>

            <p className="mt-2 text-sm text-slate-500">
              {normalizedSearch
                ? 'Prueba utilizando otra búsqueda.'
                : 'Crea una tarea para comenzar a organizar tus fechas.'}
            </p>
          </article>
        )}
      </section>
    </main>
  )
}

export default CalendarView