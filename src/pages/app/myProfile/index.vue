<script setup>

  import { ref } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  }

  const user = {
    username: 'VJ',
    lastLogin: '01/01/2025',
    registeredAt: '01/09/2024',
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

  <v-main>
    <v-container class="h-screen" max-width="1200">

      <!-- Titre -->
      <v-row align="center" class="w-100 g-0" justify="space-between">
        <v-col>
          <h1>Mon profil</h1>
        </v-col>

        <v-col class="d-flex justify-end align-center ma-0 pa-0">
          <v-switch
            append-icon="mdi-weather-sunny"
            class="ma-0"
            color="primary"
            hide-details
            inset
            prepend-icon="mdi-weather-night"
            @click="toggleTheme"
          />
        </v-col>
      </v-row>

      <!-- Infos utilisateur -->
      <v-row align="center" class="mt-6">
        <v-avatar class="mr-6 text-h4" color="secondary" size="96">
          {{ user.username[0] }}
        </v-avatar>
        <h1>{{ user.username }}</h1>
      </v-row>

      <v-row align="center" class="mt-8 mb-3">
        <v-col cols="auto">
          <p class="text-uppercase font-weight-medium mb-0">Dernière connexion : {{ user.lastLogin }}</p>
        </v-col>
        <v-col cols="auto">
          <p class="text-uppercase font-weight-medium mb-0">Inscrit depuis : {{ user.registeredAt }}</p>
        </v-col>
        <v-btn class="mx-6" color="secondary"> <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn color="secondary">
          Supprimer le compte
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
