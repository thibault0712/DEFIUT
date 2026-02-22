import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import createFirebaseUserCollection from '@/api/firebase/create/createFirebaseUserCollection.js'
import { auth, googleAuthProvider } from '@/api/firebase/firebaseApp.js'
import getFirebaseUserCollection from '@/api/firebase/read/getFirebaseUserCollection.js'
import updateFirebaseUserCollection from '@/api/firebase/update/updateFirebaseUserCollection.js'

const user = createStore({

  state: {
    user: {
      loggedIn: false,
      data: null,
    },
  },

  getters: {
    user (state) {
      return state.user
    },
  },

  mutations: {
    SET_LOGGED_IN (state, value) {
      state.user.loggedIn = value
    },
    SET_USER (state, value) {
      if (value === null) {
        state.user.data = null
        return
      }

      state.user.data = {
        uid: value.uid,
        userName: value.userName,
        email: value.email,
        imageUrl: value.imageUrl,
        lastLogin: value.lastLogin,
        registeredAt: value.registeredAt,
        theme: value.theme,
      }
    },
  },

  actions: {
    async register (context, { email, password, userName }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (response) {
          const imageUrl = 'https://api.dicebear.com/9.x/bottts/svg?seed=' + userName + '&backgroundColor=BA2653&backgroundType=solid&scale=80'
          await createFirebaseUserCollection(response.user.uid, userName, response.user.email, imageUrl, Timestamp.now(), Timestamp.now(), 'darkTheme')
          await sendEmailVerification(response.user)
          await context.dispatch('logOut') // Due to email validation, the user is automatically logged out (email is not verified yet)
        } else {
          throw new Error('Impossible d\'enregistrer l\'utilisateur')
        }
      } catch (error_) {
        let message = 'Une erreur est survenue lors de l\'inscription'
        switch (error_.code) {
          case 'auth/email-already-in-use': {
            message = 'Cette adresse email est déjà utilisée'

            break
          }
          case 'auth/weak-password': {
            message = 'Le mot de passe est trop court'

            break
          }
          case 'auth/invalid-email': {
            message = 'L\'adresse email est invalide'

            break
          }
        // No default
        }
        throw new Error(message)
      }
    },

    async registerPopup (context) {
      const response = await signInWithPopup(auth, googleAuthProvider)
      if (response) {
        const userName = 'Utilisateur' + Math.random().toString(36).slice(0, 8)
        const imageUrl = 'https://api.dicebear.com/9.x/bottts/svg?seed=' + userName + '&backgroundColor=BA2653&backgroundType=solid&scale=80'
        context.commit('SET_USER', {
          uid: response.user.uid,
          userName,
          email: response.user.email,
          imageUrl,
          lastLogin: Timestamp.now(),
          registeredAt: Timestamp.now(),
          theme: 'darkTheme',
        },
        )
        await createFirebaseUserCollection(response.user.uid, userName, response.user.email, imageUrl, Timestamp.now(), Timestamp.now(), 'darkTheme')
      } else {
        throw new Error('Unable to register user')
      }
    },

    async logIn (context, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
          if (response.user.emailVerified === false) {
            await user.dispatch('logOut')
            throw new Error('Vous devez dans un premier temps valider votre email')
          }
          await user.dispatch('fetchUser', response.user)
        } else {
          throw new Error('Impossible de se connecter, erreur inconnue')
        }
      } catch (error_) {
        let message = error_.message
        switch (error_.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential': {
            message = 'Identifiant ou mot de passe incorrect'

            break
          }
          case 'auth/invalid-email': {
            message = 'L\'adresse email est invalide'

            break
          }
          case 'auth/too-many-requests': {
            message = 'Trop de tentatives, réessayez plus tard'

            break
          }
        // No default
        }
        throw new Error(message)
      }
    },

    async logInPopup () {
      const response = await signInWithPopup(auth, googleAuthProvider)
      if (response) {
        await user.dispatch('fetchUser', response.user)
      } else {
        throw new Error('login failed')
      }
    },

    async logOut (context) {
      await signOut(auth)
      context.commit('SET_USER', null)
      context.commit('SET_LOGGED_IN', false)
    },

    async fetchUser (context, user) {
      if (!user) {
        context.commit('SET_USER', null)
        context.commit('SET_LOGGED_IN', false)
        return
      }

      context.commit('SET_LOGGED_IN', true)

      const userData = await getFirebaseUserCollection(user.uid)

      if (!userData) {
        // User could not be created in database due to delay insertion
        return
      }

      context.commit('SET_USER', {
        uid: user.uid,
        userName: userData.userName,
        email: user.email,
        imageUrl: userData.imageUrl,
        lastLogin: userData.lastLogin,
        registeredAt: userData.registeredAt,
        theme: userData.theme,
      })

      // Could be very greedy
      await updateFirebaseUserCollection(user.uid, userData.userName, user.email, userData.imageUrl, Timestamp.now(), userData.registeredAt, userData.theme)
    },

    async updateTheme (context, theme) {
      const user = context.getters.user.data
      context.commit('SET_USER', { ...user, theme })
      await updateFirebaseUserCollection(user.uid, user.userName, user.email, user.imageUrl, user.lastLogin, user.registeredAt, theme)
    },

    async forgotPassword (context, email) {
      await sendPasswordResetEmail(auth, email)
    },
  },

  plugins: [
    createPersistedState({
      key: 'defiut-store',
      paths: ['user'],
    }),
  ],
})

export default user
