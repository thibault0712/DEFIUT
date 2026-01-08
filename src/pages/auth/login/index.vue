<template>
  <Header />
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8 text-center"
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold mb-8">
        Se connecter
      </h1>

      <v-form>
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        />

        <v-text-field
          density="comfortable"
          hide-details
          label="Mot de passe"
          prepend-inner-icon="mdi-lock-outline"
          type="password"
          variant="outlined"
        />

        <div class="d-flex justify-end mb-6">
          <a
            class="text-caption text-decoration-none text-grey-darken-1 font-weight-bold mt-2"
            href="#"
          >
            Mot de passe oublié ?
          </a>
        </div>

        <v-btn
          class="text-none px-10 mb-2"
          color="#8DA34B"
          rounded="sm"
          size="large"
          type="submit"
          variant="flat"
          block
        >
          SE CONNECTER
        </v-btn>
      </v-form>

      <div class="d-flex align-center my-6">
        <v-divider class="opacity-100" />
        <span class="mx-4 text-caption text-grey-lighten-1">OU</span>
        <v-divider class="opacity-100" />
      </div>

      <v-btn
        block
        class="text-none mb-6"
        color="grey-lighten-4"
        size="large"
        variant="flat"
      >
        <template #prepend>
          <v-img
            src="/google_icon.svg"
            width="32"
          />
        </template>
        SE CONNECTER AVEC GOOGLE
      </v-btn>

      <p class="text-body-2 text-grey-darken-1">
        Pas encore de compte ?
        <a
          class="text-decoration-none font-weight-bold"
          href="/auth/register"
          style="color: #8DA34B;"
        >
          S'inscrire
        </a>
      </p>
    </v-card>
  </v-container>
</template>
