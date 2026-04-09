<script setup>
  import { httpsCallable } from 'firebase/functions'
  import { getDownloadURL, ref as storageRef } from 'firebase/storage'
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { auth, functions, storage } from '@/api/firebaseApp.js'

  const route = useRoute()
  const store = useStore()

  const flagInput = ref('')
  const showIndiceDialog = ref(false)
  const currentIndice = ref(null)
  const loading = ref(true)
  const flagLoading = ref(false)
  const flagResult = ref(null)
  const showConfirmDialog = ref(false)
  const pendingIndice = ref(null)
  const hintLoading = ref(false)
  const hintError = ref(null)
  const purchasedHints = ref([])
  const linkUrls = ref({})

  const challenge = computed(() => store.getters['challenge/currentChallenge'])
  const difficultyColor = computed(() => {
    const rawDifficulty = challenge.value?.difficulty

    if (!rawDifficulty) {
      return '#8A9B46'
    }

    switch (String(rawDifficulty).trim().toLowerCase()) {
      case 'facile': {
        return '#8A9B46'
      }
      case 'moyen': {
        return '#FB8C00'
      }
      case 'difficile': {
        return '#BA2653'
      }
      default: {
        return '#8A9B46'
      }
    }
  })

  onMounted(async () => {
    await store.dispatch('challenge/fetchChallenge', route.params.id)
    try {
      const { data } = await httpsCallable(functions, 'getPurchasedHints')({ challengeId: route.params.id })
      purchasedHints.value = data.purchasedHints || []
    } catch {
    // ignore
    }
    await resolveLinkUrls()
    loading.value = false
  })

  async function resolveLinkUrls () {
    const links = challenge.value?.links || []
    const resolved = {}
    await Promise.all(links.map(async link => {
      if (/^https?:\/\//i.test(link)) {
        resolved[link] = link
        return
      }
      try {
        const path = link.includes('/') ? link : `challenges/${link}`
        resolved[link] = await getDownloadURL(storageRef(storage, path))
      } catch {
        resolved[link] = null
      }
    }))
    linkUrls.value = resolved
  }

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
    if (purchasedHints.value.includes(indice.id)) {
      currentIndice.value = indice
      showIndiceDialog.value = true
      return
    }
    pendingIndice.value = indice
    showConfirmDialog.value = true
  }

  async function confirmHintPurchase () {
    const indice = pendingIndice.value
    hintLoading.value = true
    hintError.value = null

    try {
      await httpsCallable(functions, 'getHint')({
        challengeId: route.params.id,
        hintId: indice.id,
      })
      await store.dispatch('user/fetchUser', auth.currentUser)
      purchasedHints.value.push(indice.id)
      showConfirmDialog.value = false
      currentIndice.value = indice
      showIndiceDialog.value = true
    } catch (error) {
      hintError.value = error?.message || 'Erreur lors de l\'achat de l\'indice.'
    } finally {
      hintLoading.value = false
      pendingIndice.value = null
    }
  }

  function cancelHintPurchase () {
    showConfirmDialog.value = false
    pendingIndice.value = null
    hintError.value = null
  }

  function closeIndiceDialog () {
    showIndiceDialog.value = false
    currentIndice.value = null
  }
</script>

<template>
  <Header />

  <v-main class="min-vh-100 pt-0 pb-16 h-screen">
    <v-container
      v-if="loading"
      class="d-flex justify-center align-center"
      style="height: 50vh"
    >
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
              <span :style="{ color: difficultyColor }">{{ challenge.difficulty }}</span>
            </h3>
          </div>

          <div class="mb-6">
            <h3 class="text-h5 mb-3">Flag :</h3>
            <div class="d-flex align-center">
              <v-text-field
                v-model="flagInput"
                class="mr-4"
                density="comfortable"
                :disabled="flagLoading"
                hide-details
                placeholder="FLAG-AAAAA-{aaaa_aaaa_aaaa_aaaa}"
                variant="outlined"
                @keyup.enter="submitFlag"
              />
              <v-btn
                class="text-none"
                color="#8A9B46"
                :loading="flagLoading"
                size="large"
                variant="flat"
                @click="submitFlag"
              >
                VALIDER
              </v-btn>
            </div>

            <v-alert
              v-if="flagResult"
              class="mt-3"
              density="compact"
              :type="flagResult.success ? 'success' : 'error'"
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
                v-if="linkUrls[link]"
                class="text-body-1"
                download
                :href="linkUrls[link]"
                rel="noopener"
                style="color: white; text-decoration: underline"
                target="_blank"
              >
                {{ link }}
              </a>
              <a
                v-else
                class="text-body-1"
                :href="'https://' + link"
                style="color: white; text-decoration: underline"
                target="_blank"
              >
                {{ link }}
              </a>
            </div>
          </div>

          <div class="clues-list">
            <v-btn
              v-for="indice in challenge.clues"
              :key="indice.id"
              class="text-none clue-btn"
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
      v-model="showConfirmDialog"
      max-width="450"
      @click:outside="cancelHintPurchase"
    >
      <v-card class="pa-6" color="surface">
        <v-card-title class="text-h5 pa-0 mb-4">
          Acheter cet indice ?
        </v-card-title>

        <v-card-text class="pa-0 mb-6 text-body-1">
          Cela vous coûtera <strong>{{ pendingIndice?.points }} points</strong>.
        </v-card-text>

        <v-alert
          v-if="hintError"
          class="mb-4"
          density="compact"
          type="error"
          variant="tonal"
        >
          {{ hintError }}
        </v-alert>

        <v-card-actions class="pa-0 justify-end">
          <v-btn variant="text" @click="cancelHintPurchase">
            Annuler
          </v-btn>
          <v-btn
            color="#8A9B46"
            :loading="hintLoading"
            variant="flat"
            @click="confirmHintPurchase"
          >
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
.clues-list {
  display: grid;
  grid-template-columns: repeat(2, 230px);
  gap: 1rem;
}

.clue-btn {
  width: 230px;
  min-width: 230px;
}

@media (max-width: 760px) {
  .clues-list {
    grid-template-columns: 1fr;
  }

  .clue-btn {
    width: 100%;
    min-width: 0;
  }
}
</style>
