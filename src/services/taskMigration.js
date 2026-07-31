import { createTask, getTasks } from './taskApi'

export const TASKS_STORAGE_KEY = 'taskflow_tasks'

let initialTasksPromise = null

export function getStoredTasks() {
  try {
    const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY)
    const parsedTasks = storedTasks ? JSON.parse(storedTasks) : []

    return Array.isArray(parsedTasks) ? parsedTasks : []
  } catch {
    return []
  }
}

function normalizeTask(task) {
  return {
    ...task,
    project: 'TaskFlow',
  }
}

function createMigrationPayload(task) {
  return {
    title: task.title,
    description: task.description ?? '',
    priority: task.priority ?? 'Media',
    status: task.status ?? 'Pendiente',
    dueDate: task.dueDate || null,
  }
}

async function synchronizeInitialTasks() {
  const apiTasks = await getTasks()

  if (apiTasks.length > 0) {
    localStorage.removeItem(TASKS_STORAGE_KEY)
    return apiTasks.map(normalizeTask)
  }

  const storedTasks = getStoredTasks()

  if (storedTasks.length === 0) {
    return []
  }

  const migratedTasks = []

  for (const task of storedTasks) {
    const createdTask = await createTask(createMigrationPayload(task))
    migratedTasks.push(normalizeTask(createdTask))
  }

  localStorage.removeItem(TASKS_STORAGE_KEY)

  return migratedTasks
}

export function loadInitialTasks() {
  if (!initialTasksPromise) {
    initialTasksPromise = synchronizeInitialTasks().catch((error) => {
      initialTasksPromise = null
      throw error
    })
  }

  return initialTasksPromise
}