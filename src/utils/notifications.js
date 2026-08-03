const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000

function getToday() {
  const today = new Date()

  today.setHours(0, 0, 0, 0)

  return today
}

function parseDueDate(dueDate) {
  return new Date(`${dueDate}T00:00:00`)
}

export function formatDueLabel(dueDate) {
  const differenceInDays = Math.round(
    (dueDate.getTime() - getToday().getTime())
      / DAY_IN_MILLISECONDS,
  )

  if (differenceInDays < 0) {
    const overdueDays = Math.abs(differenceInDays)

    return `Vencida hace ${overdueDays} ${
      overdueDays === 1 ? 'día' : 'días'
    }`
  }

  if (differenceInDays === 0) {
    return 'Vence hoy'
  }

  if (differenceInDays === 1) {
    return 'Vence mañana'
  }

  return `Vence el ${new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'short',
  }).format(dueDate)}`
}

export function getTaskNotifications(tasks = []) {
  const today = getToday()
  const upcomingLimit = new Date(today)

  upcomingLimit.setDate(upcomingLimit.getDate() + 7)

  return tasks
    .filter((task) => (
      task.status !== 'Completada'
      && task.dueDate
    ))
    .map((task) => ({
      task,
      dueDate: parseDueDate(task.dueDate),
    }))
    .filter(({ dueDate }) => (
      !Number.isNaN(dueDate.getTime())
      && dueDate <= upcomingLimit
    ))
    .map((notification) => ({
      ...notification,
      isOverdue: notification.dueDate < today,
    }))
    .sort(
      (firstNotification, secondNotification) => (
        firstNotification.dueDate
        - secondNotification.dueDate
      ),
    )
}