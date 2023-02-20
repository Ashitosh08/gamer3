import bot from './assets/bot2.png'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat_container')

let loadInterval

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.'

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') {
      element.textContent = ''
    }
  }, 300)
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

// generate unique ID for each message div of bot
// necessary for typing text effect for that specific reply
// without unique ID, typing text will work on every element
function generateUniqueId() {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16)

  return `id-${timestamp}-${hexadecimalString}`
}

function chatStripe(isAi, value, uniqueId) {
  return `
        <div class="wrapper ${isAi && 'ai'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}>${value}</div>
            </div>
        </div>
    `
}

const submitButton = form.querySelector('button[type="submit"]')
const promptInput = form.querySelector('textarea[name="prompt"]')
const sendIcon = submitButton.querySelector('img')

const toggleButtonState = () => {
  const inputValue = promptInput.value.trim()
  const isInputEmpty = !inputValue

  if (isInputEmpty) {
    submitButton.disabled = true
    sendIcon.src = 'assets/bt-dis.png'
  } else {
    submitButton.disabled = false
    sendIcon.src = 'assets/send.svg'
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))
  const button = form.querySelector('button[type="submit"]')
  const promptInput = form.querySelector('textarea[name="prompt"]')
  const promptValue = promptInput.value.trim()

  if (promptValue) {
    // Disable the button and show loading gif
    button.disabled = true
    sendIcon.src = 'assets/giphy.gif'

    // to clear the textarea input
    form.reset()

    // bot's chatstripe
    const uniqueId = generateUniqueId()
    chatContainer.innerHTML += chatStripe(true, ' ', uniqueId)

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight

    // specific message div
    const messageDiv = document.getElementById(uniqueId)

    // messageDiv.innerHTML = "..."
    loader(messageDiv)

    const response = await fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    })

    clearInterval(loadInterval)
    messageDiv.innerHTML = ' '

    if (response.ok) {
      const data = await response.json()
      const parsedData = data.bot.trim() // trims any trailing spaces/'\n'

      typeText(messageDiv, parsedData)
    } else {
      const err = await response.text()

      messageDiv.innerHTML = 'Something went wrong'
      alert(err)
    }

    // Re-enable the button and hide loading gif
    button.disabled = false
    sendIcon.src = 'assets/send.svg'
  } else {
    // disable button and change image
    button.disabled = true
    sendIcon.src = 'assets/bt-dis.png'
  }
}

promptInput.addEventListener('input', toggleButtonState)
toggleButtonState() // call the function once on page load

form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e)
  }
})

var firebaseConfig = {
  apiKey: 'AIzaSyCwg-eNz0ZdmPhTxPMcmnSk7pD-xWPrFx0',

  authDomain: 'gamr-a4c65.firebaseapp.com',

  projectId: 'gamr-a4c65',

  storageBucket: 'gamr-a4c65.appspot.com',

  messagingSenderId: '139648642227',

  appId: '1:139648642227:web:432e4924cd33095cbbd4c6',
}

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

console.log(auth)

let signOutButton = document.getElementById('signout')
// signOutButton.addEventListener('click', (e) => {
//   //Prevent Default Form Submission Behavior
//   e.preventDefault()
//   console.log('clicked')

//   auth.signOut()
//   alert('Signed Out')
//   window.location = 'http://127.0.0.1:5173/?#'
// })
signOutButton.addEventListener('click', (e) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      location.replace('/')
      // window.location = '/'
      // Sign-out successful.
    })
    .catch((error) => {
      console.log(error)
      // An error happened.
    })
})
