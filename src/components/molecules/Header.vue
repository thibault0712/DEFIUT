<script setup>
</script>

<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title class="text-h1 font-weight-bold">DEFIUT</v-app-bar-title>

    <v-spacer />

    <v-btn
      class="text-none mx-2"
      variant="text"
      @click="() => console.log('Classements cliqué')"
    >
      Classements
    </v-btn>

    <v-btn
      class="text-none mx-2"
      variant="text"
      @click="() => console.log('Défis cliqué')"
    >
      Défis
    </v-btn>

    <v-spacer />
    <v-divider class="mx-10" vertical />
    <v-spacer />

    <v-btn variant="outlined">Se connecter</v-btn>
    <v-btn class="mr-3" color="primary" variant="elevated">S'inscrire</v-btn>

    <v-divider class="mx-3" vertical />

    <v-btn color="primary" icon variant="elevated">
      <v-icon>mdi-account</v-icon>
    </v-btn>

  </v-app-bar>
</template>

<style scoped>
/* Vuetify applique déjà un curseur pointer pour v-btn avec variant="text" */
/* Si tu souhaitais être certain à 100%, tu pourrais cibler le bouton : */
/*
.v-btn--variant-text {
  cursor: pointer !important;
}
*/
</style>
