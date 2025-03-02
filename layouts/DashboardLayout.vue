<template>
  <div>
    <div class="wrapper">
      <notifications></notifications>
      <side-bar>
        <template slot="links" v-if="hasLoaded">
          <div style="padding: 16px 1.5rem 0 1.5rem" v-if="hasFavoriteMenus">
            Favorites
          </div>
          <!-- Dashboard -->
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-shop',
              path: '/dashboard',
            }"
            v-if="isFavoriteMenu('/dashboard')"
          >
          </sidebar-item>

          <!-- Inbox -->
          <sidebar-item
            :link="{
              isRoute: true,
              name: `Inbox`,
              nameComponent: veryUrgentSidebarComponent,
              nameComponentData: { componentData: urgentAmount },
              icon: 'far fa-folder-open ',
            }"
            v-if="
              isFavoriteMenu('/inbox') || isFavoriteMenu('/batchOrder')
                ? canCheckIn || canCreateTest
                : false
            "
          >
            <sidebar-item
              :link="{ name: 'New Order', path: '/inbox' }"
              v-if="isFavoriteMenu('/inbox') ? canCheckIn : false"
            >
            </sidebar-item>

            <sidebar-item
              :link="{ name: 'Batch Order', path: '/batchOrder' }"
              v-if="isFavoriteMenu('/batchOrder') ? canCreateTest : false"
            />

            <div
              @click="openManualOrderFormModal"
              v-if="isFavoriteMenu('/batchOrder') ? canCreateTest : false"
            >
              <sidebar-item :link="{ name: 'Manual Order', path: '#' }" />
            </div>
          </sidebar-item>

          <!-- Order Monitoring -->
          <sidebar-item
            :link="{
              name: 'Order Monitoring',
              icon: 'far fa-folder-open ',
            }"
            v-if="
              isFavoriteMenu('/orderMonitoring') ||
              isFavoriteMenu('/orderMonitoringNoGrowth')
                ? canViewResultEntry
                : false
            "
          >
            <sidebar-item
              :link="{
                name: 'Orders',
                icon: 'fas fa-search',
                path: '/orderMonitoring',
              }"
              v-if="isFavoriteMenu('/orderMonitoring')"
            />
            <sidebar-item
              :link="{
                name: 'No Growth Orders',
                icon: 'fas fa-search',
                path: '/orderMonitoringNoGrowth',
              }"
              v-if="isFavoriteMenu('/orderMonitoringNoGrowth')"
            />
          </sidebar-item>

          <!-- Users -->
          <sidebar-item
            v-if="isFavoriteMenu('/user') ? canEditUser : false"
            :link="{
              name: 'Users',
              icon: 'fas fa-user-edit',
              path: '/user',
            }"
          >
          </sidebar-item>

          <!-- Database -->
          <sidebar-item
            v-if="
              isFavoriteMenu('/specimen') ||
              isFavoriteMenu('/organisms') ||
              isFavoriteMenu('/breakpoint') ||
              isFavoriteMenu('/breakpointroom') ||
              isFavoriteMenu('/tests')
                ? canEditDatabase
                : false
            "
            :link="{
              name: 'Database',
              icon: 'fas fa-database',
            }"
          >
            <sidebar-item
              :link="{ name: 'Specimen', path: '/specimen' }"
              v-if="isFavoriteMenu('/specimen') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Organisms', path: '/organisms' }"
              v-if="isFavoriteMenu('/organisms') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Breakpoint', path: '/breakpoint' }"
              v-if="isFavoriteMenu('/breakpoint') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Breakpoint Room', path: '/breakpointroom' }"
              v-if="isFavoriteMenu('/breakpointroom') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Profile Test', path: '/tests' }"
              v-if="isFavoriteMenu('/tests') ? canEditDatabase : false"
            />
          </sidebar-item>

          <!-- Statistic -->

          <!-- Client -->
          <sidebar-item
            v-if="isFavoriteMenu('/clients') || isFavoriteMenu('/clients/new')"
            :link="{
              name: 'Clients',
              icon: 'ni ni-single-02',
            }"
          >
            <sidebar-item
              :link="{ name: 'Add New Client', path: '/clients/new' }"
              v-if="isFavoriteMenu('/clients/new') && canEditClients"
            />
            <sidebar-item
              :link="{ name: 'Client List', path: '/clients' }"
              v-if="isFavoriteMenu('/clients') && canViewClients"
            />
          </sidebar-item>

          <!-- Billing -->
          <sidebar-item
            v-if="
              isFavoriteMenu('/billings') && (canViewBilling || canEditBilling)
            "
            :link="{
              name: 'Billing',
              icon: 'ni ni-books',
              path: '/billings',
            }"
          />

          <!-- Masterdata -->

          <sidebar-item
            :link="{
              name: 'Billing Data',
              path: '/masterdata',
              icon: 'fa fa-cog',
            }"
            v-if="
              isFavoriteMenu('/masterdata') &&
              (canViewBillingData || canEditBillingData)
            "
          />

          <div style="padding: 16px 1.5rem 0 1.5rem">Main Menu</div>

          <!-- Dashboard -->
          <sidebar-item
            :link="{
              name: 'Dashboard',
              icon: 'ni ni-shop',
              path: '/dashboard',
            }"
            v-if="!isFavoriteMenu('/dashboard')"
          >
          </sidebar-item>

          <!-- Inbox -->
          <sidebar-item
            :link="{
              isRoute: true,
              name: `Inbox`,
              nameComponent: veryUrgentSidebarComponent,
              nameComponentData: { componentData: urgentAmount },
              icon: 'far fa-folder-open ',
            }"
            v-if="
              !isFavoriteMenu('/inbox') || !isFavoriteMenu('/batchOrder')
                ? canCheckIn || canCreateTest
                : false
            "
          >
            <sidebar-item
              :link="{ name: 'New Order', path: '/inbox' }"
              v-if="!isFavoriteMenu('/inbox') ? canCheckIn : false"
            >
            </sidebar-item>

            <sidebar-item
              :link="{ name: 'Batch Order', path: '/batchOrder' }"
              v-if="!isFavoriteMenu('/batchOrder') ? canCreateTest : false"
            />

            <div
              @click="openManualOrderFormModal"
              v-if="!isFavoriteMenu('/batchOrder') ? canCreateTest : false"
            >
              <sidebar-item :link="{ name: 'Manual Order', path: '#' }" />
            </div>
          </sidebar-item>

          <!-- Order Monitoring -->
          <sidebar-item
            :link="{
              name: 'Order Monitoring',
              icon: 'far fa-folder-open ',
            }"
            v-if="
              !isFavoriteMenu('/orderMonitoring') ||
              !isFavoriteMenu('/orderMonitoringNoGrowth')
                ? canViewResultEntry
                : false
            "
          >
            <sidebar-item
              :link="{
                name: 'Orders',
                icon: 'fas fa-search',
                path: '/orderMonitoring',
              }"
              v-if="!isFavoriteMenu('/orderMonitoring')"
            />
            <sidebar-item
              :link="{
                name: 'No Growth Orders',
                icon: 'fas fa-search',
                path: '/orderMonitoringNoGrowth',
              }"
              v-if="!isFavoriteMenu('/orderMonitoringNoGrowth')"
            />
          </sidebar-item>

          <!-- Users -->
          <sidebar-item
            v-if="!isFavoriteMenu('/user') ? canEditUser : false"
            :link="{
              name: 'Users',
              icon: 'fas fa-user-edit',
              path: '/user',
            }"
          >
          </sidebar-item>

          <!-- Database -->
          <sidebar-item
            v-if="
              !isFavoriteMenu('/specimen') ||
              !isFavoriteMenu('/organisms') ||
              !isFavoriteMenu('/breakpoint') ||
              !isFavoriteMenu('/breakpointroom') ||
              !isFavoriteMenu('/tests')
                ? canEditDatabase
                : false
            "
            :link="{
              name: 'Database',
              icon: 'fas fa-database',
            }"
          >
            <sidebar-item
              :link="{ name: 'Specimen', path: '/specimen' }"
              v-if="!isFavoriteMenu('/specimen') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Organisms', path: '/organisms' }"
              v-if="!isFavoriteMenu('/organisms') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Breakpoint', path: '/breakpoint' }"
              v-if="!isFavoriteMenu('/breakpoint') ? canEditDatabase : false"
            />
            <sidebar-item
              :link="{ name: 'Breakpoint Room', path: '/breakpointroom' }"
              v-if="
                !isFavoriteMenu('/breakpointroom') ? canEditDatabase : false
              "
            />
            <sidebar-item
              :link="{ name: 'Profile Test', path: '/tests' }"
              v-if="!isFavoriteMenu('/tests') ? canEditDatabase : false"
            />
          </sidebar-item>

          <!-- Statistic -->
          <sidebar-item
            v-if="
              //  canViewStat
              true
            "
            :link="{
              isRoute: true,
              name: 'Statistic',
              icon: 'ni ni-chart-bar-32',
            }"
          >
            <sidebar-item
              v-if="canViewGraphReport"
              id="graph-report"
              :link="{
                name: 'Report of Specimen',
                path: '#',
              }"
            />
            <!-- <sidebar-item
              v-if="canViewStatSpecimen"
              id="statistic-of-specimen"
              :link="{
                name: 'Statistic of specimen',
                path: '#',
              }"
            /> -->
          </sidebar-item>

          <!-- Client -->
          <sidebar-item
            v-if="
              !isFavoriteMenu('/clients') || !isFavoriteMenu('/clients/new')
            "
            :link="{
              name: 'Clients',
              icon: 'ni ni-single-02',
            }"
          >
            <sidebar-item
              :link="{ name: 'Add New Client', path: '/clients/new' }"
              v-if="!isFavoriteMenu('/clients/new') && canEditClients"
            />
            <sidebar-item
              :link="{ name: 'Client List', path: '/clients' }"
              v-if="!isFavoriteMenu('/clients') && canViewClients"
            />
          </sidebar-item>

          <!-- Billing -->
          <sidebar-item
            v-if="
              !isFavoriteMenu('/billings') && (canViewBilling || canEditBilling)
            "
            :link="{
              name: 'Billing',
              icon: 'ni ni-books',
              path: '/billings',
            }"
          />

          <!-- Masterdata -->
          <sidebar-item
            :link="{
              icon: 'fa fa-cog',
              name: 'Billing Data',
              path: '/masterdata',
            }"
            v-if="
              !isFavoriteMenu('/masterdata') &&
              (canViewBillingData || canEditBillingData)
            "
          />

          <div @click="logout">
            <sidebar-item
              :link="{
                name: 'Logout',
                icon: 'fa fa-sign-out',
                path: '#',
              }"
            >
            </sidebar-item>
          </div>
        </template>
      </side-bar>
      <div class="main-content d-flex flex-column min-vh-100">
        <dashboard-navbar :type="'light'"></dashboard-navbar>
        <div
          class="flex-grow-1 d-flex flex-column"
          @click="$sidebar.displaySidebar(false)"
        >
          <nuxt></nuxt>
        </div>
      </div>
    </div>
    <manual-order-form-modal></manual-order-form-modal>
  </div>
