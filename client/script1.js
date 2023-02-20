import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth'
import { getDatabase, set, ref, update } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCwg-eNz0ZdmPhTxPMcmnSk7pD-xWPrFx0',
  authDomain: 'gamr-a4c65.firebaseapp.com',
  projectId: 'gamr-a4c65',
  storageBucket: 'gamr-a4c65.appspot.com',
  messagingSenderId: '139648642227',
  appId: '1:139648642227:web:432e4924cd33095cbbd4c6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

//signup with Email and Password

const signUpButton = document.getElementById('signUp')

signUpButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const usernameInput = document.getElementById('username')
  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  const username = usernameInput.value.trim()
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  if (!username) {
    return alert('Please enter a username')
  }

  if (!email) {
    return alert('Please enter an email address')
  }

  if (!password) {
    return alert('Please enter a password')
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    alert('User created successfully!')
    // ... do something with the user object, such as redirect to another page
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    alert(errorMessage)
    // ... handle the error, such as displaying a message to the user or logging the error for debugging purposes
  }
})

//Login with email and password

const loginButton = document.getElementById('login')

loginButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const emailInput = document.getElementById('email')
  const passwordInput = document.getElementById('password')

  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()

  if (!email) {
    return alert('Please enter an email address')
  }

  if (!password) {
    return alert('Please enter a password')
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    console.log('User logged in:', user.email)
    window.location = 'home.html' // or redirect to any other page
  } catch (error) {
    const errorMessage = error.message
    alert(errorMessage)
    // ... handle the error, such as displaying a message to the user or logging the error for debugging purposes
  }
})

//protected routes
function requireAuth() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user)
      } else {
        reject(Error('User not authenticated'))
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', async function () {
  // Your code here
  try {
    const user = await requireAuth()
    window.location.href = '/home.html'
    // If the user is authenticated, display the protected resource here
  } catch (error) {
    // If the user is not authenticated, redirect to the login page
    window.location.href = '/'
  }
})
