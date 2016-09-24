# Paralless.js  [![npm](https://img.shields.io/npm/v/paralless.svg?maxAge=2592000)](https://www.npmjs.com/package/paralless)

Simple Parallax powered by CSS3 Transitions

### npm

Install Paralless, and add it to your `package.json` dependencies.

```
$ npm i paralless --save
```



## Vanilla JS Parallax

[Optional Reading](https://labs.redantler.com/vanilla-js-parallax-without-the-bloat-fd1f357914e7#.3xpjqrc2e) that explains the technique.

```javascript
import { Paralless } from 'parallless'
```

Current implementation is on the DOM, this may change to being JS focused (in the optional reading above it's JS based), but for now set up the elements you want on the page as follows:

#### Usage
```html
<div class="bradpitt" data-speed="4">
  <img src="http://placehold.it/350x150">
</div>
<div class="bradpitt" data-speed="10">
  <img src="http://placehold.it/350x150">
</div>
```

```javascript
let Paralless = swimming('.bradpitt');
Paralless.init();
```

optional recommended css:

```css
transition: all 0.25s ease-out;
transition-delay: 0s;
```

Feel free to grab the source and configure for your own needs, I've used this for vertical/side-to-side/rotating elements on various sites. This is the slim version I may extend it to handle more situations. The css positioning of elements initially has a large impact as well.

* * *
 MIT License
