import { onBeforeUnmount, onMounted } from 'vue';

export default {
  mounted() {
    const clickOutsideEvent = (event) => {
      // Check if click was outside the element or its children
      if (!(this.$el === event.target || this.$el.contains(event.target))) {
        // Call the method provided in the attribute value
        this[binding.value](event);
      }
    };

    // Add event listener on mounted
    document.body.addEventListener('click', clickOutsideEvent);

    // Remove event listener before unmounting to avoid memory leaks
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', clickOutsideEvent);
    });
  },
};
