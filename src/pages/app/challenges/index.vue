<script setup>
  const featuredChallenges = [
    {
      title: 'XSS Stored',
      points: 200,
      description:
        'Injectez un script persistant pour voler les cookies de l\'admin.',
      difficulty: 'Moyen',
    },
    {
      title: 'Admin Panel Bypass',
      points: 350,
      description:
        'Contournez le formulaire de login sans connaître le mot de passe.',
      difficulty: 'Difficile',
    },

    {
      title: 'RSA Factorization',
      points: 400,
      description: 'La clé publique est trop petite. Retrouvez la clé privée.',
      difficulty: 'Difficile',
    },
    {
      title: 'Hash Cracking',
      points: 200,
      description:
        'Retrouvez le mot de passe original à partir de ce hash SHA-256.',
      difficulty: 'Moyen',
    },

    {
      title: 'Network Analysis',
      points: 300,
      description:
        'Analysez le fichier .pcap pour intercepter le trafic suspect.',
      difficulty: 'Difficile',
    },
    {
      title: 'FTP Interception',
      points: 100,
      description: 'Un fichier a été transféré en clair. Retrouvez son contenu.',
      difficulty: 'Facile',
    },

    {
      title: 'Python Jail',
      points: 250,
      description:
        'Sortez de cet environnement Python restreint (sandbox escape).',
      difficulty: 'Moyen',
    },
    {
      title: 'Regex Master',
      points: 150,
      description:
        'Créez une expression régulière pour valider ce format complexe.',
      difficulty: 'Facile',
    },
  ]
</script>

<template>
  <Header />
  <v-container class="h-screen">
    <h1>Catalogue des défis</h1>

    <v-container>
      <v-row>
        <v-col>
          <v-combobox label="Nom du défi" />
        </v-col>

        <v-col>
          <v-combobox
            :items="['Web', 'Programmation', 'Réseau', 'Cryptographie']"
            label="Tous les défis"
          />
        </v-col>

        <v-col>
          <v-combobox
            :items="['Facile', 'Moyen', 'Difficile']"
            label="Difficulté"
          />
        </v-col>

        <v-col>
          <v-combobox label="Points minimum" />
        </v-col>

        <v-col>
          <v-combobox label="TAGS" />
        </v-col>
      </v-row>

      <v-btn color="#BA2653" variant="flat"> Chercher </v-btn>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col
          v-for="(challenge, index) in featuredChallenges"
          :key="index"
          cols="12"
          lg="3"
          md="4"
          sm="6"
        >
          <Card
            :description="challenge.description"
            :difficulte="challenge.difficulty"
            :points="challenge.points"
            :titre="challenge.title"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <Footer />
</template>

<style scoped></style>
