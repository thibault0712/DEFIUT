<template>
  <v-footer class="text-grey-lighten-2 d-flex flex-column pa-0">

    <v-container class="w-100 px-0" fluid>
      <v-divider class="opacity-50" />

      <v-container class="py-12 px-80" fluid>

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
            <h3 class="footer-title">À propos & légal</h3>
            <ul class="footer-links">
              <li><a href="/about/legalNotices">Mentions légales</a></li>
              <li><a href="/about/CGU">CGU</a></li>
              <li><a href="/about/privacyPolicy">Politique de confidentialité</a></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h3 class="footer-title">Aide & support</h3>
            <ul class="footer-links">
              <li><a href="/help/FAQ">FAQ</a></li>
              <li><a href="/help/contact">Contact</a></li>
            </ul>
          </v-col>

          <v-col cols="12" md="auto">
            <h3 class="footer-title">Liens rapides</h3>
            <ul class="footer-links">
              <li><a href="/home">Accueil</a></li>
              <li><a href="/app/challenges">Défis</a></li>
              <li><a href="/app/ranking">Classement</a></li>
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

<style scoped>
.border-top-colored {
  border-top: 4px solid #ff4081;
  width: 100%;
}

.footer-title {
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 12px;
  text-transform: uppercase;
  color: white;
  text-align: left;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.footer-links li {
  margin-bottom: 6px;
}

.footer-links a {
  color: #cfcfcf;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  display: inline-block;
}

.footer-links a:hover {
  color: #ff4081;
  transform: translateX(4px);
}

.text-center {
  text-align: center;
}

.px-80 {
  padding-right: 80px;
  padding-left: 80px;
}
</style>
