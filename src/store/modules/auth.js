/* eslint-disable prettier/prettier */
import { auth, usersCollection } from "@/includes/firebase";
export default {
	state: {
		authModalShow: false,
		userLoggedIn: false,
	},
	mutations: {
		toggleAuthModal: (state) => {
			state.authModalShow = !state.authModalShow;
		},
		toggleAuth(state) {
			state.userLoggedIn = !state.userLoggedIn;
		},
	},
	actions: {
		async register(ctx, payload) {
			const userCred = await auth.createUserWithEmailAndPassword(
				payload.email,
				payload.password
			);

			await usersCollection.doc(userCred.user.uid).set({
				name: payload.name,
				email: payload.email,
				age: payload.age,
				country: payload.country,
			});

			await userCred.user.updateProfile({
				displayName: payload.name,
			});

			ctx.commit("toggleAuth");
		},
		init_login({ commit }) {
			const user = auth.currentUser;

			if (user) {
				commit("toggleAuth");
			}
		},
		async login({ commit }, payload) {
			await auth.signInWithEmailAndPassword(payload.email, payload.password);

			commit("toggleAuth");
		},
		async signout({ commit }) {
			await auth.signOut();

			commit("toggleAuth");
		},
	}
}