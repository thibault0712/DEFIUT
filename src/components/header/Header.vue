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
      <v-menu open-on-hover>
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            append-icon="mdi-chevron-down"
            class="text-none text-body-1"
            variant="text"
          >
            Aides
          </v-btn>
        </template>

        <v-list class="mt-2" density="compact" rounded="lg">
          <v-list-item prepend-icon="mdi-help-circle-outline" to="/help/faq">
            <v-list-item-title>FAQ</v-list-item-title>
          </v-list-item>

          <v-list-item prepend-icon="mdi-email-outline" to="/help/contact">
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
        color="primary"
        rounded="lg"
        to="/auth/login"
        variant="flat"
      >
        SE CONNECTER
      </v-btn>

      <div class="vertical-divider" />

      <v-tooltip :close-delay="300" location="bottom" :open-delay="100">
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            :icon="theme.global.name.value === 'lightTheme' ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"
            rounded="lg"
            size="small"
            variant="flat"
            @click="toggleTheme"
          />
        </template>
        <span class="text-white">Thème du site</span>
      </v-tooltip>
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
