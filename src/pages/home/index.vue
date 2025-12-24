<script setup>
  definePage({
    alias: ['/'],
  })

  // Données factices pour le carousel des défis
  const featuredChallenges = [
    { title: 'SQL Injection', points: 100, description: 'Exploitez une faille SQL pour récupérer la base de données.', difficulty: 'Facile' },
    { title: 'Reverse Engineering', points: 250, description: 'Analysez le binaire pour trouver le flag caché.', difficulty: 'Moyen' },
    { title: 'Cryptography', points: 150, description: 'Déchiffrez le message codé avec une méthode classique.', difficulty: 'Facile' },
    { title: 'Network Analysis', points: 300, description: 'Analysez le fichier .pcap pour intercepter le trafic.', difficulty: 'Difficile' },
    { title: 'Web Exploitation', points: 200, description: 'Trouvez la vulnérabilité XSS sur cette page.', difficulty: 'Moyen' },
  ]

</script>

<template>
  <Header />

  <v-main class="bg-background min-vh-100 pt-0 pb-16">
    <v-container class="d-flex align-center justify-center h-screen pb-16" fluid>

      <div class="d-flex align-center justify-center w-100">

        <div class="d-flex justify-end">
          <v-img
            class="mr-10"
            contain
            max-width="250"
            src="/big_logo.png"
            width="250"
          />
        </div>

        <v-divider vertical />

        <div class="d-flex flex-column justify-center ml-10">
          <h1 class="text-h1 font-weight-bold text-on-background mb-4">
            Bienvenue
          </h1>
          <p class="text-h5 text-medium-emphasis" style="line-height: 1.4; max-width: 500px;">
            Défis CTF, adrénaline et progression garantie : deviens le hacker éthique que tu rêves d'être
          </p>
        </div>

      </div>
    </v-container>

    <v-container class="py-10">
      <h2 class="text-h4 font-weight-bold mb-10">
        Nos défis à la une :
      </h2>

      <v-sheet class="bg-transparent">
        <v-slide-group
          center-active
          class="pa-4"
          show-arrows
        >
          <v-slide-group-item
            v-for="(challenge, n) in featuredChallenges"
            :key="n"
          >
            <v-card
              class="ma-4 bg-surface border-thin d-flex flex-column"
              flat
              height="250"
              width="250"
            >
              <v-card-item class="pt-6">
                <h6 class="text-h6 font-weight-bold text-on-surface mb-2 text-truncate">
                  {{ challenge.title }}
                </h6>
                <div class="text-caption text-medium-emphasis mb-4">
                  Nombre de points : {{ challenge.points }}
                </div>
                <p class="text-body-2 text-medium-emphasis">
                  {{ challenge.description }}
                </p>
              </v-card-item>

              <v-spacer />

              <v-card-actions class="pa-4">
                <span class="text-caption font-weight-bold text-primary text-uppercase">
                  {{ challenge.difficulty }}
                </span>
              </v-card-actions>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-sheet>

      <v-row class="mt-8 px-4" justify="end">
        <v-btn
          class="text-none font-weight-bold px-8"
          color="primary"
          flat
          size="large"
          to="/app/challenges"
        >
          VOIR PLUS
        </v-btn>
      </v-row>
    </v-container>

    <v-container>
      <h2 class="text-h4 font-weight-bold mb-10">
        Classement :
      </h2>

      <v-row align="center" justify="center">
        <v-col class="d-flex justify-center" cols="12" md="6">
          <Podium />
        </v-col>

        <v-col class="d-flex justify-center border-s-thin" cols="12" md="6">
          <Scoreboard />
        </v-col>
      </v-row>

      <v-row class="mt-8 px-4" justify="end">
        <v-btn
          class="text-none font-weight-bold px-8"
          color="primary"
          flat
          size="large"
          to="/app/ranking"
        >
          VOIR PLUS
        </v-btn>
      </v-row>

    </v-container>

  </v-main>

  <Footer />
</template>
