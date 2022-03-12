import request from 'supertest'
import App from '@/app'
import IndexRouter from '@/routes'
import dotenv from 'dotenv'
dotenv.config()

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500))
})

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const app = new App(process.env.PORT ?? '8000', [new IndexRouter()])

      return request(app.getServer()).get('/').expect(200)
    })
  })
})
