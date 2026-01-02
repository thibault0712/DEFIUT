<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  function toggleTheme () {
    theme.global.name.value =
      theme.global.name.value === 'darkTheme'
        ? 'lightTheme'
        : 'darkTheme'
  }

  const user = {
    username: 'Alice',
    lastLogin: '05/02/2025',
    registeredAt: '12/09/2024'
  }

  /* Onglet actif */
  const tab = ref(0)

  /* === Défis validés === */
  const validatedHeaders = [
    { title: 'Titre du défi', key: 'title' },
    { title: 'Date de validation', key: 'date' },
    { title: 'Points gagnés', key: 'points' }
  ]

  const validatedItems = [
    { title: 'Défi Web', date: '02/02/2025', points: 150 }
  ]

  /* === Badges === */
  const badgesHeaders = [
    { title: 'Badge', key: 'icon' },
    { title: 'Nom du badge', key: 'name' },
    { title: 'Date d’obtention', key: 'date' }
  ]

  const badgesItems = [
    { icon: 'mdi-star', name: 'Badge #1', date: '10/02/2025' }
  ]
</script>

<template>
  <Header />

  <v-main>
    <v-container>

      <!-- Titre -->
      <h1>Profil utilisateur</h1>

      <!-- Infos utilisateur -->
      <v-row class="my-6">
        <v-avatar size="96" class="mr-6" color="accent">
          {{ user.username[0] }}
        </v-avatar>

        <div>
          <div><strong>{{ user.username }}</strong></div>
          <div>Dernière connexion : {{ user.lastLogin }}</div>
          <div>Inscrit depuis : {{ user.registeredAt }}</div>
        </div>
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
        <template #item.icon="{ value }">
          <v-icon>{{ value }}</v-icon>
        </template>
      </v-data-table>

    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped></style>
