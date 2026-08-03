import cors from 'cors'
import express from 'express'
import { basename } from 'node:path'

import { databasePath } from './database.js'
import errorHandler from './middleware/error-handler.js'
import taskRouter from './routes/task.routes.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: 'http://localhost:5173',
}))

app.use(express.json())

app.get('/api/health', (request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'TaskFlow API funcionando correctamente',
    database: {
      status: 'connected',
      engine: 'SQLite',
      file: basename(databasePath),
    },
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/tasks', taskRouter)

app.use((request, response) => {
  response.status(404).json({
    message: 'Ruta no encontrada',
  })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`TaskFlow API disponible en http://localhost:${PORT}`)
})