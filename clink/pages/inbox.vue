<template>
  <div>
    <div class="border-bottom bg-primary">
      <div class="container-fluid py-3 position-relative">
        <h1 class="text-white">Inbox</h1>

        <div class="favorite-button-container">
          <favorite-button path="/inbox" />
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div
          :class="{
            'col-12 ': true,
            // 'col-lg-12 col-xl-9': currentRow != null
          }"
        >
          <div class="d-flex flex-column flex-md-row mt-4 align-items-end">
            <div class="row align-items-end">
              <div class="col-12 col-lg-2">
                <base-input label="Date from">
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
              <div class="col-12 col-lg-2">
                <base-input label="Date to">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="dateTo"
                  ></flat-picker>
                </base-input>
              </div>

              <div class="d-none d-lg-block col-12 col-lg-8"></div>

              <div class="col-12 col-lg-2">
                <base-input label="Category">
                  <el-select placeholder="Category" v-model="selectedCategory">
                    <el-option label="All" value></el-option>
                    <el-option
                      v-for="item in filtersTableCategories"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-12 col-lg-2">
                <base-input label="Test">
                  <el-select placeholder="Test" v-model="selectedPrimaryTest">
                    <el-option label="All" value></el-option>
                    <el-option
                      v-for="item in filtersTableTestPrimaryData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-12 col-lg-2">
                <base-input label="Specimen">
                  <el-select placeholder="Specimen" v-model="selectedSpecimen">
                    <el-option label="All" value></el-option>
                    <el-option
                      v-for="item in filtersTableSpecimen"
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
                        v-on:keyup.enter="searchFrom"
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

                <base-button icon type="default" @click="exportData()">
                  <span class="btn-inner--icon">
                    <i class="fas fa-file-export"></i>
                  </span>
                </base-button>
              </div>
            </div>
          </div>
          <div class="row mt-4 mx-1">
            <div
              class="col text-center py-1"
              :class="{
                'active-tab': tableType === 0,
                'tab-table': tableType !== 0,
              }"
              @click="changeTableType(0)"
            >
              New Order
            </div>
            <div
              class="col text-center py-1"
              :class="{
                'active-tab': tableType === 1,
                'tab-table': tableType !== 1,
              }"
              @click="changeTableType(1)"
            >
              Waiting
            </div>
            <div
              class="col text-center py-1"
              :class="{
                'active-tab': tableType === -1,
                'tab-table': tableType !== -1,
              }"
              @click="changeTableType(-1)"
            >
              Rejected
            </div>
            <div
              class="col text-center py-1"
              :class="{
                'active-tab': tableType === -2,
                'tab-table': tableType !== -2,
              }"
              @click="changeTableType(-2)"
            >
              Cancel
            </div>
          </div>
          <div>
            <!-- start of card view -->
            <div class="card">
              <el-table
                class="table-responsive table-flush"
                header-row-class-name="thead-light"
                highlight-current-row
                row-key="id"
                stripe
                :data="queriedData"
                ref="singleTable"
                @selection-change="onSelectionChange"
                lazy
              >
                <el-table-column
                  type="selection"
                  align="left"
                ></el-table-column>
                <el-table-column width="30">
                  <template v-slot="{ row }">
                    <i
                      v-if="row.SEX == 2"
                      class="fas fa-female text-xl"
                      style="color: rgb(206, 130, 178)"
                    ></i>
                    <i v-if="row.SEX == 1" class="fas fa-male text-xl"></i>
                  </template>
                </el-table-column>
                <el-table-column label="Order ID" prop="id" width="115">
                  <template v-slot="{ row }">
                    <b>{{ row.ORDER_ID }}</b>
                  </template>
                </el-table-column>
                <el-table-column label="HN" prop="hn" width="80">
                  <template v-slot="{ row }">
                    <b>{{ row.HN }}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Firstname"
                  prop="firstname"
                  min-width="90"
                >
                  <template v-slot="{ row }">
                    <b>{{ row.TITLE_NAME }} {{ row.FIRST_NAME }}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Lastname"
                  prop="lastname"
                  min-width="90"
                >
                  <template v-slot="{ row }">
                    <b>{{ row.LAST_NAME }}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Category"
                  prop="CATEGORY_NAME"
                  min-width="100"
                >
                  <template v-slot="{ row }">
                    <b>{{ row.CATEGORY_NAME }}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Primary Test"
                  prop="TEST_PRIMARY_NAME_ABBR"
                  min-width="110"
                >
                  <template v-slot="{ row }">
                    <b>{{ row.TEST_PRIMARY_NAME_ABBR }}</b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="Specimen"
                  prop="SPECIMEN_NAME"
                  min-width="130"
                >
                  <template v-slot="{ row }">
                    <b>{{ row.SPECIMEN_NAME }}</b>
                  </template>
                </el-table-column>

                <el-table-column label="Reason" prop="reasonID" min-width="130">
                  <template v-slot="{ row }">
                    <b>
                      <span v-if="(row.status = 1)"
                        >{{ row.WAITING_REASON ? row.WAITING_REASON : "" }}
                        {{
                          row.WAITING_REASON_TEXT ? row.WAITING_REASON_TEXT : ""
                        }}</span
                      >
                      <span
                        v-if="(row.status = -1 && row.REJECT_REASON_ID != null)"
                        >{{ row.REJECT_REASON ? row.REJECT_REASON : "" }}
                        {{
                          row.REJECT_REASON_TEXT ? row.REJECT_REASON_TEXT : ""
                        }}</span
                      >
                      <span
                        v-if="(row.status = -2 && row.CANCEL_REASON_ID != null)"
                        >{{ row.CANCEL_REASON ? row.CANCEL_REASON : "" }}
                        {{
                          row.CANCEL_REASON_TEXT ? row.CANCEL_REASON_TEXT : ""
                        }}</span
                      >
                    </b>
                  </template>
                </el-table-column>

                <el-table-column
                  label="Priority"
                  prop="PRIORITY_NAME"
                  min-width="130"
                >
                  <template v-slot="{ row }">
                    <b>
                      <!-- Normal -->
                      <span v-if="row.PRIORITY_ID == 1">
                        <div
                          style="width: 20px; display: inline-block"
                          class="text-center"
                        >
                          <i class="fa fa-circle" style="color: green"></i>
                        </div>
                        {{ row.PRIORITY_NAME }}
                      </span>

                      <!-- Urgent -->
                      <span v-else-if="row.PRIORITY_ID == 2">
                        <div
                          style="width: 20px; display: inline-block"
                          class="text-center"
                        >
                          <i
                            class="fa fa-exclamation"
                            style="color: orange"
                          ></i>
                        </div>
                        {{ row.PRIORITY_NAME }}
                      </span>

                      <!-- Very Urgent -->
                      <span v-else-if="row.PRIORITY_ID == 3">
                        <div
                          style="width: 20px; display: inline-block"
                          class="text-center"
                        >
                          <i
                            class="fa fa-solid fa-exclamation-circle"
                            style="color: red"
                          ></i>
                        </div>
                        {{ row.PRIORITY_NAME }}
                      </span>
                    </b>
                  </template>
                </el-table-column>
                <el-table-column
                  label="EDIT"
                  prop="actionEdit"
                  width="70"
                  v-if="canEditOrderData"
                >
                  <template slot-scope="{ $index, row }">
                    <a
                      style="cursor: pointer"
                      @click="handleCurrentChange(row)"
                    >
                      <i class="far fa-edit" style="color: #2c7ef9"></i>
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  label="VIEW"
                  prop="actionView"
                  width="70"
                  v-if="!canEditOrderData"
                >
                  <template slot-scope="{ $index, row }">
                    <a
                      style="cursor: pointer"
                      @click="handleCurrentChange(row)"
                    >
                      <i class="far fa-eye" style="color: #2c7ef9"></i>
                    </a>
                  </template>
                </el-table-column>
                <el-table-column
                  label="TRASH"
                  prop="actionDelete"
                  width="70"
                  v-if="canEditOrderData"
                >
                  <template slot-scope="{ $index, row }">
                    <a style="cursor: pointer" @click="onDelete(row)">
                      <i class="fa fa-trash"></i>
                    </a>
                  </template>
                </el-table-column>
              </el-table>

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
                <!-- end of card view -->
                <div>
                  <p class="card-category">
                    Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                    <span v-if="selectedRows.length"
                      >&nbsp; &nbsp; {{ selectedRows.length }} rows
                      selected</span
                    >
                  </p>
                </div>
                <base-pagination
                  class="pagination-no-border"
                  v-model="pagination.currentPage"
                  :per-page="pagination.perPage"
                  :total="total"
                ></base-pagination>
              </div>
              <div class="col-12 mb-3" v-if="canCheckIn">
                <base-button
                  type="default"
                  @click="onCheckIn"
                  v-if="tableType == 0 || tableType == 1"
                >
                  <span class="btn-inner--text">Check in</span>
                </base-button>
                <base-button
                  type="light"
                  @click="onWaiting"
                  v-if="tableType == 0"
                >
                  <span class="btn-inner--text">Waiting</span>
                </base-button>
                <base-button
                  type="danger"
                  @click="onReject"
                  v-if="tableType == 0 || tableType == 1 || tableType == 2"
                >
                  <span class="btn-inner--text">Reject</span>
                </base-button>
                <base-button
                  type="danger"
                  @click="onCancel"
                  v-if="tableType == 0 || tableType == 1"
                >
                  <span class="btn-inner--text">Cancel</span>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSlider from "@/components/argon-core/BaseSlider";
