import getFirebaseChalListCollection from '@/api/firebase/read/getFirebaseChalListCollection.js'

let lastDocFromPreviousPage = null
let endReached = false
let isFetching = false

const challengeList = {
  namespaced: true,

  state: {
    challenges: [],
  },

  getters: {
    challengeList (state) {
      return state.challenges
    },
  },

  mutations: {
    SET_CHALLENGE_LIST (state, value) {
      if (!value) {
        state.challenges = []
        return
      }

      state.challenges = value
    },

    ADD_CHALLENGE_LIST (state, value) {
      if (!value) return
      state.challenges.push(...value)
    },
  },

  actions: {
    async updateList (context) {

      if (endReached) return 'empty'
      if (isFetching) return 'isLoading'

      isFetching = true

      const { challenges, lastDoc } =
        await getFirebaseChalListCollection(lastDocFromPreviousPage)

      if (!challenges || challenges.length === 0) {
        endReached = true
        isFetching = false
        return 'empty'
      }

      lastDocFromPreviousPage = lastDoc

      context.commit('ADD_CHALLENGE_LIST', challenges)

      isFetching = false

      return 'ok'
    },
  },
}

export default challengeList