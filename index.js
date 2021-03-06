import srraf from 'srraf'
import tx from 'myxt'

export default function paralless (attr = 'data-paralless') {
  let y = window.scrollY
  let vh = window.innerHeight
  let cache = new Map()

  return function init () {
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

        if (speed >= 1) continue

        cache.set(node, {
          node,
          speed,
          transform: tx(node),
          offset: Math.max(y + (node.getBoundingClientRect().top - vh), 0) // cache
        })
      }
    }

    const listener = srraf(({ y, vh }) => {
      cache.forEach(c => {
        const { node, speed, transform, offset } = c
        const bounds = node.getBoundingClientRect()
        const nodeTop = bounds.top + y
        const nodeBot = nodeTop + bounds.height

        if ((nodeBot >= y) && (nodeTop <= (y + vh))) {
          transform.translateY(Math.round(((y - offset) * speed)))
          node.style.transform = transform.toString()
        }
      })
    })

    return function destroy () {
      listener()
      cache.clear()
    }
  }
}


