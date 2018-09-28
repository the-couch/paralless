# paralless
Hyper-minimal parallax implementation for subtle animation. **900b gzipped.**

## Usage
Specify attibutes and speeds for any elements you want parallaxed. Consider the
speed value a fraction of `1` i.e. `0.5` moves at half the speed of scroll, or
`0.1` moves at a tenth the speed of normal scroll.
```html
<div data-paralless='0.5'></div>
```
Create an instance of `paralless` and call the returned function to bind all
elements and begin parallaxing.
```javascript
import paralless from 'paralless'

const parallax = paralless()

const destroy = parallax()
```
Call `parallax`every time the DOM changes, like page transitions and other mutations.

Any nodes no longer in the DOM will be removed from the listener cache.

Call `destroy` to stop all parallaxing.

## License
MIT License
(c) 2018 Friends of Friends
