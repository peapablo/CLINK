<template>
  <div>
    <base-header class="mb-4">
      <div class="row align-items-center py-4" style="row-gap: 16px">
        <div class="col-12" style="position: relative">
          <h6 class="h2 text-white d-inline-block mb-0">
            Summary of this month
          </h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <route-breadcrumb></route-breadcrumb>
          </nav>

          <div class="favorite-button-container">
            <favorite-button path="/dashboard" />
          </div>
        </div>

        <div class="col-12 col-md-2">
          <h2 class="text-white d-inline-block mb-2">Month/Year</h2>
          <base-input>
            <flat-picker
              slot-scope="{ focus, blur }"
              @on-open="focus"
              @on-close="blur"
              :config="flatpickerConfig"
              class="form-control datepicker"
              v-model="monthYear_selected"
            ></flat-picker>
          </base-input>
        </div>
        <div class="d-none d-md-block col-md-10"></div>

        <div class="col-12 col-md-3">
          <card header-classes="bg-transparent">
            <div class="text-center">
              <div
                class="
                  icon icon-shape
                  text-white
                  rounded-circle
                  shadow
                  bg-gradient-orange
                "
              >
                <i class="ni ni-bullet-list-67"></i>
              </div>
            </div>

            <div class="row px-2">
              <div class="col-6 text-start">Inbox</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section1.count_inbox_total
                    ? summaryData.section1.count_inbox_total
                    : 0
                }}
              </div>

              <div class="col-6 text-start">Check in</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section1.count_checkin
                    ? summaryData.section1.count_checkin
                    : 0
                }}
              </div>

              <div class="col-6 text-start">Reject</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section1.count_reject
                    ? summaryData.section1.count_reject
                    : 0
                }}
              </div>

              <div class="col-6 text-start">Waiting</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section1.count_waiting
                    ? summaryData.section1.count_waiting
                    : 0
                }}
              </div>
            </div>
          </card>
        </div>

        <div class="col-12 col-md-3">
          <card header-classes="bg-transparent">
            <div class="text-center">
              <div
                class="
                  icon icon-shape
                  text-white
                  rounded-circle
                  shadow
                  bg-gradient-red
                "
              >
                <i class="ni ni-folder-17"></i>
              </div>
            </div>

            <div class="row px-2">
              <div class="col-6 text-start">Microscopic</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section2.count_microscopic
                    ? summaryData.section2.count_microscopic
                    : 0
                }}
              </div>

              <div class="col-6 text-start" style="white-space: nowrap">
                Aerobic Culture
              </div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section2.count_aerobic_culture
                    ? summaryData.section2.count_aerobic_culture
                    : 0
                }}
              </div>

              <div class="col-6 text-start" style="white-space: nowrap">
                Hemoculture
              </div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section2.count_hemoculture
                    ? summaryData.section2.count_hemoculture
                    : 0
                }}
              </div>

              <div class="col-6 text-start">Others</div>
              <div class="col-6 text-right">
                {{
                  hideSummaryData
                    ? "Loading"
                    : summaryData.section2.count_other
                    ? summaryData.section2.count_other
                    : 0
                }}
              </div>
            </div>
          </card>
        </div>

        <!-- <div class="col-12 col-md-4">
          <card header-classes="bg-transparent">
            <div
              class="
                icon icon-shape
                text-white
                rounded-circle
                shadow
                bg-gradient-info
              "
            >
              <i class="ni ni-chart-bar-32"></i>
            </div>
          </card>
        </div> -->
      </div>
      <!-- <div class="d-none col-sm-2 d-inline-block mb-2 px-0">
        <h2 class="text-white d-inline-block mb-2">Month/Year</h2>
        <base-input>
          <flat-picker
            slot-scope="{ focus, blur }"
            @on-open="focus"
            @on-close="blur"
            :config="flatpickerConfig"
            class="form-control datepicker"
            v-model="monthYear_selected"
            @input="loadSummary()"
          ></flat-picker>
        </base-input>
      </div> -->
      <!-- Card stats -->
      <!-- <div class="row">
        <div class="col-xl-3 col-md-6">
          <NuxtLink to="/inbox">
            <stats-card
              title="Inbox / Reject"
              type="gradient-red"
              :sub-title="summary.countInboxTotal + ' / ' + summary.countReject"
              icon="ni ni-folder-17"
              rou
            >
              <template slot="footer">
                <span class="text-success mr-2">
                  <i class="fa fa-arrow-up"></i> %
                </span>
                <span class="text-nowrap">เดือนที่ผ่านมา</span>
              </template>
            </stats-card>
          </NuxtLink>
        </div>
        <div class="col-xl-3 col-md-6">
          <NuxtLink to="/orderMonitoring">
            <stats-card
              title="On Progress"
              type="gradient-orange"
              :sub-title="summary.countProgress + ''"
              icon="ni ni-bullet-list-67"
            >
              <template slot="footer">
                <span class="text-success mr-2">PRELIMINARY</span>
                <span class="text-nowrap">{{ summary.countPreliminary }}</span>
                /
                <span class="text-success mr-2">VALIDATE</span>
                <span class="text-nowrap">{{ summary.countValidate }}</span>
              </template>
            </stats-card>
          </NuxtLink>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="Approve"
            type="gradient-green"
            :sub-title="summary.countApprove + ''"
            icon="ni ni-check-bold"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> %
              </span>
              <span class="text-nowrap">เดือนที่ผ่านมา</span>
            </template>
          </stats-card>
        </div>
        <div class="col-xl-3 col-md-6">
          <stats-card
            title="KPI Performance"
            type="gradient-info"
            :sub-title="
              ((summary.countApprove / summary.countInboxTotal) * 100).toFixed(
                2
              ) + '%'
            "
            icon="ni ni-chart-bar-32"
          >
            <template slot="footer">
              <span class="text-success mr-2">
                <i class="fa fa-arrow-up"></i> %
              </span>
              <span class="text-nowrap">เดือนที่ผ่านมา</span>
            </template>
          </stats-card>
        </div>
      </div> -->
    </base-header>

    <!--Charts-->
    <div class="container-fluid">
      <div class="row" style="row-gap: 16px">
        <div class="col-12 col-md-6">
          <card header-classes="bg-transparent" class="relative">
            <div slot="header" class="p-4 row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>
            <doughnut-chart
              v-if="!hideSummaryData"
              :height="350"
              ref="chart1DoughnutChart"
              :chart-data="getChart1"
              :extra-options="chart1Options"
            ></doughnut-chart>

            <div v-if="hideSummaryData" style="height: 350px"></div>

            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              <span v-if="hideSummaryData">Loading</span>
              <span v-if="isChart1DataEqualZero && !hideSummaryData"
                >No Data</span
              >
            </div>
          </card>
        </div>

        <div class="col-12 col-md-6">
          <card header-classes="bg-transparent" class="relative">
            <div slot="header" class="p-4 row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Specimen</h5>
              </div>
            </div>
            <doughnut-chart
              v-if="!hideSummaryData"
              :height="350"
              ref="chart2DoughnutChart"
              :chart-data="getChart2"
              :extra-options="chart2Options"
            ></doughnut-chart>

            <div v-if="hideSummaryData" style="height: 350px"></div>

            <div
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              <span v-if="hideSummaryData">Loading</span>
              <span v-if="isChart2DataEqualZero && !hideSummaryData"
                >No Data</span
              >
            </div>
          </card>
        </div>
      </div>
      <!-- End charts-->
      <!-- start daily report -->
      <!-- end daily report -->
    </div>
  </div>
