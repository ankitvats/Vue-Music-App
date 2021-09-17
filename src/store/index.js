import { auth, usersCollection } from "@/includes/firebase";
import { createStore } from "vuex";

export default createStore({
  // global-data
  state: {
    authModalShow: false,
    userLoggedIn: false,
  },
  // global-handlers to modify state
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth(state) {
      state.userLoggedIn = !state.userLoggedIn;
    },
  },
  // global-selectors to get state values
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
  //   can be asynchronous
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
    async login({ commit }, payload) {
      await auth.signInWithEmailAndPassword(payload.email, payload.password);

      commit("toggleAuth");
    },
    async signout({ commit }) {
      await auth.signOut();

      commit("toggleAuth");
    },
    init_login({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit("toggleAuth");
      }
    },
  },
});
