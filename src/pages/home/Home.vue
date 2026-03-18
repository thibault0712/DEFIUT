<script setup>
definePage({
  alias: ['/'],
});

// Données factices pour le carousel des défis
const featuredChallenges = [
  {
    title: 'SQL Injection',
    points: 100,
    description: 'Exploitez une faille SQL pour récupérer la base de données.',
    difficulty: 'Facile',
    progress: 'En cours',
    category: 'Web',
  },
  {
    title: 'Reverse Engineering',
    points: 250,
    description: 'Analysez le binaire pour trouver le flag caché.',
    difficulty: 'Moyen',
    progress: '',
    category: 'Programmation',
  },
  {
    title: 'Cryptography',
    points: 150,
    description: 'Déchiffrez le message codé avec une méthode classique.',
    difficulty: 'Facile',
    progress: 'Terminé',
    category: 'Cryptographie',
  },
  {
    title: 'Network Analysis',
    points: 300,
    description: 'Analysez le fichier .pcap pour intercepter le trafic.',
    difficulty: 'Difficile',
    progress: 'En cours',
    category: 'Réseau',
  },
  {
    title: 'Web Exploitation',
    points: 200,
    description: 'Trouvez la vulnérabilité XSS sur cette page.',
    difficulty: 'Moyen',
    progress: 'Terminé',
    category: 'Web',
  },
];
</script>

<template>
  <Header />

  <v-main class="min-vh-100 pb-16 pt-0">
    <!-- Hero / Section de bienvenue -->
    <v-container max-width="1200">
      <v-container
        class="d-flex align-center justify-center h-screen pb-16"
        fluid
      >
        <div class="d-flex flex-column flex-md-row align-center justify-center w-100">
          <div class="d-flex justify-center justify-md-end mb-6 mb-md-0">
            <v-img
              class="mr-md-10"
              contain
              max-width="250"
              src="/big_logo.png"
              width="250"
            />
          </div>

          <v-divider class="d-none d-md-flex" vertical />

          <div class="d-flex flex-column align-center align-md-start justify-center ml-md-10 text-center text-md-left">
            <h1 class="text-h3 text-md-h1 font-weight-bold text-on-background mb-4">
              Bienvenue
            </h1>
            <p
              class="text-body-1 text-md-h5 text-medium-emphasis"
              style="line-height: 1.4; max-width: 500px"
            >
              Défis CTF, adrénaline et progression garantie : deviens le hacker
              éthique que tu rêves d'être
            </p>
          </div>
        </div>
      </v-container>
    </v-container>

    <v-container class="py-0" max-width="1200">
      <!-- Carousel des défis -->
      <div class="py-10">
        <h2 class="text-h4 font-weight-bold mb-10 text-center text-md-left">Nos défis à la une :</h2>

        <v-sheet class="bg-transparent">
          <v-slide-group center-active class="pa-4" show-arrows>
            <v-slide-group-item v-for="(challenge, n) in featuredChallenges" :key="n">
              <Card
                :avancement="challenge.progress"
                :categorie="challenge.category"
                class="ma-4"
                :description="challenge.description"
                :difficulte="challenge.difficulty"
                height="250"
                :points="challenge.points"
                :titre="challenge.title"
                width="250"
              />
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>

        <v-row class="mt-8 px-4" justify="center justify-md-end">
          <v-btn
            class="text-none font-weight-bold px-8"
            color="primary"
            flat
            size="large"
            to="/challenges"
          >
            VOIR PLUS
          </v-btn>
        </v-row>
      </div>

      <!-- Section classement -->
      <div class="py-10">
        <h2 class="text-h4 font-weight-bold mb-10 text-center text-md-left">Classement :</h2>

        <v-row align="center" class="gap-6 gap-md-0" justify="center">
          <v-col class="d-flex justify-center" cols="12" md="6">
            <Podium />
          </v-col>

          <v-col class="d-flex justify-center border-s-thin" cols="12" md="6">
            <Scoreboard :max-list-size="5" />
          </v-col>
        </v-row>

        <v-row class="mt-8 px-4" justify="center justify-md-end">
          <v-btn
            class="text-none font-weight-bold px-8"
            color="primary"
            flat
            size="large"
            to="/ranking"
          >
            VOIR PLUS
          </v-btn>
        </v-row>
      </div>
    </v-container>
  </v-main>

  <Footer />
</template>
