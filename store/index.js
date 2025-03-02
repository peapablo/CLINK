import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    urlBase: "https://env-7663913.th1.proen.cloud",
    accessToken: useStorage("c-link-accessToken", null),
    expired: useStorage("c-link-expired", null),

    // Profile
    permissions: [],
    profile: useStorage("c-link-profile", null),

    // Application
    urgentAmount: 0,
    urgentOrderIds: [],
    favoriteMenus: useStorage("c-link-favorite-menus", []),
  }),

  actions: {
    setProfile(value) {
      this.profile = value;
    },

    setPermissions(value) {
      this.permissions = value;
    },

    setAccessToken(value) {
      this.accessToken = value;
    },

    setExpired(value) {
      this.expired = value;
    },

    setUrgentAmount(value) {
      this.urgentAmount = value;
    },

    setUrgentOrderIds(value) {
      this.urgentOrderIds = value;
    },

    removeAccessToken() {
      this.accessToken = null;
    },

    removeExpired() {
      this.expired = null;
    },

    async getUrgentAmount() {
      try {
        const url = `${this.urlBase}/api/order/total-very-urgent`;
        const response = await axios.get(url);
        this.urgentAmount = response.data?.amount_new_order ?? 0;
        this.urgentOrderIds = response.data?.very_urgent_order_id ?? [];
      } catch (error) {
        console.error("Error fetching urgent amount:", error);
      }
    },

    initializeStore() {
      const expiredTime = this.expired;
      if (expiredTime) {
        const nowTime = new Date().getTime() / 1000;
        const isRememberMe = expiredTime === null;
        const isExpired = nowTime > expiredTime;

        if (isExpired && isRememberMe) {
          this.accessToken = null;
          this.expired = null;
        }
      }
    },

    getFavoritesMenus() {
      return this.favoriteMenus;
    },

    setFavoritesMenus(value) {
      this.favoriteMenus = value;
    },
  },

  getters: {
    accessToken: (state) => state.accessToken,
  },
});
