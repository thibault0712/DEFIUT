<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      class="pa-8 text-center "
      elevation="4"
      max-width="500"
      rounded="lg"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold mb-8">
        S'inscrire
      </h1>

      <v-form>
        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Nom d'utilisateur"
          variant="outlined"
        />

        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Email"
          variant="outlined"
        />

        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Mot de passe"
          type="password"
          variant="outlined"
        />

        <v-text-field
          density="comfortable"
          label="Confirmer le mot de passe"
          type="password"
          variant="outlined"
        />

        <v-checkbox>
          <template #label>
            <div>
              J'accepte les
              <a
                href="/about/CGU"
                style="color: inherit"
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
        <span class="mx-4 text-caption">OU</span>
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
      <p class="text-body-2 text-grey-darken-1 mt-6">
        Déjà un compte ?
        <a
          class="text-decoration-none font-weight-bold"
          href="/auth/login"
          style="color: #8DA34B;"
        >
          Se connecter
        </a>
      </p>
    </v-card>

  </v-container>
  <Header />

</template>

<script setup lang="ts">
</script>
