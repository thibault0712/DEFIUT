/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Composables
import { createApp } from 'vue'

import { VueFire, VueFireAuth } from 'vuefire'

import { auth, firebaseApp } from '@/api/firebase/firebaseApp.js'
// Plugins
import { registerPlugins } from '@/plugins'
import user from '@/store/user.js'
// Components
import App from './App.vue'
// Styles
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import 'unfonts.css'

const app = createApp(App)

app.use(user)

auth.onAuthStateChanged(fetchedUser => {
  user.dispatch('fetchUser', fetchedUser)
})

app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

registerPlugins(app)

app.mount('#app')
