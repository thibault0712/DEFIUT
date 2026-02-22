<script setup>

  import { ref } from 'vue'
  import { useToast } from '@/components/toast/useToast.js'
  import user from '@/store/user.js'

  const isOpen = defineModel('isOpen', { required: true })

  const email = ref('')

  const { addMessage } = useToast()

  function sendEmail () {
    try {
      user.dispatch('forgotPassword', email.value)
      addMessage('Un email vous a été envoyé', 'success')
    } catch {
      addMessage('Echec de l\'envoie du mail', 'error')
    }
    email.value = ''
    isOpen.value = false
  }

</script>

<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card title="Mot de passe oublié ?">
      <v-card-text class="pb-0">
        <v-text-field
          v-model="email"
          label="Email"
          required
        />
      </v-card-text>

      <v-card-actions>
        <v-btn text="Fermer" @click="isOpen = false" />
        <v-btn
          color="primary"
          text="Envoyer"
          variant="tonal"
          @click="sendEmail"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
