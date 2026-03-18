<script setup></script>

<template>
  <Header />

  <v-main class="pb-16">
    <v-container max-width="1200">

      <!-- Titre -->
      <h1 class="text-h4 font-weight-bold mb-10">
        Classement
      </h1>

      <!-- PODIUM -->
      <v-row class="mb-16" justify="center">
        <v-col cols="12">
          <h2 class="text-h5 font-weight-bold mb-8 text-center text-md-left">
            Top 3 des joueurs
          </h2>
        </v-col>

        <v-col class="d-flex justify-center" cols="12" md="8">
          <Podium />
        </v-col>
      </v-row>

      <!-- SCOREBOARD -->
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-h5 font-weight-bold mb-8 text-center text-md-left">
            Classement global
          </h2>
        </v-col>

        <v-col class="d-flex flex-column justify-center px-6" cols="12">
          <Scoreboard :max-list-size="100" />
        </v-col>
      </v-row>

    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped></style>
