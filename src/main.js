import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import "./assets/tailwind.css";
import "./assets/main.css";

let app;

// check if user is logged in or out
auth.onAuthStateChanged(() => {
  console.log(auth.currentUser);
  // only init app if not initialized
  if (!app) {
    // init app
    app = createApp(App);

    // registering plugins
    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);

    // mounting the app
    app.mount("#app");
  }
});
