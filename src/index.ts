import e from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3001

const app = e()

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
