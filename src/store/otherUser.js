import getUserByID from '@/api/firebase/read/getUserByID.js';

const otherUser = {
  namespaced: true,
  state: {
    user: {
      data: null,
    },
  },

  getters: {
    user(state) {
      return state.user;
    },
  },

  mutations: {
    SET_USER(state, value) {
      if (value === null) {
        state.user.data = null;
        return;
      }

      state.user.data = {
        uid: value.uid,
        userName: value.userName,
        email: value.email,
        imageUrl: value.imageUrl,
        lastLogin: value.lastLogin,
        registeredAt: value.registeredAt,
        theme: value.theme,
        points: value.points,
        challenges: value.challenges,
        badges: value.badges,
      };
    },
  },

  actions: {
    async fetchUserByID(context, uid) {
      if (!uid) {
        context.commit('SET_USER', null);
        return;
      }
      const userData = await getUserByID(uid);

      if (!userData) return;

      context.commit('SET_USER', {
        uid: uid,
        userName: userData.userName,
        email: userData.email,
        imageUrl: userData.imageUrl,
        lastLogin: userData.lastLogin,
        registeredAt: userData.registeredAt,
        theme: userData.theme,
        points: userData.points,
        challenges: userData.challenges,
        badges: userData.badges,
      });
    },
  },
};

export default otherUser;
