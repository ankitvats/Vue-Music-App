<template>
  <app-header />

  <!-- This will be replaced by the content as per the route -->
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

  <!-- <router-view></router-view> -->

  <app-player />

  <auth-modal />
</template>

<script>
import AppHeader from "./components/Header";
import AuthModal from "./components/Auth";
import AppPlayer from "@/components/Player";
export default {
  name: "App",
  components: { AppHeader, AuthModal, AppPlayer },
  created() {
    this.$store.dispatch("init_login");
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>
