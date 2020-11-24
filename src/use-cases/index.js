import {makeAddUser} from './add-user.js'
import {makeEditUser} from './edit-user.js'
import {makeRemoveUser} from './remove-user.js'
import {makeListUsers} from './list-users.js'

import {makeSignup} from './signup.js'
import {makeLogin} from './login.js'
import {makeRefresh} from './refresh.js'
import {makeLogout} from './logout.js'
import {makeRecovery} from './recovery.js'

import {makeListPlaces} from './list-places.js'

import {makeAddTransaction} from './add-transaction.js'
import {makeEditTransaction} from './edit-transaction.js'
import {makeRemoveTransaction} from './remove-transaction.js'
import {makeListTransactions} from './list-transactions.js'

import {usersDb, authDb, placesDb, transactionsDb} from '../data-access/index.js'

const addUser = makeAddUser({ usersDb })
const editUser = makeEditUser({ usersDb })
const listUsers = makeListUsers({ usersDb })
const removeUser = makeRemoveUser({ usersDb })

const signupCase = makeSignup({ usersDb })
const loginCase = makeLogin({ usersDb })
const refreshCase = makeRefresh({ usersDb })
const logoutCase = makeLogout({ authDb })
const recoveryCase = makeRecovery({ authDb })

const listPlaces = makeListPlaces({ placesDb })

const addTransaction = makeAddTransaction({ transactionsDb })
const editTransaction = makeEditTransaction({ transactionsDb })
const listTransactions = makeListTransactions({ transactionsDb })
const removeTransaction = makeRemoveTransaction({ transactionsDb })


const userService = Object.freeze({
  addUser,
  editUser,
  listUsers,
  removeUser
})

const authService = Object.freeze({
  signupCase,
  loginCase,
  refreshCase,
  logoutCase,
  recoveryCase
})

const placesService = Object.freeze({
  listPlaces
})

const transactionService = Object.freeze({
  addTransaction,
  editTransaction,
  listTransactions,
  removeTransaction
})

export {userService}
export { addUser, editUser, listUsers, removeUser }
export {authService}
export { signupCase, loginCase, refreshCase, logoutCase, recoveryCase }
export {placesService}
export {listPlaces}
export {transactionService}
export { addTransaction, editTransaction, listTransactions, removeTransaction }