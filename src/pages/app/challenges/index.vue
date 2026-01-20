<script setup>
const avancement = ["Non commencé", "En cours", "Terminé"];
const difficulte = ["Facile", "Moyen", "Difficile"];
const defis = ["Web", "Programmation", "Réseau", "Cryptographie"];
const featuredChallenges = [
  {
    title: "XSS Stored",
    points: 200,
    description:
      "Injectez un script persistant pour voler les cookies de l'admin.",
    difficulty: "Moyen",
    progress: "En cours",
    category: "Web",
  },
  {
    title: "Admin Panel Bypass",
    points: 350,
    description:
      "Contournez le formulaire de login sans connaître le mot de passe.",
    difficulty: "Difficile",
    progress: "",
    category: "Cryptographie",
  },

  {
    title: "RSA Factorization",
    points: 400,
    description: "La clé publique est trop petite. Retrouvez la clé privée.",
    difficulty: "Difficile",
    progress: "Terminé",
    category: "Programmation",
  },
  {
    title: "Hash Cracking",
    points: 200,
    description:
      "Retrouvez le mot de passe original à partir de ce hash SHA-256.",
    difficulty: "Moyen",
    progress: "En cours",
    category: "Réseau",
  },

  {
    title: "Network Analysis",
    points: 300,
    description:
      "Analysez le fichier .pcap pour intercepter le trafic suspect.",
    difficulty: "Difficile",
    progress: "",
    category: "Réseau",
  },
  {
    title: "FTP Interception",
    points: 100,
    description: "Un fichier a été transféré en clair. Retrouvez son contenu.",
    difficulty: "Facile",
    progress: "Terminé",
    category: "Web",
  },

  {
    title: "Python Jail",
    points: 250,
    description:
      "Sortez de cet environnement Python restreint (sandbox escape).",
    difficulty: "Moyen",
    progress: "",
    category: "Programmation",
  },
  {
    title: "Regex Master",
    points: 150,
    description:
      "Créez une expression régulière pour valider ce format complexe.",
    difficulty: "Facile",
    progress: "En cours",
    category: "Web",
  },
];
</script>

<template>
  <Header />
  <v-container max-width="1200">
    <h1 class="mb-4">Catalogue des défis</h1>

    <v-container>
      <v-row>
        <v-col>
          <v-combobox label="Nom du défi" />
        </v-col>

        <v-col>
          <v-combobox
            :items="defis"
            label="Tous les défis"
            placeholder="Ex: Web"
            multiple
            persistent-placeholder
          />
        </v-col>

        <v-col>
          <v-combobox
            :items="difficulte"
            label="Difficulté"
            placeholder="Ex: Facile"
            multiple
            persistent-placeholder
          />
        </v-col>

        <v-col>
          <v-combobox label="Points minimum" />
        </v-col>

        <v-col>
          <v-combobox label="TAGS" />
        </v-col>

        <v-col>
          <v-combobox
            :items="avancement"
            label="Avancement"
            placeholder="Ex: En Cours"
            multiple
            persistent-placeholder
          />
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
            :avancement="challenge.progress"
            :categorie="challenge.category"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <Footer />
</template>

<style scoped></style>
