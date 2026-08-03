import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const currentDirectory = dirname(currentFile)
const dataDirectory = resolve(currentDirectory, '../data')
const databasePath = resolve(dataDirectory, 'taskflow.db')

mkdirSync(dataDirectory, {
  recursive: true,
})

const database = new Database(databasePath)

database.pragma('journal_mode = WAL')
database.pragma('foreign_keys = ON')

database.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL CHECK (length(trim(title)) > 0),
    description TEXT NOT NULL DEFAULT '',
    priority TEXT NOT NULL DEFAULT 'Media'
      CHECK (priority IN ('Alta', 'Media', 'Baja')),
    status TEXT NOT NULL DEFAULT 'Pendiente'
      CHECK (status IN ('Pendiente', 'En progreso', 'Completada')),
    due_date TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`)

export {
  database,
  databasePath,
}