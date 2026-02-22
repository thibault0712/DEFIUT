import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCAFI3xwbQcZ2jaqIokyYrHfIW1JZGybEQ',
  authDomain: 'defiut-9fe2f.firebaseapp.com',
  projectId: 'defiut-9fe2f',
  storageBucket: 'defiut-9fe2f.firebasestorage.app',
  messagingSenderId: '601055720099',
  appId: '1:601055720099:web:77bec43f17ed92b3bdc516',
}

export const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)

export const googleAuthProvider = new GoogleAuthProvider()

export const db = getFirestore(firebaseApp)
