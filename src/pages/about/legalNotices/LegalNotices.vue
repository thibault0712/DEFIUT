<script setup>

</script>

<template>
  <Header />
  <v-container class="py-16 px-6 main-container" max-width="900">
    <h1 class="text-h2 font-weight-bold text-center mb-16 title-orbitron ">
      Mentions légales
    </h1>

    <div class="legal-content">
      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">1. INFORMATIONS LÉGALES</h2>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Dénomination sociale :</strong> DEFIUT</li>
          <li class="mb-2 position-relative pl-4"><strong>Adresse :</strong> 8 Rue Michel de Montaigne, 56000 Vannes</li>
          <li class="mb-2 position-relative pl-4"><strong>Contact :</strong> <a class="link" href="mailto:contact@defiut.com">defiut.contact@gmail.com</a></li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">2. HÉBERGEMENT DU SITE</h2>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Hébergé par :</strong> Microsoft Azure</li>
          <li class="mb-2 position-relative pl-4"><strong>Adresse :</strong> 1, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, D18 P521, Irlande.</li>
          <li class="mb-2 position-relative pl-4"><strong>Centre de données utilisé :</strong> Europe de l'Ouest</li>
          <li class="mb-2 position-relative pl-4">
            <strong>Contact :</strong>
            <ul class="mt-2 ml-4">
              <li class="mb-2 position-relative pl-4">Informations Juridiques générales Azure : <a class="link" href="https://azure.microsoft.com/fr-fr/support/legal/" target="_blank">Lien légal</a></li>
              <li class="mb-2 position-relative pl-4">Centre de gestion de la confidentialité Microsoft : <a class="link" href="https://www.microsoft.com/fr-fr/TrustCenter/Privacy/" target="_blank">Lien TrustCenter</a></li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">3. PROPRIÉTÉ INTELLECTUELLE ET LICENCE</h2>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4"><strong>Licence :</strong> Le code source du projet DEFIUT est publié sous la licence GNU General Public</li>
          <li class="mb-2 position-relative pl-4"><strong>Titre du projet :</strong> DEFIUT</li>
          <li class="mb-2 position-relative pl-4"><strong>Contenu :</strong> L'ensemble des éléments constituant le Site (textes, images, logo, code source, etc.) sont la propriété exclusive de l'éditeur ou sont utilisés sous licence.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">4. LIMITATION DE RESPONSABILITÉ</h2>
        <p class="mb-4">
          L'éditeur s'efforce d'assurer au mieux l'exactitude et la mise à jour des informations diffusées sur le Site.
          Cependant, l'utilisateur reconnaît utiliser ces informations sous sa seule responsabilité.
        </p>
        <p class="mb-4">L'éditeur décline toute responsabilité :</p>
        <ul class="ml-6">
          <li class="mb-2 position-relative pl-4">En cas d'interruption du Site pour des raisons techniques ou de maintenance.</li>
          <li class="mb-2 position-relative pl-4">En cas de dommages résultant d'une intrusion frauduleuse d'un tiers ayant entraîné une modification des informations mises à disposition sur le Site.</li>
        </ul>
      </section>

      <section class="mb-10">
        <h2 class="text-h5 font-weight-bold mb-4 ">5. DROIT APPLICABLE ET ATTRIBUTION DE JURIDICTION</h2>
        <p>
          Les présentes Mentions Légales sont régies par le droit français. En cas de litige, et après échec de toute tentative de recherche de solution amiable, les tribunaux français seront seuls compétents.
        </p>
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
