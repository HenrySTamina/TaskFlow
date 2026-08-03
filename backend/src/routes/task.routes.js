import { Router } from 'express'

import {
  createTask,
  deleteTask,
  getTaskById,
  listTasks,
  updateTask,
} from '../controllers/task.controller.js'

const taskRouter = Router()

taskRouter
  .route('/')
  .get(listTasks)
  .post(createTask)

taskRouter
  .route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask)

export default taskRouter