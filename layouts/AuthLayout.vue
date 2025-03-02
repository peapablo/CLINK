<template>
  <div :class="layoutClass" class="auth-layout">
    <base-nav
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <template>
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </template>
    </base-nav>

    <div class="main-content">
      <nuxt></nuxt>
    </div>

    <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-12">
            <div class="copyright text-center text-muted">
              © {{ year }}
              <a
                href="http://www.clinag.com"
                class="font-weight-bold ml-1"
                target="_blank"
                rel="noopener"
                >Clinag Diagnostic co.,ltd.</a
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import Vue from "vue";
import BaseNav from "~/components/argon-core/Navbar/BaseNav.vue";
import ManualOrderFormModal from "../pages/components/manual-order-form-modal.vue";

Vue.component("manual-order-form-modal", ManualOrderFormModal);

export default {
  components: {
    BaseNav,
  },
  props: {
    backgroundColor: {
      type: String,
      default: "black",
    },
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: "login-page",
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
    layoutClass() {
      let exceptions = ["index", "home"];
      if (!exceptions.includes(this.$route.name)) {
        return "bg-default";
      } else {
        return "";
      }
    },
  },
  methods: {
    closeMenu() {
      document.body.classList.remove("nav-open");
      this.showMenu = false;
    },
  },
  watch: {
    "$route.path"() {
      if (this.showMenu) {
        this.closeMenu();
      }
    },
  },
};
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
