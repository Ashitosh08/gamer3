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
  apiKey: 'AIzaSyCJmTVuUoauqWF5rfV3xZoBesVCJPBn1zA',

  authDomain: 'gamer-ff984.firebaseapp.com',

  projectId: 'gamer-ff984',

  storageBucket: 'gamer-ff984.appspot.com',

  messagingSenderId: '377722972397',

  appId: '1:377722972397:web:11a0eccdcc659498af44e4',
  //yout config code
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const auth = getAuth()

//sigin with microsoft

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
    })
})

//sigin with apple

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
      // The email of the user's account used.
      const email = error.customData.email
      // The credential that was used.
      const credential = OAuthProvider.credentialFromError(error)

      // ...
    })
})

// SIGN IN WITH GOOGLE

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
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error)
      // ...
    })
})

// signup with facebook

facebookLogin.addEventListener('click', (e) => {
  const auth = getAuth()
  const provider = new FacebookAuthProvider()
  provider.addScope('user_birthday')

  // auth.languageCode = 'it'
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();
  provider.setCustomParameters({
    display: 'popup',
  })

  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result)
      const accessToken = credential.accessToken
      window.location = 'home.html'
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code
      const errorMessage = error.message
      // The email of the user's account used.
      const email = error.customData.email
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error)

      // ...
    })
})

//signup with Email and Password
signUp.addEventListener('click', (e) => {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value
  var username = document.getElementById('username').value

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      e.preventDefault()
      const user = userCredential.user

      alert('user created!')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message

      alert(errorMessage)
      // ..
    })
})

login.addEventListener('click', (e) => {
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      e.preventDefault()

      const user = userCredential.user
      window.location = 'home.html'

      console.log({ email, password })
      alert('User loged in!')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      console.log(error)
      alert(errorMessage)
    })
})

const user = auth.currentUser
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid
//     //bla bla bla
//     // alert('user alreagy signed in')
//     // ...
//   } else {
//     // User is signed out
//     // alert('user has logged out')
//     // ...
//     //bla bla bla
//   }
// })
onAuthStateChanged(auth, (user) => {
  if (user) {
    var email = user.email

    var text = document.createTextNode(email)

    console.log(user)
    //is signed in
  } else {
    //no user signed in
  }
})

// logout.addEventListener('click', (e) => {
//   signOut(auth)
//     .then(() => {
//       // Sign-out successful.
//       alert('user loged out')
//     })
//     .catch((error) => {
//       // An error happened.
//       const errorCode = error.code
//       const errorMessage = error.message

//       alert(errorMessage)
//     })
// })
