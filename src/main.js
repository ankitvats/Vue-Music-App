/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VeeValidatePlugin from "./includes/validation";
import { auth } from "./includes/firebase";
import Icon from "./directives/icon";
import "./assets/tailwind.css";
import "./assets/main.css";
import i18n from './includes/i18n'
import './registerServiceWorker'
import GlobalComponents from './includes/_globals'
import ProgressBar from './includes/progress-bar'
import 'nprogress/nprogress.css'

// passing router object to the progress bar
ProgressBar(router)

let app;

// check if user is logged in or out
auth.onAuthStateChanged(() => {
	//   console.log(auth.currentUser);
	// only init app if not initialized
	if (!app) {
		// init app
		app = createApp(App).use(i18n);

		// registering plugins
		app.use(store);
		app.use(router);
		app.use(VeeValidatePlugin);
		app.use(GlobalComponents);
		app.directive("icon", Icon);

		// mounting the app
		app.mount("#app");
	}
});
