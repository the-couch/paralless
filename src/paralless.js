
let Paralless = (className) => {
  const instance = Object.create({
    init: () => {
      window.addEventListener('scroll', handleScroll)
    }
  })
  return instance

  function handleScroll() {
    let elms = document.querySelectorAll(className)
    elms.length ? Array.from(elms, (e) => { mI(e)}) : mI(elms)
  }

  function mI(el) {
    let scrollPosition = setPosition()
    let displace = el.getAttribute('data-speed') || 2
    el.style.transform = "translate3d(0px, "+(scrollPosition / displace)+"px, 0px)"
  }

  function setPosition() {
    if (window.pageYOffset !== undefined) {
      return window.pageYOffset
    } else {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop
    }
  }
}

exports.Paralless = Paralless
