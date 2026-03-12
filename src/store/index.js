import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user.js';
import userList from './userList.js';
import otherUser from './otherUser.js';

export default createStore({
  modules: {
    user,
    userList,
    otherUser,
  },
  plugins: [
    createPersistedState({
      key: 'defiut-store',
      paths: ['user'],
    }),
  ],
});
