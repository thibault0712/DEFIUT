import getFirebaseUserListCollection from '@/api/firebase/read/getFirebaseUserListCollection.js'

let lastDocFromPreviousPage = null
let endReached = false
let isFetching = false

const userList = {
  namespaced: true,
  state: {
    users: [],
  },

  getters: {
    userList (state) {
      return state.users
    },
  },

  mutations: {
    SET_USER_LIST (state, value) {
      if (value === null) {
        state.users = null
        return
      }

      state.users = value
    },
    ADD_USER_LIST (state, value) {
      if (value === null) {
        return
      }

      const userList = state.users

      state.users.push.apply(userList, value)
    },
  },

  actions: {
    async updateList (context) {
      if (endReached) {
        return ('empty')
      }

      if (isFetching) {
        return ('isLoading')
      }

      isFetching = true
      const { users, lastDoc } = await getFirebaseUserListCollection(lastDocFromPreviousPage)
      if (lastDoc === null) {
        endReached = true
        return ('empty')
      }
      lastDocFromPreviousPage = lastDoc
      context.commit('ADD_USER_LIST', users)
      isFetching = false
      return ('ok')
    },
  },
}

export default userList
