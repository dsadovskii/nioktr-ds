import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Ripple from 'vue-ripple-directive'
import DesignSystem from './index.js'
import './plugins/filters.js'
import VueJSModal from 'vue-js-modal'

Vue.use(DesignSystem)
Vue.use(Antd)
Vue.use(VueJSModal)
Vue.directive('ripple', Ripple)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
