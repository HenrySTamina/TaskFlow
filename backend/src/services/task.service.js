import { randomUUID } from 'node:crypto'

import ApiError from '../errors/api-error.js'
import {
  createTask,
  deleteTask,
  findAllTasks,
  findTaskById,
  updateTask,
} from '../repositories/task.repository.js'

const validPriorities = new Set(['Alta', 'Media', 'Baja'])
const validStatuses = new Set(['Pendiente', 'En progreso', 'Completada'])

function normalizeDueDate(value) {
  if (value === undefined || value === null || value === '') {
    return null
  }

  if (typeof value !== 'string') {
    throw new ApiError(400, 'La fecha límite debe usar el formato YYYY-MM-DD.')
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (!match) {
    throw new ApiError(400, 'La fecha límite debe usar el formato YYYY-MM-DD.')
  }

  const [, year, month, day] = match.map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  const isValidDate = date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day

  if (!isValidDate) {
    throw new ApiError(400, 'La fecha límite no es válida.')
  }

  return value
}

function validateTask(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    throw new ApiError(400, 'Los datos de la tarea no son válidos.')
  }

  const title = typeof data.title === 'string' ? data.title.trim() : ''
  const description = typeof data.description === 'string'
    ? data.description.trim()
    : ''
  const priority = data.priority ?? 'Media'
  const status = data.status ?? 'Pendiente'

  if (!title) {
    throw new ApiError(400, 'El título de la tarea es obligatorio.')
  }

  if (!validPriorities.has(priority)) {
    throw new ApiError(400, 'La prioridad debe ser Alta, Media o Baja.')
  }

  if (!validStatuses.has(status)) {
    throw new ApiError(
      400,
      'El estado debe ser Pendiente, En progreso o Completada.',
    )
  }

  return {
    title,
    description,
    priority,
    status,
    dueDate: normalizeDueDate(data.dueDate),
  }
}

function getTasks() {
  return findAllTasks()
}

function getTask(id) {
  const task = findTaskById(id)

  if (!task) {
    throw new ApiError(404, 'Tarea no encontrada.')
  }

  return task
}

function addTask(data) {
  const taskData = validateTask(data)
  const timestamp = new Date().toISOString()

  return createTask({
    id: randomUUID(),
    ...taskData,
    createdAt: timestamp,
    updatedAt: timestamp,
  })
}

function editTask(id, data) {
  const currentTask = getTask(id)
  const taskData = validateTask({
    ...currentTask,
    ...data,
  })

  return updateTask(id, {
    ...taskData,
    updatedAt: new Date().toISOString(),
  })
}

function removeTask(id) {
  getTask(id)
  deleteTask(id)
}

export {
  addTask,
  editTask,
  getTask,
  getTasks,
  removeTask,
}