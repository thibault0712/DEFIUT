import { createRouter, createWebHistory } from 'vue-router'
import CGU from '@/pages/about/CGU/CGU.vue'
import LegalNotices from '@/pages/about/legalNotices/LegalNotices.vue'
import PrivacyPolicy from '@/pages/about/privacyPolicy/PrivacyPolicy.vue'
import Challenge from '@/pages/app/challenge/Challenge.vue'
import Challenges from '@/pages/app/challenges/Challenges.vue'
import MyProfile from '@/pages/app/myProfile/MyProfile.vue'
import Ranking from '@/pages/app/ranking/Ranking.vue'
import UserProfile from '@/pages/app/userProfile/UserProfile.vue'
import Login from '@/pages/auth/login/Login.vue'
import Register from '@/pages/auth/register/Register.vue'
import Contact from '@/pages/help/contact/Contact.vue'
import FAQ from '@/pages/help/FAQ/FAQ.vue'
import Home from '@/pages/home/Home.vue'
import user from '@/store/user.js'

const routes = [
  {
    path: '/login',
    name: 'Se connecter',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'S\'inscrire',
    component: Register,
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Accueil',
    component: Home,
    meta: { requiresAuth: false },
  },
  {
    path: '/myProfile',
    name: 'Mon profil',
    component: MyProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/challenges',
    name: 'Défis',
    component: Challenges,
    meta: { requiresAuth: true },
  },
  {
    path: '/ranking',
    name: 'Classement',
    component: Ranking,
    meta: { requiresAuth: true },
  },
  {
    path: '/userProfile',
    name: 'Profil Utilisateur',
    component: UserProfile,
    meta: { requiresAuth: true },
  },
  {
    path: '/challenge',
    name: 'Défi',
    component: Challenge,
    meta: { requiresAuth: true },
  },
  {
    path: '/about/cgu',
    name: 'CGU',
    component: CGU,
    meta: { requiresAuth: false },
  },
  {
    path: '/about/legal-notices',
    name: 'Mentions Légales',
    component: LegalNotices,
    meta: { requiresAuth: false },
  },
  {
    path: '/about/privacy-policy',
    name: 'Politique de Confidentialité',
    component: PrivacyPolicy,
    meta: { requiresAuth: false },
  },
  {
    path: '/help/faq',
    name: 'FAQ',
    component: FAQ,
    meta: { requiresAuth: false },
  },
  {
    path: '/help/contact',
    name: 'Contact',
    component: Contact,
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = user.getters.user.loggedIn

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
