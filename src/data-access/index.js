import { makeUsersDb } from './users-db.js'
import { makeAuthDb } from './auth-db.js'
import { makePlacesDb } from './places-service.js'
import { makeTransactionsDb } from './transactions-db.js'

import mongodb from 'mongodb'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const MongoClient = mongodb.MongoClient

const {
  TB_DB_USERNAME,
  TB_DB_PASSWORD,
  TB_DB_PORT,
  TB_DB_NAME
} = process.env;

const TB_DB_HOSTNAME= process.env.TB_DB_HOSTNAME || "localhost"

const url = getDatabaseUrl()
const dbName = getDatabaseName()
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let connection

async function makeDb () {
  await makeConnection ()
  return client.db(dbName)
}

async function makeConnection () {
  if (!client.isConnected()) {
    connection = await client.connect()
  }
  return connection
}

async function makeService () {
  return axios
}

function getDatabaseUrl(){
  if (process.env.NODE_ENV !== 'test') {
    return `mongodb://${TB_DB_USERNAME}:${TB_DB_PASSWORD}@${TB_DB_HOSTNAME}:${TB_DB_PORT}/${TB_DB_NAME}?authSource=admin`;
  }else {
    return global.__MONGO_URI__
  }
}

function getDatabaseName(){
  if (process.env.NODE_ENV !== 'test') {
    return process.env.TB_DB_NAME
  }else {
    return global.__MONGO_DB_NAME__
  }
}

const usersDb = makeUsersDb({ makeDb })
const authDb = makeAuthDb({ makeDb })
const placesDb =  makePlacesDb({ makeService })
const transactionsDb =  makeTransactionsDb({ makeDb })

export { usersDb, authDb, placesDb, transactionsDb, makeDb, makeConnection }