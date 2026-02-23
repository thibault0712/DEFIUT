<script setup>

  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  import { useToast } from '@/components/toast/useToast.js'

  const store = useStore()
  const isOpen = defineModel('isOpen', { required: true })
  const router = useRouter()

  const { addMessage } = useToast()

  async function removeAccount () {
    try {
      await store.dispatch('user/removeUser')
      addMessage('Votre compte a bien été supprimé', 'success')
      await router.push('/')
    } catch {
      addMessage('Vous devez vous reconnecter afin de supprimer votre compte', 'error')
    }
    isOpen.value = false
  }

</script>

<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card title="Supprimer son compte">
      <v-card-text class="pb-0">
        Êtes vous sûr de vouloir supprimer votre compte ? Cette action est irréversible
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="error"
          text="Confirmer"
          variant="tonal"
          @click="removeAccount"
        />
        <v-btn color="primary" text="Annuler" @click="isOpen = false" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
