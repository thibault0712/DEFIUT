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
          variant="outlined"
        />

        <v-text-field
          class="mb-6"
          density="comfortable"
          label="Mot de passe"
          type="password"
          variant="outlined"
        />

        <v-btn
          class="text-none px-10 mb-2"
          color="#8DA34B"
          rounded="sm"
          size="large"
          type="submit"
          variant="flat"
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
        class="text-none"
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
    </v-card>
  </v-container>
</template>
