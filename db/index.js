import { makeDb } from '../src/data-access/index.js'
import dotenv from 'dotenv'
dotenv.config()
;(async function setupDb () {
  console.log('Setting up database...')
  // database collection will automatically be created if it does not exist
  // indexes will only be added if they don't exist
  const db = await makeDb()
  await db.collection('users').createIndexes([
    { key: { hash: 1 }, name: 'hash_idx' },
    { key: { email: -1 }, name: 'email_idx' },
    { key: { name: -1 }, name: 'name_idx' }
    ])
  await db.collection('transactions').createIndexes([
    { key: { from: 1 }, name: 'from_idx' },
    { key: { to: -1 }, name: 'to_idx' },
    { key: { amount: -1 }, name: 'amount_idx' }
    ])
    await db.collection('sessions').createIndexes([
    { key: { token: 1 }, name: 'token_idx', expireAfterSeconds: 120}
    ])
  console.log('Database setup complete...')
  process.exit()
})()