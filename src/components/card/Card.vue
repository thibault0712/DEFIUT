<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    titre: { type: String, default: 'Titre' },
    points: { type: Number, default: -1 },
    description: { type: String, default: 'Description' },
    difficulte: { type: String, default: 'Facile' },
    avancement: { type: String, default: 'Avancement' },
    categorie: { type: String, default: 'Catégorie' },
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

  function goToChallenge () {
    window.location.href = '/DEFIUT/app/challenge'
  }
</script>

<template>
  <v-card
    class="bg-surface border-thin d-flex flex-column"
    flat
    height="100%"
    @click="goToChallenge()"
  >
    <v-card-item class="pt-2">
      <div
        class="text-caption text-medium-emphasis mb-4 d-flex justify-space-between"
      >
        <div class="font-weight-medium">
          {{ categorie }}
        </div>
        <div>
          {{ avancement }}
        </div>
      </div>

      <h6 class="text-h6 font-weight-bold text-on-surface mb-2 text-truncate">
        {{ titre }}
      </h6>
      <div class="text-caption text-medium-emphasis mb-4">
        Nombre de points : {{ points }}
      </div>
      <p class="text-body-2 text-medium-emphasis">
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
