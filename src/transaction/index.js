import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { Id } from '../Id/index.js'
import ipRegex from 'ip-regex'
import { buildMakeTransaction } from './transaction.js'
import { buildMakeSource } from './source/index.js'

const makeSource = buildMakeSource({ isValidIp })
const makeTransaction = buildMakeTransaction({ Id, md5, encrypt, compare, makeSource })

export { makeTransaction }

function isValidIp (ip) {
  return ipRegex({ exact: true }).test(ip)
}

function md5 (text) {
  return crypto
    .createHash('md5')
    .update(text, 'utf-8')
    .digest('hex')
}

function encrypt(payload) {
  if (!payload) { return null }
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(payload, salt)
  return hash
}

function compare(payload, encryptedPayload) {
  if (!payload) { return false }
  if (!encryptedPayload) { return false }
  const matchPayload = bcrypt.compareSync(payload, encryptedPayload);
  return matchPayload
}