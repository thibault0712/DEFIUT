<script setup>

</script>

<template>
  <Header />

  <v-main class="bg-background min-vh-100 pt-0 pb-16">
    <v-container max-width="1200">
      <h1 class="mb-4">
        Classement
      </h1>
      <v-container class="h-75">
        <h2 class="text-h4 px-12 py-10 font-bold">
          Top 3 des Joueurs
        </h2>
        <Podium />
      </v-container>
      <v-container class="h-75 d-flex flex-column justify-center py-16 mx-12">
        <h2 class="text-h4 py-10 font-bold">
          Classement global
        </h2>
        <Scoreboard />
      </v-container>

    </v-container>
    <Footer />
  </v-main></template>

<style scoped>

</style>
