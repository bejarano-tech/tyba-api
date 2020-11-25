  
import {
    addUser,
    editUser,
    listUsers,
    removeUser,
    singupCase,
    loginCase,
    refreshCase,
    logoutCase,
    recoveryCase,
    listPlaces,
    removeTransaction,
    listTransactions,
    addTransaction,
    editTransaction
  } from '../use-cases/index.js'

  import {makeGetUsers} from './get-users.js'
  import {makeDeleteUser} from './delete-user.js'
  import {makePostUser} from './post-user.js'
  import {makePatchUser} from './patch-user.js'

  import {makeSingup} from './post-singup.js'
  import {makeLogin} from './post-login.js'
  import {makeRefresh} from './post-refresh.js'
  import {makeLogout} from './post-logout.js'
  import {makeRecovery} from './post-recovery.js'

  import {makeGetPlaces} from './get-places.js'

  import {makeGetTransactions} from './get-transactions.js'
  import {makeDeleteTransaction} from './delete-transaction.js'
  import {makePostTransaction} from './post-transaction.js'
  import {makePatchTransaction} from './patch-transaction.js'

  import {notFound} from './not-found.js'
  
  const deleteUser = makeDeleteUser({ removeUser })
  const getUsers = makeGetUsers({ listUsers })
  const postUser = makePostUser({ addUser })
  const patchUser = makePatchUser({ editUser })

  const postSingup = makeSingup({ singupCase })
  const postLogin = makeLogin({ loginCase })
  const postRefresh = makeRefresh({ refreshCase })
  const postLogout = makeLogout({ logoutCase })
  const postRecovery = makeRecovery({ recoveryCase })
  
  const getPlaces = makeGetPlaces({ listPlaces })
  
  const deleteTransaction = makeDeleteTransaction({ removeTransaction })
  const getTransactions = makeGetTransactions({ listTransactions })
  const postTransaction = makePostTransaction({ addTransaction })
  const patchTransaction = makePatchTransaction({ editTransaction })
  
  const userController = Object.freeze({
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser,
    postSingup,
    postLogin,
    postRefresh,
    postLogout,
    postRecovery,
    getPlaces,
    deleteTransaction,
    getTransactions,
    postTransaction,
    patchTransaction
  })
  
  export { userController };
  export {
    deleteUser,
    getUsers,
    notFound,
    postUser,
    patchUser,
    postSingup,
    postLogin,
    postRefresh,
    postLogout,
    postRecovery,
    getPlaces,
    deleteTransaction,
    getTransactions,
    postTransaction,
    patchTransaction
  }