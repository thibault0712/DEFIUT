<script setup>

  import { ref } from 'vue'

  const user = {
    username: 'Alice',
    lastLogin: '05/02/2025',
    registeredAt: '12/09/2024',
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
    { title: 'Défi Web', date: '02/02/2025', points: 150 },
  ]

  /* === Badges === */
  const badgesHeaders = [
    { title: 'Badge', key: 'icon' },
    { title: 'Nom du badge', key: 'name' },
    { title: 'Date d’obtention', key: 'date' },
  ]

  const badgesItems = [
    { icon: 'mdi-star', name: 'Badge #1', date: '10/02/2025' },
  ]
</script>

<template>
  <Header />

  <v-main class="pb-16">
    <v-container max-width="1200">

      <!-- Titre -->
      <h1 class="text-h4 font-weight-bold mb-8">
        Profil utilisateur
      </h1>

      <!-- Infos utilisateur -->
      <v-row align="center">
        <v-col cols="auto">
          <v-avatar class="text-h4" color="secondary" size="96">
            {{ user.username[0] }}
          </v-avatar>
        </v-col>

        <v-col>
          <h2 class="text-h5 font-weight-bold">
            {{ user.username }}
          </h2>
        </v-col>
      </v-row>

      <!-- Informations -->
      <v-row class="mt-6">
        <v-col cols="12" md="6">
          <p class="text-medium-emphasis">
            Dernière connexion : {{ user.lastLogin }}
          </p>
        </v-col>

        <v-col cols="12" md="6">
          <p class="text-medium-emphasis">
            Inscrit depuis : {{ user.registeredAt }}
          </p>
        </v-col>
      </v-row>

      <!-- Onglets -->
      <v-tabs
        v-model="tab"
        class="mt-10"
      >
        <v-tab>Défis validés</v-tab>
        <v-tab>Badges</v-tab>
      </v-tabs>

      <!-- Tableau -->
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