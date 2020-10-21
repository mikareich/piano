const song = []
let record = true
let startTimestamp = new Date().getTime()

const soundFrequency = {
  c: '261.6',
  cis: '277.2',
  d: '293.7',
  dis: '311.1',
  e: '329.6',
  f: '349.2',
  fis: '370.0',
  g: '392.0',
  gis: '415.3',
  a: '440.0',
  ais: '466.2',
  h: '493.9'
}

const oscillators = Object.entries(
  soundFrequency
).map(([sound, frequency]) => ({ sound, ...setOscillator(frequency) }))

function setOscillator(frequency) {
  const audioContext = new AudioContext()
  const oscillator = audioContext.createOscillator()
  oscillator.frequency.value = frequency
  oscillator.start()
  return {
    start: () => oscillator.connect(audioContext.destination),
    stop: () => oscillator.disconnect()
  }
}

function playSong(song) {
  song.forEach(({ sound, time, action }) => {
    setTimeout(() => playSound(sound, action), time)
  })
}

function updateSong(sound, action) {
  const passedTime = new Date().getTime() - startTimestamp
  song.push({
    time: passedTime,
    sound,
    action
  })
  console.clear()
  console.table(song)
}

function playSound(sound, action) {
  const soundHTMLElement = document.getElementById(sound)
  const oscillator = oscillators.find((o) => o.sound === sound)
  if (!oscillator) return
  if (action === 'start') {
    oscillator.start()
    soundHTMLElement.classList.add('selected')
  } else {
    oscillator.stop()
    soundHTMLElement.classList.remove('selected')
  }
}

oscillators.forEach(({ sound }) => {
  const soundHTMLElement = document.getElementById(sound)
  const onTriggered = ({ type }) => {
    const action = type === 'mousedown' ? 'start' : 'stop'
    playSound(sound, action)
    record && updateSong(sound, action)
  }
  soundHTMLElement.onmousedown = onTriggered
  soundHTMLElement.onmouseup = onTriggered
})

function onKeyboard(keyboard, action) {
  const { key, shiftKey } = keyboard
  const sound = shiftKey ? key.toLowerCase() + 'is' : key.toLowerCase()

  playSound(sound, action)

  record && updateSong(sound, action)
}

window.addEventListener('keypress', (e) => onKeyboard(e, 'start'))
window.addEventListener('keyup', (e) => onKeyboard(e, 'stop'))
