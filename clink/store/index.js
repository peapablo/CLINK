import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
  const config = useRuntimeConfig();

  // State
  const urlBase = config.public.apiBase || "https://env-7663913.th1.proen.cloud";
  const accessToken = useState("c-link-accessToken", () => null);
  const expired = useState("c-link-expired", () => null);
  const profile = useState("c-link-profile", () => null);
  const permissions = ref([]);
  const urgentAmount = ref(0);
  const urgentOrderIds = ref([]);
  const favoriteMenus = useState("c-link-favorite-menus", () => []);

  // Actions
  const setProfile = (value) => (profile.value = value);
  const setPermissions = (value) => (permissions.value = value);
  const setAccessToken = (value) => (accessToken.value = value);
  const setExpired = (value) => (expired.value = value);
  const setUrgentAmount = (value) => (urgentAmount.value = value);
  const setUrgentOrderIds = (value) => (urgentOrderIds.value = value);
  const removeAccessToken = () => (accessToken.value = null);
  const removeExpired = () => (expired.value = null);

  const getUrgentAmount = async () => {
    try {
      const url = `${urlBase}/api/order/total-very-urgent`;
      const response = await $fetch(url);
      urgentAmount.value = response.amount_new_order ?? 0;
      urgentOrderIds.value = response.very_urgent_order_id ?? [];
    } catch (error) {
      console.error("Error fetching urgent amount:", error);
    }
  };

  const initializeStore = () => {
    const expiredTime = expired.value;
    if (expiredTime) {
      const nowTime = Date.now() / 1000;
      const isExpired = nowTime > expiredTime;
      if (isExpired) {
        accessToken.value = null;
        expired.value = null;
      }
    }
  };

  const getFavoritesMenus = () => favoriteMenus.value;
  const setFavoritesMenus = (value) => (favoriteMenus.value = value);

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value);

  return {
    urlBase,
    accessToken,
    expired,
    profile,
    permissions,
    urgentAmount,
    urgentOrderIds,
    favoriteMenus,
    setProfile,
    setPermissions,
    setAccessToken,
    setExpired,
    setUrgentAmount,
    setUrgentOrderIds,
    removeAccessToken,
    removeExpired,
    getUrgentAmount,
    initializeStore,
    getFavoritesMenus,
    setFavoritesMenus,
    isAuthenticated,
  };
});
