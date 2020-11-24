import crypto from 'crypto'
import { Id } from '../Id/index.js'
import { buildMakeAuth } from './auth.js'

const makeAuth = buildMakeAuth({ Id })

export { makeAuth }

