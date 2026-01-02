<script setup>
  const players = [
    { rank: 1, name: 'Leo', points: 2419 },
    { rank: 2, name: 'Lorem', points: 2354 },
    { rank: 3, name: 'Lionel', points: 2286 },
    { rank: 4, name: 'Maxime', points: 1938 },
    { rank: 5, name: 'Fabrice', points: 1937 },
  ]

  function goToProfile () {
    window.location.href = '/app/userProfile'
  }
</script>

<template>
  <v-card
    class="pa-4 w-75"
    flat
  >
    <v-table density="comfortable">
      <thead>
        <tr>
          <th class="text-left text-uppercase text-medium-emphasis">
            Rang
          </th>
          <th class="text-left text-uppercase text-medium-emphasis">
            Pseudo
          </th>
          <th class="text-right text-uppercase text-medium-emphasis">
            Nombre de points
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(player) in players" :key="player.name" class="cursor-pointer" @click="goToProfile()">
          <td>{{ player.rank }}</td>
          <td>{{ player.name }}</td>
          <td class="text-right">{{ player.points }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<style scoped>

</style>
