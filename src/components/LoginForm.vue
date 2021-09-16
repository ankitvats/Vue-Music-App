<template>
  <!-- Model -->
  <div
    class="text-white text-center font-bold p-5 mb-4"
    :class="login_alert_variant"
    v-if="login_show_alert"
  >
    {{ login_alert_msg }}
  </div>
  <!-- Model end -->
  <!-- Login Form -->
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Enter Email"
      />
      <ErrorMessage name="email" class="text-red-600" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        type="password"
        name="password"
        class="
          block
          w-full
          py-1.5
          px-3
          text-gray-800
          border border-gray-300
          transition
          duration-500dfdsfj
          focus:outline-none focus:border-black
          rounded
        "
        placeholder="Password"
      />
      <ErrorMessage name="password" class="text-red-600" />
    </div>
    <button
      type="submit"
      :disabled="login_in_submission"
      class="
        block
        w-full
        bg-purple-600
        text-white
        py-1.5
        px-3
        rounded
        transition
        hover:bg-purple-700
      "
    >
      Submit
    </button>
  </vee-form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:3|max:32",
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: "bg-blue-500",
      login_alert_msg: "Please wait! we are logging you in",
    };
  },
  methods: {
    login(values) {
      this.login_show_alert = true;
      this.login_in_submission = true;
      this.login_alert_variant = "bg-blue-500";
      this.login_alert_msg = "Please wait! we are logging you in";

      this.login_alert_variant = "bg-green-500";
      this.login_alert_msg = "Success! You are now logged in";
      console.log(values);
    },
  },
};
</script>

<style></style>