</template>
<script>
import axios from "axios";

// Charts
import * as chartConfigs from "@/components/argon-core/Charts/config";
import LineChart from "@/components/argon-core/Charts/LineChart";
import BarChart from "@/components/argon-core/Charts/BarChart";
import DoughnutChart from "@/components/argon-core/Charts/DoughnutChart";

// Components
import BaseProgress from "@/components/argon-core/BaseProgress";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import StatsCard from "@/components/argon-core/Cards/StatsCard";
import FavoriteButton from "./components/favorite-button.vue";

// Lists
import ActivityFeed from "@/components/pages/dashboard/ActivityFeed.vue";
import TaskList from "@/components/pages/dashboard/TaskList.vue";
import UserList from "@/components/pages/dashboard/UserList.vue";
import ProgressTrackList from "@/components/pages/dashboard/ProgressTrackList.vue";

// Tables
import LightTable from "@/components/pages/dashboard/LightTable.vue";
import SocialTrafficTable from "@/components/pages/dashboard/SocialTrafficTable.vue";
import PageVisitsTable from "@/components/pages/dashboard/PageVisitsTable.vue";

// month, year picker
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import monthSelectPlugin from "flatpickr/dist/plugins/monthSelect/index.js";
import "flatpickr/dist/plugins/monthSelect/style.css";
import { mappingApi } from "@/util/mappingApi";
import swal from "sweetalert2";

