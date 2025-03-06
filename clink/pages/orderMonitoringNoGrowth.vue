<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1">
            <h1 class="text-white">No Growth Order Monitoring</h1>
          </div>
          <div class="col-auto col-xl"></div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/orderMonitoringNoGrowth" />
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="row align-items-end">
        <div class="col-auto">
          <base-input label="Date">
            <flat-picker
              slot-scope="{ focus, blur }"
              @on-open="focus"
              @on-close="blur"
              :config="flatPickerConfig"
              class="form-control datepicker"
              v-model="dateFrom"
            ></flat-picker>
          </base-input>
        </div>
        <div class="col-auto">
          <base-input label="Specimen">
            <el-select placeholder="Specimen" v-model="selectedSpecimen">
              <el-option label="All" value></el-option>
              <el-option
                v-for="item in selectData.specimenData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="col col-auto col-xl">
          <div class="bg-white py-2 px-2 border rounded mt-4">
            <div class="d-flex flex-row align-items-center">
              <div class="mr-2" style="cursor: pointer">
                <i class="fas fa-search"></i>
              </div>
              <div class="flex-grow-1">
                <input
                  type="text"
                  class="w-100 border-0 input-style"
                  v-model="searchText"
                  placeholder="Text Search..."
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-auto">
          <base-button
            icon
            outline
            type="default"
            class="mt-4"
            @click="searchFrom()"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-search"></i>
            </span>
          </base-button>
        </div>

        <div class="col-auto col-md text-right">
          <!--
          <base-button icon outline type="default" class="mb-4">
            <span class="btn-inner--icon"
              ><i class="fas fa-printni fa-print"></i
            ></span>
          </base-button>
          <base-button icon outline type="default" class="mb-4">
            <span class="btn-inner--icon"
              ><i class="fas fa-file-export"></i
            ></span>
            <span class="btn-inner--text">Export</span>
          </base-button>
          <base-button
            icon
            type="default"
            class="mb-4"
          >
            <span class="btn-inner--text">Send to HIS </span>
          </base-button>
          -->
        </div>
      </div>
      <div class="card mt-3">
        <el-table
          class="table-responsive table-flush"
          header-row-class-name="thead-light"
          row-key="labNo"
          stripe
          :data="queriedData"
          ref="singleTable"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" align="left"></el-table-column>
          <el-table-column label="Check-in Date" prop="date" sortable>
            <template v-slot="{ row }">
              <b>{{ row.CHECKIN_TIME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Lab No." prop="labNo">
            <template slot-scope="{ $index, row }">
              <a
                class="mr-2"
                @click="editRow(row, $index)"
                style="cursor: pointer"
              >
                <i class="far fa-edit" style="color: #2c7ef9"></i>
                <b>{{ row.LAB_NO }}</b>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            label="No-Growth Status"
            prop="isolate"
            width="150px"
          >
            <template slot-scope="{ $index, row }">
              <div v-if="row.NOGROWTH_STATUS == 0 && row.NOGROWTH_ID == null">
                -
              </div>
              <div
                v-if="row.NOGROWTH_STATUS == 48 || row.NOGROWTH_ID == 'NG48'"
              >
                No growth after 48 hrs.
              </div>
              <div
                v-if="row.NOGROWTH_STATUS == 72 || row.NOGROWTH_ID == 'NG72'"
              >
                No growth 3 days
              </div>
              <div
                v-if="row.NOGROWTH_STATUS == 120 || row.NOGROWTH_ID == 'NG120'"
              >
                No growth 5 days
              </div>
            </template>
          </el-table-column>
          <el-table-column label="HN" prop="hn">
            <template v-slot="{ row }">
              <b>{{ row.HN }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="name">
            <template v-slot="{ row }">
              <b>{{ row.FIRST_NAME }} {{ row.LAST_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Specimen" prop="SPECIMEN_NAME">
            <template v-slot="{ row }">
              <b>{{ row.SPECIMEN_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Primary Test" prop="TEST_PRIMARY_NAME_ABBR">
            <template v-slot="{ row }">
              <b>{{ row.TEST_PRIMARY_NAME_ABBR }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Status" prop="status">
            <template v-slot="{ row }">
              <b>
                <div v-if="row.status == 0">New Order</div>
                <div v-if="row.status == 1">Waiting</div>
                <div v-if="row.status == 2">Check-in</div>
                <div v-if="row.status == 3">Instrument Processing</div>
                <div v-if="row.status == 4">Result Entry</div>
                <div v-if="row.status == 5">Result Entry Finish</div>
                <div v-if="row.status == 6">Preliminary</div>
                <div v-if="row.status == 7">Validate</div>
                <div v-if="row.status == 8">Approve</div>
                <div v-if="row.status == 9">Finish</div>
                <div v-if="row.status == -1">Reject</div>
                <div v-if="row.status == -2">Cancel</div>
              </b>
            </template>
          </el-table-column>
          <el-table-column>
            <template v-slot="{ row }">
              <div
                v-if="
                  row.status >= 2 &&
                  row.TEST_PRIMARY_ID != null &&
                  row.TEST_PRIMARY_ID != ''
                "
              >
                <a
                  :href="
                    (row.IS_DIRECT_EXAM === '1'
                      ? 'resultEntryDirect'
                      : 'resultEntryCulture') +
                    '?id=' +
                    row.id
                  "
                  style="cursor: pointer"
                  target="_blank"
                >
                  <i class="far fa-edit" style="color: #2c7ef9"></i>
                  Lab result
                  <i class="fas fa-arrow-right"></i>
                </a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!--Form modal-->
        <modal :show.sync="modals.form" size="sm" body-classes="p-0">
          <card
            type="secondary"
            header-classes="bg-transparent pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0"
          >
            <template>
              <form role="form">
                <div class="row align-items-end">
                  <div class="col">
                    <base-input
                      label="HN"
                      v-model="formModal.hn"
                      class="mb-3"
                    ></base-input>
                  </div>
                </div>

                <base-input
                  label="First name"
                  v-model="formModal.firstname"
                ></base-input>
                <base-input
                  label="Last name"
                  v-model="formModal.lastname"
                ></base-input>

                <base-input label="Specimen" filterable>
                  <el-select v-model="formModal.specimen" filterable>
                    <el-option
                      v-for="item in selectData.specimenData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>
                <base-input label="Category">
                  <el-select
                    v-model="formModal.category"
                    filterable
                    @change="filterTestData(formModal.category)"
                  >
                    <el-option
                      v-for="item in selectData.categoryData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>

                <base-input label="Primary Test">
                  <el-select v-model="formModal.test" filterable>
                    <el-option
                      v-for="item in selectData.testDataFilter"
                      :key="item.NAME"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>

                <base-input label="Ward">
                  <el-select v-model="formModal.ward" filterable>
                    <el-option
                      v-for="item in selectData.wardData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>

                <base-input label="Status">
                  <el-select
                    placeholder="Status"
                    v-model="formModal.status"
                    filterable
                  >
                    <el-option
                      v-for="item in selectData.statusData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>

                <div class="text-center">
                  <base-button type="primary" class="my-4" @click="saveFormEdit"
                    >SAVE</base-button
                  >
                </div>
              </form>
            </template>
          </card>
        </modal>
        <div
          slot="footer"
          class="
            col-12
            d-flex
            justify-content-center justify-content-sm-between
            flex-wrap
            mt-4
          "
        >
          <div class>
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          ></base-pagination>
          <div class="col-12 py-4 text-center">
            <base-button
              icon
              type="secondary"
              @click="savePreliminary"
              v-if="Allow_Preliminary == 1"
            >
              <span class="btn-inner--icon">
                <i class="far fa-list-alt"></i>
              </span>
              <span class="btn-inner--text">Preliminary</span>
            </base-button>

            <base-button
              icon
              type="secondary"
              @click="saveValidate"
              v-if="Allow_Validate == 1"
            >
              <span class="btn-inner--icon">
                <i class="far fa-list-alt"></i>
              </span>
              <span class="btn-inner--text">Validate</span>
            </base-button>

            <base-button
              icon
              type="secondary"
              @click="saveApprove"
              v-if="Allow_Approve == 1"
            >
              <span class="btn-inner--icon">
                <i class="far fa-check-circle"></i>
              </span>
              <span class="btn-inner--text">Approve</span>
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import { Select, Option, Table, TableColumn } from "element-ui";
import { Modal, BaseAlert } from "@/components/argon-core";
import { mappingApi } from "@/util/mappingApi";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";

import { EventBus } from "@/util/event-bus";
import FavoriteButton from "./components/favorite-button.vue";

export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "orderMonitoring",
  components: {
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    RouteBreadCrumb,
    Modal,
    BaseAlert,
    FavoriteButton,
  },
  mounted() {
    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.getTestPrimary();
    this.getStatusData();
    this.getNogrowthData();
    this.getWard();
    this.getCategory();
    this.getSpecimen();
    this.fetchData();
  },
  data() {
    return {
      modals: {
        form: false,
      },
      formModal: {
        id: null,
        currentEditRow: 0,
        hn: "",
        firstname: "",
        lastname: "",
        value: "",
        specimen: "",
        test: "",
        category: "",
        ward: "",
        status: "",
        labNo: "",
      },
      selectData: {
        statusData: [],
        nogrowthData: [],
        testData: [],
        wardData: [],
        specimenData: [],
        categoryData: [],
        testDataFilter: [],
      },
      filtersTableCategories: [],
      filtersTableTestPrimaryData: [],
      filtersTableSpecimen: [],
      selectedStatus: "",
      selectedNogrowth: "",
      selectedSpecimen: "",
      statusData: [],
      allTableData: [],
      tableData: [],
      searchText: "",
      dateFrom:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      searchQuery: "",
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      Allow_Preliminary: 0,
      Allow_Validate: 0,
      Allow_Approve: 0,
    };
  },
  methods: {
    checkHICI(row) {
      let admitTime = new Date(row.ADMIT_TIME);
      let orderTime = new Date(row.ORDER_TIME);
      let days = (orderTime - admitTime) / (1000 * 60 * 60 * 24);
      return days >= 2 ? "HI" : "CI";
    },
    filterTestData(categoryId) {
      let result = [];
      for (let i = 0; i < this.selectData.testData.length; i++) {
        if (this.selectData.testData[i].CATEGORY_ID === categoryId.toString()) {
          result.push(this.selectData.testData[i]);
        }
      }
      this.selectData.testDataFilter = [];
      this.selectData.testDataFilter = [...result];
    },
    saveFormEdit() {
      const api = mappingApi("inbox.php"); // Use "inbox.php" as input
      const url = `${this.$store.state.urlBase}/api/${api}`;
      let bodyFormData = new FormData();
      bodyFormData.append("mode", "edit");
      bodyFormData.append("id", this.formModal.id);
      bodyFormData.append("labNo", this.formModal.labNo);
      bodyFormData.append("hn", this.formModal.hn);
      bodyFormData.append("firstname", this.formModal.firstname);
      bodyFormData.append("lastname", this.formModal.lastname);
      bodyFormData.append("specimenId", this.formModal.specimen);
      bodyFormData.append("testPrimaryId", this.formModal.test);
      bodyFormData.append("locationId", this.formModal.ward);
      bodyFormData.append("status", this.formModal.status);

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      }).then((response) => {
        const result = response;
        if (result.status == "success") {
          this.fetchData();
          this.modals.form = false;
          swal.fire({
            icon: "success",
            title: "การอัพเดตข้อมูลสำเร็จ",
          });
        } else {
          swal.fire({
            icon: "error",
            title: "การอัพเดตข้อมูลไม่สำเร็จ",
          });
        }
      });
    },
    async editRow(row, index) {
      EventBus.$emit(
        "open-edit-manual-order-form-modal",
        row,
        this.fetchData
      );

      // await this.filterTestData(row.CATEGORY_ID);

      // this.formModal.id = row.id;
      // this.formModal.hn = row.HN;
      // this.formModal.firstname = row.FIRST_NAME;
      // this.formModal.lastname = row.LAST_NAME;
      // this.formModal.specimen = row.SPECIMEN_ID;
      // this.formModal.test = row.TEST_PRIMARY_ID;
      // this.formModal.category = row.CATEGORY_ID;
      // this.formModal.ward = row.LOCATION_ID;
      // this.formModal.status = row.status;
      // this.formModal.labNo = row.LAB_NO;
      // this.currentEditRow = index;
      // this.modals.form = true;
    },
    fetchData() {
      const dateFrom = this.dateFrom;
      const dateTo = this.dateTo;

      const api = mappingApi("inbox.php");
      const queryParam = `data=searchNoGrowth&dateFrom=${this.dateFrom}&specimen=${this.selectedSpecimen}&searchText=${this.searchText}`;
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result) {
          let tmpTableData = [];
          result.forEach((element) => {
            //if(parseInt(element['status'])>=2){
            tmpTableData.push(element);
            //}
          });
          this.allTableData = [...tmpTableData];

          this.filterStatus();
        }
      });
    },
    searchFrom() {
      const api = mappingApi("inbox.php");
      const queryParam = `data=searchNoGrowth&dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&status=${this.selectedStatus}&specimen=${this.selectedSpecimen}&searchText=${this.searchText}`;
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result) {
          let tmpTableData = [];
          result.forEach((element) => {
            //if(parseInt(element['status'])>=2){
            tmpTableData.push(element);
            //}
          });
          this.allTableData = [...tmpTableData];
          this.filterStatus();
        }
      });
    },
    getStatusData() {
      const api = mappingApi("lab_order_status.php");
      const queryParam = "data=list"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.statusData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getNogrowthData() {
      const api = mappingApi("data_result.php");
      const queryParam = "data=list&group=NG"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.nogrowthData = response;
          console.log(this.selectData.nogrowthData);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getTestPrimary() {
      const api = mappingApi("data_test_primary.php");
      const queryParam = "data=list"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.testData = response;

          let data = [];
          let tmpdata = [];
          if (this.selectData.testData != null) {
            this.selectData.testData.forEach((element) => {
              data.push({ text: element.NAME, value: element.NAME });
            });
          }
          this.filtersTableTestPrimaryData = [...data];
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getWard() {
      const api = mappingApi("data_location.php");
      const queryParam = "data=reason"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.selectData.wardData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getCategory() {
      const api = mappingApi("data_category.php");
      const queryParam = "data=reason"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.categoryData = response;
          let data = [];
          if (this.selectData.categoryData != null) {
            this.selectData.categoryData.forEach((element) => {
              data.push({ text: element.NAME, value: element.NAME });
            });
          }
          this.filtersTableCategories = [...data];
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getSpecimen() {
      const api = mappingApi("data_specimen.php");
      const queryParam = "data=list"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.specimenData = response;

          let data = [];
          if (this.selectData.specimenData != null) {
            this.selectData.specimenData.forEach((element) => {
              data.push({ text: element.NAME, value: element.NAME });
            });
          }
          this.filtersTableSpecimen = [...data];
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    filterStatus() {
      const allData = this.allTableData;
      let result = [];

      if (this.selectedStatus == "") {
        this.tableData = [...allData];
      } else {
        allData.forEach((element) => {
          if (element.status === this.selectedStatus) {
            for (let i = 0; i < this.selectData.testData.length; i++) {
              if (
                element.TEST_PRIMARY_NAME_ABBR ===
                this.selectData.testData[i].NAME_ABBR
              ) {
                if (this.selectData.testData[i].IS_DIRECT_EXAM === "1") {
                  element.url = "/resultEntryDirect?id=" + element.id;
                } else {
                  element.url = "/resultEntryCulture?id=" + element.id;
                }
                element.IS_DIRECT_EXAM =
                  this.selectData.testData[i].IS_DIRECT_EXAM;
                i = this.selectData.testData.length;
              }
            }

            result.push(element);
          }
        });

        this.tableData = [];
        this.tableData = [...result];
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    printSingleLabel(row) {
      const api = mappingApi("print-label.php");
      const queryParams = `lab=${row["id"]}&hn=${row["HN"]}`; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      window.open(url, "_blank");
    },
    saveResult() {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal("กรุณาเลือกรายการก่อนนะคะ");
      else {
        this.selectedRows.forEach((element) => {
          const api = mappingApi("lab_result.php");
          const queryParams = `data=update-nogrowth&id=${element["id"]}`; // You can add more parameters if needed
          const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

          let FormData = require("form-data");
          let formData = null;

          if (element.TEST_SECONDARY_ID != null) {
            formData = new FormData();
            formData.append("ISOLATE_NO", element.ISOLATE_NO);
            formData.append("test_id", element.TEST_SECONDARY_ID);
            formData.append("value", element.VALUE);
            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
              const result = response;
              console.log(result);
            });
          }
        });

        swal.fire("บันทึกผล No Growth สำเร็จค่ะ");
      }
    },
    getRole() {
      const api = mappingApi("sys_role.php");
      const queryParams = "data=getrole&roleId=1"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios
        .get(url)
        .then((response) => {
          const result = response;
          this.Allow_Preliminary = parseInt(result["ALLOW_PRELIMINARY"]);
          this.Allow_Validate = parseInt(result["ALLOW_VALIDATE"]);
          this.Allow_Approve = parseInt(result["ALLOW_APPROVE	"]);
          console.log(this.Allow_Preliminary);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
  },
};
</script>
<style></style>

<style scoped>
small {
  color: #8898aa !important;
}
.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
</style>
