import express from 'express'
import { sightingsRouter } from './routes/sightings.js'

const app = express()
const PORT = 7000

app.use(express.json())

app.use('/api/sightings', sightingsRouter)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (error) => {
  console.error('Failed to start server:', error)
})
