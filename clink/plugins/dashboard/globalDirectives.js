import clickOutside from './directives/click-outside.js';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('click-outside', clickOutside);
});
