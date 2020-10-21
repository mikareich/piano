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

const oscillators = Object.keys(soundFrequency).map(setOscillator)

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

window.addEventListener('keypress', ({ key, shiftedKey }) => {})
