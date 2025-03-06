// utils/API_KEY.js
export default function getApiKey() {
    const config = useRuntimeConfig();
    return config.public.apiKey || "DEFAULT_API_KEY";
  }
  