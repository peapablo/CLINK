import { Doughnut, mixins } from "vue-chartjs";
import globalOptionsMixin from "@/components/argon-core/Charts/globalOptionsMixin";

export default {
  name: "doughnut-chart",
  extends: Doughnut,
  mixins: [mixins.reactiveProp, globalOptionsMixin],
  props: {
    extraOptions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      ctx: null,
    };
  },
  mounted() {
    this.$watch(
      "chartData",
      (newVal, oldVal) => {
        if (!oldVal) {
          this.renderChart(this.chartData, this.extraOptions);
        } else {
          this.$data._chart.destroy();
          this.renderChart(this.chartData, this.extraOptions);
        }
      },
      { immediate: true }
    );
  },
};
