// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js'
import {
  getDatabase,
  set,
  ref,
  update,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  OAuthProvider,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  FacebookAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js'

// import { getAuth, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'

const sign_in_btn = document.querySelector('#sign-in-btn')
const sign_up_btn = document.querySelector('#sign-up-btn')
const container = document.querySelector('.container')

sign_up_btn.addEventListener('click', () => {
  container.classList.add('sign-up-mode')
})

sign_in_btn.addEventListener('click', () => {
  container.classList.remove('sign-up-mode')
})

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyCwg-eNz0ZdmPhTxPMcmnSk7pD-xWPrFx0',

  authDomain: 'gamr-a4c65.firebaseapp.com',

  projectId: 'gamr-a4c65',

  storageBucket: 'gamr-a4c65.appspot.com',

  messagingSenderId: '139648642227',

  appId: '1:139648642227:web:432e4924cd33095cbbd4c6',

  //yout config code
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

//sigin with microsoft
const microsoftLogin = document.getElementById('signUp')
microsoftLogin.addEventListener('click', (e) => {
  const provider = new OAuthProvider('microsoft.com')
  provider.setCustomParameters({
    // Force re-consent.
    prompt: 'consent',
    // Target specific email with login hint.
    login_hint: 'user@firstadd.onmicrosoft.com',
  })
  provider.addScope('mail.read')
  provider.addScope('calendars.read')
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.

      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      const idToken = credential.idToken
      window.location = 'home.html'
    })
    .catch((error) => {
      // Handle error.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The credential that was used.
      const credential = OAuthProvider.credentialFromError(error)
      // ...
    })
})

// SIGN IN WITH GOOGLE
const googleLogin = document.getElementById('signUp')
googleLogin.addEventListener('click', (e) => {
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

  auth.languageCode = 'it'
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();

  provider.setCustomParameters({
    login_hint: 'user@example.com',
  })

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      // The signed-in user info.
      const user = result.user
      window.location = 'home.html'
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData?.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)

      console.log(`Error code: ${errorCode}`)
      console.log(`Error message: ${errorMessage}`)
      console.log(`Email: ${email}`)
      console.log(`Credential type: ${credential}`)
    })
})

//sigin with Apple
const appleLogin = document.getElementById('signUp')
appleLogin.addEventListener('click', (e) => {
  const provider = new OAuthProvider('apple.com')
  provider.addScope('email')
  provider.addScope('name')
  provider.setCustomParameters({
    // Localize the Apple authentication screen in French.
    locale: 'fr',
  })
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user

      // Apple credential
      const credential = OAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      const idToken = credential.idToken
      window.location = 'home.html'
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      if (error.email) {
        const email = error.email
      }
      // The credential that was used.
      const credential = OAuthProvider.credentialFromError(error)

      console.error(
        `Error during Apple Sign-In: ${errorCode} - ${errorMessage}`
      )
      alert('Sorry, we could not sign you in. Please try again later.')
    })
})

// signup with facebook

const facebookLoginButton = document.getElementById('facebookLogin')

facebookLoginButton.addEventListener('click', async (event) => {
  event.preventDefault()

  const auth = getAuth()
  const provider = new FacebookAuthProvider()
  provider.addScope('user_birthday')
  provider.setCustomParameters({
    display: 'popup',
  })

  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user
    const credential = FacebookAuthProvider.credentialFromResult(result)
    const accessToken = credential.accessToken
    console.log('User logged in with Facebook:', user.displayName)
    window.location = 'home.html' // or redirect to any other page
    // IdP data available using getAdditionalUserInfo(result)
  } catch (error) {
    const errorCode = error.code
    const errorMessage = error.message
    const email = error.customData?.email // optional chaining to avoid errors if email is not available
    const credential = FacebookAuthProvider.credentialFromError(error)
    console.error('Failed to log in with Facebook:', errorMessage)
    // ... handle the error, such as displaying a message to the user or logging the error for debugging purposes
  }
})

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
// function requireAuth() {
//   return new Promise((resolve, reject) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         resolve(user)
//       } else {
//         reject(Error('User not authenticated'))
//       }
//     })
//   })
// }

// document.addEventListener('DOMContentLoaded', async function () {
//   // Your code here
//   try {
//     const user = await requireAuth()
//     if (window.location.pathname !== '/home.html') {
//       window.location.href = '/home.html'
//     }
//     // If the user is authenticated and not on the home page, redirect to the home page
//   } catch (error) {
//     // If the user is not authenticated, redirect to the login page
//     window.location.href = '/'
//   }
// })
