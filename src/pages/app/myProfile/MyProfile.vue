<script setup>

  import { computed, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useStore } from 'vuex'
  import router from '@/router/index.js'
  import serializedTimestampToStringFormated from '@/utils/dateConvertor.js'

  const store = useStore()
  const userInfos = computed(() => store.getters['user/user'].data)
  const theme = useTheme()
  const removeAccountPopup = ref(false)
  const editUserInformationPopup = ref(false)

  async function logOut () {
    await store.dispatch('user/logOut')
    await router.push('/')
  }

  function toggleTheme () {
    let newTheme = 'darkTheme'

    switch (userInfos.value.theme) {
      case 'lightTheme': {
        newTheme = 'darkTheme'
        break
      }
      case 'darkTheme': {
        newTheme = 'lightTheme'
        break
      }
      default: {
        console.warn(`WARN : theme ${userInfos.value.theme} not found`)
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

  const validatedItems = [
    { title: 'Défi Web', date: '01/01/2025', points: 120 },
    { title: 'Défi Crypto', date: '15/01/2025', points: 200 },
  ]

  /* === Badges === */
  const badgesHeaders = [
    { title: 'Badge', key: 'icon' },
    { title: 'Nom du badge', key: 'name' },
    { title: 'Date d’obtention', key: 'date' },
  ]

  const badgesItems = [
    { icon: 'mdi-star', name: 'Badge #1', date: '05/01/2025' },
    { icon: 'mdi-shield-check', name: 'Badge #2', date: '20/01/2025' },
  ]
</script>

<template>
  <Header />

  <RemoveAccountPopup v-model:is-open="removeAccountPopup" />
  <EditUserInformationPopup v-model:is-open="editUserInformationPopup" />

  <v-main>
    <v-container class="h-screen" max-width="1200">

      <!-- Titre -->
      <v-row align="center" class="w-100 g-0" justify="space-between">
        <v-col>
          <h1>Mon profil</h1>
        </v-col>

        <v-col class="d-flex justify-end align-center ma-0 pa-0">
          <v-switch
            v-model="userInfos.theme"
            append-icon="mdi-weather-sunny"
            class="ma-0"
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
      <v-row align="center" class="mt-6">
        <v-img
          class="mr-6 rounded-circle"
          :max-width="96"
          :src="userInfos.imageUrl"
        />
        <h1>{{ userInfos.userName }}</h1>
      </v-row>

      <v-row align="center" class="mt-8">
        <v-col cols="auto">
          <p class="text-uppercase font-weight-medium mb-0">Dernière connexion : {{ serializedTimestampToStringFormated(userInfos.lastLogin) }}</p>
        </v-col>
        <v-col cols="auto">
          <p class="text-uppercase font-weight-medium mb-0">Inscrit depuis : {{ serializedTimestampToStringFormated(userInfos.registeredAt) }}</p>
        </v-col>
      </v-row>

      <v-row class="my-8">
        <v-btn class="ml-3" color="secondary" @click="editUserInformationPopup = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="mx-6" color="secondary" @click="logOut">
          Se déconnecter
        </v-btn>
        <v-btn color="secondary" @click="removeAccountPopup = true">
          Supprimer son compte
        </v-btn>
      </v-row>

      <!-- Onglets -->
      <v-tabs v-model="tab">
        <v-tab>Défis validés</v-tab>
        <v-tab>Badges</v-tab>
      </v-tabs>

      <!-- Tableau -->
      <v-data-table
        class="mt-6"
        :headers="tab === 0 ? validatedHeaders : badgesHeaders"
        :items="tab === 0 ? validatedItems : badgesItems"
        :items-per-page="5"
      >
        <!-- Icône badge -->
        <template #item.icon="{ value }">
          <v-icon>{{ value }}</v-icon>
        </template>
      </v-data-table>

    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped></style>
