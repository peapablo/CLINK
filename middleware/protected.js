export default function ({ store, redirect }) {
  setTimeout(() => {
    if (!store.state.accessToken) {
      return redirect("/login");
    }
  }, 1500);
}
