import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

import vuetify from "@/plugins/vuetify";
import "vuetify/dist/vuetify.min.css";
import "vuetify/";


import VueBus from "vue-bus";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.config.productionTip = false;

Vue.use(router);
Vue.use(vuetify);
Vue.use(VueAxios, axios);
Vue.use(VueBus);

axios.defaults.timeout = 5000;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