</template>
<script>
/* eslint-disable no-new */
import Vue from "vue";
import PerfectScrollbar from "perfect-scrollbar";
import ManualOrderFormModal from "../pages/components/manual-order-form-modal.vue";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import { mapState } from "vuex";

Vue.component("manual-order-form-modal", ManualOrderFormModal);

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "~/components/layouts/argon/DashboardNavbar.vue";
import ContentFooter from "~/components/layouts/argon/ContentFooter.vue";
import DashboardContent from "~/components/layouts/argon/Content.vue";
import axios from "axios";
import swal from "sweetalert2";
import { EventBus } from "@/util/event-bus";
import "sweetalert2/dist/sweetalert2.css";
import VeryUrgentSidebarComponent from "../pages/components/very-urgent-sidebar-component.vue";

const INBOX_MENUS = [
  {
    name: "New Order",
    path: "/inbox",
    permission_id: 1,
  },
  {
    name: "Batch Order",
    path: "/batchOrder",
    permission_id: 2,
  },
  {
    name: "Manual Order",
    path: "#",
    permission_id: 2,
  },
];

export default {
  name: "DashboardLayout",
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    VeryUrgentSidebarComponent,
  },
  data() {
    return {
      veryUrgentSidebarComponent: VeryUrgentSidebarComponent,
      hasLoaded: false,
      inboxMenus: [],
      userPermissions: [],
      isSidebarVisible: this.$sidebar.showSidebar, // Initialize with current state
      statAppUrl: process.env.VUE_APP_STAT_APP_URL, // Assign environment variable to data property
    };
  },
  mounted() {
    this.initScrollbar();
    this.getUserPermissions();
    this.getUrgentAmount();
    this.assignGraphReport();
  },
  methods: {
    assignGraphReport() {
      const intervalId = setInterval(() => {
        const parent = document.querySelector("#graph-report");
        const a = document.querySelector("#graph-report > a");

        if (parent) {
          parent.removeEventListener("click", (event) => {
            event.preventDefault();
          });
        }

        if (a) {
          const accessToken = this.$store.state.accessToken;
          a.href = `${this.statAppUrl}/specimen?access_token=${accessToken}`;
          a.removeAttribute("to");

          a.addEventListener("click", (event) => {
            event.preventDefault();
            window.open(
              `${this.statAppUrl}/specimen?access_token=${accessToken}`,
              "_blank"
            );
          });
          clearInterval(intervalId);
        }
      }, 100); // Check every 100 milliseconds
    },
    openManualOrderFormModal(orderId) {
      EventBus.$emit(
        "open-manual-order-form-modal",
        undefined,
        undefined,
        true
      );
    },

    logout() {
      swal
        .fire({
          title: "Log out",
          text: "Do you want to Log out?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Log out",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
            cancelButton: "btn btn-light",
            actions: "swal2-actions-center",
          },
        })
        .then((result) => {
          if (result.value) {
            this.$store.commit("removeAccessToken");
            this.$store.commit("removeExpired");
            this.$router.push("/login");
          }
        });
    },
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("scrollbar-inner");
      }
    },
    getUserPermissions() {
      this.hasLoaded = false;

      const url = this.$store.state.urlBase + "/api/auth/me";

      axios
        .get(url)
        .then((response) => {
          const responseProfile = response.data ?? {};
          const profileWithoutPermissions = {
            ...responseProfile,
            permissions: [],
          };
          delete profileWithoutPermissions.permissions;

          this.$store.commit("setProfile", profileWithoutPermissions);
          this.$store.commit(
            "setPermissions",
            responseProfile?.permissions ?? []
          );
          this.userPermissions = responseProfile?.permissions ?? [];

          this.inboxMenus = INBOX_MENUS.filter((item) => {
            const finded = (responseProfile?.permissions ?? []).find(
              (permission) => {
                return permission.permission_id === item.permission_id;
              }
            );

            return finded !== undefined;
          }).map((item) => {
            if (item.name === "Manual Order") {
              return {
                ...item,
                onClick: this.openManualOrderFormModal,
              };
            } else {
              return {
                ...item,
                onClick: () => {
                  this.$router.push(item.path);
                },
              };
            }
          });
        })
        .catch((error) => {
          console.log("getUserPermissions", error);
        });
    },
    getUrgentAmount() {
      this.hasLoaded = false;

      const url = this.$store.state.urlBase + "/api/order/total-very-urgent";
      axios.get(url).then((response) => {
        const urgentAmount = response.data?.amount_new_order ?? 0;
        const orderIds = response.data?.very_urgent_order_id ?? {};

        this.$store.commit("setUrgentAmount", urgentAmount);
        this.$store.commit("setUrgentOrderIds", orderIds);
        this.hasLoaded = true;
      });
    },
    getFavoriteMenus() {
      this.hasLoaded = false;
      this.$store.commit("getFavoriteMenus");
      this.hasLoaded = true;
    },
    isFavoriteMenu(path) {
      const menu = this.favoriteMenus?.[this.profile?.id] ?? [];

      return menu.some((list) => {
        return list === path;
      });
    },
  },
  computed: {
    ...mapState(["urgentAmount", "favoriteMenus", "profile"]),
    hasFavoriteMenus() {
      return (this.favoriteMenus?.[this.profile?.id] ?? []).length > 0;
    },
    canCheckIn() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 1;
      });
    },
    canCreateTest() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 2;
      });
    },
    canViewResultEntry() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 4 || permission.permission_id === 5;
      });
    },
    canEditDatabase() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 7;
      });
    },
    canEditUser() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 8;
      });
    },
    canViewGraphReport() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 9;
      });
    },
    canViewStatSpecimen() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 10;
      });
    },
    canViewClients() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 11;
      });
    },
    canEditClients() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 12;
      });
    },
    canViewBilling() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 13;
      });
    },
    canEditBilling() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 14;
      });
    },
    canViewBillingData() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 15;
      });
    },
    canEditBillingData() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 16;
      });
    },
  },
};
</script>
<style lang="scss">
.swal2-actions-center {
  justify-content: center !important;
}
</style>
