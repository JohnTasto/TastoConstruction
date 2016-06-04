require('../scss/index.scss')

import AnimationFrame from 'animation-frame'
const animationFrame = new AnimationFrame()

let windowHeight = window.innerHeight
let lastScrollY = 0
let hasRequestedFrame = false
const photos = document.querySelectorAll('.window-contents img')
const speedDivider = 2

function updatePositions() {
  //translateY(bgElm, lastScrollY / speedDivider)
  for (let photo of photos) {
    // console.log(photo.getBoundingClientRect())
  }
  // console.log(windowHeight)
  hasRequestedFrame = false
}

function translateY(elm, value) {
  var translate = `translate3d(0px, ${value}px, 0px)`
  elm.style['-webkit-transform'] = translate
  elm.style['-moz-transform'] = translate
  elm.style['-ms-transform'] = translate
  elm.style['-o-transform'] = translate
  elm.style.transform = translate
}

function requestFrame() {
  if (!hasRequestedFrame) {
    animationFrame.request(updatePositions)
    hasRequestedFrame = true
  }
}

function handleScroll() {
  lastScrollY = window.pageYOffset
  requestFrame()
}

function handleResize() {
  windowHeight = window.innerHeight
}

let initialized = false
function init() {
  if (initialized) return
  document.removeEventListener('DOMContentLoaded', init, false)
  window.removeEventListener('load', init, false)
  initialized = true
  window.addEventListener('scroll', handleScroll, false)
  window.addEventListener('resize', handleResize, false)
}

if (document.readyState === 'complete') {
  setTimeout(init)
} else {
  document.addEventListener('DOMContentLoaded', init, false)
  window.addEventListener('load', init, false)
}
