import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import { ofetch } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const apiFetch = ofetch.create({
    baseURL: config.public.apiBase,
  });

  return {
    provide: {
      apiFetch, 
    },
  };
});
