<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const challengeList = computed(() => store.getters['challengeList/challengeList'])
  const userData = computed(() => store.getters['user/user'].data)

  async function loadChallenges () {
    await store.dispatch('challengeList/updateList')
  }

  onMounted(() => {
    loadChallenges()
  })

  const avancement = ['Non commencé', 'En cours', 'Terminé']
  const difficulte = ['Facile', 'Moyen', 'Difficile']
  const defis = ['Web', 'Programmation', 'Réseau', 'Cryptographie']

  const nameFilter = ref('')
  const categoryFilter = ref([])
  const difficultyFilter = ref([])
  const minPointsFilter = ref(null)
  const tagsFilter = ref([])
  const progressFilter = ref([])

  const challenges = computed(() => {
    return challengeList.value.filter(challenge => {
      if (
        nameFilter.value
        && !challenge.title.toLowerCase().includes(nameFilter.value.toLowerCase())
      ) {
        return false
      }

      if (
        categoryFilter.value.length > 0
        && !categoryFilter.value.includes(challenge.category)
      ) {
        return false
      }

      if (
        difficultyFilter.value.length > 0
        && !difficultyFilter.value.includes(challenge.difficulty)
      ) {
        return false
      }

      if (
        minPointsFilter.value
        && challenge.points < minPointsFilter.value
      ) {
        return false
      }

      if (
        tagsFilter.value.length > 0
          && !getChallengeTags(challenge).some(tag => tagsFilter.value.some(filterTag => normalizeTag(filterTag) === tag))
      ) {
        return false
      }

      if (progressFilter.value.length > 0) {
        const challengeStatus = getChallengeStatus(challenge.uid)
        const normalizedSelectedStatus = progressFilter.value.map(s =>
          String(s).trim().toLowerCase()
        )
        const normalizedChallengeStatus = challengeStatus.toLowerCase()

        if (!normalizedSelectedStatus.includes(normalizedChallengeStatus)) {
          return false
        }
      }

      return true
    })
  })

  function getChallengeStatus(challengeId) {
    if (!challengeId || !userData.value) {
      return 'Pas commencé'
    }

    const challenges = userData.value?.challenges || {}
    const startedChallenges = userData.value?.startedChallenges || {}

    if (challenges[challengeId]) {
      return 'Terminé'
    }

    if (startedChallenges[challengeId]) {
      return 'En cours'
    }

    return 'Pas commencé'
  }

    function normalizeTag (tag) {
      if (tag === null || tag === undefined) {
        return ''
      }

      if (typeof tag === 'string') {
        return tag.trim().toLowerCase()
      }

      if (typeof tag === 'object') {
        return String(tag.name ?? tag.label ?? tag.title ?? tag.value ?? tag.id ?? '')
          .trim()
          .toLowerCase()
      }

      return String(tag).trim().toLowerCase()
    }

    function getChallengeTags (challenge) {
      if (!Array.isArray(challenge?.tags)) {
        return []
      }

      return challenge.tags
        .map(normalizeTag)
        .filter(Boolean)
    }

    const availableTags = computed(() => {
      const tags = new Set()

      challengeList.value.forEach((challenge) => {
        getChallengeTags(challenge).forEach(tag => tags.add(tag))
      })

      return [...tags]
    })
</script>

<template>
  <Header />
  <v-main class="pb-16">
    <v-container max-width="1200">
      <h1 class="mb-4">Catalogue des défis</h1>
      <v-container>
        <v-row>
          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="nameFilter"
              label="Nom du défi"
            />
          </v-col>

          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="categoryFilter"
              :items="defis"
              label="Tous les défis"
              multiple
              persistent-placeholder
              placeholder="Ex: Web"
            />
          </v-col>

          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="difficultyFilter"
              :items="difficulte"
              label="Difficulté"
              multiple
              persistent-placeholder
              placeholder="Ex: Facile"
            />
          </v-col>

          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="minPointsFilter"
              label="Points minimum"
            />
          </v-col>

          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="tagsFilter"
              label="TAGS"
              multiple
                :items="availableTags"
                persistent-placeholder
                placeholder="Ex: Crypto"
            />
          </v-col>

          <v-col cols="12" lg="2" md="4" sm="6">
            <v-combobox
              v-model="progressFilter"
              :items="avancement"
              label="Avancement"
              multiple
              persistent-placeholder
              placeholder="Ex: Terminé"
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- LISTE DES DEFIS -->
      <v-row>
        <v-col
          v-for="challenge in challenges"
          :key="challenge.uid"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <Card
            :avancement="''"
            :categorie="challenge.category"
            :challenge-id="challenge.uid"
            :description="challenge.description"
            :difficulte="challenge.difficulty"
            :points="challenge.points"
            :titre="challenge.title"
          />
        </v-col>
      </v-row>

    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped></style>
