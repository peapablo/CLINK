import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create();

  api.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("c-link-accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return {
    provide: {
      axios: api,
    },
  };
});
