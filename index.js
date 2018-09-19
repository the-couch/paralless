export default function paralless (attr = 'data-paralless') {
  let y = window.scrollY
  let py = y
  let vh = window.innerHeight
  let cache = new Map()

  return function init () {
    let stopped = false

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
        const speed = parseFloat(node.getAttribute(attr) || 0.25)

        if (speed >= 5) continue

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

    function animate () {
      y = window.scrollY

      if (py !== y) {
        py = y

        cache.forEach(c => {
          const { node, speed, offset } = c
          const bounds = node.getBoundingClientRect()
          const nodeTop = bounds.top + y
          const nodeBot = nodeTop + bounds.height

          if ((nodeBot >= y) && (nodeTop <= (y + vh))) {
            c.transform = ((y - offset) * speed).toFixed()
            node.style.transform = `translate3d(0px, ${c.transform}px, 0px)`
          }
        })
      }

      !stopped && requestAnimationFrame(animate)
    }

    function reflow () {
      y = window.scrollY
      vh = window.innerHeight

      cache.forEach(c => {
        c.offset = y + (c.node.getBoundingClientRect().top - vh) - c.transform
      })

      animate()
    }

    return function destroy () {
      stopped = true
      cache.clear()
    }
  }
}
