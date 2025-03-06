<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl">
            <h1 class="text-white mb-0">Order Monitoring</h1>
          </div>
          <div class="col-auto col-xl"></div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/orderMonitoring" />
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="row align-items-end">
        <div class="col-12 col-lg-2">
          <base-input label="Accept from">
            <flat-picker
              slot-scope="{ focus, blur }"
              @on-open="focus"
              @on-close="blur"
              :config="flatPickerConfig"
              class="form-control datepicker"
              v-model="dateFromFilter"
            ></flat-picker>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Accept to">
            <flat-picker
              slot-scope="{ focus, blur }"
              @on-open="focus"
              @on-close="blur"
              :config="flatPickerConfig"
              class="form-control datepicker"
              v-model="dateToFilter"
            ></flat-picker>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Test">
            <el-select placeholder="Test" v-model="selectedTestFilter">
              <el-option label="All" value></el-option>
              <el-option
                v-for="item in selectData.testData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>

        <div class="d-none d-lg-block col-12 col-lg-6"></div>

        <div class="col-12 col-lg-2">
          <base-input label="Status">
            <el-select placeholder="Status" v-model="selectedStatusFilter">
              <el-option label="All" value></el-option>
              <el-option
                v-for="item in selectData.statusData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>

        <div class="col-12 col-lg-2">
          <base-input label="Pattern">
            <el-select placeholder="Pattern" v-model="selectedPatternFilter">
              <el-option label="All" value></el-option>
              <el-option
                v-for="item in selectData.patternData"
                :key="item.PATTERN_GROUP_NO"
                :label="item.PATTERN_GROUP_NO"
                :value="item.PATTERN_GROUP_NO"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Specimen">
            <el-select placeholder="Specimen" v-model="selectedSpecimenFilter">
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
        <div class="col-12 col-lg-3">
          <div class="bg-white py-2 px-2 border rounded">
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
                  style="font-size: 0.875rem"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-3">
          <base-button icon type="default" @click="searchFrom()">
            <span class="btn-inner--icon">
              <i class="fas fa-search"></i>
            </span>
          </base-button>

          <base-button icon type="default">
            <span class="btn-inner--icon">
              <i class="fas fa-printni fa-print"></i>
            </span>
          </base-button>

          <base-button icon type="default" @click="exportWorklist()">
            <span class="btn-inner--icon">
              <i class="fas fa-file-export"></i>
            </span>
          </base-button>
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
          <el-table-column label="Date" prop="date" sortable>
            <template v-slot="{ row }">
              <b>{{ row.date_create }}</b>
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
          <el-table-column label="HN" prop="hn" width="100">
            <template v-slot="{ row }">
              <b>
                <span
                  class="btn-inner--icon"
                  @click="printSingleLabel(row)"
                  v-if="row.status >= 2"
                  style="cursor: pointer"
                >
                  <i class="fas fa-printni fa-print"></i>
                </span>
                {{ row.HN }}
              </b>
            </template>
          </el-table-column>
          <el-table-column label="Name" prop="name" width="150">
            <template v-slot="{ row }">
              <b>{{ row.FIRST_NAME }} {{ row.LAST_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Category" prop="CATEGORY_NAME" width="120">
            <template v-slot="{ row }">
              <b>{{ row.CATEGORY_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Specimen" prop="SPECIMEN_NAME" width="120">
            <template v-slot="{ row }">
              <b>{{ row.SPECIMEN_NAME }}</b>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="Primary Test"
            prop="TEST_PRIMARY_NAME_ABBR"
            width="150"
          >
            <template v-slot="{ row }">
              <b>{{ row.TEST_PRIMARY_NAME_ABBR }}</b>
            </template>
          </el-table-column> -->
          <el-table-column label="Location" prop="location">
            <template v-slot="{ row }">
              <b>{{ row.LOCATION_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Status" prop="status" width="100">
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
          <el-table-column label="HI/CI" prop="HICI" width="70">
            <template v-slot="{ row }">
              <b>{{ checkHICI(row) }}</b>
            </template>
          </el-table-column>
          <el-table-column width="150">
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
                      v-for="item in selectData.testData"
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
        </div>
        <div class="col-12 mb-3">
          <base-button
            v-if="canApprove"
            icon
            type="success"
            @click="approveByBatch"
            :class="{ disabled: isSubmittingApprove }"
            style="background-color: #377348; border-color: #377348"
          >
            <span class="btn-inner--icon">
              <i class="fa fa-check"></i>
            </span>
            <span class="btn-inner--text">Approve by Batch</span>
          </base-button>

          <base-button icon outline type="default" @click="printLabel">
            <span class="btn-inner--icon">
              <i class="fas fa-printni fa-print"></i>
            </span>
            <span class="btn-inner--text">Label Sticker</span>
          </base-button>
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
import swal from "sweetalert2";
import moment from "moment";
import { mapState } from "vuex";
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
    clearInterval(this.polling);
    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.getTestPrimary();
    // this.getStatusData();
    this.getPatternData();
    this.getWard();
    this.getNogrowth();
    this.getCategory();
    this.getSpecimen();
    this.fetchData();

    this.polling = setInterval(() => {
      if (
        this.$store.state.accessToken !== null &&
        this.selectedRows.length === 0
      ) {
        this.fetchData();
      }
    }, 5000);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.polling);
    EventBus.$emit("close-manual-order-form-modal");

    next();
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
        specimen: "",
        test: "",
        category: "",
        ward: "",
        status: "",
        labNo: "",
      },
      selectData: {
        statusData: [
          // {
          //   ID: -2,
          //   NAME: "Cancel",
          //   sort_order: 100,
          //   status: 1,
          // },
          // {
          //   ID: -1,
          //   NAME: "Reject",
          //   sort_order: 100,
          //   status: 1,
          // },
          // {
          //   ID: 0,
          //   NAME: "New Order",
          //   sort_order: 100,
          //   status: 1,
          // },
          // {
          //   ID: 1,
          //   NAME: "Waiting",
          //   sort_order: 100,
          //   status: 1,
          // },
          {
            ID: 2,
            NAME: "Check-in",
            sort_order: 100,
            status: 1,
          },
          // {
          //   ID: 4,
          //   NAME: "Result Entry",
          //   sort_order: 100,
          //   status: 1,
          // },
          {
            ID: 6,
            NAME: "Preliminary",
            sort_order: 100,
            status: 1,
          },
          {
            ID: 7,
            NAME: "Validate (Wait for Approve)",
            sort_order: 100,
            status: 1,
          },
          {
            ID: 8,
            NAME: "Approve",
            sort_order: 100,
            status: 1,
          },
        ],
        patternData: [],
        testData: [],
        wardData: [],
        nogrowthData: [],
        specimenData: [],
        categoryData: [],
        testDataFilter: [],
      },
      filtersTableCategories: [],
      filtersTableTestPrimaryData: [],
      filtersTableSpecimen: [],

      selectedStatusFilter: 2,
      selectedStatus: 2,

      selectedPatternFilter: "",
      selectedPattern: "",

      selectedSpecimenFilter: "",
      selectedSpecimen: "",

      selectedTestFilter: "",
      selectedTest: "",

      selectedRows: [],
      statusData: [],
      allTableData: [],
      tableData: [],

      searchText: "",
      confirmSearchText: "",

      // From today last 30 month
      dateFromFilter: moment().subtract(30, "days").format("YYYY-MM-DD"),
      dateFrom: moment().subtract(30, "days").format("YYYY-MM-DD"),
      // To today
      dateToFilter: moment().format("YYYY-MM-DD"),
      dateTo: moment().format("YYYY-MM-DD"),
      searchQuery: "",
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      isSubmittingApprove: false,
    };
  },
  methods: {
    openManualOrderFormModal(rowData) {
      EventBus.$emit(
        "open-edit-manual-order-form-modal",
        rowData,
        this.fetchData
      );
    },

    approveByBatch() {
      if (this.selectedRows.length == 0) {
        this.$swal({
          title: "กรุณาเลือกรายการก่อน",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
            cancelButton: "btn btn-light",
          },
        });
        return;
      }

      swal
        .fire({
          title: "Confirm to Approve",
          text: "Would you like to update new information? ",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
            cancelButton: "btn btn-light",
          },
        })
        .then((result) => {
          if (result.value) {
            this.isSubmittingApprove = true;

            const formData = new FormData();
            formData.append("status", this.selectedStatus);
            this.selectedRows.forEach((element) => {
              formData.append("id[]", element.id);
            });

            const url = `${this.$store.state.urlBase}/api/lab_result?data=update-status-batch`;
            axios
              .post(url, formData)
              .then((response) => {
                swal
                  .fire({
                    icon: "success",
                    title: "การอัพเดตข้อมูลสำเร็จ",
                    timer: 1500,
                    showConfirmButton: false,
                  })
                  .then(() => {
                    this.fetchData();
                    this.isSubmittingApprove = false;
                  });
              })
              .catch((error) => {
                swal.fire({
                  icon: "error",
                  title: "การอัพเดตข้อมูลไม่สำเร็จ",
                  timer: 1500,
                  showConfirmButton: false,
                });
                this.isSubmittingApprove = false;
              });
          }
        });
    },
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
      const api = mappingApi("inbox.php");
      const queryParam = "";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
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
      this.filterTestData(row.CATEGORY_ID);

      this.formModal.id = row.id;
      this.formModal.hn = row.HN;
      this.formModal.firstname = row.FIRST_NAME;
      this.formModal.lastname = row.LAST_NAME;
      this.formModal.specimen = row.SPECIMEN_ID;
      this.formModal.test = row.TEST_PRIMARY_ID;
      this.formModal.category = row.CATEGORY_ID;
      this.formModal.ward = row.LOCATION_ID;
      this.formModal.status = row.status;
      this.formModal.labNo = row.LAB_NO;
      this.currentEditRow = index;
      // this.modals.form = true;

      this.openManualOrderFormModal(row);
    },
    fetchData() {
      const api = mappingApi("inbox.php");
      const queryParam =
        "data=searchDate&dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        "&status=" +
        (this.selectedStatus ?? 2) +
        "&pattern=" +
        this.selectedPattern +
        "&specimen=" +
        this.selectedSpecimen +
        "&searchText=" +
        this.searchText +
        "&testPrimaryId=" +
        this.selectedTest;

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
    exportWorklist() {
      const api = mappingApi("export-worklist.php");
      const queryParam =
        "dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        "&pattern=" +
        this.selectedPattern +
        "&specimen=" +
        this.selectedSpecimen +
        "&status=" +
        this.selectedStatus;
      const url = `${this.$store.state.urlBase}/${api}?${queryParam}`;

      window.open(url, "_blank");
    },
    searchFrom() {
      this.selectedStatus = this.selectedStatusFilter;
      this.selectedPattern = this.selectedPatternFilter;
      this.selectedSpecimen = this.selectedSpecimenFilter;
      this.selectedTest = this.selectedTestFilter;
      this.dateFrom = this.dateFromFilter;
      this.dateTo = this.dateToFilter;
      this.confirmSearchText = this.searchText;

      const api = mappingApi("inbox.php");
      const queryParam =
        "data=searchDate&dateFrom=" +
        this.dateFromFilter +
        "&dateTo=" +
        this.dateToFilter +
        "&status=" +
        this.selectedStatusFilter +
        "&pattern=" +
        this.selectedPatternFilter +
        "&specimen=" +
        this.selectedSpecimenFilter +
        "&searchText=" +
        this.searchText +
        "&testPrimaryId=" +
        this.selectedTestFilter;
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
            if (parseInt(element["status"]) >= 2) {
              tmpTableData.push(element);
            }
          });
          this.allTableData = [...tmpTableData];
          this.filterStatus();
        }
      });
    },
    getStatusData() {
      const api = mappingApi("lab_order_status.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.selectData.statusData = response;
          this.selectedStatus = 2;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getPatternData() {
      const api = mappingApi("data_pattern.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.selectData.patternData = response;
          //console.log(this.selectData.patternData);
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
      const queryParam = "data=list";
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
      const queryParam = "data=reason";
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
    getNogrowth() {
      const api = mappingApi("data_nogrowth.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.selectData.nogrowthData = response;
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
      const queryParam = "data=reason";
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
      const queryParam = "data=list";
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
            // for (let i = 0; i < this.selectData.testData.length; i++) {
            //   if (
            //     element.TEST_PRIMARY_NAME_ABBR ===
            //     this.selectData.testData[i].NAME_ABBR
            //   ) {
            //     if (this.selectData.testData[i].IS_DIRECT_EXAM === "1") {
            //       const routeData = this.$router.resolve({
            //         path: "/resultEntryDirect",
            //         query: { id: element.id },
            //       });
            //       window.open(routeData.href, "_blank");
            //     } else {
            //       const routeData = this.$router.resolve({
            //         path: "/resultEntryCulture",
            //         query: { id: element.id },
            //       });
            //       window.open(routeData.href, "_blank");
            //     }
            //     element.IS_DIRECT_EXAM =
            //       this.selectData.testData[i].IS_DIRECT_EXAM;
            //     i = this.selectData.testData.length;
            //   }
            // }

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
      const queryParam = "lab=" + row["id"] + "&hn=" + row["HN"];
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      window.open(url, "_blank");
    },
    printLabel(row) {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal({
          title: "กรุณาเลือกรายการก่อน",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        let ids = "";
        let hns = "";
        this.selectedRows.forEach((element) => {
          ids += element["id"] + ",";
          hns += element["HN"] + ",";
        });

        if (ids != "") {
          ids = ids.substring(0, ids.length - 1);
          hns = hns.substring(0, hns.length - 1);

          const api = mappingApi("print-label.php");
          const queryParam =
            "lab=" + ids + "&hn=" + hns + "&status=" + this.selectedStatus;
          const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

          window.open(url, "_blank");
        }
      }
    },
  },
  computed: {
    ...mapState(["permissions"]),
    canViewResultEntry() {
      return this.permissions.some((permission) => {
        return permission.permission_id === 4 || permission.permission_id === 5;
      });
    },
    canApprove() {
      return this.permissions.some((permission) => {
        return permission.permission_id === 6;
      });
    },
  },
  watch: {
    permissions: {
      handler: function (val) {
        if (val.length !== 0) {
          if (!this.canViewResultEntry) {
            this.$router.push("/dashboard");
          }
        }
      },
      deep: true,
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
