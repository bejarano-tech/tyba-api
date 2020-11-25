import {makeDb} from '../../__test__/fixtures/db.js'
import {makeUsersDb} from './users-db.js'
import {makeFakeUser} from '../../__test__/fixtures/user'

describe('users db', () => {
  let usersDb

  beforeEach(async () => {
    usersDb = makeUsersDb({ makeDb })
  })

  it('lists users', async () => {
    const inserts = await Promise.all(
      [makeFakeUser(), makeFakeUser(), makeFakeUser()].map(
        usersDb.insert
      )
    )
    const found = await usersDb.findAll()
    expect.assertions(inserts.length)
    return inserts.forEach(insert => expect(found).toContainEqual(insert))
  })

  it('inserts a user', async () => {
    const user = makeFakeUser()
    const result = await usersDb.insert(user)
    return expect(result).toEqual(user)
  })

  it('finds a user by id', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    const found = await usersDb.findById(user)
    expect(found).toEqual(user)
  })

  it("finds a user by it's hash", async () => {
    const fakeUserOne = makeFakeUser()
    const fakeUserTwo = makeFakeUser()
    const insertedOne = await usersDb.insert(fakeUserOne)
    const insertedTwo = await usersDb.insert(fakeUserTwo)

    expect(await usersDb.findByHash(fakeUserOne)).toEqual(insertedOne)
    expect(await usersDb.findByHash(fakeUserTwo)).toEqual(insertedTwo)
  })

  it('updates a user', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    user.name = 'name changed'
    const updated = await usersDb.update(user)
    return expect(updated.name).toBe('name changed')
  })

  it('deletes a user', async () => {
    const user = makeFakeUser()
    await usersDb.insert(user)
    return expect(await usersDb.remove(user)).toBe(1)
  })
})
