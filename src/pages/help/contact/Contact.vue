<script setup>
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';
const snackbar = ref(false);
const snackbarText = ref('');
const snackbarColor = ref('success');

const form = reactive({
  nom: '',
  prenom: '',
  email: '',
  sujet: '',
  message: '',
});

const loading = ref(false);

const sendEmail = async () => {
  if (!form.nom || !form.prenom || !form.email || !form.message) {
    snackbarText.value = 'Veuillez renseigner tous les champs';
    snackbarColor.value = 'warning';
    snackbar.value = true;
    return;
  }
  loading.value = true;

  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        sujet: form.sujet,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    );

    snackbarText.value = 'Message envoyé avec succès !';
    snackbarColor.value = 'success';
    snackbar.value = true;

    // reset
    form.nom = '';
    form.prenom = '';
    form.email = '';
    form.sujet = '';
    form.message = '';
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Header />
  <v-container class="d-flex align-center justify-center py-12">
    <v-container class="pa-8 text-center w-100" max-width="600" width="100%">
      <h1 class="text-h3 font-weight-bold mb-8">Nous contacter</h1>

      <v-form @submit.prevent="sendEmail">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.nom"
              class="mb-2"
              density="comfortable"
              label="Nom"
              variant="outlined"
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="form.prenom"
              class="mb-2"
              density="comfortable"
              label="Prénom"
              variant="outlined"
            />
          </v-col>
        </v-row>
        <v-text-field
          v-model="form.email"
          class="mb-2"
          density="comfortable"
          label="Email"
          theme="dark"
          variant="outlined"
        />

        <v-text-field
          v-model="form.sujet"
          class="mb-2"
          density="comfortable"
          label="Sujet"
          theme="dark"
          variant="outlined"
        />

        <v-textarea
          v-model="form.message"
          label="Message"
          rows="5"
          variant="outlined"
        />

        <v-btn
          :loading="loading"
          :disabled="loading"
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

  <v-snackbar
    v-model="snackbar"
    :color="snackbarColor"
    location="top end"
    elevation="24"
    timeout="4000"
    class="mt-4 mr-4"
  >
    <div class="d-flex align-center">
      <v-icon
        start
        icon="mdi-check-circle"
        v-if="snackbarColor === 'success'"
      ></v-icon>
      <v-icon start icon="mdi-alert-circle" v-else></v-icon>
      {{ snackbarText }}
    </div>
  </v-snackbar>
</template>

<style scoped></style>
