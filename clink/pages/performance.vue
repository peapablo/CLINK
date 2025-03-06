<template>
  <div>
    <div class="border-bottom bg-primary">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1 class="text-white">Performance</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div
          :class="{ 'col-12 ': true, 'col-lg-12 col-xl-9': currentRow != null }"
        >
          <div class="d-flex flex-column flex-md-row mt-4 align-items-end">
            <div class="d-flex align-items-end">
              <div class="mr-4">
                <base-input label="Date from">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="dateFrom"
                  >
                  </flat-picker>
                </base-input>
              </div>
              <div>
                <base-input label="Date to">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="dateTo"
                  >
                  </flat-picker>
                </base-input>
              </div>
              <!-- <div class="col-auto">
                <base-input label="Category">
                  <el-select
                    placeholder="Category"
                    v-model="selectedCategory"
                  >
                    <el-option label="All" value=""> </el-option>
                    <el-option
                      v-for="item in filtersTableCategories"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div> -->
              <div class="col-auto">
                <base-input label="Primary Test">
                  <el-select
                    placeholder="Primary Test"
                    v-model="selectedPrimaryTest"
                  >
                    <el-option label="All" value=""> </el-option>
                    <el-option
                      v-for="item in filtersTableTestPrimaryData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <!-- <div class="col-auto">
                <base-input label="Specimen">
                  <el-select
                    placeholder="Specimen"
                    v-model="selectedSpecimen"
                  >
                    <el-option label="All" value=""> </el-option>
                    <el-option
                      v-for="item in filtersTableSpecimen"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div> -->
              <div class="col-auto">
                <base-button
                  icon
                  outline
                  type="default"
                  class=""
                  @click="loadData()"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-search"></i
                  ></span>
                </base-button>
              </div>
            </div>
          </div>
        </div>
        <!-- start card graph -->
        <div class="col-xl mt-2">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1 pl-2">
                  Performance
                </h6>
                <h5 class="h3 mb-0 pl-2">KPI Growth</h5>
              </div>
            </div>

            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="growthKPIBarChart.chartData"
              options="chartOptions"
            >
            </bar-chart>
          </card>
        </div>
        <div class="col-xl">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1 pl-2">
                  Performance
                </h6>
                <h5 class="h3 mb-0 pl-2">KPI nogrowth</h5>
              </div>
            </div>
            <bar-chart
              :height="350"
              ref="barChart"
              :chart-data="nogrowthKPIBarChart.chartData"
              options="chartOptions"
            >
            </bar-chart>
          </card>
        </div>
        <!-- end card graph -->
      </div>
    </div>
  </div>
</template>
<script>
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";
import BaseSlider from "@/components/argon-core/BaseSlider";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import flatPicker from "vue-flatpickr-component";
import axios from "axios";
import FileSaver from "file-saver";

