<script setup>

  import { computed } from 'vue'
  import store from '@/store/index.js'

  const maxListSize = defineModel('maxListSize', { required: true, type: Number })

  const bestUsers = computed(() => store.getters['userList/userList'].slice(0, maxListSize.value))

  async function loadNextPage ({ done }) {
    if (maxListSize.value <= bestUsers.value.length) {
      bestUsers.value = bestUsers.value.slice(0, maxListSize.value)
      return done('empty')
    }

    const result = await store.dispatch('userList/updateList')

    switch (result) {
      case 'empty': {
        done('empty')
        break
      }
      case 'ok': {
        done('ok')
        break
      }
      case 'loading': {
        done('loading')
        break
      }
      default: {
        done('error')
      }
    }

    if (result === 'empty') {
      done('empty')
    } else if (result === 'error') {
      done('error')
    } else {
      done('ok')
    }
  }

</script>

<template>
  <v-card
    class="pa-4"
    flat
  >
    <v-infinite-scroll :items="bestUsers" @load="loadNextPage">
      <v-table density="comfortable">
        <thead>
          <tr>
            <th class="text-left text-uppercase text-medium-emphasis">Rang</th>
            <th class="text-left text-uppercase text-medium-emphasis">Pseudo</th>
            <th class="text-right text-uppercase text-medium-emphasis text-no-wrap">Nombre de points</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(bestUser, index) in bestUsers"
            :key="bestUser.uid"
            class="cursor-pointer"
            @click="$router.push({ path: '/userProfile', query: { uid: bestUser.uid } })"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ bestUser.userName }}</td>
            <td class="text-right font-weight-bold">{{ bestUser.points }}</td>
          </tr>

        </tbody>
      </v-table>

      <template #empty />
    </v-infinite-scroll>
  </v-card>
</template>

<style scoped>

</style>
