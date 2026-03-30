# DEFIUT

## Lien du site déployé sur firebase

[https://defiut-9fe2f.web.app/](https://defiut-9fe2f.web.app/)

_Note : Un workflow a été mis en place, le site se met à jour lors d'un merge ou d'un push sur la branche main_

## 🚀 Démarrage rapide

### Prérequis

- Node.js
- npm ou yarn

### Installation et lancement

```bash
# Cloner le repository
git clone https://GitHub.com/Thibault0712/DEFIUT

# Installer les dépendances
npm install

# Lancer le projet en développement
npm run dev
```

## 📁 Structure et conventions de développement

### Organisation du code

#### FIREBASE

#### 1) Dossier `src/api/firebase`

Le dossier `src/api/firebase` sert de **couche d’accès aux données** Firebase (CRUD), par exemple :

- `create/createFirebaseUserCollection.js`
- `read/getFirebaseUserCollection.js`
- `update/updateFirebaseUserCollection.js`
- `delete/deleteFirebaseUserCollection.js`

Objectif :

- isoler les appels Firebase (Firestore/Auth/Storage),
- éviter de dupliquer des requêtes partout,
- pouvoir changer la source de données plus facilement.

`src/api/firebaseApp.js` centralise l’initialisation Firebase (`app`, `auth`, `db`, `storage`).

---

#### 2) Dossier `src/store` (Vuex)

Le store gère :

- l’**état global** de l’app (`user`, `userList`),
- la **logique métier** (connexion, inscription, pagination classement, thème, etc.),
- la **synchronisation UI** via `getters/mutations/actions`,
- la persistance partielle (`vuex-persistedstate` sur `user`). (utilisé pour user uniquement)

---

#### 3) Pourquoi utiliser le store et pas Firebase directement dans les composants

Dans un composant, faire des requêtes Firebase directes crée :

- logique métier dispersée,
- comportements incohérents entre pages,
- maintenance plus difficile.

Le bon flux est :

`Composant -> store.dispatch(...) -> api/firebase/* -> Firebase -> commit mutation -> UI réactive`

Avantages :

- logique centralisée,
- UI toujours alignée avec l’état global,
- code plus testable et réutilisable.

---

#### 4) Comment utiliser le store dans son code

Exemple (Composition API) :

```vue
<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const currentUser = computed(() => store.getters['user/user']);

async function login(email, password) {
  await store.dispatch('user/logIn', { email, password });
}

async function refreshRanking() {
  await store.dispatch('userList/updateList');
}
</script>
```

#### HTML / COMPOSANTS

**Utiliser le moins possible la balise style préférer les éléments deja disponible dans le param class par exemple class="px-12" padding horizontal de 12**

**Règle importante :** Avant de développer, posez-vous la question :

> "Ce code sera-t-il réutilisé ailleurs dans le site ?"

- **OUI** → Créez un composant dans le dossier `components/`
- **NON** → Développez directement dans la page concernée

### Exemple de structure

```
src/
├── pages/              # Pages de l'application
│   └── index.js        # Code spécifique à cette page dans lequel on utilise scoreboard
├── components/         # Composants réutilisables uniquement
│   ├── Scoreboard/
│
│
└── ...
```

### Quand créer un composant ?

✅ **Créez un composant si :**

- Il sera utilisé sur plusieurs pages

❌ **Ne créez pas de composant si :**

- Le code est spécifique à une seule page
- Il n'y a aucune possibilité de réutilisation
