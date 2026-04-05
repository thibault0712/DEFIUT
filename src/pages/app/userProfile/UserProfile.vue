<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import serializedTimestampToStringFormated from '@/utils/dateConvertor.js'

  const route = useRoute()
  const store = useStore()
  const userData = computed(() => store.getters['otherUser/user'].data)

  onMounted(async () => {
    await store.dispatch('otherUser/fetchUserByID', route.query.uid)
  })

  const user = computed(() => {
    return {
      username: userData.value?.userName || 'Chargement...',
      lastLogin: userData.value?.lastLogin
        ? userData.value.lastLogin.toDate().toLocaleDateString()
        : '...',
      registeredAt: userData.value?.registeredAt
        ? userData.value.registeredAt.toDate().toLocaleDateString()
        : '...',
      imageUrl: userData.value?.imageUrl || null,
      points: userData.value?.points ?? 0,
    }
  })

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
            <v-img v-if="user.imageUrl" cover :src="user.imageUrl" />
            <span v-else class="text-h4">
              {{ user.username[0] }}
            </span>
          </v-avatar>
        </v-col>

        <v-col>
          <h2 class="text-h5 font-weight-bold">
            {{ user.username }}
          </h2>
          <v-chip
            v-if="user.points !== undefined"
            class="mt-1"
            color="primary"
            label
            size="small"
            variant="flat"
          >
            <v-icon start>mdi-star</v-icon>
            {{ user.points }} points
          </v-chip>
        </v-col>
      </v-row>

      <!-- Informations -->
      <v-row class="mt-6">
        <v-col cols="12" md="4">
          <p class="text-medium-emphasis">
            Dernière connexion : {{ user.lastLogin }}
          </p>
        </v-col>

        <v-col cols="12" md="4">
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
        density="comfortable"
        :headers="tab === 0 ? validatedHeaders : badgesHeaders"
        :items="tab === 0 ? validatedItems : badgesItems"
        :items-per-page="5"
        :items-per-page-options="[5, 10, 25, 50, 100, -1]"
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

<style scoped></style>
