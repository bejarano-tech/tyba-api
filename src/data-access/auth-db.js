  
import { Id } from '../Id/index.js'

function makeAuthDb ({ makeDb }) {
  return Object.freeze({
    singup,
    login,
    recovery,
    insert
  })
  async function singup () {
  }
  async function login ({ id: _id = Id.makeId(), ...userInfo }) {
  }
  async function recovery ({ id: _id, ...userInfo }) {
  }
  async function insert ({ id: _id, token }) {
    const db = await makeDb()

    const result = await db
      .collection('sessions')
      .insertOne({ _id, token })
    const { _id: id, ...insertedInfo } = result.ops[0]
    return { id, ...insertedInfo }
  }

}

export {makeAuthDb}