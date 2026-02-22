<template>
  <v-footer class="d-flex flex-column pa-0 bg-background">

    <v-container class="w-100 px-0 py-0" fluid>
      <v-divider class="opacity-50" />

      <v-container class="py-12 w-75" fluid>

        <v-row class="ga-md-16" justify="start">

          <v-col class="d-flex justify-center" cols="12" md="auto">
            <v-img
              alt="DefIUT logo"
              class="mx-auto"
              src="/big_logo.png"
              width="120"
            />
          </v-col>

          <v-col cols="12" md="auto">
            <h2 class="mb-2">À propos & légal</h2>
            <ul class="footer-links">
              <li><router-link class="text-decoration-none" style="color: inherit" to="/about/legal-notices">Mentions légales</router-link></li>
              <li><router-link class="text-decoration-none" style="color: inherit" to="/about/cgu">CGU</router-link></li>
              <li><router-link class="text-decoration-none" style="color: inherit" to="/about/privacy-policy">Politique de confidentialité</router-link></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h2 class="mb-2">Aide & support</h2>
            <ul class="footer-links">
              <li><router-link class="text-decoration-none" style="color: inherit" to="/help/faq">FAQ</router-link></li>
              <li><router-link class="text-decoration-none" style="color: inherit" to="/help/contact">Contact</router-link></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h2 class="mb-2">Liens rapides</h2>
            <ul class="footer-links">
              <li><router-link class="text-decoration-none" style="color: inherit" to="/">Accueil</router-link></li>
              <li><router-link class="text-decoration-none" style="color: inherit" to="/challenges">Défis</router-link></li>
              <li><router-link class="text-decoration-none" style="color: inherit" to="/ranking">Classement</router-link></li>
            </ul>
          </v-col>
        </v-row>

        <v-divider class="my-10 opacity-50" />

        <v-row justify="center">
          <v-col class="text-center font-italic" cols="12">
            © {{ new Date().getFullYear() }} — <strong>DEFIUT</strong> – Tous droits réservés.
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
</script>

<style scoped>

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.footer-links li {
  margin-bottom: 6px;
}

.text-center {
  text-align: center;
}

</style>
