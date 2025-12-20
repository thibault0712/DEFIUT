<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8 text-center "
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold text-white mb-8">
        S'inscrire
      </h1>

      <v-form>
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Nom d'utilisateur"
          theme="dark"
          variant="outlined"
        />

        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Email"
          theme="dark"
          variant="outlined"
        />

        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Mot de passe"
          theme="dark"
          type="password"
          variant="outlined"
        />

        <v-text-field
          density="comfortable"
          label="Même mot de passe"
          theme="dark"
          type="password"
          variant="outlined"
        />

        <v-checkbox base-color="white">
          <template #label>
            <div>
              J'accepte les
              <a
                class="text-white"
                href="/terms"
                target="_blank"
              >
                termes et conditions
              </a>
            </div>
          </template>
        </v-checkbox>

        <v-btn
          class="text-none px-10 mb-2"
          color="#8DA34B"
          rounded="sm"
          size="large"
          type="submit"
          variant="flat"
        >
          S'INSCRIRE
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
        style="color: #444 !important;"
        variant="flat"
      >
        <template #prepend>
          <v-img
            src="/google_icon.svg"
            width="32"
          />
        </template>
        S'INSCRIRE AVEC GOOGLE
      </v-btn>
    </v-card>
  </v-container>
  <Header />

</template>

<script setup lang="ts">
</script>
