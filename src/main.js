import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./permission";
import "./icons";
import "@/assets/css/index.scss";
import VueParticles from "vue-particles";
import moment from "moment";
Vue.use(VueParticles);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$moment = function(DateTime) {
  DateTime = new Date(DateTime);
  return moment(DateTime).format("YYYY-MM-DD HH:mm:ss");
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
