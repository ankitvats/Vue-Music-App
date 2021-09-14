import { createStore } from "vuex";

export default createStore({
  // global-data
  state: {
    authModalShow: false,
  },
  // global-handlers to modify state
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
  },
  // global-selectors to get state values
  getters: {
    // authModalShow: (state) => state.authModalShow,
  },
});
