export default function paralless (attr = 'data-paralless') {
  let scroll
  let resize
  let y = window.scrollY
  let vh = window.innerHeight
  let cache = new Map()
  let tick = false

  return function mount () {
    if (!scroll) {
      scroll = window.addEventListener('scroll', onscroll)
    }

    if (!resize) {
      resize = window.addEventListener('resize', reflow)
    }

    /**
     * remove old nodes
     */
    cache.forEach(({ node }) => !document.documentElement.contains(node) && cache.delete(node))

    /**
     * bind new nodes
     */
    let nodes = document.querySelectorAll('[' + attr + ']')

    for (let i = nodes.length - 1; i > -1; i--) {
      const node = nodes[i]

      if (!cache.has(node)) {
        const speed = node.getAttribute(attr)

        if (parseInt(speed) > 0) continue

        cache.set(node, {
          node,
          speed,
          transform: 0
        })
      }
    }

    /**
     * check initial pos
     */
    reflow()

    function onscroll (e) {
      y = window.scrollY

      if (!tick) {
        requestAnimationFrame(() => {
          cache.forEach(c => {
            const { node, speed, offset } = c
            const bounds = node.getBoundingClientRect()
            const nodeTop = bounds.top + y
            const nodeBot = nodeTop + bounds.height

            if ((nodeBot >= y) && (nodeTop <= (y + vh))) {
              c.transform = (y - offset) * speed
              node.style.transform = `translate3d(0px, ${c.transform}px, 0px)`
            }
          })

          tick = false
        })

        tick = true
      }
    }

    function reflow () {
      y = window.scrollY
      vh = window.innerHeight

      cache.forEach(c => {
        c.offset = y + (c.node.getBoundingClientRect().top - vh) - c.transform
      })

      onscroll()
    }

    return function destroy () {
      window.removeEventListener('scroll', onscroll)
      window.removeEventListener('resize', reflow)
      scroll = null
      resize = null
      cache.clear()
    }
  }
}
