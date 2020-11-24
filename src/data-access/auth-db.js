  
import { Id } from '../Id/index.js'

function makeAuthDb ({ makeDb }) {
  return Object.freeze({
    signup,
    login,
    recovery,
    insert
  })
  async function signup () {
  }
  async function login ({ id: _id = Id.makeId(), ...userInfo }) {
  }
  async function recovery ({ id: _id, ...userInfo }) {
  }
  async function insert ({ id: _id, token }) {
    const db = await makeDb()
    await db.collection('sessions').createIndex({ token : 1, expireAfterSeconds: 120 });

    const result = await db
      .collection('sessions')
      .insertOne({ _id, token })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

}

export {makeAuthDb}