import "flatpickr/dist/flatpickr.css";
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
  Select,
  Option,
} from "element-ui";
export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "performance",
  components: {
    BaseSlider,
    BasePagination,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
    BarChart,
  },
  data() {
    return {
      polling: null,
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      specimen: null,
      filtersTableCategories: [],
      filtersTableTestPrimaryData: [],
      filtersTableSpecimen: [],
      selectedRows: [],
      currentRow: null,

      selectedCategory: "",
      selectedPrimaryTest: "",
      selectedSpecimen: "",
      selectBodySite: null,
      dateFrom:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      dateTo:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      patternData: [],
      avg_kpi: 0,
      specimenData: [],
      searchText: "",
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      growthKPIBarChart: {
        chartData: {
          labels: ["mon", "tue", "wed", "thur", "fri"],
          datasets: [
            {
              label: "Check-in",
              data: [10, 20, 30, 40],
            },
          ],
        },
      },
      nogrowthKPIBarChart: {
        chartData: {
          labels: ["mon", "tue", "wed", "thur", "fri"],
          datasets: [
            {
              label: "Check-in",
              data: [10, 20, 30, 40],
            },
          ],
        },
      },
      chartOptions: {
        responsive: true,
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Bar Chart",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    clearInterval(this.polling); // Clear the interval before leaving the route
    next(); // Continue with the route change
  },
  mounted() {
    clearInterval(this.polling);

    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    //this.loadReasonData();
    this.loadPreData();
    this.loadData();

    this.polling = setInterval(() => {
      this.loadData();
    }, 60000);
  },
  methods: {
    loadPreData() {
      this.loadCategoryData();
      this.loadTestPrimaryData();
      this.loadSpecimenData();
      this.loadBodySiteData();
    },
    loadData() {
      this.loadgrowthKPIData();
      this.loadnogrowthKPIData();
    },
    loadnogrowthKPIData() {
      const url =
        this.$store.state.urlBase +
        "/api/detailed_summary.php?data=daily_kpi&dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        // '&category=' +
        // this.selectedCategory +
        "&primarytest=" +
        this.selectedPrimaryTest;
      // '&specimen=' +
      // this.selectedSpecimen;
      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result != null) {
          let labels = [];
          let data = [];
          const sums = {};
          const counts = {};
          result.forEach((obj) => {
            const { TEST_PRIMARY_ID, KPI } = obj;
            if (!sums[TEST_PRIMARY_ID]) {
              sums[TEST_PRIMARY_ID] = 0;
              counts[TEST_PRIMARY_ID] = 0;
            }
            sums[TEST_PRIMARY_ID] += parseFloat(KPI);
            counts[TEST_PRIMARY_ID]++;
          });
          const averages = {};
          for (const TEST_PRIMARY_ID in sums) {
            averages[TEST_PRIMARY_ID] = (
              sums[TEST_PRIMARY_ID] / counts[TEST_PRIMARY_ID]
            ).toFixed(2);
          }
          console.log(averages);
          const keys = Object.keys(averages);
          keys.forEach((key, index) => {
            labels.push(key);
            data.push(averages[key]);
          });
          let chartData = {
            datasets: [
              {
                label: "KPI_DATA",
                data: data,
              },
            ],
            labels: labels,
          };
          this.nogrowthKPIBarChart.chartData = chartData;
        }
      });
    },
    loadgrowthKPIData() {
      const url =
        this.$store.state.urlBase +
        "/api/detailed_summary.php?data=daily_kpi_growth&dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        // '&category=' +
        // this.selectedCategory +
        "&primarytest=" +
        this.selectedPrimaryTest;
      // '&specimen=' +
      // this.selectedSpecimen;
      // console.log(url);
      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        // console.log(result);
        if (result != null) {
          let labels = [];
          let data = [];
          const sums = {};
          const counts = {};
          result.forEach((obj) => {
            const { TEST_PRIMARY_ID, KPI } = obj;
            if (!sums[TEST_PRIMARY_ID]) {
              sums[TEST_PRIMARY_ID] = 0;
              counts[TEST_PRIMARY_ID] = 0;
            }
            sums[TEST_PRIMARY_ID] += parseFloat(KPI);
            counts[TEST_PRIMARY_ID]++;
          });
          // console.log(sums);
          const averages = {};
          for (const TEST_PRIMARY_ID in sums) {
            averages[TEST_PRIMARY_ID] = (
              sums[TEST_PRIMARY_ID] / counts[TEST_PRIMARY_ID]
            ).toFixed(2);
          }
          console.log(averages);
          const keys = Object.keys(averages);
          keys.forEach((key, index) => {
            labels.push(key);
            data.push(averages[key]);
          });
          let chartData = {
            datasets: [
              {
                label: "KPI_DATA",
                data: data,
              },
            ],
            labels: labels,
          };
          this.growthKPIBarChart.chartData = chartData;
        }
      });
    },
    loadCategoryData() {
      const url =
        this.$store.state.urlBase + "/api/data_category.php?data=reason";
      axios
        .get(url)
        .then((response) => {
          this.filtersTableCategories = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    loadTestPrimaryData() {
      const url =
        this.$store.state.urlBase +
        "/api/detailed_summary.php?data=loadprimarytest";
      axios
        .get(url)
        .then((response) => {
          this.filtersTableTestPrimaryData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    loadSpecimenData() {
      const url =
        this.$store.state.urlBase + "/api/data_specimen.php?data=list";
      axios
        .get(url)
        .then((response) => {
          this.filtersTableSpecimen = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    loadBodySiteData() {
      const url =
        this.$store.state.urlBase + "/api/data_body_site.php?data=list";
      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result) this.tableDataBodySite = result;
        else this.tableDataBodySite = [];
      });
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
  },
};
</script>
<style scoped>
.active-tab {
  font-weight: bold;
  border-bottom: 4px solid #808080;
}
.tab {
  cursor: pointer;
}
.tab-table {
  cursor: pointer;
  border-bottom: 1px solid #808080;
  padding-bottom: 4p;
}
.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
</style>
