export default (className) => {
  let y
  let tick = false
  let targets = [].slice.call(document.querySelectorAll(className))

  const instance = Object.create({
    init: () => {
      window.addEventListener('scroll', handler)
    }
  })

  return instance

  function handler(force = false) {
    y = window.pageYOffset 

    if (!tick) {
      window.requestAnimationFrame(() => targets.forEach(position))
      tick = true
    }
  }

  function position(el) {
    let displace = el.getAttribute('data-speed') || 2
    el.style.transform = `translate3d(0px, ${y / displace}px, 0px)`
    tick = false
  }
}
