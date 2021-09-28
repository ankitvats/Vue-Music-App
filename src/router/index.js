/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue"; // @ - ROOT DIRECTORY
import About from "@/views/About.vue";
import Manage from "@/views/Manage.vue";
import Song from "@/views/Song.vue";
import store from "@/store";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/about",
		name: "About",
		component: About,
	},
	{
		path: "/manage-music",
		// alias: "/manage",
		name: "Manage",
		meta: {
			requiresAuth: true,
		},
		component: Manage,
		beforeEnter: (to, from, next) => {
			//   console.log("Route Guard");

			next();
		},
	},
	{
		path: "/manage",
		redirect: { name: "Manage" },
	},
	{
		path: "/song/:id",
		name: "Song",
		component: Song
	},
	//   404 not found page
	{
		path: "/:catchAll(.*)*",
		redirect: { name: "Home" },
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	linkExactActiveClass: "text-yellow-500",
});

router.beforeEach((to, from, next) => {
	// console.log(to.matched); show all the matched routes

	// if any matched routes doesn't contains requiresAuth, do nothing
	if (!to.matched.some((record) => record.meta.requiresAuth)) {
		next();
		return;
	}

	// if the match contain the requiresAuth meta field
	// allow the page to render if user is logged in
	if (store.state.userLoggedIn) {
		next();
	} else {
		// else redirect it to the home page
		next({ name: "Home" });
	}
});

export default router;
