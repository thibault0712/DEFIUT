<script setup>

</script>

<template>
  <Header />
  <v-container class="py-16 px-6 main-container" max-width="900">
    <h1 class="text-h2 font-weight-bold text-center mb-16 title-orbitron ">
      Politique de confidentialité
    </h1>

    <div class="legal-content">
      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">INTRODUCTION</h2>
        <p>
          La plateforme DEFIUT, éditée par l’IUT de Vannes, attache une importance particulière à la protection de la vie privée et des données personnelles de ses utilisateurs. Cette politique de confidentialité vise à informer les utilisateurs des pratiques de traitement des données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">1. RESPONSABLE DU TRAITEMENT DES DONNÉES</h2>
        <p class="mb-4">Le responsable du traitement des données personnelles est l'entité qui définit les finalités et les moyens de ce traitement.</p>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Nom de l'entité : </strong> Equipe DEFIUT</li>
          <li class="mb-2 position-relative pl-4"><strong>Adresse : </strong> 8 Rue Michel de Montaigne, 56000 Vannes.</li>
          <li class="mb-2 position-relative pl-4"><strong>Contact Délégué à la Protection des Données (DPO) ou contact RGPD : </strong> rgpd@defiut.com.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">2. Données Collectées, Finalités et Bases Légales</h2>
        <p class="mb-4">Nous collectons et traitons les données personnelles des utilisateurs pour des finalités strictement définies et sur les bases légales prévues par le RGPD.</p>
        <v-table class="privacy-table rounded-lg">
          <thead>
            <tr>
              <th class="text-uppercase font-weight-bold py-4">Catégories de données collectées</th>
              <th class="text-uppercase font-weight-bold py-4">Finalités du traitement</th>
              <th class="text-uppercase font-weight-bold py-4">Base légale (RGPD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-4">
                <strong>Données d'identification :</strong> Pseudo, Adresse e-mail, Mot de passe (haché)
              </td>
              <td class="py-4">
                Création et gestion du compte utilisateur, authentification sécurisée.
              </td>
              <td class="py-4">
                Maintenance, sécurité de la plateforme et détection de tentatives de fraude
              </td>
            </tr>

            <tr>
              <td class="py-4">
                <strong>Données d'activité :</strong> Scores, Temps de résolution, Défis réussis, Badges obtenus.
              </td>
              <td class="py-4">
                Évaluation des performances, gestion du classement, suivi pédagogique.
              </td>
              <td class="py-4">
                Intérêt Légitime de l'éditeur (animation de la compétition) et Mission d'Intérêt Public (mission éducative de l'établissement).
              </td>
            </tr>

            <tr>
              <td class="py-4">
                <strong>Données de connexion :</strong> Adresse IP, date de connexion, type de navigateur.
              </td>
              <td class="py-4">
                Maintenance, sécurité de la plateforme et détection de tentatives de fraude
              </td>
              <td class="py-4">
                Intérêt Légitime (assurer la sécurité et l'intégrité du service).
              </td>
            </tr>
          </tbody>
        </v-table>

        <p class="my-4">
          Le caractère obligatoire ou facultatif des données est signalé lors de la collecte. Le défaut de fourniture d'une donnée obligatoire empêche la création du compte et l'accès au service.
        </p>

      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">3. DURÉÉE DE CONSERVATION DES DONNÉES</h2>
        <p class="mb-4">Les données personnelles sont conservées pour une durée strictement nécessaire à l'accomplissement des finalités décrites ci-dessus.</p>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Données de Compte et d'Activité : </strong> Elles sont conservées pour la durée active du projet DEFIUT plus une période administrative n'excédant pas 6 à 12 mois pour la finalisation de l'évaluation et des archives. </li>
          <li class="mb-2 position-relative pl-4"><strong>Au-delà : </strong> Après cette période, les données sont supprimées de manière sécurisée ou anonymisées afin d'être conservées uniquement à des fins statistiques (sans possibilité de vous identifier).</li>
          <li class="mb-2 position-relative pl-4"><strong>Données de Connexion et de Sécurité : </strong> Conservées pour une durée maximale de  1 an pour les besoins de la traçabilité légale.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">4. DESTINATION DES DONNÉES</h2>
        <p class="mb-4">Vos données personnelles sont destinées :</p>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Aux services internes de l'éditeur :</strong> L'équipe technique de développement et l'équipe pédagogique en charge de la gestion et de l'évaluation des défis.</li>
          <li class="mb-2 position-relative pl-4"><strong>Aux autres utilisateurs :</strong> Votre Pseudo et votre Score/Classement sont visibles publiquement ou par les autres utilisateurs de la plateforme dans le cadre de la nature compétitive du service.</li>
          <li class="mb-2 position-relative pl-4"><strong>Aux sous-traitants :</strong> L'hébergeur du site (voir Article 5).</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 text-uppercase">5. HÉBERGEMENT ET TRANSFERT DES DONNÉES</h2>

        <h3 class="text-h6 font-weight-bold mb-2 ">5.1. Hébergement</h3>
        <p class="mb-2">
          La plateforme DEFIUT est hébergée par Microsoft Azure.
        </p>

        <ul class="ml-6 mb-4">
          <li class="mb-2 position-relative pl-4"><strong>Nom de l'Hébergeur :</strong> Microsoft Azure</li>
          <li class="mb-2 position-relative pl-4"><strong>Centre de Données Utilisé :</strong> Europe de l’Ouest</li>
          <li class="mb-2 position-relative pl-4"><strong>Entité Juridique Européenne :</strong> Microsoft Azure Ireland, 1, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, D18 P521, Irlande</li>
        </ul>

        <h3 class="text-h6 font-weight-bold mb-2 ">5.2. Transfert hors UE</h3>
        <p class="mb-2">
          Nous garantissons qu'aucun transfert de vos données personnelles n'est effectué en dehors de l'Union Européenne ou de l'Espace Économique Européen, en conformité avec le RGPD.
        </p>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">6. SÉCURITÉ DES DONNÉES</h2>
        <p class="mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées, conformes à l'état de l'art, pour protéger vos données personnelles contre l'altération, la perte, l'accès non autorisé ou la divulgation. Cela inclut :</p>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4">Le chiffrement des communications via le protocole HTTPS.</li>
          <li class="mb-2 position-relative pl-4">Le hachage irréversible des mots de passe.</li>
          <li class="mb-2 position-relative pl-4">L'accès restreint à la base de données uniquement aux personnes autorisées.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">7. VOS DROITS SUR VOS DONNÉES PERSONNELLES</h2>
        <v-table class="privacy-table rounded-lg">
          <thead>
            <tr>
              <th class="text-uppercase font-weight-bold py-4">DROIT</th>
              <th class="text-uppercase font-weight-bold py-4">DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-4">
                Droit d'accès
              </td>
              <td class="py-4">
                Création et gestion du compte utilisateur, authentification sécurisée.
              </td>
            </tr>

            <tr>
              <td class="py-4">
                Droit de rectification
              </td>
              <td class="py-4">
                Évaluation des performances, gestion du classement, suivi pédagogique.
              </td>

            </tr>

            <tr>
              <td class="py-4">
                Droit à l'effacement
              </td>
              <td class="py-4">
                Maintenance, sécurité de la plateforme et détection de tentatives de fraude
              </td>
            </tr>

            <tr>
              <td class="py-4">
                Droit à la limitation
              </td>
              <td class="py-4">
                Demander de suspendre l'utilisation de certaines de vos données.
              </td>
            </tr>

            <tr>
              <td class="py-4">
                Droit à l'opposition
              </td>
              <td class="py-4">
                Vous opposer à un traitement basé sur l'intérêt légitime de l'éditeur.
              </td>
            </tr>
          </tbody>
        </v-table>
      </section>

    </div>
  </v-container>
  <Footer />
</template>

<style scoped>

.link {
  color: #8DA34B;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.link:hover {
  border-bottom: 1px solid #8DA34B;
}

p {
  text-align: justify;
}

</style>
