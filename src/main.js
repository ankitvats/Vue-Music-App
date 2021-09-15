import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./includes/validation";
import "./assets/tailwind.css";
import "./assets/main.css";

// init app
const app = createApp(App);

// registering plugins
app.use(store);
app.use(router);
app.use(VeeValidatePlugin);

// mounting the app
app.mount("#app");
