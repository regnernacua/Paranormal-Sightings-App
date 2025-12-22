import express from 'express'

const app = express()
const PORT = 7000

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}).on('error', (error) => {
  console.error('Failed to start server:', error)
})
