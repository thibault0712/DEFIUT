import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import user from './user.js'
import userList from './userList.js'

export default createStore({
  modules: {
    user,
    userList,
  },
  plugins: [
    createPersistedState({
      key: 'defiut-store',
      paths: ['user'],
    }),
  ],
})
