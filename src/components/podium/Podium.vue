<script setup>
  import { computed, onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useStore } from 'vuex'

  const store = useStore()
  const { smAndDown } = useDisplay()

  const bestUsers = computed(() => store.getters['userList/userList'])

  const firstPlace = computed(() => bestUsers.value?.[0] || null)
  const secondPlace = computed(() => bestUsers.value?.[1] || null)
  const thirdPlace = computed(() => bestUsers.value?.[2] || null)

  const podiumSizes = computed(() => {
    if (smAndDown.value) {
      return {
        userAvatar: 72,
        sideHeight: 150,
        sideWidth: 100,
        centerHeight: 220,
        centerWidth: 120,
        sideRankAvatar: 52,
        centerRankAvatar: 64,
      }
    }

    return {
      userAvatar: 96,
      sideHeight: 180,
      sideWidth: 140,
      centerHeight: 280,
      centerWidth: 160,
      sideRankAvatar: 70,
      centerRankAvatar: 80,
    }
  })

  const secondPlaceHeight = computed(() => {
    return smAndDown.value ? 150 : 200
  })

  const thirdPlaceHeight = computed(() => {
    return smAndDown.value ? 135 : 130
  })

  onMounted(async () => {
    await store.dispatch('userList/updateList')
  })
</script>

<template>
  <v-container
    class="d-flex align-end justify-center py-10"
  >
    <div class="d-flex flex-column align-center mx-1">
      <RouterLink
        :to="{
          path: '/userProfile',
          query: { uid: secondPlace ? secondPlace.uid : 'INCONNU' },
        }"
      >
        <v-avatar class="mb-2" color="secondary" :size="podiumSizes.userAvatar">
          <v-img v-if="secondPlace?.imageUrl" cover :src="secondPlace.imageUrl"/>
          <span v-else class="text-h5">
            {{ secondPlace?.userName?.[0] }}
          </span>
        </v-avatar>
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center"
        color="primary"
        :height="secondPlaceHeight"
        :width="podiumSizes.sideWidth"
      >
        <v-avatar class="title-orbitron" color="grey-darken-3" :size="podiumSizes.sideRankAvatar">
          <span class="text-h4">2</span>
        </v-avatar>
      </v-sheet>
    </div>

    <div class="d-flex flex-column align-center mx-1">
      <RouterLink
        :to="{
          path: '/userProfile',
          query: { uid: firstPlace ? firstPlace.uid : 'INCONNU' },
        }"
      >
        <v-avatar class="mb-2" color="secondary" :size="podiumSizes.userAvatar">
          <v-img v-if="firstPlace?.imageUrl" cover :src="firstPlace.imageUrl" />
          <span v-else class="text-h5">
            {{ firstPlace?.userName?.[0] }}
          </span>
        </v-avatar>
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center shadow-lg"
        color="primary"
        :height="podiumSizes.centerHeight"
        :width="podiumSizes.centerWidth"
      >
        <v-avatar
          class="title-orbitron elevation-6"
          color="orange-darken-1"
          :size="podiumSizes.centerRankAvatar"
        >
          <span class="text-h3 font-weight-bold">1</span>
        </v-avatar>
      </v-sheet>
    </div>

    <div class="d-flex flex-column align-center mx-1" style="margin-top: 40px">
      <RouterLink
        :to="{
          path: '/userProfile',
          query: { uid: thirdPlace ? thirdPlace.uid : 'INCONNU' },
        }"
      >
        <v-avatar class="mb-2" color="secondary" :size="podiumSizes.userAvatar">
          <v-img v-if="thirdPlace?.imageUrl" cover :src="thirdPlace.imageUrl" />
          <span v-else class="text-h5">
            {{ thirdPlace?.userName?.[0] }}
          </span>
        </v-avatar>
      </RouterLink>
      <v-sheet
        class="rounded-t-lg d-flex align-center justify-center"
        color="primary"
        :height="thirdPlaceHeight"
        :width="podiumSizes.sideWidth"
      >
        <v-avatar class="title-orbitron" color="brown-darken-3" :size="podiumSizes.sideRankAvatar">
          <span class="text-h4">3</span>
        </v-avatar>
      </v-sheet>
    </div>
  </v-container>
</template>
