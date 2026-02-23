<script setup>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useToast } from '@/components/toast/useToast.js'
  import router from '@/router/index.js'

  const store = useStore()
  const userName = ref('')
  const email = ref('')
  const password = ref('')
  const repassword = ref('')
  const acceptTerms = ref(false)
  const isFormValid = ref(false)

  const error = ref(null)

  const { addMessage } = useToast()

  const userNameRules = [
    v => !!v || 'Le nom d\'utilisateur est requis',
    v => (v && v.length >= 5 && v.length <= 25) || 'Le nom d\'utilisateur doit être entre 5 et 25 caractères',
  ]

  const emailRules = [
    v => !!v || 'L\'email est requis',
    v => /.+@.+\..+/.test(v) || 'L\'email doit être valide',
  ]

  const passwordRules = [
    v => !!v || 'Le mot de passe est requis',
    v => (v && v.length >= 6) || 'Le mot de passe doit faire au moins 6 caractères',
  ]

  const repasswordRules = [
    v => !!v || 'La confirmation du mot de passe est requise',
    v => v === password.value || 'Les mots de passe ne correspondent pas',
  ]

  const termsRules = [
    v => !!v || 'Vous devez accepter les conditions générales',
  ]

  async function registerPopup () {
    try {
      await store.dispatch('user/signInWithGoogle')
      await router.push('/')
    } catch (error_) {
      addMessage(error_.message, 'error')
      error.value = error_.message
      console.error(error_.message)
    }
  }

  async function register () {
    try {
      await store.dispatch('user/register', {
        email: email.value,
        password: password.value,
        userName: userName.value,
      })
      await router.push('/login')
      addMessage('Un email de validation vous a été envoyé !', 'info')
    } catch (error_) {
      addMessage(error_.message, 'error')
      error.value = error_.message
      console.error(error_.message)
    }
  }

</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8 text-center "
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold mb-8">
        S'inscrire
      </h1>

      <v-form v-model="isFormValid">
        <v-text-field
          v-model="userName"
          class="mb-2"
          density="comfortable"
          label="Nom d'utilisateur"
          required
          :rules="userNameRules"
          variant="outlined"
        />

        <v-text-field
          v-model="email"
          class="mb-2"
          density="comfortable"
          label="Email"
          required
          :rules="emailRules"
          variant="outlined"
        />

        <v-text-field
          v-model="password"
          class="mb-2"
          density="comfortable"
          label="Mot de passe"
          required
          :rules="passwordRules"
          type="password"
          variant="outlined"
        />

        <v-text-field
          v-model="repassword"
          density="comfortable"
          label="Confirmer le mot de passe"
          required
          :rules="repasswordRules"
          type="password"
          variant="outlined"
        />

        <v-checkbox
          v-model="acceptTerms"
          required
          :rules="termsRules"
        >
          <template #label>
            <div>
              J'accepte les
              <router-link
                style="color: inherit"
                target="_blank"
                to="/about/cgu"
              >
                termes et conditions
              </router-link>
            </div>
          </template>
        </v-checkbox>

        <v-btn
          block
          class="text-none px-10 mb-2"
          :color="!isFormValid ? 'grey lighten-4' : 'primary'"
          :disabled="!isFormValid"
          rounded="sm"
          size="large"
          variant="flat"
          @click="register"
        >
          S'INSCRIRE
        </v-btn>
      </v-form>

      <div class="d-flex align-center my-6">
        <v-divider class="opacity-100" />
        <span class="mx-4 text-caption">OU</span>
        <v-divider class="opacity-100" />
      </div>

      <v-btn
        block
        class="text-none"
        color="grey-lighten-4"
        size="large"
        style="color: #444 !important;"
        variant="flat"
        @click="registerPopup"
      >
        <template #prepend>
          <v-img
            src="/google_icon.svg"
            width="32"
          />
        </template>
        S'INSCRIRE AVEC GOOGLE
      </v-btn>
      <p class="text-body-2 text-grey-darken-1 mt-6">
        Déjà un compte ?
        <router-link
          class="text-decoration-none font-weight-bold"
          style="color: #8DA34B;"
          to="/login"
        >
          Se connecter
        </router-link>
      </p>
    </v-card>

  </v-container>
  <Header />

</template>
