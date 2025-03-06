import Badge from '~/components/argon-core/Badge.vue';
import BaseAlert from "~/components/argon-core/BaseAlert";
import BaseButton from '~/components/argon-core/BaseButton.vue';
import BaseCheckbox from '~/components/argon-core/Inputs/BaseCheckbox.vue';
import BaseDropdown from '~/components/argon-core/BaseDropdown.vue';
import BaseHeader from '~/components/argon-core/BaseHeader';
import BaseInput from '~/components/argon-core/Inputs/BaseInput.vue';
import BaseNav from "~/components/argon-core/Navbar/BaseNav";
import BasePagination from "~/components/argon-core/BasePagination";
import BaseProgress from "~/components/argon-core/BaseProgress";
import BaseRadio from "~/components/argon-core/Inputs/BaseRadio";
import BaseSwitch from '~/components/argon-core/BaseSwitch.vue';
import Card from '~/components/argon-core/Cards/Card.vue';
import Modal from '~/components/argon-core/Modal.vue';
import RouteBreadcrumb from '~/components/argon-core/Breadcrumb/RouteBreadcrumb';
import StatsCard from '~/components/argon-core/Cards/StatsCard.vue';
import { Input, Tooltip, Popover } from 'element-ui';
import { ValidationProvider, ValidationObserver } from 'vee-validate';

export default defineNuxtPlugin(nuxtApp => {
  // Registering components globally
  nuxtApp.vueApp.component(Badge.name, Badge);
  nuxtApp.vueApp.component(BaseAlert.name, BaseAlert);
  nuxtApp.vueApp.component(BaseButton.name, BaseButton);
  nuxtApp.vueApp.component(BaseCheckbox.name, BaseCheckbox);
  nuxtApp.vueApp.component(BaseDropdown.name, BaseDropdown);
  nuxtApp.vueApp.component(BaseHeader.name, BaseHeader);
  nuxtApp.vueApp.component(BaseInput.name, BaseInput);
  nuxtApp.vueApp.component(BaseNav.name, BaseNav);
  nuxtApp.vueApp.component(BasePagination.name, BasePagination);
  nuxtApp.vueApp.component(BaseProgress.name, BaseProgress);
  nuxtApp.vueApp.component(BaseRadio.name, BaseRadio);
  nuxtApp.vueApp.component(BaseSwitch.name, BaseSwitch);
  nuxtApp.vueApp.component(Card.name, Card);
  nuxtApp.vueApp.component(Modal.name, Modal);
  nuxtApp.vueApp.component(StatsCard.name, StatsCard);
  nuxtApp.vueApp.component(RouteBreadcrumb.name, RouteBreadcrumb);
  nuxtApp.vueApp.component(Input.name, Input);

  // Registering VeeValidate components
  nuxtApp.vueApp.component('validation-provider', ValidationProvider);
  nuxtApp.vueApp.component('validation-observer', ValidationObserver);

  // Using element-ui plugins
  nuxtApp.vueApp.use(Tooltip);
  nuxtApp.vueApp.use(Popover);
});
