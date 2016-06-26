require('../scss/index.scss')

import 'babel-polyfill'

import AnimationFrame from 'animation-frame'
const animationFrame = new AnimationFrame()


let windowHeight, windowHalfHeight
let hasRequestedFrame = false
const photos = document.querySelectorAll('.window-contents img, .garage-contents img')
const blurbs = document.querySelectorAll('.window-contents p, .garage-contents p')
window.addEventListener('scroll', handleScroll, false)
window.addEventListener('resize', handleResize, false)


handleResize()


function updatePositions() {
  let sY = scrollY()
  for (let photo of photos) {
    translate(photo, '-50%', `${-((photo._centerY - sY) - windowHalfHeight) / 2}px`)
  }
  for (let blurb of blurbs) {
    let distToScreenCenter = (blurb._centerY - sY) - windowHalfHeight
    let distToScreenCenterCubed = distToScreenCenter * distToScreenCenter * distToScreenCenter
    translate(blurb, `${-distToScreenCenterCubed/2000000}%`, `${-distToScreenCenter / 4}px`)
  }
  hasRequestedFrame = false
}

function resetPositions() {
  for (let photo of photos) {
    translate(photo, '-50%', '0')
  }
  for (let blurb of blurbs) {
    translate(blurb, '0', '0')
  }
}

function translate(elm, x, y) {
  var translate = `translate3d(${x}, ${y}, 0px)`
  elm.style['-webkit-transform'] = translate
  elm.style['-moz-transform'] = translate
  elm.style['-ms-transform'] = translate
  elm.style['-o-transform'] = translate
  elm.style.transform = translate
}

function scrollY() {
  return window.scrollY || window.pageYOffset
}

function handleScroll() {
  if (!hasRequestedFrame) {
    animationFrame.request(updatePositions)
    hasRequestedFrame = true
  }
}

function handleResize() {
  windowHeight = window.innerHeight
  windowHalfHeight = windowHeight / 2
  resetPositions()
  let sY = scrollY()
  for (let photo of photos) {
    let bounds = photo.getBoundingClientRect()
    photo._centerY = sY + ((bounds.top + bounds.bottom) / 2)
  }
  for (let blurb of blurbs) {
    let bounds = blurb.getBoundingClientRect()
    blurb._centerY = sY + ((bounds.top + bounds.bottom) / 2)
  }
  handleScroll()
}
