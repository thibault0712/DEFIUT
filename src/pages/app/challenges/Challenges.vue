<script setup>
  const avancement = ['Non commencé', 'En cours', 'Terminé']
  const difficulte = ['Facile', 'Moyen', 'Difficile']
  const defis = ['Web', 'Programmation', 'Réseau', 'Cryptographie']
  const featuredChallenges = [
    {
      title: 'XSS Stored',
      points: 200,
      description:
        'Injectez un script persistant pour voler les cookies de l\'admin.',
      difficulty: 'Moyen',
      progress: 'En cours',
      category: 'Web',
    },
    {
      title: 'Admin Panel Bypass',
      points: 350,
      description:
        'Contournez le formulaire de login sans connaître le mot de passe.',
      difficulty: 'Difficile',
      progress: '',
      category: 'Cryptographie',
    },

    {
      title: 'RSA Factorization',
      points: 400,
      description: 'La clé publique est trop petite. Retrouvez la clé privée.',
      difficulty: 'Difficile',
      progress: 'Terminé',
      category: 'Programmation',
    },
    {
      title: 'Hash Cracking',
      points: 200,
      description:
        'Retrouvez le mot de passe original à partir de ce hash SHA-256.',
      difficulty: 'Moyen',
      progress: 'En cours',
      category: 'Réseau',
    },

    {
      title: 'Network Analysis',
      points: 300,
      description:
        'Analysez le fichier .pcap pour intercepter le trafic suspect.',
      difficulty: 'Difficile',
      progress: '',
      category: 'Réseau',
    },
    {
      title: 'FTP Interception',
      points: 100,
      description: 'Un fichier a été transféré en clair. Retrouvez son contenu.',
      difficulty: 'Facile',
      progress: 'Terminé',
      category: 'Web',
    },

    {
      title: 'Python Jail',
      points: 250,
      description:
        'Sortez de cet environnement Python restreint (sandbox escape).',
      difficulty: 'Moyen',
      progress: '',
      category: 'Programmation',
    },
    {
      title: 'Regex Master',
      points: 150,
      description:
        'Créez une expression régulière pour valider ce format complexe.',
      difficulty: 'Facile',
      progress: 'En cours',
      category: 'Web',
    },
  ]
</script>

<template>
  <Header />
  <v-main class="pb-16">
    <v-container max-width="1200">

      <h1 class="text-h4 font-weight-bold mb-8">
        Catalogue des défis
      </h1>

      <!-- FILTRES -->
      <v-card class="pa-4 mb-8" variant="outlined">
        <v-row>
          <v-col cols="12" md="6" lg="4">
            <v-combobox
              label="Nom du défi"
              clearable
            />
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-combobox
              :items="defis"
              label="Catégorie"
              multiple
              clearable
              placeholder="Ex : Web"
            />
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-combobox
              :items="difficulte"
              label="Difficulté"
              multiple
              clearable
              placeholder="Ex : Facile"
            />
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-text-field
              label="Points minimum"
              type="number"
              clearable
            />
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-combobox
              label="Tags"
              clearable
            />
          </v-col>

          <v-col cols="12" md="6" lg="4">
            <v-combobox
              :items="avancement"
              label="Avancement"
              multiple
              clearable
              placeholder="Ex : En cours"
            />
          </v-col>
        </v-row>

        <v-row justify="end">
          <v-btn
            color="#BA2653"
            size="large"
            class="text-none font-weight-bold"
          >
            Chercher
          </v-btn>
        </v-row>
      </v-card>

      <!-- LISTE DES DEFIS -->
      <v-row>
        <v-col
          v-for="(challenge, index) in featuredChallenges"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <Card
            :avancement="challenge.progress"
            :categorie="challenge.category"
            :description="challenge.description"
            :difficulte="challenge.difficulty"
            :points="challenge.points"
            :titre="challenge.title"
          />
        </v-col>
      </v-row>

    </v-container>
  </v-main>

  <Footer />
</template>

<style scoped></style>
