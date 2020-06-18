import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faEdit, faBars, faTimes, faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { VueMasonryPlugin } from 'vue-masonry';
import App from './App.vue';
import router from './router';
import store from './store';

// Import custom styles and adjustments
import './assets/scss/custom.scss';
import './assets/scss/adjustments.scss';

// Import font
import './assets/fonts/stylesheet.css';

import './registerServiceWorker';

library.add(faEdit, faBars, faTimes, faCheckCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

navigator.serviceWorker.register('/service-worker.js');
