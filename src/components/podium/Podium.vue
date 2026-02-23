<script setup>
  import { computed, onMounted } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()

  const bestUsers = computed(() => store.getters['userList/userList'])

  const firstPlace = computed(() => bestUsers.value?.[0] || null)
  const secondPlace = computed(() => bestUsers.value?.[1] || null)
  const thirdPlace = computed(() => bestUsers.value?.[2] || null)

  onMounted(async () => {
    await store.dispatch('userList/updateList')
  })

</script>

<template>
  <v-container class="d-flex align-end justify-center py-10" style="min-height: 500px;">

    <div class="d-flex flex-column align-center mx-1">
      <RouterLink :to="{ path: '/userProfile', query: { uid: thirdPlace ? thirdPlace.uid : 'INCONNU' } }">
        <v-img
          v-if="thirdPlace"
          class="rounded-circle mb-2"
          :height="96"
          :max-width="96"
          :src="thirdPlace.imageUrl"
          :width="96"
        />
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center"
        color="primary"
        height="180"
        width="140"
      >
        <v-avatar class="title-orbitron" color="brown-darken-3" size="60">
          <span class="text-h4">3</span>
        </v-avatar>
      </v-sheet>
    </div>

    <div class="d-flex flex-column align-center mx-1">
      <RouterLink :to="{ path: '/userProfile', query: { uid: firstPlace ? firstPlace.uid : 'INCONNU' } }">

        <v-img
          v-if="firstPlace"
          class="rounded-circle mb-2"
          :height="96"
          :src="firstPlace.imageUrl"
          :width="96"
        />
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center shadow-lg"
        color="primary"
        height="280"
        width="160"
      >
        <v-avatar class="title-orbitron elevation-6" color="orange-darken-1" size="80">
          <span class="text-h3 font-weight-bold">1</span>
        </v-avatar>
      </v-sheet>
    </div>

    <div class="d-flex flex-column align-center mx-1">
      <RouterLink :to="{ path: '/userProfile', query: { uid: secondPlace ? secondPlace.uid : 'INCONNU' } }">
        <v-img
          v-if="secondPlace"
          class="rounded-circle mb-2"
          height="96"
          :src="secondPlace.imageUrl"
          :width="96"
        />
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center"
        color="primary"
        height="220"
        width="140"
      >
        <v-avatar class="title-orbitron" color="grey-darken-3" size="70">
          <span class="text-h4">2</span>
        </v-avatar>
      </v-sheet>
    </div>

  </v-container>
</template>
