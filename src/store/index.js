import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import challenge from './challenge.js'
import user from './user.js'
import userList from './userList.js'

export default createStore({
  modules: {
    user,
    userList,
    challenge,
  },
  plugins: [
    createPersistedState({
      key: 'defiut-store',
      paths: ['user'],
    }),
  ],
})
