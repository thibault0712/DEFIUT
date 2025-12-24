<script setup>

</script>

<template>
  <Header />
  <v-container class="d-flex align-center justify-center py-12">
    <v-container
      class="pa-8 text-center w-100"
      max-width="600"
      width="100%"
    >
      <h1 class="text-h3 font-weight-bold mb-8">
        Nous contacter
      </h1>

      <v-form>

        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              class="mb-2"
              density="comfortable"
              label="Nom"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              class="mb-2"
              density="comfortable"
              label="Prénom"
              variant="outlined"
            />
          </v-col>
        </v-row>
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
          label="Sujet"
          theme="dark"
          variant="outlined"
        />

        <v-text-field
          class="mb-2"
          density="comfortable"
          label="Message"
          theme="dark"
          variant="outlined"
        />

        <v-textarea
          label="Message"
          rows="5"
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
          ENVOYER
        </v-btn>
      </v-form>
    </v-container>
  </v-container>
  <Footer />
</template>

<style scoped>

</style>