export default {
  name: "Dashboard",
  middleware: "protected",
  layout: "DashboardLayout",
  components: {
    ActivityFeed,
    flatPicker,
    LineChart,
    BarChart,
    DoughnutChart,
    BaseProgress,
    RouteBreadCrumb,
    StatsCard,
    TaskList,
    PageVisitsTable,
    SocialTrafficTable,
    LightTable,
    UserList,
    ProgressTrackList,
    FavoriteButton,
  },
  data() {
    return {
      hideSummaryData: true,
      summaryData: {
        section1: {},
        section2: {},
        chart1: {},
        chart2: {},
      },
      chart1Options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItems) => {
              const label = this.summaryData.chart1.labels[tooltipItems.index];
              const value =
                this.summaryData.chart1.datasets[0].data[tooltipItems.index];

              return `${label} : ${value} %`;
            },
          },
        },
      },
      chart2Options: {
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          callbacks: {
            label: (tooltipItems) => {
              const label = this.summaryData.chart2.labels[tooltipItems.index];
              const value =
                this.summaryData.chart2.datasets[0].data[tooltipItems.index];

              return `${label} : ${value} %`;
            },
          },
        },
      },

      flatpickerConfig: {
        plugins: [
          new monthSelectPlugin({
            shorthand: true,
            dateFormat: "Y-m",
          }),
        ],
      },
      monthYear_selected:
        new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1),
    };
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.summaryInterval);
    next();
  },
  watch: {
    monthYear_selected() {
      this.loadSummary();
    },
  },
  methods: {
    loadSummary() {
      this.hideSummaryData = true;

      const monthYear_selected = this.monthYear_selected;
      let url = this.$store.state.urlBase + "/api/" + mappingApi("summary.php");
      monthYear_selected;
      const params = {
        monthyear: monthYear_selected,
      };

      axios
        .get(url, {
          params,
        })
        .then((res) => {
          const { section1, section2, chart1, chart2 } = res.data;
          this.summaryData.section1 = section1;
          this.summaryData.section2 = section2;
          this.summaryData.chart1 = {
            labels: chart1.label.map(
              (l) => l.substring(0, 1).toUpperCase() + l.substring(1)
            ),
            datasets: [
              {
                label: "Data",
                backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                data: chart1.value,
              },
            ],
          };
          this.summaryData.chart2 = {
            labels: chart2.label.map(
              (l) => l.substring(0, 1).toUpperCase() + l.substring(1)
            ),
            datasets: [
              {
                label: "Data",
                backgroundColor: ["#41B883", "#E46651", "#00D8FF"],
                data: chart2.value,
              },
            ],
          };

          this.hideSummaryData = false;
        })
        .catch((err) => {
          swal.fire({
            title: "ดึงข้อมูลไม่สำเร็จ",
            text:
              err?.response?.data?.message ??
              err?.message ??
              "ไม่สามารถดึงข้อมูลได้",
            icon: "error",
            confirmButtonText: "Confirm",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
            },
          });
        });
    },
  },
  mounted() {
    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.loadSummary();
  },
  computed: {
    getChart1() {
      return this.summaryData.chart1;
    },
    getChart2() {
      return this.summaryData.chart2;
    },
    isChart1DataEqualZero() {
      const isZero = (this.summaryData.chart1?.datasets?.[0]?.data ?? []).every(
        (item) => parseInt(item) === 0 || item === null
      );

      return (
        isZero ||
        (this.summaryData.chart1?.datasets?.[0]?.data ?? []).length === 0
      );
    },
    isChart2DataEqualZero() {
      const isZero = (this.summaryData.chart2?.datasets?.[0]?.data ?? []).every(
        (item) => parseInt(item) === 0 || item === null
      );

      return (
        isZero ||
        (this.summaryData.chart2?.datasets?.[0]?.data ?? []).length === 0
      );
    },
  },
};
</script>
<style></style>
