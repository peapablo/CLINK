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

<script setup>
import { ref, computed, watch } from 'vue';
import BaseNav from '~/components/argon-core/Navbar/BaseNav.vue';
import ManualOrderFormModal from '../pages/components/manual-order-form-modal.vue';

// ลงทะเบียน component
defineProps({
  backgroundColor: {
    type: String,
    default: 'black',
  },
});

const showMenu = ref(false);
const year = new Date().getFullYear();
const pageClass = 'login-page';

const layoutClass = computed(() => {
  const exceptions = ['index', 'home'];
  if (!exceptions.includes(useRoute().name)) {
    return 'bg-default';
  } else {
    return '';
  }
});

const closeMenu = () => {
  document.body.classList.remove('nav-open');
  showMenu.value = false;
};

watch(() => useRoute().path, () => {
  if (showMenu.value) {
    closeMenu();
  }
});
</script>

<style scoped lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