import FavoriteButton from "./components/favorite-button.vue";
import { BasePagination } from "@/components/argon-core";
import { mappingApi } from "@/util/mappingApi";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import flatPicker from "vue-flatpickr-component";
import axios from "axios";
import { EventBus } from "@/util/event-bus";
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
import moment from "moment";
import { mapState } from "vuex";

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "inbox",
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
    FavoriteButton,
  },
  data() {
    return {
      Allow_CheckIn: 0,
      polling: null,
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      specimen: null,
      wardComment: "",
      labComment: "",
      selectedTab: 0,
      reasonWaiting: [],
      reasonReject: [],
      reasonCancel: [],
      reasonData: [],
      tableDataInbox: [],
      tableDataCheckIn: [],
      tableDataWaiting: [],
      tableDataReject: [],
      tableDataCancel: [],
      tableData: [],
      tableDataTestPrimary: [],
      tableDataSpecimen: [],
      tableDataBodySite: [],
      filtersTableCategories: [],
      filtersTableTestPrimaryData: [],
      filtersTableSpecimen: [],
      selectedRows: [],
      currentRow: null,

      selectedTabStatus: 0,

      selectedCategory: "",
      selectedPrimaryTest: "",
      selectedSpecimen: "",
      selectBodySite: null,
      // From today last 30 month
      dateFrom: moment().subtract(30, "days").format("YYYY-MM-DD"),
      // To today
      dateTo: moment().format("YYYY-MM-DD"),
      patternData: [],
      specimenData: [],
      searchText: "",
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
    };
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.polling);
    EventBus.$emit("close-manual-order-form-modal");

    next();
  },
  mounted() {
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    clearInterval(this.polling);
    this.loadReasonData();
    this.loadPreData();
    this.loadData();

    this.polling = setInterval(() => {
      this.loadData();
    }, 60000);

    if (this.permissions.length !== 0 && !this.canCheckIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    openManualOrderFormModal(rowData) {
      EventBus.$emit(
        "open-edit-manual-order-form-modal",
        rowData,
        this.loadData
      );
    },

    changeTab(tab) {
      this.selectedTab = tab;
    },
    changeTableType(type) {
      this.tableType = type;
      if (type == 0) {
        this.tableData = this.tableDataInbox;
        this.selectedTabStatus = 0;
      } else if (type == 1) {
        this.tableData = this.tableDataWaiting;
        this.selectedTabStatus = 1;
      } else if (type == 2) {
        this.tableData = this.tableDataCheckIn;
        this.selectedTabStatus = 2;
      } else if (type == -1) {
        this.tableData = this.tableDataReject;
        this.selectedTabStatus = -1;
      } else if (type == -2) {
        this.tableData = this.tableDataCancel;
        this.selectedTabStatus = -2;
      }
    },
    onDelete(row) {
      this.$swal({
        icon: "warning",
        title: "Delete",
        text: "Would you like to delete this data?",
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        showConfirmButton: true,
        showCancelButton: true,
        buttonsStyling: false,
        customClass: {
          confirmButton: "btn btn-default",
          cancelButton: "btn btn-light",
          denyButton: "btn btn-danger",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const url = this.$store.state.urlBase + "/api/order/inbox/" + row.id;
          axios({
            method: "delete",
            url: url,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
            const result = response;
            if (result) {
              this.$swal({
                icon: "success",
                title: "ลบข้อมูลสำเร็จ",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500,
              });
              this.loadData();
            } else {
              this.$swal({
                icon: "error",
                title: "ลบข้อมูลไม่สำเร็จ",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 1500,
              });
            }
          });
        }
      });
    },

    getUrgentAmount() {
      this.$store.commit("getUrgentAmount");

      // const url = this.$store.state.urlBase + "/api/order/total-very-urgent";
      // ofetch(url).then((response) => {
      //   const urgentAmount = response?.amount_new_order ?? 0;
      //   const orderIds = response?.very_urgent_order_id ?? {};

      //   this.$store.commit("setUrgentAmount", urgentAmount);
      //   this.$store.commit("setUrgentOrderIds", orderIds);
      // });
    },
    onCheckIn() {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal({
          title: "Please select the Order.",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        this.$swal
          .fire({
            title: "Do you want to Check in?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
            },
          })
          .then((result) => {
            if (result.isConfirmed) {
              let ids = "";
              let hns = "";
              this.selectedRows.forEach((element) => {
                if (element["status"] == 0) {
                  ids += element["id"] + ",";
                  hns += element["HN"] + ",";
                }
              });
              if (ids != "") {
                ids = ids.substring(0, ids.length - 1);
                hns = hns.substring(0, hns.length - 1);
                this.updateStatus(ids, 2, null, null).then((res) => {
                  if (res && res !== 9999) {
                    this.$swal({
                      icon: "success",
                      title: "บันทึกสำเร็จ",
                      showConfirmButton: false,
                      showCancelButton: false,
                      timer: 2000,
                    });
                    this.loadData();
                    context.getUrgentAmount();

                    const api = mappingApi("print-label.php");
                    let url = this.$store.state.urlBase + "/api/" + api;
                    url += "?lab=" + ids + "&hn=" + hns;

                    window.open(url, "_blank");
                  } else if (!res && res !== 9999) {
                    this.$swal({
                      icon: "error",
                      title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                      showConfirmButton: false,
                      showCancelButton: false,
                      timer: 2000,
                    });
                  }
                });
              } else {
                this.$swal({
                  icon: "error",
                  title: "ข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 2000,
                });
              }
            }
          });
      }
    },
    async onWaiting() {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal({
          title: "Please select the Order.",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        let selRows = this.selectedRows;
        let ids = "";
        selRows.forEach((element) => {
          if (element["status"] == 0) {
            ids += element["id"] + ",";
          }
        });
        if (ids == "") {
          this.$swal({
            icon: "error",
            title: "ข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });
        } else {
          ids = ids.substring(0, ids.length - 1);
          let context = this;
          let reasonId = 0;
          let reasonText = null;
          this.$swal({
            title: "Please specify the reasons",
            input: "select",
            inputOptions: this.reasonWaiting,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: "Specify it by yourself",
            cancelButtonText: "Cancel",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
              denyButton: "btn btn-danger",
            },
          }).then(function (result) {
            if (result.isConfirmed) {
              reasonId = result.value;
              context.updateStatus(ids, 1, reasonId, reasonText).then((res) => {
                if (res && res !== 9999) {
                  context.$swal({
                    icon: "success",
                    title: "บันทึกสำเร็จ",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                  });
                  context.loadData();
                  context.getUrgentAmount();
                } else if (!res && res !== 9999) {
                  context.$swal({
                    icon: "error",
                    title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1500,
                  });
                }
              });
            } else if (result.isDenied) {
              context
                .$swal({
                  title: "Please specify the reasons",
                  input: "textarea",
                  inputPlaceholder: "speicfy reasons...",
                  inputAttributes: {
                    "aria-label": "Specify reasons",
                  },
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  cancelButtonText: "Cancel",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-default",
                    cancelButton: "btn btn-light",
                  },
                })
                .then(function (result) {
                  if (result.isConfirmed) {
                    reasonId = 0;
                    reasonText = result.value;
                    context
                      .updateStatus(ids, 1, reasonId, reasonText)
                      .then((res) => {
                        if (res && res !== 9999) {
                          context.$swal({
                            icon: "success",
                            title: "บันทึกสำเร็จ",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1500,
                          });
                          context.loadData();
                          context.getUrgentAmount();
                        } else if (!res && res !== 9999) {
                          context.$swal({
                            icon: "error",
                            title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1500,
                          });
                        }
                      });
                  }
                });
            }
          });
        }
      }
    },
    async onReject() {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal({
          title: "Please select the Order.",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        let selRows = this.selectedRows;
        let ids = "";
        selRows.forEach((element) => {
          if (element["status"] == 0) {
            ids += element["id"] + ",";
          }
        });
        if (ids == "") {
          this.$swal({
            icon: "error",
            title: "ข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });
        } else {
          ids = ids.substring(0, ids.length - 1);
          let context = this;
          let reasonId = 0;
          let reasonText = null;
          this.$swal({
            title: "Please specify the reasons",
            input: "select",
            inputOptions: this.reasonReject,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: "Specify it by yourself",
            cancelButtonText: "Cancel",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
              denyButton: "btn btn-danger",
            },
          }).then(function (result) {
            if (result.isConfirmed) {
              reasonId = result.value;
              context
                .updateStatus(ids, -1, reasonId, reasonText)
                .then((res) => {
                  if (res && res !== 9999) {
                    context.$swal({
                      icon: "success",
                      title: "บันทึกสำเร็จ",
                      showConfirmButton: false,
                      showCancelButton: false,
                      timer: 1500,
                    });
                    context.loadData();
                    context.getUrgentAmount();
                  } else if (!res && res !== 9999) {
                    context.$swal({
                      icon: "error",
                      title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                      showConfirmButton: false,
                      showCancelButton: false,
                      timer: 1500,
                    });
                  }
                });
            } else if (result.isDenied) {
              context
                .$swal({
                  title: "Please specify the reasons",
                  input: "textarea",
                  inputPlaceholder: "specify reasons...",
                  inputAttributes: {
                    "aria-label": "specify reasons",
                  },
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  cancelButtonText: "Cancel",
                  buttonsStyling: false,
                  customClass: {
                    confirmButton: "btn btn-default",
                    cancelButton: "btn btn-light",
                  },
                })
                .then(function (result) {
                  if (result.isConfirmed) {
                    reasonId = 0;
                    reasonText = result.value;
                    context
                      .updateStatus(ids, -1, reasonId, reasonText)
                      .then((res) => {
                        if (res && res !== 9999) {
                          context.$swal({
                            icon: "success",
                            title: "บันทึกสำเร็จ",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1500,
                          });
                          context.loadData();
                          context.getUrgentAmount();
                        } else if (!res && res !== 9999) {
                          context.$swal({
                            icon: "error",
                            title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1500,
                          });
                        }
                      });
                  }
                });
            }
          });
        }
      }
    },
    onCancel() {
      if (this.selectedRows == null || this.selectedRows.length == 0)
        this.$swal({
          title: "Please select the Order.",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        let selRows = this.selectedRows;
        let ids = "";
        selRows.forEach((element) => {
          if (element["status"] == 0) {
            ids += element["id"] + ",";
          }
        });
        if (ids == "") {
          this.$swal({
            icon: "error",
            title: "ข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1500,
          });
        } else {
          ids = ids.substring(0, ids.length - 1);
          let context = this;
          let reasonId = 0;
          let reasonText = null;
          this.$swal
            .fire({
              title: "Please specify the reasons",
              input: "select",
              inputOptions: this.reasonReject,
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: "Save",
              denyButtonText: "Specify it by yourself",
              cancelButtonText: "Cancel",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-default",
                cancelButton: "btn btn-light",
                denyButton: "btn btn-danger",
              },
            })
            .then((result) => {
              if (result.isConfirmed) {
                let ids = "";
                this.selectedRows.forEach((element) => {
                  if (element["status"] == 0 || element["status"] == 1) {
                    ids += element["id"] + ",";
                  }
                });
                if (ids != "") {
                  ids = ids.substring(0, ids.length - 1);
                  context.updateStatus(ids, -2, null, null).then((res) => {
                    if (res && res !== 9999) {
                      context.$swal({
                        icon: "success",
                        title: "บันทึกสำเร็จ",
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 1500,
                      });
                      context.loadData();
                      context.getUrgentAmount();
                    } else if (!res && res !== 9999) {
                      context.$swal({
                        icon: "error",
                        title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                        showConfirmButton: false,
                        showCancelButton: false,
                        timer: 1500,
                      });
                    }
                  });
                } else {
                  this.$swal("ข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้งค่ะ");
                }
                this.loadData();
              } else if (result.isDenied) {
                context
                  .$swal({
                    title: "Please specify the reasons",
                    input: "textarea",
                    inputPlaceholder: "specify reasons...",
                    inputAttributes: {
                      "aria-label": "specify reasons",
                    },
                    showCancelButton: true,
                    confirmButtonText: "Save",
                    cancelButtonText: "Cancel",
                    buttonsStyling: false,
                    customClass: {
                      confirmButton: "btn btn-default",
                      cancelButton: "btn btn-light",
                    },
                  })
                  .then(function (result) {
                    if (result.isConfirmed) {
                      reasonId = 0;
                      reasonText = result.value;
                      context
                        .updateStatus(ids, -2, reasonId, reasonText)
                        .then((res) => {
                          if (res && res !== 9999) {
                            context.$swal({
                              icon: "success",
                              title: "บันทึกสำเร็จ",
                              showConfirmButton: false,
                              showCancelButton: false,
                              timer: 1500,
                            });
                            context.loadData();
                            context.getUrgentAmount();
                          } else if (!res && res !== 9999) {
                            context.$swal({
                              icon: "error",
                              title: "บันทึกข้อมูลผิดพลาด กรุณาลองใหม่อีกครั้ง",
                              showConfirmButton: false,
                              showCancelButton: false,
                              timer: 1500,
                            });
                          }
                        });
                    }
                  });
              }
            });
        }
      }
    },

    exportData() {
      const api = mappingApi("export-worklist.php");
      const queryParam =
        "dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        "&specimen=" +
        this.selectedSpecimen +
        "&status=" +
        this.selectedTabStatus;
      const url = `${this.$store.state.urlBase}/${api}?${queryParam}`;

      window.open(url, "_blank");

      // const api = mappingApi("inbox.php");
      // const url = this.$store.state.urlBase + "/api/" + api + "?export=true";

      // axios(
      //   {
      //     method: "post",
      //     url: url,
      //     headers: { "Content-Type": "multipart/form-data" },
      //   },
      //   { fileName: "inbox.csv" },
      //   { responseType: "blob" }
      // ).then((response) => {
      //   const url = URL.createObjectURL(
      //     new Blob([response], {
      //       type: "application/csv",
      //     })
      //   );
      //   const link = document.createElement("a");
      //   link.href = url;
      //   link.setAttribute("download", "inbox.csv");
      //   document.body.appendChild(link);
      //   link.click();
      // });
    },
    onSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    handleCurrentChange(val) {
      this.currentRow = val;

      this.openManualOrderFormModal(val);

      this.wardComment = val["COMMENT_WARD"];
      this.labComment = val["COMMENT_LAB"];
    },
    loadPreData() {
      this.loadCategoryData();
      this.loadTestPrimaryData();
      this.loadSpecimenData();
      this.loadBodySiteData();
    },
    loadData() {
      //use fetch from search function
      this.searchFrom();

      /*const url = this.$store.state.urlBase + '/api/inbox.php';
      axios({
        method: 'post',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        const result = response;
        if (result) {
          let tmpTableDataInbox = [];
          let tmpTableDataCheckIn = [];
          let tmpTableDataWaiting = [];
          let tmpTableDataReject = [];
          let tmpTableDataCancel = [];
          result.forEach((element) => {
            switch (parseInt(element['status'])) {
              case 0:
                tmpTableDataInbox.push(element);
                break;
              case 1:
                tmpTableDataWaiting.push(element);
                break;
              case 2:
                tmpTableDataCheckIn.push(element);
                break;
              case -1:
                tmpTableDataReject.push(element);
                break;
              case -2:
                tmpTableDataCancel.push(element);
                break;
            }
          });
          this.tableDataInbox = tmpTableDataInbox;
          this.tableDataCheckIn = tmpTableDataCheckIn;
          this.tableDataWaiting = tmpTableDataWaiting;
          this.tableDataReject = tmpTableDataReject;
          this.tableDataCancel = tmpTableDataCancel;

          if (this.tableType == 0) {
            this.tableData = this.tableDataInbox;
          } else if (this.tableType == 1) {
            this.tableData = this.tableDataWaiting;
          } else if (this.tableType == 2) {
            this.tableData = this.tableDataCheckIn;
          } else if (this.tableType == -1) {
            this.tableData = this.tableDataReject;
          } else if (this.tableType == -2) {
            this.tableData = this.tableDataCancel;
          }
        }
      });*/
    },
    searchFrom() {
      const api = mappingApi("inbox.php");
      const url =
        this.$store.state.urlBase +
        "/api/" +
        api +
        "?data=searchInbox&dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        "&category=" +
        this.selectedCategory +
        "&primarytest=" +
        this.selectedPrimaryTest +
        "&specimen=" +
        this.selectedSpecimen +
        "&searchText=" +
        this.searchText;

      //console.log(url);
      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;

        //console.log(result);
        if (result) {
          let tmpTableDataInbox = [];
          let tmpTableDataCheckIn = [];
          let tmpTableDataWaiting = [];
          let tmpTableDataReject = [];
          let tmpTableDataCancel = [];
          result.forEach((element) => {
            switch (parseInt(element["status"])) {
              case 0:
                tmpTableDataInbox.push(element);
                break;
              case 1:
                tmpTableDataWaiting.push(element);
                break;
              case 2:
                tmpTableDataCheckIn.push(element);
                break;
              case -1:
                tmpTableDataReject.push(element);
                break;
              case -2:
                tmpTableDataCancel.push(element);
                break;
            }
          });
          this.tableDataInbox = tmpTableDataInbox;
          this.tableDataCheckIn = tmpTableDataCheckIn;
          this.tableDataWaiting = tmpTableDataWaiting;
          this.tableDataReject = tmpTableDataReject;
          this.tableDataCancel = tmpTableDataCancel;

          if (this.tableType == 0) {
            this.tableData = this.tableDataInbox;
          } else if (this.tableType == 1) {
            this.tableData = this.tableDataWaiting;
          } else if (this.tableType == 2) {
            this.tableData = this.tableDataCheckIn;
          } else if (this.tableType == -1) {
            this.tableData = this.tableDataReject;
          } else if (this.tableType == -2) {
            this.tableData = this.tableDataCancel;
          }
        }
      });
    },
    loadCategoryData() {
      const api = mappingApi("data_category.php");
      const url = this.$store.state.urlBase + "/api/" + api + "?data=reason";
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
      const api = mappingApi("data_test_primary.php");
      const url = this.$store.state.urlBase + "/api/" + api + "?data=list";
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
      const api = mappingApi("data_specimen.php");
      const url = this.$store.state.urlBase + "/api/" + api + "?data=list";

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
      const api = mappingApi("data_body_site.php");
      const url = this.$store.state.urlBase + "/api/" + api + "?data=list";
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
    loadReasonData() {
      const api = mappingApi("inbox.php");
      const url = this.$store.state.urlBase + "/api/" + api + "?data=reason";
      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result) {
          let tmpTableWaitingData = [];
          let tmpTableRejectData = [];
          let tmpTableCancelData = [];
          result.forEach((element) => {
            if (element["IS_WAITING"] == 1) {
              tmpTableWaitingData[element["ID"]] = element["NAME"];
            }
            if (element["IS_REJECT"] == 1) {
              tmpTableRejectData[element["ID"]] = element["NAME"];
            }
            if (element["IS_CANCEL"] == 1) {
              tmpTableCancelData[element["ID"]] = element["NAME"];
            }
          });

          this.reasonWaiting = tmpTableWaitingData;
          this.reasonReject = tmpTableRejectData;
          this.reasonCancel = tmpTableCancelData;
          this.reasonData = result;
        }
      });
    },
    updateStatus(orderId, status, reasonId, reasonText) {
      //orderId = parseInt(orderId);
      if (status <= 2) {
        const api = mappingApi("inbox.php");
        const url = this.$store.state.urlBase + "/api/" + api;

        const FormData = require("form-data");
        const formData = new FormData();
        formData.append("id", orderId);
        formData.append("status", status);
        if (status == 1) {
          if (reasonId !== 0) {
            formData.append("reasonid", reasonId);
          }
        } else {
          formData.append("reasonid", reasonId);
        }
        formData.append("text", reasonText);

        return axios({
          method: "post",
          url: url,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          const result = response;
          if (result["status"] == "success") {
            return true;
          } else {
            return false;
          }
        });
      }

      return 9999;
    },
    updatePrimaryTest() {
      const api = mappingApi("data_test_primary.php");
      const url = this.$store.state.urlBase + "/api/" + api;
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("id", this.currentRow.id);
      formData.append("TEST_PRIMARY_ID", this.currentRow.TEST_PRIMARY_ID);

      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result["status"] == "success") {
          this.$notify({
            type: "success",
            message: "บันทึก Primary Test สำเร็จ",
          });
        } else {
          this.$swal("บันทึกผิดพลาด กรุณาตรวจสอบข้อมูลค่ะ");
        }
      });
    },
    updateBodySite() {
      const api = mappingApi("data_body_site.php");
      const url = this.$store.state.urlBase + "/api/" + api;
      const FormData = require("form-data");
      const formData = new FormData();
      formData.append("id", this.currentRow.id);
      formData.append("BODY_SITE_ID", this.currentRow.BODY_SITE_ID);

      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result["status"] == "success") {
          this.$notify({ type: "success", message: "บันทึก Body Site สำเร็จ" });
        } else {
          this.$swal("บันทึกผิดพลาด กรุณาตรวจสอบข้อมูลค่ะ");
        }
      });
    },
    saveLabCase() {
      const api = mappingApi("inbox.php");
      const url = this.$store.state.urlBase + "/api/" + api;
      if (this.currentRow != null) {
        const FormData = require("form-data");
        const formData = new FormData();
        formData.append("id", this.currentRow.id);
        formData.append("COMMENT_WARD", this.wardComment);
        formData.append("COMMENT_LAB", this.labComment);
        formData.append("SPECIMEN_ID", this.currentRow.SPECIMEN_ID);
        formData.append("TEST_PRIMARY_ID", this.currentRow.TEST_PRIMARY_ID);
        formData.append("BODY_SITE_ID", this.currentRow.BODY_SITE_ID);

        axios({
          method: "post",
          url: url,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          const result = response;
          if (result["status"] == "success") {
            this.searchFrom();

            //this.$notify({type: 'success', message: 'บันทึก Comment สำเร็จ'})
            this.$swal("Save data successfully");
          } else {
            this.$swal("Save data unsuccessfully");
          }
        });
      } else {
        this.$swal("Please select lab case before save");
      }
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // getRole() {

    //   const url =
    //     this.$store.state.urlBase +
    //     "api/sys_role.php?data=getrole" +
    //     "&roleId=1";
    //   axios
    //     .get(url)
    //     .then((response) => {
    //       const result = response;
    //       this.Allow_CheckIn = parseInt(result["ALLOW_CHECKIN"]);
    //       console.log(this.Allow_CheckIn);
    //     })
    //     .catch(function (error) {
    //       // handle error
    //       console.log(error);
    //     })
    //     .then(function () {
    //       // always executed
    //     });
    // },
  },
  watch: {
    permissions: function (val) {
      if (val.length !== 0 && !this.canCheckIn) {
        this.$router.push("/dashboard");
      }
    },
    canCheckIn: function (val) {
      if (!val && this.permissions.length !== 0) {
        this.$router.push("/dashboard");
      }
    },
  },
  computed: {
    ...mapState(["permissions"]),
    canCheckIn() {
      return this.permissions.some(
        (permission) => permission.permission_id === 1
      );
    },
    canEditOrderData() {
      return this.permissions.some(
        (permission) => permission.permission_id === 3
      );
    },
  },
};
</script>
<style scoped>
.active-tab {
  color: #ffffff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-color: #172b4d;
  font-weight: bold;
}
.tab {
  cursor: pointer;
}
.tab-table {
  cursor: pointer;
  border: 1px solid #535f7d !important;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
</style>
