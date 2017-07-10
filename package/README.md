# paralless
Hyper-minimal parallax implementation for subtle animation. **349b gzipped.**

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Usage
Import the library and pass a selector as its only argument. Then, call `init()` on the returned instance to start watching `scroll` events and animating all selected elements.
```javascript
import { paralless } from 'paralless'

const para = paralless('.my-parallax-selector')

para.init()
```

Optionally define speeds in your markup via the `data-speed` attribution. This option defaults to `2` and so *halves* the distance scrolled, creating a effect that is half the speed of your scroll. Increase or decrease this integer to find your desired effect.
```html
<div class='my-parallax-selector' data-speed='4'>...children...</div>
<div class='my-parallax-selector' data-speed='10'>...children...</div>
```

### Recommended styles
```css
.my-parallax-selector {
  transition: transform 200ms ease-in-out;
}
```

MIT License
