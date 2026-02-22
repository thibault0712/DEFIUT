<script setup>
  const faqs = [
    {
      title: 'Comment se créer un compte ?',
      text: 'Pour rejoindre l\'aventure DEFIUT, cliquez sur le bouton \'S\'inscrire\' en haut de la page. Vous devrez choisir un pseudo (qui apparaîtra dans les classements), renseigner une adresse e-mail valide et choisir un mot de passe sécurisé. Une fois votre inscription validée, vous aurez immédiatement accès à l\'ensemble des défis disponibles.',
    },
    {
      title: 'Puis-je participer à plusieurs défis en même temps ?',
      text: 'Oui, absolument ! La plateforme DEFIUT est conçue pour vous permettre de naviguer librement entre les différents défis. Votre progression est sauvegardée individuellement pour chaque épreuve, vous permettant de mettre un défi en pause pour en explorer un autre et d\'y revenir plus tard sans perdre votre avancée.',
    },
    {
      title: 'Le classement est-il mis à jour en temps réel ?',
      text: 'Oui, le classement est dynamique. Dès que vous réussissez un défi et que votre solution est validée, vos points sont calculés et votre position dans le classement général ou par catégorie est actualisée instantanément. Vous pouvez ainsi suivre votre progression et celle des autres participants en direct.',
    },
    {
      title: 'Que signifient les différents badges ?',
      text: 'Les badges sont des distinctions honorifiques qui récompensent votre expertise et votre engagement sur la plateforme. Ils peuvent être obtenus en résolvant un certain nombre de défis, en terminant une catégorie spécifique (ex: développement, algorithmes). Ils sont visibles sur votre profil public.',
    },
    {
      title: 'Comment supprimer mon compte ?',
      text: 'Vous pouvez supprimer votre compte en toute autonomie et de manière instantanée. Pour cela, rendez-vous dans votre espace \'Mon Profil\' en cliquant sur votre image de profil une fois connecté. Une option de suppression définitive y est disponible, entraînant la disparition automatique de votre compte, de vos scores et de vos données personnelles de nos serveurs.',
    },
  ]
</script>

<template>
  <Header />

  <v-container class="px-6 h-screen py-15" max-width="900">
    <h1 class="text-h2 font-weight-bold text-center mb-12 title-orbitron text-on-background">
      FAQ
    </h1>

    <v-expansion-panels class="faq-panels border rounded-lg">
      <v-expansion-panel
        v-for="(faq, i) in faqs"
        :key="i"
        class="bg-surface"
      >
        <v-expansion-panel-title class="text-subtitle-1 font-weight-bold py-6">
          {{ faq.title }}
        </v-expansion-panel-title>

        <v-expansion-panel-text class="text-medium-emphasis pb-4">
          {{ faq.text }}
        </v-expansion-panel-text>

        <v-divider v-if="i < faqs.length - 1" />
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <Footer />
</template>

<style scoped>

</style>
