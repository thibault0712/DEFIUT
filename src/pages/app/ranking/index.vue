<script setup>

</script>

<template>
  <Header />
  <h1 class="text-h1 font-weight-bold text-on-background mb-4">
    Classement
  </h1>
  <h2 class="text-h3 px-12 py-10">
    Top 3 des Joueurs
  </h2>
  <Podium />
  <h2 class="text-h3 px-12 py-10">
    Classement global
  </h2>

  <v-row justify="center">
    <v-col class="d-flex justify-center" cols="12">
            <Scoreboard />
    </v-col>
  </v-row>
  <Footer />
</template>

<style scoped>

</style>
