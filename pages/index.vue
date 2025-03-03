<template>
  <div>
    <!--Header-->
    <div class="header bg-primary pt-5 pb-7">
      <div class="container">
        <div class="header-body">
          <div class="row align-items-center">
            <div class="col-lg-6"></div>
            <div class="col-lg-6"></div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <section class="py-6 pb-9 bg-default"></section>
    <section class="section section-lg pt-lg-0 mt--7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12"></div>
        </div>
      </div>
    </section>
    <section class="py-6 bg-secondary">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-md-2"></div>
          <div class="col-md-6 order-md-1"></div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6"></div>
          <div class="col-md-6"></div>
        </div>
      </div>
    </section>
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6 order-md-2"></div>
          <div class="col-md-6 order-md-1"></div>
        </div>
      </div>
    </section>
    <section class="py-7 section-nucleo-icons bg-white overflow-hidden">
      <div class="container"></div>
    </section>
    <section class="py-7">
      <div class="container"></div>
    </section>
  </div>
</template>
<script>
import { Tooltip } from "element-ui";

export default {
  layout: "AuthLayout",
  name: "home-page",
  components: {
    [Tooltip.name]: Tooltip,
  },

  mounted() {
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken == null) {
      this.$router.push("/login");
    } else {
      this.$router.push("/dashboard");
    }
  },
};
</script>
