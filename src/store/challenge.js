import getFirebaseChalCollection from '@/api/firebase/read/getFirebaseChalCollection.js'

const challenge = {
  namespaced: true,
  state: {
    currentChallenge: null,
  },

  getters: {
    currentChallenge (state) {
      return state.currentChallenge
    },
  },

  mutations: {
    SET_CURRENT_CHALLENGE (state, value) {
      state.currentChallenge = value
    },
  },

  actions: {
    async fetchChallenge (context, challengeId) {
      const data = await getFirebaseChalCollection(challengeId)
      context.commit('SET_CURRENT_CHALLENGE', data)
      return data
    },
  },
}

export default challenge
