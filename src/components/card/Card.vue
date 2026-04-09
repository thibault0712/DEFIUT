<script setup>
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  const props = defineProps({
    titre: { type: String, default: 'Titre' },
    points: { type: Number, default: -1 },
    description: { type: String, default: 'Description' },
    difficulte: { type: String, default: 'Facile' },
    avancement: { type: String, default: 'Avancement' },
    categorie: { type: String, default: 'Catégorie' },
    challengeId: { type: String, default: '' },
  })

  const store = useStore()
  const router = useRouter()

  const userData = computed(() => store.getters['user/user'].data)

  const challengeStatus = computed(() => {
    if (props.avancement && props.avancement.trim()) {
      return props.avancement
    }

    const startedChallenges = userData.value?.startedChallenges || {}
    const completedChallenges = userData.value?.completedChallenges || userData.value?.challenges || {}

    if (props.challengeId && completedChallenges[props.challengeId]) {
      return 'Réussi'
    }

    if (props.challengeId && startedChallenges[props.challengeId]) {
      return 'En cours'
    }

    return 'Pas commencé'
  })

  const challengeStatusClass = computed(() => {
    switch (challengeStatus.value) {
      case 'En cours': {
        return 'font-weight-medium text-warning'
      }
      case 'Réussi': {
        return 'font-weight-medium text-success'
      }
      default: {
        return 'font-weight-medium'
      }
    }
  })

  // Pour mettre à jour la couleur suivant la difficulté
  const difficultyColor = computed(() => {
    switch (props.difficulte.toLowerCase()) {
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
        return 'primary'
      }
    }
  })

  async function goToChallenge (challengeId) {
    if (!challengeId) {
      return
    }

    if (userData.value && challengeStatus.value === 'Pas commencé') {
      await store.dispatch('user/addChallengeToStarted', {
        uid: challengeId,
        title: props.titre,
        points: props.points,
      })
    }

    await router.push('/challenge/' + challengeId)
  }
</script>

<template>
  <v-card
    class="bg-surface border-thin d-flex flex-column"
    flat
    height="100%"
    @click="goToChallenge(challengeId)"
  >
    <v-card-item class="pt-2">
      <div
        class="text-caption text-medium-emphasis mb-4 d-flex justify-space-between"
      >
        <div class="font-weight-medium">
          {{ categorie }}
        </div>
        <div :class="challengeStatusClass">
          {{ challengeStatus }}
        </div>
      </div>

      <h6 class="text-h6 font-weight-bold text-on-surface mb-2 text-truncate">
        {{ titre }}
      </h6>
      <div class="text-caption text-medium-emphasis mb-4">
        Nombre de points : {{ points }}
      </div>
      <p class="text-body-2 text-medium-emphasis text-clamp-3">
        {{ description }}
      </p>
    </v-card-item>

    <v-spacer />

    <v-card-actions class="pa-4">
      <span
        class="text-caption font-weight-bold text-uppercase"
        :style="{ color: difficultyColor }"
      >
        {{ difficulte }}
      </span>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
