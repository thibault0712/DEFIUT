import { createUserWithEmailAndPassword, deleteUser, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'
import { useTheme } from 'vuetify'
import createFirebaseUserCollection from '@/api/firebase/create/createFirebaseUserCollection.js'
import deleteFirebaseUserCollection from '@/api/firebase/delete/deleteFirebaseUserCollection.js'
import getFirebaseUserCollection from '@/api/firebase/read/getFirebaseUserCollection.js'
import updateFirebaseUserCollection from '@/api/firebase/update/updateFirebaseUserCollection.js'
import { auth, googleAuthProvider } from '@/api/firebaseApp.js'
import uploadUserProfilePicture from '@/api/firestore/uploadUserProfilePicture.js'
import isPreviousCalendarDay from '@/utils/isPreviousCalendarDay.js'

const user = {
  namespaced: true,
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
        points: value.points,
      }
    },
  },

  actions: {
    async register (context, { email, password, userName }) {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        if (response) {
          const imageUrl = 'https://api.dicebear.com/9.x/bottts/svg?seed=' + userName + '&backgroundColor=BA2653&backgroundType=solid&scale=80'
          await createFirebaseUserCollection(response.user.uid, userName, response.user.email, imageUrl, Timestamp.now(), Timestamp.now(), 'darkTheme', 0)
          await sendEmailVerification(response.user)
          await context.dispatch('logOut') // Due to email validation, the user is automatically logged out
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

    // Used for registration and login
    async signInWithGoogle (context) {
      const response = await signInWithPopup(auth, googleAuthProvider)
      if (response) {
        const userData = await getFirebaseUserCollection(response.user.uid)

        // Create the user if it does not exist yet
        if (userData) {
          await context.dispatch('fetchUser', response.user)
        } else {
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
            points: 0,
          },
          )
          await createFirebaseUserCollection(response.user.uid, userName, response.user.email, imageUrl, Timestamp.now(), Timestamp.now(), 'darkTheme', 0)
        }
      } else {
        throw new Error('Impossible d\'enregistrer l\'utilisateur')
      }
    },

    async logIn (context, { email, password }) {
      try {
        const response = await signInWithEmailAndPassword(auth, email, password)
        if (response) {
          if (response.user.emailVerified === false) {
            await context.dispatch('logOut')
            throw new Error('Vous devez dans un premier temps valider votre email')
          }
          await context.dispatch('fetchUser', response.user)
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
        points: userData.points,
      })

      if (isPreviousCalendarDay(userData.lastLogin)) {
        await updateFirebaseUserCollection(user.uid, userData.userName, user.email, userData.imageUrl, Timestamp.now(), userData.registeredAt, userData.theme, userData.points)
      }
    },

    async removeUser (context) {
      const uid = context.getters.user.data.uid
      await deleteUser(auth.currentUser)
      // Don't use the logout function because deleteUser logout the user automatically
      await deleteFirebaseUserCollection(uid)
      context.commit('SET_USER', null)
      context.commit('SET_LOGGED_IN', false)
    },

    async updateTheme (context, theme) {
      const user = context.getters.user.data
      context.commit('SET_USER', { ...user, theme })
      await updateFirebaseUserCollection(user.uid, user.userName, user.email, user.imageUrl, user.lastLogin, user.registeredAt, theme, user.points)
    },

    async forgotPassword (context, email) {
      await sendPasswordResetEmail(auth, email)
    },

    async updateUserInformation (context, { userName, profilePictureFile }) {
      const userData = context.getters.user.data
      let profilePictureUrl = userData.imageUrl

      if (profilePictureFile !== null) {
        profilePictureUrl = await uploadUserProfilePicture(profilePictureFile, userName)
      }

      await updateFirebaseUserCollection(userData.uid, userName, userData.email, profilePictureUrl, userData.lastLogin, userData.registeredAt, userData.theme, userData.points)
      context.commit('SET_USER', {
        ...userData,
        userName,
        imageUrl: profilePictureUrl,
      })
    },
  },
}

export default user
