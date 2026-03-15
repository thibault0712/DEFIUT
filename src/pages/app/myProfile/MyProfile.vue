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
    case 'lightTheme':
      newTheme = 'darkTheme'
      break
    case 'darkTheme':
      newTheme = 'lightTheme'
      break
  }

  store.dispatch('user/updateTheme', newTheme)
  theme.change(newTheme)
}

const tab = ref(0)

const validatedHeaders = [
  { title: 'Titre du défi', key: 'title' },
  { title: 'Date de validation', key: 'date' },
  { title: 'Points gagnés', key: 'points' },
]

const validatedItems = [
  { title: 'Défi Web', date: '01/01/2025', points: 120 },
  { title: 'Défi Crypto', date: '15/01/2025', points: 200 },
]

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

  <v-main class="pb-16">
    <v-container max-width="1200">

      <!-- HEADER PROFIL -->
      <v-row align="center" justify="space-between">
        <v-col cols="auto">
          <h1 class="text-h4 font-weight-bold">Mon profil</h1>
        </v-col>

        <v-col cols="auto">
          <v-switch
            v-model="userInfos.theme"
            append-icon="mdi-weather-sunny"
            prepend-icon="mdi-weather-night"
            false-value="darkTheme"
            true-value="lightTheme"
            color="primary"
            hide-details
            inset
            readonly
            aria-label="Changer le thème"
            @click="toggleTheme"
          />
        </v-col>
      </v-row>

      <!-- INFOS UTILISATEUR -->
      <v-row align="center" class="mt-6">
        <v-col cols="auto">
          <v-avatar size="96">
            <v-img
              :src="userInfos.imageUrl"
              :alt="`Avatar de ${userInfos.userName}`"
            />
          </v-avatar>
        </v-col>

        <v-col>
          <h2 class="text-h5 font-weight-bold">
            {{ userInfos.userName }}
          </h2>
        </v-col>
      </v-row>

      <!-- DATES -->
      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <p class="text-medium-emphasis">
            Dernière connexion :
            {{ serializedTimestampToStringFormated(userInfos.lastLogin) }}
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="text-medium-emphasis">
            Inscrit depuis :
            {{ serializedTimestampToStringFormated(userInfos.registeredAt) }}
          </p>
        </v-col>
      </v-row>

      <!-- ACTIONS -->
      <v-row class="mt-8" dense>
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
        :headers="tab === 0 ? validatedHeaders : badgesHeaders"
        :items="tab === 0 ? validatedItems : badgesItems"
        :items-per-page="5"
        density="comfortable"
      >
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