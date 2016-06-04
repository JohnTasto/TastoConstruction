require('../scss/index.scss')

import AnimationFrame from 'animation-frame'
const animationFrame = new AnimationFrame()

let windowHeight = window.innerHeight
let windowMidY = windowHeight / 2
let scrollY = 0
let hasRequestedFrame = false
const photos = document.querySelectorAll('.window-contents img')
const blurbs = document.querySelectorAll('.window-contents p')

function updatePositions() {
  let scrollCenterY = scrollY + windowHeight
  for (let photo of photos) {
    let bounds = photo.getBoundingClientRect()
    let photoCenterY = (bounds.top + bounds.bottom) / 2
    translate(photo, '-50%', `${-(photoCenterY - windowMidY) / 2}px`)
  }
  for (let blurb of blurbs) {
    let bounds = blurb.getBoundingClientRect()
    let blurbCenterY = (bounds.top + bounds.bottom) / 2
    translate(blurb, '0px', `${-(blurbCenterY - windowMidY) / 4}px`)
  }
  hasRequestedFrame = false
}

function translate(elm, x, y) {
  var translate = `translate3d(${x}, ${y}, 0px)`
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
  scrollY = window.pageYOffset
  requestFrame()
}

function handleResize() {
  windowHeight = window.innerHeight
  windowMidY = windowHeight / 2
}

let initialized = false
function init() {
  if (initialized) return
  document.removeEventListener('DOMContentLoaded', init, false)
  window.removeEventListener('load', init, false)
  initialized = true
  window.addEventListener('scroll', handleScroll, false)
  window.addEventListener('resize', handleResize, false)
  updatePositions()
}

if (document.readyState === 'complete') {
  setTimeout(init)
} else {
  document.addEventListener('DOMContentLoaded', init, false)
  window.addEventListener('load', init, false)
}
