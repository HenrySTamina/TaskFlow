import cors from 'cors'
import express from 'express'

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
    timestamp: new Date().toISOString(),
  })
})

app.use((request, response) => {
  response.status(404).json({
    message: 'Ruta no encontrada',
  })
})

app.listen(PORT, () => {
  console.log(`TaskFlow API disponible en http://localhost:${PORT}`)
})