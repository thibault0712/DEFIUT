<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { httpsCallable } from 'firebase/functions'
  import { functions, auth } from '@/api/firebaseApp.js'

  const route = useRoute()
  const store = useStore()

  const flagInput = ref('')
  const showIndiceDialog = ref(false)
  const currentIndice = ref(null)
  const loading = ref(true)
  const flagLoading = ref(false)
  const flagResult = ref(null) // { success: boolean, message: string }

  const challenge = computed(() => store.getters['challenge/currentChallenge'])

  onMounted(async () => {
    await store.dispatch('challenge/fetchChallenge', route.params.id)
    loading.value = false
  })

  async function submitFlag () {
    if (!flagInput.value.trim()) return

    flagLoading.value = true
    flagResult.value = null

    try {
      const { data } = await httpsCallable(functions, 'isFlag')({ challengeId: route.params.id, flag: flagInput.value })
      flagResult.value = data
      if (data.success) {
        await store.dispatch('user/fetchUser', auth.currentUser)
        flagInput.value = ''
      }
    } catch (error) {
      flagResult.value = { success: false, message: error?.message || 'Une erreur est survenue. Réessayez.' }
    } finally {
      flagLoading.value = false
    }
  }

  function openIndiceDialog (indice) {
    currentIndice.value = indice
    showIndiceDialog.value = true
  }

  function closeIndiceDialog () {
    showIndiceDialog.value = false
    currentIndice.value = null
  }
</script>

<template>
  <Header />

  <v-main class="min-vh-100 pt-0 pb-16 h-screen">
    <v-container v-if="loading" class="d-flex justify-center align-center" style="height: 50vh;">
      <v-progress-circular color="primary" indeterminate size="64" />
    </v-container>

    <v-container v-else-if="challenge" class="py-12" fluid max-width="1400">
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-start">
            <div>
              <h1 class="text-h2 mb-2">
                {{ challenge.title }}
              </h1>
              <p class="text-h5 text-center" style="color: white">
                {{ challenge.catchPhrase }}
              </p>
            </div>

            <div class="text-right">
              <p class="text-h6 mb-1" style="color: #8a9b46">
                Nombre de points : {{ challenge.points }}
              </p>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div class="mb-6">
            <h3 class="text-h5 mb-2">
              Difficultée :
              <span style="color: #8a9b46">{{ challenge.difficulty }}</span>
            </h3>
          </div>

          <div class="mb-6">
            <h3 class="text-h5 mb-3">Flag :</h3>
            <div class="d-flex align-center">
              <v-text-field
                v-model="flagInput"
                class="mr-4"
                density="comfortable"
                hide-details
                placeholder="FLAG-AAAAA-{aaaa_aaaa_aaaa_aaaa}"
                variant="outlined"
                :disabled="flagLoading"
                @keyup.enter="submitFlag"
              />
              <v-btn
                class="text-none"
                color="#8A9B46"
                size="large"
                variant="flat"
                :loading="flagLoading"
                @click="submitFlag"
              >
                VALIDER
              </v-btn>
            </div>

            <v-alert
              v-if="flagResult"
              class="mt-3"
              :type="flagResult.success ? 'success' : 'error'"
              density="compact"
              variant="tonal"
            >
              {{ flagResult.message }}
            </v-alert>
          </div>

          <div class="mb-6">
            <h3 class="text-h5 mb-3">Liens/Ressource :</h3>
            <div
              v-for="(link, index) in challenge.links"
              :key="index"
              class="mb-1"
            >
              <a
                class="text-body-1"
                :href="`https://${link}`"
                style="color: white; text-decoration: none"
              >
                {{ link }}
              </a>
            </div>
          </div>

          <div class="d-flex gap-4">
            <v-btn
              v-for="indice in challenge.clues"
              :key="indice.id"
              class="text-none"
              color="#8A9B46"
              size="large"
              variant="flat"
              @click="openIndiceDialog(indice)"
            >
              INDICE {{ indice.id }} ({{ indice.points }} POINTS)
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div>
            <h4 class="text-h4 mb-3">Description :</h4>
            <p
              class="text-body-1"
              style="line-height: 1.8; white-space: pre-line"
            >
              {{ challenge.description }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="showIndiceDialog"
      max-width="700"
      @click:outside="closeIndiceDialog"
    >
      <v-card class="pa-8" color="surface">
        <v-btn
          class="position-absolute"
          density="compact"
          icon="mdi-close"
          style="top: 16px; right: 16px"
          variant="text"
          @click="closeIndiceDialog"
        />

        <v-card-title class="text-h3 mb-6 pa-0">
          INDICE {{ currentIndice?.id }}
        </v-card-title>

        <v-card-text class="text-body-1 pa-0" style="line-height: 1.8">
          {{ currentIndice?.text }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-main>

  <Footer />
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>
