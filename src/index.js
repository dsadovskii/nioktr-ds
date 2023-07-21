const contexts = [
  require.context('./elements/', true, /\.vue$/),
  require.context('./patterns/', true, /\.vue$/),
  // require.context('./templates/', true, /\.vue$/),
]

const components = []
contexts.forEach(context => {
  context.keys().forEach(key => components.push(context(key).default))
})

const System = {
  // eslint-disable-next-line no-unused-vars
  install(Vue) {
    // components.forEach(component => Vue.component(component.name, component))
  },
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(System)
}

export default System
