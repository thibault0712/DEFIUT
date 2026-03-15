<template>
  <v-footer
    class="d-flex flex-column pa-0 bg-background"
    aria-label="Pied de page du site"
  >

    <v-container class="w-100 px-0 py-0" fluid>
      <v-divider class="opacity-50" />

      <v-container class="py-12 px-4 px-md-16">

        <v-row
          class="ga-10 ga-md-16"
          justify="center"
          justify-md="start"
          align="start"
        >

          <v-col
            cols="12"
            md="auto"
            class="d-flex justify-center justify-md-start"
          >
            <v-img
              alt="DefIUT logo"
              class="mx-auto mx-md-0"
              src="/big_logo.png"
              width="120"
            />
          </v-col>

          <v-col cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">À propos & légal</h3>
            <ul class="footer-links">
              <li><router-link class="footer-link" to="/about/legal-notices">Mentions légales</router-link></li>
              <li><router-link class="footer-link" to="/about/cgu">CGU</router-link></li>
              <li><router-link class="footer-link" to="/about/privacy-policy">Politique de confidentialité</router-link></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">Aide & support</h3>
            <ul class="footer-links">
              <li><router-link class="footer-link" to="/help/faq">FAQ</router-link></li>
              <li><router-link class="footer-link" to="/help/contact">Contact</router-link></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">Liens rapides</h3>
            <ul class="footer-links">
              <li><router-link class="footer-link" to="/">Accueil</router-link></li>
              <li><router-link class="footer-link" to="/challenges">Défis</router-link></li>
              <li><router-link class="footer-link" to="/ranking">Classement</router-link></li>
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

.footer-link {
  text-decoration: none;
  color: inherit;
}

.footer-link:hover {
  text-decoration: underline;
}

.text-center {
  text-align: center;
}

</style>
