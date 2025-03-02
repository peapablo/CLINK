import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const state = () => ({
  urlBase: 'https://env-7663913.th1.proen.cloud',
  // urlBase: "https://clink-laravel.igloo.solutions",
  // urlBase: "http://localhost/api",
  accessToken: null,
  expired: null,

  // Profile
  permissions: [],
  profile: null,

  // Application
  urgentAmount: 0,
  urgentOrderIds: [],
  favoriteMenus: [],
});

export const mutations = {
  setProfile(state, value) {
    state.profile = value;

    localStorage.setItem("c-link-profile", JSON.stringify(value));
  },
  setPermissions(state, value) {
    state.permissions = value;
  },
  setAccessToken(state, value) {
    state.accessToken = value;

    localStorage.setItem("c-link-accessToken", value);
  },
  setExpired(state, value) {
    state.expired = value;

    localStorage.setItem("c-link-expired", value);
  },
  setUrgentAmount(state, value) {
    state.urgentAmount = value;
  },
  setUrgentOrderIds(state, value) {
    state.urgentOrderIds = value;
  },
  removeAccessToken(state) {
    state.accessToken = null;
    localStorage.removeItem("c-link-accessToken");
  },
  removeExpired(state) {
    state.expired = null;

    localStorage.removeItem("c-link-expired");
  },
  async getUrgentAmount(state) {
    const url = state.urlBase + "/api/order/total-very-urgent";
    return axios.get(url).then((response) => {
      const urgentAmount = response.data?.amount_new_order ?? 0;
      const orderIds = response.data?.very_urgent_order_id ?? {};

      state.urgentAmount = urgentAmount;
      state.urgentOrderIds = orderIds;
    });
  },
  initializeStore(state) {
    if (localStorage.getItem("c-link-expired")) {
      const expiredTime = localStorage.getItem("c-link-expired");
      const now = new Date();
      const nowTime = now.getTime() / 1000;

      const isRememberMe = expiredTime === null;
      const isExpired = nowTime > expiredTime;

      if (isExpired && isRememberMe) {
        state.accessToken = null;
        localStorage.removeItem("c-link-accessToken");

        localStorage.removeItem("c-link-expired");
      } else {
        if (localStorage.getItem("c-link-accessToken")) {
          state.accessToken = localStorage.getItem("c-link-accessToken");
        }
      }
    } else {
      if (localStorage.getItem("c-link-accessToken")) {
        state.accessToken = localStorage.getItem("c-link-accessToken");
      }
    }

    if (localStorage.getItem("c-link-profile")) {
      state.profile = JSON.parse(localStorage.getItem("c-link-profile"));
    }

    if (localStorage.getItem("c-link-favorite-menus")) {
      state.favoriteMenus = JSON.parse(
        localStorage.getItem("c-link-favorite-menus")
      );
    }
  },
  getFavoritesMenus(state) {
    state.favoriteMenus = JSON.parse(
      localStorage.getItem("c-link-favorite-menus")
    );
  },
  setFavoritesMenus(state, value) {
    state.favoriteMenus = value;
    localStorage.setItem("c-link-favorite-menus", JSON.stringify(value));
  },
};

export const actions = {};

export const getters = {
  accessToken(state) {
    return state.accessToken;
  },
};

const plugins = [];

// if (process.client) {
//   plugins.push(
//     createPersistedState({
//       key: "clink-store", // change this to a unique key
//       paths: ["accessToken", "refreshToken"],
//     })
//   );
// }

export { plugins };
