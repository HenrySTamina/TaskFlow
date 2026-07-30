import {
  addTask,
  editTask,
  getTask,
  getTasks,
  removeTask,
} from '../services/task.service.js'

function listTasks(_request, response) {
  response.status(200).json({
    data: getTasks(),
  })
}

function getTaskById(request, response) {
  response.status(200).json({
    data: getTask(request.params.id),
  })
}

function createTask(request, response) {
  response.status(201).json({
    message: 'Tarea creada correctamente.',
    data: addTask(request.body),
  })
}

function updateTask(request, response) {
  response.status(200).json({
    message: 'Tarea actualizada correctamente.',
    data: editTask(request.params.id, request.body),
  })
}

function deleteTask(request, response) {
  removeTask(request.params.id)
  response.status(204).send()
}

export {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
}