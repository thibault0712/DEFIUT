<template>
  <v-footer
    aria-label="Pied de page du site"
    class="d-flex flex-column pa-0 bg-background"
  >

    <v-container class="w-100 px-0 py-0" fluid>
      <v-divider class="opacity-50" />

      <v-container class="py-12 px-4 px-md-16">
        <v-row
          align="start"
          class="ga-md-16 ga-8"
          justify="center"
          justify-md="start"
        >
          <v-col
            class="d-flex justify-centerjustify-md-start"
            cols="12"
            md="auto"
          >
            <v-img
              alt="DefIUT logo"
              max-width="120"
              src="/big_logo.png"
              width="120"
            />
          </v-col>

          <v-col class="text-center text-md-left" cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">À propos & légal</h3>
            <ul class="footer-links">
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/about/legal-notices"
                >Mentions légales</router-link>
              </li>
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/about/cgu"
                >CGU</router-link>
              </li>
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/about/privacy-policy"
                >Politique de confidentialité</router-link>
              </li>
            </ul>
          </v-col>

          <v-col class="text-center text-md-left" cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">Aide & support</h3>
            <ul class="footer-links">
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/help/faq"
                >FAQ</router-link>
              </li>
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/help/contact"
                >Contact</router-link>
              </li>
            </ul>
          </v-col>

          <v-col class="text-center text-md-left" cols="12" md="auto">
            <h3 class="mb-2 text-subtitle-1 font-weight-bold">Liens rapides</h3>
            <ul class="footer-links">
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/"
                >Accueil</router-link>
              </li>
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/challenges"
                >Défis</router-link>
              </li>
              <li>
                <router-link
                  class="text-decoration-none"
                  style="color: inherit"
                  to="/ranking"
                >Classement</router-link>
              </li>
            </ul>
          </v-col>
        </v-row>

        <v-divider class="my-10 opacity-50" />

        <v-row justify="center">
          <v-col class="text-center font-italic" cols="12">
            © {{ new Date().getFullYear() }} — <strong>DEFIUT</strong> – Tous
            droits réservés.
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 6px;
}

.text-center {
  text-align: center;
}
</style>
