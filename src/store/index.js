import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './user.js';
import challenge from './challenge.js'
import userList from './userList.js';
import otherUser from './otherUser.js';

export default createStore({
  modules: {
    user,
    userList,
    challenge,
    otherUser,
  },
  plugins: [
    createPersistedState({
      key: 'defiut-store',
      paths: ['user'],
    }),
  ],
});
