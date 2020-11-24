import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { Id } from '../Id/index.js'
import ipRegex from 'ip-regex'
import { buildMakeUser } from './user.js'
import { buildMakeSource } from './source/index.js'

const makeSource = buildMakeSource({ isValidIp })
const makeUser = buildMakeUser({ Id, md5, encrypt, compare, makeSource })

export { makeUser }

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function encrypt(password) {
  if (!password) { return null }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

function compare(password, encryptedPassword) {
  if (!password) { return false }
  if (!encryptedPassword) { return false }
  const matchPassword = bcrypt.compareSync(password, encryptedPassword);
  return matchPassword
}