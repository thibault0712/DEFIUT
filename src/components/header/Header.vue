<script setup>
  import { computed, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import { useStore } from 'vuex'

  const theme = useTheme()
  const store = useStore()
  const userInfos = computed(() => store.getters['user/user'])

  const drawer = ref(false)// Function available only if user is not logged in, that's why we don't use the store here

  function toggleTheme () {
    theme.change(
      theme.global.name.value === 'darkTheme' ? 'lightTheme' : 'darkTheme',
    )
  }
</script>

<template>
  <v-app-bar class="px-80 bg-background" flat height="80">
    <router-link class="no-link-style" to="/">
      <div class="d-flex align-center">
        <v-img alt="Logo" class="mr-6" src="/logo.png" width="40" />
        <h2 class="text-h3 font-weight-bold">DEFIUT</h2>
      </div>
    </router-link>

    <v-spacer />

    <v-app-bar-nav-icon
      class="d-md-none"
      @click="drawer = !drawer"
    />

    <div class="d-flex align-center ga-6">
      <v-btn
        class="text-none text-body-1"
        to="/challenges"
        variant="text"
      >Défis</v-btn>
      <v-btn
        class="text-none text-body-1"
        to="/ranking"
        variant="text"
      >Classement</v-btn>

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
        v-if="!userInfos.loggedIn"
        class="text-none px-6"
        rounded="lg"
        to="/register"
        variant="outlined"
      >
        S'INSCRIRE
      </v-btn>

      <v-btn
        v-if="!userInfos.loggedIn"
        class="text-none px-6"
        color="primary"
        rounded="lg"
        to="/login"
        variant="flat"
      >
        SE CONNECTER
      </v-btn>

      <div v-if="!userInfos.loggedIn" class="vertical-divider" />

      <v-tooltip
        v-if="!userInfos.loggedIn"
        :close-delay="300"
        location="bottom"
        :open-delay="100"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            color="primary"
            :icon="
              theme.global.name.value === 'lightTheme'
                ? 'mdi-weather-night'
                : 'mdi-white-balance-sunny'
            "
            rounded="lg"
            size="small"
            variant="flat"
            @click="toggleTheme"
          />
        </template>
        <span class="text-white">Thème du site</span>
      </v-tooltip>

      <RouterLink to="/myProfile">
        <v-avatar
          v-if="userInfos.loggedIn && userInfos.data !== null"
          :alt="`Avatar de ${userInfos.userName}`"
          class="cursor-pointer"
          :color="userInfos.data?.imageUrl ? undefined : 'pink'"
          size="48"
        >
          <v-img
            v-if="userInfos.data?.imageUrl"
            cover
            :src="userInfos.data.imageUrl"
          />
          <span v-else class="text-white font-weight-bold">
            {{ userInfos.data?.userName?.[0] }}
          </span>
        </v-avatar>

        <v-progress-circular
          v-if="userInfos.loggedIn && userInfos.data === null"
          color="secondary"
          indeterminate
        />
      </RouterLink>
    </div>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
  >
    <v-list>

      <v-list-item to="/challenges">
        <v-list-item-title>Défis</v-list-item-title>
      </v-list-item>

      <v-list-item to="/ranking">
        <v-list-item-title>Classement</v-list-item-title>
      </v-list-item>

      <v-list-item to="/help/faq">
        <v-list-item-title>FAQ</v-list-item-title>
      </v-list-item>

      <v-list-item to="/help/contact">
        <v-list-item-title>Contact</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- Menu selon l'état de connexion -->
      <template v-if="!userInfos.loggedIn">
        <v-list-item to="/login">
          <v-list-item-title>Se connecter</v-list-item-title>
        </v-list-item>

        <v-list-item to="/register">
          <v-list-item-title>S'inscrire</v-list-item-title>
        </v-list-item>

        <v-divider class="my-2" />

        <v-list-item @click="toggleTheme">
          <template #prepend>
            <v-icon>
              {{ theme.global.name.value === 'lightTheme'
                ? 'mdi-weather-night'
                : 'mdi-white-balance-sunny' }}
            </v-icon>
          </template>
          <v-list-item-title>Changer le thème</v-list-item-title>
        </v-list-item>
      </template>

      <template v-else>
        <v-list-item to="/myProfile">
          <v-list-item-title>Mon profil</v-list-item-title>
        </v-list-item>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.vertical-divider {
  width: 1px;
  height: 24px;
  background-color: #cfcfcf;
}

.px-80 {
  padding-left: 16px !important;
  padding-right: 16px !important;
}

@media (min-width: 960px) {
  .px-80 {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
}

.v-app-bar {
  border-bottom: #cfcfcf 1px solid;
}

.no-link-style {
  text-decoration: none;
  color: inherit;
}
</style>
