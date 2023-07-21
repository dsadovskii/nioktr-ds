### CPSI design system

Install:

```bash
npm install nioktr-ds --save
```

Import:

```javascript
import Vue from 'vue'
import CPSIDs from 'nioktr-ds'

Vue.use(CPSIDs)
```
```javascript
//In your nuxt.config.js
styleResources: {
  scss: ['nioktr-ds/src/assets/scss/main.scss'],
},
css: ['nioktr-ds/src/assets/scss/_indents.scss', 'nioktr-ds/src/assets/css/reset.css'],
```