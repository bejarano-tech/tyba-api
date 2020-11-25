import axios from 'axios'
import { transactionsDb, usersDb} from '../src/data-access/index.js'

import { makeFakeUser } from './fixtures/user.js'
import { makeFakeTransaction } from './fixtures/transaction.js'

import dotenv from 'dotenv'
dotenv.config()

describe('Tyba API', () => {

  let user
  beforeAll( async () => {
    axios.defaults.baseURL = `${process.env.TB_BASE_URL}:${process.env.PORT}${process.env.TB_API_ROOT}`
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500
    }

    user = makeFakeUser({name: "Fred",email: 'fred@example.com', password: 'test'})
    await axios.post(
      '/auth/signup',
      {name: user.name, email: user.email, password: user.password}
    )

    const login = await axios.post(
      '/auth/login',
      {email: user.email, password: user.password}
    )
    const { posted } = login.data
    axios.defaults.headers.common['jwt'] = posted

  })

  afterAll(async () => {
    try {
      usersDb.remove(user)
    } catch (error) {
      console.log(error);
    }
  })

  describe('Auth', () => {
    describe('singing users', () => {
      it('singup a user', async () => {
        const {name, email, password} = makeFakeUser({name: "Fred",email: 'effred@example.com', password: 'test'})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(201)
        const { posted } = response.data
        const doc = await usersDb.findById(posted)
        expect(doc).toEqual(posted)
        return usersDb.remove(posted)
      });
      it('requires user to contain a name', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, name: undefined})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      });
      it('requires user to contain a email', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, email: undefined})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      });
      it('requires user to contain a password', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, password: undefined})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()

      });
    })
    describe('logining users', () => {
      it('login a user', async () => {
        const response = await axios.post(
          '/auth/login',
          {email: user.email, password: "test"}
        )
        expect(response.status).toBe(201)
        const { posted } = response.data
        // TODO Verify Token
      });
      it('requires user to contain an email', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, email: undefined})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      });
      it('requires user to contain a password', async () => {
        const {name, email, password} = makeFakeUser({id: undefined, password: undefined})
        const response = await axios.post(
          '/auth/signup',
          {name, email, password}
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      });
      it('it must be a valid token', async () => {
        const response = await axios.post(
          '/auth/login',
          {email: user.email, password: "test"}
        )
        const { posted } = response.data
        expect(response).toBeDefined()
      });
    })
    describe('logout users', () => {
      it('logout a user', async () => {
        const response = await axios.post(
          '/auth/logout'
        )
        expect(response.status).toBe(200)
      });
    })
    describe('authorizing users', () => {
      it('authorize a user', async () => {
        const response = await axios.get(
          '/transactions'
        )
        expect(response.status).toBe(200)
      });
      it('unauthorize a user', async () => {
        const response = await axios.get(
          '/transactions',
          {
            headers: {
              jwt: null
            }
          }
        )
        expect(response.status).toBe(403)
      });
    })

  })

  describe('Users', () => {  
    describe('adding users', () => {
      // Content moderator API only allows 1 request per second.
      beforeEach(done => setTimeout(() => done(), 1100))
      it('adds a user to the database', async () => {
        const response = await axios.post(
          '/users/',
          makeFakeUser({
            id: undefined,
            name: 'Test Name'
          })
        )
        expect(response.status).toBe(201)
        const { posted } = response.data
        const doc = await usersDb.findById(posted)
        expect(doc).toEqual(posted)
        return usersDb.remove(posted)
      })
      it('requires user to contain a name', async () => {
        const response = await axios.post(
          '/users',
          makeFakeUser({ id: undefined, name: undefined })
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      })
      it('requires user to contain email', async () => {
        const response = await axios.post(
          '/users',
          makeFakeUser({ id: undefined, email: undefined })
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      })
    })
    describe('modfying users', () => {
      // Content moderator API only allows 1 request per second.
      beforeEach(done => setTimeout(() => done(), 1100))
      it('modifies a user', async () => {
        const user = makeFakeUser({
          email: 'pepe@example.com'
        })
        await usersDb.insert(user)
        const response = await axios.patch(`/users/${user.id}`, user)
        expect(response.status).toBe(200)
        expect(response.data.patched.email).toBe('pepe@example.com')
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
        const response = await axios.get('/users/')
        expect(response.data).toContainEqual(expected[0])
        expect(response.data).toContainEqual(expected[1])
        return users.map(usersDb.remove)
      })
    })
    describe('deleting users', () => {
      it('hard deletes', async () => {
        const user = makeFakeUser()
        await usersDb.insert(user)
        const result = await axios.delete(`/users/${user.id}`)
        expect(result.data.deleted.deletedCount).toBe(1)
        expect(result.data.deleted.softDelete).toBe(false)
      })
    })
  })
  describe('Transactions', () => {  
    describe('adding transactions', () => {
      beforeEach(done => setTimeout(() => done(), 1100))
      it('adds a transaction to the database', async () => {
        const response = await axios.post(
          '/transactions',
          makeFakeTransaction({
            id: undefined,
            from: 'test-from',
            to: 'test-to',
            amount: 100,
            payload: {message: "test"}
          })
        )
        expect(response.status).toBe(201)
        const { posted } = response.data
        const doc = await transactionsDb.findById(posted)
        expect(doc).toEqual(posted)
        return transactionsDb.remove(posted)
      })
      it('requires transaction to contain a from', async () => {
        const response = await axios.post(
          '/transactions',
          makeFakeTransaction({ id: undefined, from: undefined })
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      })
      it('requires transaction to contain a to', async () => {
        const response = await axios.post(
          '/transactions',
          makeFakeTransaction({ id: undefined, to: undefined })
        )
        expect(response.status).toBe(400)
        expect(response.data.error).toBeDefined()
      })
    })
    describe('modfying transactions', () => {
      beforeEach(done => setTimeout(() => done(), 1100))
      it('modifies a transaction', async () => {
        const transaction = makeFakeTransaction({amount: 100})
        await transactionsDb.insert(transaction)
        const response = await axios.patch(`/transactions/${transaction.id}`, transaction)
        expect(response.status).toBe(200)
        expect(response.data.patched.amount).toBe(100)
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
        const response = await axios.get('/transactions/')
        expect(response.data).toContainEqual(expected[0])
        expect(response.data).toContainEqual(expected[1])
        return transactions.map(transactionsDb.remove)
      })
    })
    describe('deleting transactions', () => {
      it('hard deletes', async () => {
        const transaction = makeFakeTransaction()
        await transactionsDb.insert(transaction)
        const result = await axios.delete(`/transactions/${transaction.id}`)
        expect(result.data.deleted.deletedCount).toBe(1)
        expect(result.data.deleted.softDelete).toBe(false)
      })
    })
  })
  describe('Places', () => {
    describe('listing nearby places', () => {
      it('list nearby places', async () => {
        const response = await axios.get('/places/', {
          params: {
            location: '-33.8670522,151.1957362',
            radius: 15,
            limit: 10,
            query: 'coffee'
          }
        })
        expect(response.data.length).toBe(3)
      });
    })
  })
})

