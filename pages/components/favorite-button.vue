<template>
  <button class="favorite-button" @click="toggleFavorite">
    <img
      src="/img/icons/stars/active.svg"
      alt="Active Star"
      v-if="isFavorite()"
    />
    <img
      src="/img/icons/stars/inactive.svg"
      alt="Inactive Star"
      v-if="!isFavorite()"
    />
  </button>
</template>
<script>
import Vue from "vue";

import { mapState } from "vuex";

export default {
  name: "favorite-button",
  props: {
    path: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    isFavorite() {
      const list = this.favoriteMenus?.[this.profile?.id] ?? [];
      return list.includes(this.path);
    },
    toggleFavorite() {
      const favoriteMenuList = { ...(this.favoriteMenus ?? {}) };
      const list = favoriteMenuList[this.profile?.id] ?? [];

      if (this.isFavorite()) {
        const index = list.indexOf(this.path);
        list.splice(index, 1);
      } else {
        list.push(this.path);
      }

      favoriteMenuList[this.profile?.id] = list;

      this.$store.commit("setFavoritesMenus", favoriteMenuList); // Use the correct mutation name
    },
  },
  computed: {
    ...mapState(["favoriteMenus", "profile"]),
  },
};
</script>

<style>
.favorite-button-container {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(-50%, -50%);
}

.favorite-button {
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  border-radius: 8px;
  transition: all 0.3s;

  width: 36px;
  height: 36px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.favorite-button img {
  width: 20px;
}

.favorite-button:hover {
  background-color: #f8f9fe;
  box-shadow: 0 0 0 1px #f8f9fe;
}
</style>
