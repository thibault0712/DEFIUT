<script setup>

  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useToast } from '@/components/toast/useToast.js'

  const isOpen = defineModel('isOpen', { required: true })

  const store = useStore()
  const { addMessage } = useToast()

  const userData = ref(store.getters['user/user'].data)
  const userName = ref(userData.value.userName)
  const userProfilePicture = ref(userData.value.imageUrl)
  const newProfilePictureFile = ref(null)
  const fileInput = ref(null)
  const isFormValid = ref(false)

  const userNameRules = [
    v => !!v || 'Le nom d\'utilisateur est requis',
    v => (v && v.length >= 5 && v.length <= 25) || 'Le nom d\'utilisateur doit être entre 5 et 25 caractères',
  ]

  async function updateUserInformation () {
    try {
      await store.dispatch('user/updateUserInformation', { userName: userName.value, profilePictureFile: newProfilePictureFile.value })
      addMessage('Données mis à jour avec succès', 'success')
    } catch (error) {
      console.error(error)
      addMessage('Impossible de mettre à jour les informations', 'error')
    }
    isOpen.value = false
  }

  function triggerUpload () {
    fileInput.value.click()
  }

  function onFileSelected (event) {
    const file = event.target.files[0]
    if (file) {
      newProfilePictureFile.value = file
      userProfilePicture.value = URL.createObjectURL(file)
    }
  }

</script>

<template>
  <v-dialog v-model="isOpen" max-width="500">
    <v-card title="Modifier son compte">
      <v-card-text class="mt-4">
        <v-form v-model="isFormValid" @submit.prevent>
          <div class="d-flex flex-column align-center mb-4">

            <v-hover v-slot="{ isHovering, props }">
              <v-avatar
                class="cursor-pointer elevation-4"
                size="150"
                v-bind="props"
                @click="triggerUpload"
              >
                <v-img alt="Photo de profil" :src="userProfilePicture">
                  <v-overlay
                    class="align-center justify-center"
                    contained
                    :model-value="isHovering"
                    scrim="#000"
                  >
                    <v-icon color="white" size="large">mdi-camera</v-icon>
                  </v-overlay>
                </v-img>
              </v-avatar>
            </v-hover>

            <div class="mt-2 text-caption">Cliquez pour modifier</div>

            <input
              ref="fileInput"
              accept="image/*"
              class="d-none"
              type="file"
              @change="onFileSelected"
            >

          </div>
          <v-text-field
            v-model="userName"
            class="mx-auto"
            density="comfortable"
            label="Nom d'utilisateur"
            placeholder="Nouveau nom d'utilisateur"
            :rules="userNameRules"
            variant="outlined"
            width="300"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" text="Annuler" @click="isOpen = false" />
        <v-btn
          color="primary"
          :disabled="!isFormValid"
          text="Sauvegarder"
          variant="tonal"
          @click="updateUserInformation"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
