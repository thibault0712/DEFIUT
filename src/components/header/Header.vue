<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  function toggleTheme () {
    theme.global.name.value = theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme'
  }
</script>

<template>
  <v-app-bar class="px-80 bg-background" flat height="80">
    <router-link class="no-link-style" to="/home">
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="mr-6"
          src="/logo.png"
          width="40"
        />
        <h2 class="text-h3 font-weight-bold">
          DEFIUT
        </h2>
      </div>
    </router-link>

    <v-spacer />

    <div class="d-flex align-center ga-6">
      <v-btn class="text-none text-body-1" to="/app/challenges" variant="text">Défis</v-btn>
      <v-btn class="text-none text-body-1" to="/app/ranking" variant="text">Classement</v-btn>

      <div class="vertical-divider" />

      <v-btn
        class="text-none px-6"
        rounded="lg"
        to="/auth/register"
        variant="outlined"
      >
        S'INSCRIRE
      </v-btn>

      <v-btn
        class="text-none px-6"
        color="#8DA34B"
        rounded="lg"
        theme="dark"
        to="/auth/login"
        variant="flat"
      >
        SE CONNECTER
      </v-btn>

      <div class="vertical-divider" />

      <v-btn
        color="#8DA34B"
        :icon="theme.global.name.value === 'lightTheme' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
        rounded="lg"
        size="small"
        variant="flat"
        @click="toggleTheme"
      />
    </div>

  </v-app-bar>
</template>

<style scoped>
.vertical-divider {
  width: 1px;
  height: 24px;
  background-color: #cfcfcf;
}

.px-80 {
  padding-left: 80px !important;
  padding-right: 80px !important;
}

.v-app-bar {
  border-bottom: #cfcfcf 1px solid;
}

.no-link-style {
  text-decoration: none;
  color: inherit;
}
</style>
