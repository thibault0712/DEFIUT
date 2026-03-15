<script setup>
  definePage({
    alias: ['/'],
  })

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
  ]
</script>

<template>
  <Header />

  <v-main class="min-vh-100 pt-0 pb-16">
  <v-container max-width="1200">

    <!-- Hero / Section de bienvenue -->
    <v-container class="d-flex align-center justify-center py-16" fluid>
      <v-row class="w-100" align="center" justify="center">
        <!-- Logo -->
        <v-col cols="12" md="auto" class="d-flex justify-center mb-8 mb-md-0">
          <v-img
            src="/big_logo.png"
            max-width="250"
            width="250"
            alt="Logo DefIUT plateforme de défis CTF"
          />
        </v-col>

        <!-- Texte d'accueil -->
        <v-col cols="12" md="auto" class="d-flex flex-column justify-center text-center text-md-left">
          <h1 class="text-h1 font-weight-bold text-on-background mb-4">
            Bienvenue
          </h1>
          <p 
          class="text-h5 text-medium-emphasis hero-text" 
          style="line-height: 1.4; max-width: 700px;"
          >
            Défis CTF, adrénaline et progression garantie : deviens le hacker
            éthique que tu rêves d'être
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Carousel des défis -->
    <v-container class="py-10">
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
    </v-container>

    <!-- Section classement -->
    <v-container class="py-10">
      <h2 class="text-h4 font-weight-bold mb-10 text-center text-md-left">Classement :</h2>

      <v-row align="stretch" justify="center" class="gap-6 gap-md-0">
        <v-col cols="12" md="6" class="d-flex justify-center">
          <Podium />
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-center border-s-thin">
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
    </v-container>

  </v-container>
</v-main>

  <Footer />
</template>
