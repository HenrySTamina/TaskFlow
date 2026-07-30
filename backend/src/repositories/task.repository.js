import { database } from '../database.js'

const selectTaskFields = `
  SELECT
    id,
    title,
    description,
    priority,
    status,
    due_date AS dueDate,
    created_at AS createdAt,
    updated_at AS updatedAt
  FROM tasks
`

function findAllTasks() {
  return database.prepare(`
    ${selectTaskFields}
    ORDER BY created_at DESC
  `).all()
}

function findTaskById(id) {
  return database.prepare(`
    ${selectTaskFields}
    WHERE id = ?
  `).get(id)
}

function createTask(task) {
  database.prepare(`
    INSERT INTO tasks (
      id,
      title,
      description,
      priority,
      status,
      due_date,
      created_at,
      updated_at
    ) VALUES (
      @id,
      @title,
      @description,
      @priority,
      @status,
      @dueDate,
      @createdAt,
      @updatedAt
    )
  `).run(task)

  return findTaskById(task.id)
}

function updateTask(id, task) {
  const result = database.prepare(`
    UPDATE tasks
    SET
      title = @title,
      description = @description,
      priority = @priority,
      status = @status,
      due_date = @dueDate,
      updated_at = @updatedAt
    WHERE id = @id
  `).run({
    id,
    ...task,
  })

  return result.changes ? findTaskById(id) : null
}

function deleteTask(id) {
  const result = database.prepare(`
    DELETE FROM tasks
    WHERE id = ?
  `).run(id)

  return result.changes > 0
}

export {
  createTask,
  deleteTask,
  findAllTasks,
  findTaskById,
  updateTask,
}