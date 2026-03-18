<script setup>
  import { computed, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useStore } from 'vuex'
  import router from '@/router/index.js'
  import serializedTimestampToStringFormated from '@/utils/dateConvertor.js'

  const store = useStore()
  const userData = computed(() => store.getters['user/user'].data)
  const theme = useTheme()

  const removeAccountPopup = ref(false)
  const editUserInformationPopup = ref(false)

  async function logOut () {
    await router.push('/')
    await store.dispatch('user/logOut')
  }

  function toggleTheme () {
    let newTheme = 'darkTheme'

    switch (userData.value.theme) {
      case 'lightTheme': {
        newTheme = 'darkTheme'
        break
      }
      case 'darkTheme': {
        newTheme = 'lightTheme'
        break
      }
      default: {
        console.warn(`WARN : theme ${userData.value.theme} not found`)
        break
      }
    }

    store.dispatch('user/updateTheme', newTheme)
    theme.change(newTheme)
  }

  /* Onglet actif */
  const tab = ref(0)

  /* === Défis validés === */
  const validatedHeaders = [
    { title: 'Titre du défi', key: 'title' },
    { title: 'Date de validation', key: 'date' },
    { title: 'Points gagnés', key: 'points' },
  ]

  const validatedItems = computed(() => {
    if (!userData.value || !userData.value.challenges) return []

    return Object.entries(userData.value.challenges).map(([id, data]) => {
      return {
        title: data.title || '...',
        date: serializedTimestampToStringFormated(data.date) || '...',
        points: data.points || '...',
      }
    })
  })

  /* === Badges === */
  const badgesHeaders = [
    { title: 'Badge', key: 'icon' },
    { title: 'Nom du badge', key: 'name' },
    { title: 'Date d’obtention', key: 'date' },
  ]

  const badgesItems = computed(() => {
    if (!userData.value || !userData.value.badges) return []
    return Object.entries(userData.value.badges).map(([id, data]) => {
      return {
        icon: data.icon || '...',
        name: data.name || '...',
        date: serializedTimestampToStringFormated(data.date) || '...',
      }
    })
  })
</script>

<template>
  <Header />

  <RemoveAccountPopup v-model:is-open="removeAccountPopup" />
  <EditUserInformationPopup v-model:is-open="editUserInformationPopup" />

  <v-main>
    <v-container class="h-screen" max-width="1200">

      <!-- HEADER PROFIL -->
      <v-row v-if="userData" align="center" justify="space-between">
        <v-col cols="auto">
          <h1 class="text-h4 font-weight-bold">Mon profil</h1>
        </v-col>

        <v-col cols="auto">
          <v-switch
            v-model="userData.theme"
            append-icon="mdi-weather-sunny"
            aria-label="Changer le thème"
            color="primary"
            false-value="darkTheme"
            hide-details
            inset
            prepend-icon="mdi-weather-night"
            readonly
            true-value="lightTheme"
            @click="toggleTheme"
          />
        </v-col>
      </v-row>

      <!-- Infos utilisateur -->
      <v-row v-if="userData" align="center" class="mt-6">
        <v-avatar
          class="mr-6"
          :color="userData?.imageUrl ? undefined : 'pink'"
          size="96"
        >
          <v-img
            v-if="userData?.imageUrl"
            :alt="`Avatar de ${userData.userName}`"
            cover
            :src="userData.imageUrl"
          />
          <span v-else class="text-h4 text-white font-weight-bold">
            {{ userData?.userName?.[0] }}
          </span>
        </v-avatar>
        <v-col>
          <h2 class="text-h5 font-weight-bold">
            {{ userData.userName }}
          </h2>
        </v-col>
      </v-row>

      <!-- DATES -->
      <v-row class="mt-6">
        <v-col cols="12" md="4">
          <p class="text-medium-emphasis">
            Dernière connexion : {{ serializedTimestampToStringFormated(userData.lastLogin) }}
          </p>
        </v-col>

        <v-col cols="12" md="4">
          <p class="text-medium-emphasis">
            Inscrit depuis : {{ serializedTimestampToStringFormated(userData.registeredAt) }}
          </p>
        </v-col>
      </v-row>

      <!-- ACTIONS -->
      <v-row class="mt-4" dense>
        <v-col cols="12" sm="4">
          <v-btn
            block
            color="secondary"
            @click="editUserInformationPopup = true"
          >
            <v-icon start>mdi-pencil</v-icon>
            Modifier le profil
          </v-btn>
        </v-col>

        <v-col cols="12" sm="4">
          <v-btn
            block
            color="secondary"
            @click="logOut"
          >
            Se déconnecter
          </v-btn>
        </v-col>

        <v-col cols="12" sm="4">
          <v-btn
            block
            color="secondary"
            @click="removeAccountPopup = true"
          >
            Supprimer le compte
          </v-btn>
        </v-col>
      </v-row>

      <!-- ONGLET -->
      <v-tabs v-model="tab" class="mt-10">
        <v-tab>Défis validés</v-tab>
        <v-tab>Badges</v-tab>
      </v-tabs>

      <!-- TABLEAU -->
      <v-data-table
        class="mt-6"
        density="comfortable"
        :headers="tab === 0 ? validatedHeaders : badgesHeaders"
        :items="tab === 0 ? validatedItems : badgesItems"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 25, 50, 100, -1]"
      >
        <!-- Icône badge -->
        <template #item.icon="{ value }">
          <v-icon aria-hidden="true">
            {{ value }}
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped>
</style>
