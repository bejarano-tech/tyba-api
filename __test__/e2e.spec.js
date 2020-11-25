import request from 'supertest'
import app from '../src/app';
import { transactionsDb, usersDb} from '../src/data-access/index.js'

import { makeFakeUser } from './fixtures/user.js'
import { makeFakeTransaction } from './fixtures/transaction.js'

import dotenv from 'dotenv'
dotenv.config()

describe('Tyba API', () => {
  let testData = {
    name: "Test",
    email: "test@example.com",
    password: "test"
  }
  let apiRoute = process.env.TB_API_ROOT

  describe('Auth', () => {
    describe('singing users', () => {
      it('singup a user', async () => {
        const {name, email, password} = makeFakeUser(testData)
        const response = await request(app)
          .post(`${apiRoute}/auth/singup`)
          .send({name, email, password})
          .set('Accept', 'application/json')
          .set('User-Agent', 'jest')
          .expect('Content-Type', /json/)
          .expect(201)
        const { posted } = response.body
        const doc = await usersDb.findById(posted)
        expect(doc).toEqual(posted)
      });      
      it('requires user to contain a name', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, name: undefined})
        await request(app)
        .post(`${apiRoute}/auth/singup`)
        .send({name, email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
      it('requires user to contain a valid email', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, email: "test"})
        await request(app)
        .post(`${apiRoute}/auth/singup`)
        .send({name, email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
      it('requires user to contain a email', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, email: undefined})
        await request(app)
        .post(`${apiRoute}/auth/singup`)
        .send({name, email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
      it('requires user to contain a password', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, password: undefined})
        await request(app)
        .post(`${apiRoute}/auth/singup`)
        .send({name, email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
    })
    describe('logining users', () => {
      it('login a user', async () => {
        const response = await request(app)
        .post(`${apiRoute}/auth/login`)
        .send({email: testData.email, password: testData.password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(201)
        expect(response.body.posted).toBeDefined()
        testData.token = response.body?.posted
        // TODO Verify Token
      });
      it('requires user to contain an email', async () => {
        const {email, password} = makeFakeUser({id: undefined, email: undefined})
        await request(app)
        .post(`${apiRoute}/auth/login`)
        .send({email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
      it('requires user to contain a password', async () => {
        const {email, password} = makeFakeUser({id: undefined, password: undefined})
        await request(app)
        .post(`${apiRoute}/auth/login`)
        .send({email, password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(400)
      });
      it('it must be a valid token', async () => {
        const response = await request(app)
        .post(`${apiRoute}/auth/login`)
        .send({email: testData.email, password: testData.password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(201)
        // Todo validate token
      });
    })
    describe('logout users', () => {
      it('logout a user', async () => {
        const response = await request(app)
        .post(`${apiRoute}/auth/login`)
        .send({email: testData.email, password: testData.password})
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(201)
      });
    })
    describe('authorizing users', () => {
      it('authorize a user', async () => {
        const response = await request(app)
        .get(`${apiRoute}/transactions`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)
      });
      it('unauthorize a user', async () => {
        const response = await request(app)
        .get(`${apiRoute}/transactions`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .expect('Content-Type', /json/)
        .expect(403)
      });
    })
  })

  describe('Users', () => {  
    describe('adding users', () => {
      it('adds a user to the database', async () => {
        const response = await request(app)
        .post(`${apiRoute}/users`)
        .send(makeFakeUser({
          id: undefined,
          name: 'Test Name'
        }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(201)
        const { posted } = response.body
        const doc = await usersDb.findById(posted)
        expect(doc).toEqual(posted)
        return usersDb.remove(posted)
      })
      it('requires user to contain a name', async () => {
        const response = await request(app)
        .post(`${apiRoute}/users`)
        .send(makeFakeUser({ id: undefined, name: undefined }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(400)
      })
      it('requires user to contain email', async () => {
        const response = await request(app)
        .post(`${apiRoute}/users`)
        .send(makeFakeUser({ id: undefined, email: undefined }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })
    describe('modfying users', () => {
      it('modifies a user', async () => {
        const user = makeFakeUser({
          email: 'pepe@example.com'
        })
        await usersDb.insert(user)
        const response = await request(app)
        .patch(`${apiRoute}/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)

        expect(response.body.patched.email).toBe('pepe@example.com')
        return usersDb.remove(user)
      })
    })
    describe('listing users', () => {
      it('lists users', async () => {
        const user1 = makeFakeUser()
        const user2 = makeFakeUser()
        const users = [user1, user2]
        const inserts = await Promise.all(users.map(usersDb.insert))
        const expected = [
          {
            ...user1,
            createdOn: inserts[0].createdOn
          },
          {
            ...user2,
            createdOn: inserts[1].createdOn
          }
        ]
        const response = await request(app)
        .get(`${apiRoute}/users`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)

        expect(response.body).toContainEqual(expected[0])
        expect(response.body).toContainEqual(expected[1])
        return users.map(usersDb.remove)
      })
    })
    describe('deleting users', () => {
      it('hard deletes', async () => {
        const user = makeFakeUser()
        await usersDb.insert(user)
        const response = await request(app)
        .delete(`${apiRoute}/users/${user.id}`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect(200)
        
        expect(response.body.deleted.deletedCount).toBe(1)
        expect(response.body.deleted.softDelete).toBe(false)
      })
    })
  })
  describe('Transactions', () => {  
    describe('adding transactions', () => {
      it('adds a transaction to the database', async () => {
        const response = await request(app)
        .post(`${apiRoute}/transactions`)
        .send(makeFakeTransaction({
          id: undefined,
          from: 'test-from',
          to: 'test-to',
          amount: 100,
          payload: {message: "test"}
        }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(201)
        const { posted } = response.body
        const doc = await transactionsDb.findById(posted)
        expect(doc).toEqual(posted)
        return transactionsDb.remove(posted)
      })
      it('requires transaction to contain a from', async () => {
        const response = await request(app)
        .post(`${apiRoute}/transactions`)
        .send(makeFakeTransaction({ id: undefined, from: undefined }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(400)
      })
      it('requires transaction to contain a to', async () => {
        const response = await request(app)
        .post(`${apiRoute}/transactions`)
        .send(makeFakeTransaction({ id: undefined, to: undefined }))
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })
    describe('modfying transactions', () => {
      it('modifies a transaction', async () => {
        const transaction = makeFakeTransaction({amount: 100})
        await transactionsDb.insert(transaction)
        const response = await request(app)
        .patch(`${apiRoute}/transactions/${transaction.id}`)
        .send(transaction)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)

        expect(response.body.patched.amount).toBe(100)
        return transactionsDb.remove(transaction)
      })
    })
    describe('listing transactions', () => {
      it('lists transactions', async () => {
        const transaction1 = makeFakeTransaction()
        const transaction2 = makeFakeTransaction()
        const transactions = [transaction1, transaction2]
        const inserts = await Promise.all(transactions.map(transactionsDb.insert))
        const expected = [
          {
            ...transaction1,
            createdOn: inserts[0].createdOn
          },
          {
            ...transaction2,
            createdOn: inserts[1].createdOn
          }
        ]
        const response = await request(app)
        .get(`${apiRoute}/transactions`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body).toContainEqual(expected[0])
        expect(response.body).toContainEqual(expected[1])
        return transactions.map(transactionsDb.remove)
      })
    })
    describe('deleting transactions', () => {
      it('hard deletes', async () => {
        const transaction = makeFakeTransaction()
        await transactionsDb.insert(transaction)
        const response = await request(app)
        .delete(`${apiRoute}/transactions/${transaction.id}`)
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect(200)
        
        expect(response.body.deleted.deletedCount).toBe(1)
        expect(response.body.deleted.softDelete).toBe(false)
      })
    })
  })
  describe('Places', () => {
    describe('listing nearby places', () => {
      it('list nearby places', async () => {
        const response = request(app)
        .get(`${apiRoute}/places`)
        .send({
          location: '-33.8670522,151.1957362',
          radius: 15,
          limit: 10,
          query: 'coffee'
        })
        .set('Accept', 'application/json')
        .set('User-Agent', 'jest')
        .set('x-token', testData.token)
        .expect('Content-Type', /json/)
        .expect(200)
      });
    })
  })
})