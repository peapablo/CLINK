// middleware/auth.js
export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $pinia } = useNuxtApp();
  const store = $pinia.store;  // ใช้ Pinia store แทน Vuex ใน Nuxt 3

  // ตรวจสอบ token
  if (!store.state.accessToken) {
    return navigateTo('/login'); // เปลี่ยนเส้นทางไปที่หน้า login ถ้าไม่มี accessToken
  }
});
