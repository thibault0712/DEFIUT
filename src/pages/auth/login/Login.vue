<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import ForgottenPassordPopup from '@/components/popups/forgottentPasswordPopup/ForgottenPassordPopup.vue'
  import { useToast } from '@/components/toast/useToast.js'
  import user from '@/store/user.js'

  const email = ref('')
  const password = ref('')
  const error = ref(null)

  const router = useRouter()

  const forgottenPasswordPopupIsOpen = ref(false)

  const { addMessage } = useToast()

  async function Login () {
    try {
      await user.dispatch('logIn', {
        email: email.value,
        password: password.value,
      })
      await router.push('/')
    } catch (error_) {
      addMessage(error_.message, 'error')
      error.value = error_.message
      console.error(error_.message)
    }
  }

  async function loginWithGoogle () {
    try {
      await user.dispatch('logInPopup')
      await router.push('/')
    } catch (error_) {
      error.value = error_.message
      console.error(error_.message)
    }
  }
</script>

<template>
  <Header />
  <ForgottenPassordPopup v-model:is-open="forgottenPasswordPopupIsOpen" />
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold mb-8">
        Se connecter
      </h1>

      <v-form>
        <v-text-field
          v-model="email"
          class="mb-2"
          density="comfortable"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <v-text-field
          v-model="password"
          density="comfortable"
          label="Mot de passe"
          prepend-inner-icon="mdi-lock-outline"
          type="password"
          variant="outlined"
        />

        <div class="d-flex justify-end mb-6">
          <p
            class="text-caption text-decoration-none text-grey-darken-1 font-weight-bold mt-2 cursor-pointer"
            @click="forgottenPasswordPopupIsOpen = true"
          >
            Mot de passe oublié ?
          </p>
        </div>

        <v-btn
          block
          class="text-none px-10 mb-2"
          color="primary"
          rounded="sm"
          size="large"
          variant="flat"
          @click="Login"
        >
          SE CONNECTER
        </v-btn>
      </v-form>

      <div class="d-flex align-center my-6">
        <v-divider class="opacity-100" />
        <span class="mx-4 text-caption text-grey-lighten-1">OU</span>
        <v-divider class="opacity-100" />
      </div>

      <v-btn
        block
        class="text-none mb-6"
        color="grey-lighten-4"
        size="large"
        variant="flat"
        @click="loginWithGoogle"
      >
        <template #prepend>
          <v-img
            src="/google_icon.svg"
            width="32"
          />
        </template>
        SE CONNECTER AVEC GOOGLE
      </v-btn>

      <p class="text-body-2 text-grey-darken-1">
        Pas encore de compte ?
        <router-link
          class="text-decoration-none font-weight-bold"
          style="color: #8DA34B;"
          to="/register"
        >
          S'inscrire
        </router-link>
      </p>
    </v-card>
  </v-container>
</template>
