export default (className) => {
  let y
  let tick = false
  let targets = [].slice.call(document.querySelectorAll(className))

  const handler = e => {
    y = window.pageYOffset

    if (!tick) {
      window.requestAnimationFrame(() => targets.forEach(position))
      tick = true
    }
  }

  const position = el => {
    let displace = el.getAttribute('data-speed') || 2
    el.style.transform = `translate3d(0px, ${y / displace}px, 0px)`
    tick = false
  }

  const init = () => window.addEventListener('scroll', handler)

  const update = () => { targets = [].slice.call(document.querySelectorAll(className)) }

  const destroy = () => window.removeEventListener('scroll', handler)

  return {
    init,
    update,
    destroy
  }
}
