<script setup>
import { ref } from 'vue'

const flagInput = ref('')
const showIndiceDialog = ref(false)
const currentIndice = ref(null)

const challenge = {
  title: 'Titre - Reseau',
  catchPhrase: "Phrase D'accroche",
  difficulty: 'Facile',
  points: 150,
  rating: 3,
  flag: 'FLAG{...}',
  links: [
    'www.example.com',
    'www.example.com',
    'www.example.com'
  ],
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  indices: [
    {
      id: 1,
      points: 20,
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard \n dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen`
    },
    {
      id: 2,
      points: 25,
      text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard \n dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen`
    }
  ]
}

const openIndiceDialog = (indice) => {
  currentIndice.value = indice
  showIndiceDialog.value = true
}

const closeIndiceDialog = () => {
  showIndiceDialog.value = false
  currentIndice.value = null
}
</script>

<template>
  <v-main class="bg-background min-vh-100 pt-0 pb-16">
    <v-container class="py-12" fluid max-width="1400">
      <v-row class="mb-8">
        <v-col cols="12">
          <div class="d-flex justify-space-between align-start">
            <div>
              <h1 class="text-h2 mb-2">
                {{ challenge.title }}
              </h1>
              <p class="text-h5 text-center" style="color: white;">
                {{ challenge.catchPhrase }}
              </p>
            </div>
            
            <div class="text-right">
              <p class="text-h6 mb-1" style="color: #8A9B46">
                Nombre de points : {{ challenge.points }}
              </p>
              <div class="d-flex align-center justify-start">
                <span class="text-h6 mr-2">Note :</span>
                <div class="d-flex">
                  <v-icon
                    v-for="i in 5"
                    :key="i"
                    :color="i <= challenge.rating ? '#8A9B46' : 'transparent'"
                    :style="i > challenge.rating ? 'border: 2px solid #8A9B46; border-radius: 50%;' : ''"
                    size="small"
                  >
                    mdi-circle
                  </v-icon>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <div class="mb-6">
            <h3 class="text-h5 mb-2">
              Difficultée : <span style="color: #8A9B46">{{ challenge.difficulty }}</span>
            </h3>
          </div>

          <div class="mb-6">
            <h3 class="text-h5 mb-3">Flag :</h3>
            <div class="d-flex align-center">
              <v-text-field
                v-model="flagInput"
                class="mr-4"
                density="comfortable"
                hide-details
                :placeholder="challenge.flag"
                variant="outlined"
              />
              <v-btn
                class="text-none"
                color="#8A9B46"
                size="large"
                variant="flat"
              >
                VALIDER
              </v-btn>
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-h5 mb-3">Liens/Ressource :</h3>
            <div v-for="(link, index) in challenge.links" :key="index" class="mb-1">
              <a :href="`https://${link}`" class="text-body-1" style="color: white; text-decoration: none;">
                {{ link }}
              </a>
            </div>
          </div>

          <div class="d-flex gap-4">
            <v-btn
              v-for="indice in challenge.indices"
              :key="indice.id"
              class="text-none"
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
            <p class="text-body-1" style="line-height: 1.8; white-space: pre-line;">
              {{ challenge.description }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>

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
          style="top: 16px; right: 16px;"
          variant="text"
          @click="closeIndiceDialog"
        />
        
        <v-card-title class="text-h3 mb-6 pa-0">
          INDICE {{ currentIndice?.id }}
        </v-card-title>
        
        <v-card-text class="text-body-1 pa-0" style="line-height: 1.8;">
          {{ currentIndice?.text }}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>