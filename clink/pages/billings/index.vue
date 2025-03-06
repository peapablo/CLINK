<template>
  <div>
    <modal
      :show.sync="openUpdateCustomerId"
      @close="onCancelEditCustomer"
      size="lg"
    >
      <div class="row mb-4">
        <button
          type="button"
          class="swal2-close"
          aria-label="Close this dialog"
          style="display: flex; top: 20px; right: 20px"
          @click="onCancelEditCustomer"
          :disabled="isSubmittingCustomerId"
        >
          ×
        </button>

        <div class="col-12">
          <div class="p-3 bg-white">
            <div class="row">
              <h1 class="text-center">Update Client</h1>
            </div>
          </div>
        </div>

        <div class="col-12">
          <base-input>
            <el-select v-model="selectedCustomerId" placeholder="Select Client">
              <el-option
                v-for="item in selectData.clientData"
                :key="item.id"
                :label="item.business_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </base-input>
        </div>

        <div class="col-12 my-4">
          <div
            class="d-flex flex-row align-items-center justify-content-center"
            style="column-gap: 12px"
          >
            <base-button
              class=""
              icon
              type="default"
              @click="onSaveEditCustomer"
              :disabled="isSubmittingCustomerId"
            >
              <span class="btn-inner--icon">
                <i class="ni ni-send"></i>
              </span>
              <span class="btn-inner--text">{{
                isSubmittingCustomerId ? "Saving..." : "Save"
              }}</span>
            </base-button>

            <base-button
              class=""
              icon
              type="secondary"
              @close="onCancelEditCustomer"
              :disabled="isSubmittingCustomerId"
            >
              <span class="btn-inner--text">Cancel</span>
            </base-button>
          </div>
        </div>
      </div>
    </modal>

    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl">
            <h1 class="text-white mb-0">Billing List</h1>
          </div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/billings" />
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="row align-items-end">
        <div class="col-12 col-lg-2">
          <base-input label="Date Accept from">
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
          <base-input label="Date Accept to">
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
          <base-input label="Test Status">
            <el-select
              placeholder="Test Status"
              v-model="selectedTestStatusFilter"
            >
              <el-option label="All" value=""></el-option>
              <el-option
                v-for="item in selectData.testStatusData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Category">
            <el-select placeholder="Category" v-model="selectedCategoryFilter">
              <el-option label="All" value=""></el-option>
              <el-option
                v-for="item in selectData.categoryData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="d-none d-lg-block col-4"></div>

        <div class="col-12 col-lg-2">
          <base-input label="Specimen">
            <el-select placeholder="Specimen" v-model="selectedSpecimenFilter">
              <el-option label="All" value=""></el-option>
              <el-option
                v-for="item in selectData.specimenData"
                :key="item.ID"
                :label="item.NAME"
                :value="item.ID"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Client">
            <el-select placeholder="Client" v-model="selectedClientFilter">
              <el-option label="All" value=""></el-option>
              <el-option
                v-for="item in selectData.clientData"
                :key="item.id"
                :label="item.business_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </base-input>
        </div>
        <div class="col-12 col-lg-2">
          <base-input label="Billing Status">
            <el-select
              placeholder="Billing Status"
              v-model="selectedStatusFilter"
            >
              <el-option label="All" value=""></el-option>
              <el-option
                v-for="item in selectData.statusData"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
        <div class="col-12 col-lg-1">
          <base-button
            icon
            type="default"
            @click="onConfirmSearch"
            class="d-inline-block"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-search"></i>
            </span>
          </base-button>
        </div>
        <!-- <div class="col-12 col-lg-2">
          <base-button
            icon
            type="default"
            @click="onConfirmSearch"
            class="d-inline-block"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-file-export"></i>
              Export Excel
            </span>
          </base-button>
        </div> -->
      </div>

      <div
        v-if="canEditBilling"
        class="my-3 px-0 d-flex flex-row justify-content-end align-items-center"
      >
        <base-button
          class="ml-0"
          icon
          type="default"
          :disabled="selectedRows.length === 0 || isSubmittingMainAction"
          @click="onCreateQuotation"
        >
          <span class="btn-inner--icon">
            <i class="fas fa-printni fa-print"></i>
          </span>
          <span class="btn-inner--text">Create Quotation</span>
        </base-button>

        <base-button
          icon
          type="default"
          :disabled="selectedRows.length === 0 || isSubmittingMainAction"
          @click="onCreateInvoice"
        >
          <span class="btn-inner--icon">
            <i class="fas fa-printni fa-print"></i>
          </span>
          <span class="btn-inner--text">Create Invoice</span>
        </base-button>
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
          <el-table-column label="Date" prop="date" sortable width="auto">
            <template v-slot="{ row }">
              <b>{{ row.date_create }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Lab No." prop="labNo" width="auto">
            <template slot-scope="{ $index, row }">
              <b>{{ row.LAB_NO }}</b>
            </template>
          </el-table-column>
          <el-table-column label="HN" prop="hn" width="auto">
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
          <el-table-column label="Name" prop="name" width="auto">
            <template v-slot="{ row }">
              <b>{{ row.FIRST_NAME }} {{ row.LAST_NAME }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Category" prop="CATEGORY_NAME" width="auto">
            <template v-slot="{ row }">
              <b>{{ generateCategoryText(row.CATEGORY_ID) }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Specimen" prop="SPECIMEN_NAME" width="auto">
            <template v-slot="{ row }">
              <b>{{ generateSpecimentText(row.SPECIMEN_ID) }}</b>
            </template>
          </el-table-column>
          <el-table-column label="Client Name" prop="client" width="auto">
            <template v-slot="{ row }">
              <a
                class="mr-2"
                style="cursor: pointer"
                @click="onEditCustomer(row)"
              >
                <i class="far fa-edit" style="color: #2c7ef9"></i>
              </a>
              <b
                :class="{
                  'text-danger': !!!generateClientText(row.CUSTOMER_ID),
                }"
                >{{
                  !!generateClientText(row.CUSTOMER_ID)
                    ? generateClientText(row.CUSTOMER_ID)
                    : "ไม่ระบุ"
                }}</b
              >
            </template>
          </el-table-column>
          <el-table-column label="Status" prop="status" width="auto">
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
          <el-table-column label="Quotation" prop="quotation" width="auto">
            <template v-slot="{ row }">
              <div v-if="row.quotation_number && !row.isSiblingQuotation">
                <b
                  style="color: #2c7ef9; cursor: pointer"
                  @click="onOpenQuotation(row.quotation_number)"
                  >{{ row.quotation_number }}</b
                >
                <a
                  v-if="canEditBilling"
                  :class="{
                    'text-danger mx-2': true,
                    'd-none': row.invoice_number,
                  }"
                  style="cursor: pointer; font-size: 18px"
                  @click="onDeleteQuotation(row)"
                >
                  x
                </a>
              </div>

              <div
                style="padding-left: 25px; cursor: pointer"
                v-if="row.quotation_number && row.isSiblingQuotation"
                @click="onOpenQuotation(row.quotation_number)"
              >
                <i class="fas fa-link"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Invoice" prop="invoice" width="auto">
            <template v-slot="{ row }">
              <div v-if="row.invoice_number && !row.isSiblingInvoice">
                <b
                  style="color: #2c7ef9; cursor: pointer"
                  @click="onOpenInvoice(row.invoice_number)"
                  >{{ row.invoice_number }}</b
                >
                <a
                  v-if="canEditBilling"
                  :class="{
                    'text-danger mx-2': true,
                    'd-none': !row.invoice_number,
                  }"
                  style="cursor: pointer; font-size: 18px"
                  @click="onDeleteInvoice(row)"
                >
                  x
                </a>
              </div>

              <div
                style="padding-left: 25px; cursor: pointer"
                v-if="row.invoice_number && row.isSiblingInvoice"
                @click="onOpenInvoice(row.invoice_number)"
              >
                <i class="fas fa-link"></i>
              </div>
            </template> </el-table-column
        ></el-table>
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
          <div class="">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

              <span v-if="selectedRows.length">
                &nbsp; &nbsp; {{ selectedRows.length }} rows selected
              </span>
            </p>
          </div>
          <base-pagination
            class="pagination-no-border"
            v-model="pagination.currentPage"
            :per-page="pagination.perPage"
            :total="total"
          >
          </base-pagination>
        </div>
        <div class="col-12 mb-3" v-if="canEditBilling">
          <base-button
            icon
            type="default"
            :disabled="selectedRows.length === 0 || isSubmittingMainAction"
            @click="onCreateQuotation"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-printni fa-print"></i>
            </span>
            <span class="btn-inner--text">Create Quotation</span>
          </base-button>

          <base-button
            icon
            type="default"
            :disabled="selectedRows.length === 0 || isSubmittingMainAction"
            @click="onCreateInvoice"
          >
            <span class="btn-inner--icon">
              <i class="fas fa-printni fa-print"></i>
            </span>
            <span class="btn-inner--text">Create Invoice</span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import FavoriteButton from "../components/favorite-button.vue";
import { Modal, BaseAlert, BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import axios from "axios";
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
import { mappingApi } from "@/util/mappingApi";
import { mapState } from "vuex";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "billings",
  components: {
    FavoriteButton,
    Modal,
    BaseAlert,
    BasePagination,
    flatPicker,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Dropdown.name]: Dropdown,
    [Tooltip.name]: Tooltip,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      userPermissions: [],
      polling: null,

      // Update Customer ID State
      isSubmittingCustomerId: false,
      openUpdateCustomerId: false,
      selectedToUpdateCustomerId: null,
      selectedCustomerId: null,

      // UI State
      isSubmittingMainAction: false,
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      // Select Data
      selectData: {
        testStatusData: [
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
        statusData: [],
        categoryData: [],
        specimenData: [],
        clientData: [],
        statusData: [
          {
            label: "Quoted",
            value: "quoted",
          },
          {
            label: "Issued Invoice",
            value: "invoiced",
          },
        ],
      },
      // Filter State
      dateFromFilter: moment().subtract(30, "days").format("YYYY-MM-DD"),
      dateFrom: moment().subtract(30, "days").format("YYYY-MM-DD"),
      dateToFilter: moment().format("YYYY-MM-DD"),
      dateTo: moment().format("YYYY-MM-DD"),
      selectedTestStatusFilter: "",
      selectedTestStatus: "",
      selectedCategoryFilter: "",
      selectedCategory: "",
      selectedSpecimenFilter: "",
      selectedSpecimen: "",
      selectedClientFilter: "",
      selectedClient: "",
      selectedStatusFilter: null,
      selectedStatus: null,
      searchText: "",
      confirmSearchText: "",
      // Data
      allTableData: [],
      tableData: [],
      selectedRows: [],
    };
  },
  mounted() {
    clearInterval(this.polling);
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken == null) {
      this.$router.push("/login");
    }

    this.getSpecimen();
    this.getClients();
    this.getCategory();
    this.loadData();
    this.getUserPermissions();

    this.polling = setInterval(() => {
      if (
        this.$store.state.accessToken !== null &&
        this.selectedRows.length === 0
      ) {
        this.loadData();
      }
    }, 5000);
  },
  methods: {
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
    getCategory() {
      const api = mappingApi("data_category.php");
      const queryParam = "data=reason";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.selectData.categoryData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getClients() {
      const url = `${this.$store.state.urlBase}/api/customers`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result !== null) {
          let tmpTableData = result;
          this.selectData.clientData = tmpTableData;
        }
      });
    },
    onChangeSearchText(event) {
      this.searchText = event.target.value;
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    onConfirmSearch() {
      this.dateFrom = this.dateFromFilter;
      this.dateTo = this.dateToFilter;
      this.selectedTestStatus = this.selectedTestStatusFilter;
      this.selectedSpecimen = this.selectedSpecimenFilter;
      this.selectedClient = this.selectedClientFilter;
      this.selectedCategory = this.selectedCategoryFilter;
      this.selectedStatus = this.selectedStatusFilter;
      this.searchText = this.confirmSearchText;
      this.loadData();
    },
    onEditCustomer(row) {
      this.selectedToUpdateCustomerId = row;
      this.selectedCustomerId = row.CUSTOMER_ID;
      this.openUpdateCustomerId = true;
    },
    onCancelEditCustomer() {
      this.openUpdateCustomerId = false;
    },
    onSaveEditCustomer() {
      const url =
        this.$store.state.urlBase +
        "/api/order/inbox/" +
        this.selectedToUpdateCustomerId.ID;
      const formData = new FormData();
      formData.append("CUSTOMER_ID", this.selectedCustomerId);

      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          this.openUpdateCustomerId = false;
          this.loadData();
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Edit Client Failed",
              text: error.response.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Edit Client Failed",
              text: "An error occurred while editing the client.",
            });
          }
        })
        .finally(() => {
          this.isSubmittingCustomerId = false;
        });
    },
    generateCategoryText(categoryId) {
      let finded = this.selectData.categoryData.find(
        (item) => item.ID === categoryId
      );
      let categoryText = finded ? finded.NAME : "";

      return categoryText;
    },
    generateSpecimentText(specimenId) {
      let finded = this.selectData.specimenData.find(
        (item) => item.ID === specimenId
      );
      let specimenText = finded ? finded.NAME : "";

      return specimenText;
    },
    generateClientText(clientId) {
      let finded = this.selectData.clientData.find(
        (item) => item.id === clientId
      );
      let clientText = finded ? finded.business_name : null;

      return clientText;
    },
    onCreateQuotation() {
      const url = `${this.$store.state.urlBase}/api/quotations`;

      const isOneOfSelectedAlreadyHaveQuotation = this.selectedRows.some(
        (row) => row.quotation_number
      );
      if (isOneOfSelectedAlreadyHaveQuotation) {
        Swal.fire({
          icon: "error",
          title: "Create Quotation Failed",
          text: "Please select only the list which is not yet create the quotation",
        });
        return;
      }

      const isOneOfSelectedDontHaveClient = this.selectedRows.some(
        (row) => !row.CUSTOMER_ID
      );
      if (isOneOfSelectedDontHaveClient) {
        Swal.fire({
          icon: "error",
          title: "Create Quotation Failed",
          text: "Please select only the list which already identified the client name.",
        });
        return;
      }

      const isEverySelectedArentSameClient = this.selectedRows.every(
        (row) => row.CUSTOMER_ID === this.selectedRows[0].CUSTOMER_ID
      );
      if (!isEverySelectedArentSameClient) {
        Swal.fire({
          icon: "error",
          title: "Create Quotation Failed",
          text: "Please select only the list which has the same client",
        });
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create quotation for selected items?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          this.selectedRows.forEach((row) => {
            formData.append("lab_order_id[]", row.ID);
          });

          this.isSubmittingMainAction = true;

          axios({
            method: "post",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Quotation created successfully.",
              }).then(() => {
                this.loadData();
              });
            })
            .catch((error) => {
              if (error.response.message) {
                Swal.fire({
                  icon: "error",
                  title: "Create Quotation Failed",
                  text: Object.values(error.response.errors)
                    .map((item) => item[0])
                    .join(", "),
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Create Quotation Failed",
                  text: "An error occurred while creating the quotation.",
                });
              }
            })
            .finally(() => {
              this.isSubmittingMainAction = false;
            });
        }
      });
    },
    onCreateInvoice() {
      const url = `${this.$store.state.urlBase}/api/invoices`;

      const isOneOfSelectedAlreadyHaveInvoice = this.selectedRows.some(
        (row) => row.invoice_number
      );
      if (isOneOfSelectedAlreadyHaveInvoice) {
        Swal.fire({
          icon: "error",
          title: "Create Invoice Failed",
          text: "Please select only the list which is not yet create the invoice.",
        });
        return;
      }

      const isOneOfSelectedDoesntHaveQuotation = this.selectedRows.some(
        (row) => !row.quotation_number
      );
      if (isOneOfSelectedDoesntHaveQuotation) {
        Swal.fire({
          icon: "error",
          title: "Create Invoice Failed",
          text: "Please select only the list which has already created the Quotation.",
        });
        return;
      }

      const isEverySelectedArentSameClient = this.selectedRows.every(
        (row) => row.CUSTOMER_ID === this.selectedRows[0].CUSTOMER_ID
      );
      if (!isEverySelectedArentSameClient) {
        Swal.fire({
          icon: "error",
          title: "Create Invoice Failed",
          text: "Please select only the list which has the same client",
        });
        return;
      }

      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to create invoice for selected items?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          this.selectedRows.forEach((row) => {
            formData.append("lab_order_id[]", row.ID);
          });

          this.isSubmittingMainAction = true;

          axios({
            method: "post",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Invoice created successfully.",
              }).then(() => {
                this.loadData();
              });
            })
            .catch((error) => {
              if (error.response.message) {
                Swal.fire({
                  icon: "error",
                  title: "Create invoice failed",
                  text: Object.values(error.response.errors)
                    .map((item) => item[0])
                    .join(", "),
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Create invoice failed",
                  text: "An error occurred while creating the invoice.",
                });
              }
            })
            .finally(() => {
              this.isSubmittingMainAction = false;
            });
        }
      });
    },
    onDeleteQuotation(selectedRow) {
      const { ID, quotation_number, quotation_siblings } = selectedRow;

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete quotation ${quotation_number}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${this.$store.state.urlBase}/api/quotations/${quotation_number}`;

          const formData = new FormData();
          formData.append("lab_order_id[]", ID);
          quotation_siblings.forEach((sibling) => {
            formData.append("lab_order_id[]", sibling.lab_order_id);
          });

          this.isSubmittingMainAction = true;
          axios({
            method: "delete",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Quotation deleted successfully.",
              }).then(() => {
                this.loadData();
              });
            })
            .catch((error) => {
              if (error.response.message) {
                Swal.fire({
                  icon: "error",
                  title: "Delete Quotation Failed",
                  text: Object.values(error.response.errors)
                    .map((item) => item[0])
                    .join(", "),
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Delete Quotation Failed",
                  text: "An error occurred while deleting the quotation.",
                });
              }
            })
            .finally(() => {
              this.isSubmittingMainAction = false;
            });
        }
      });
    },
    onDeleteInvoice(selectedRow) {
      const { ID, invoice_number, invoice_siblings } = selectedRow;

      Swal.fire({
        title: "Are you sure?",
        text: `Do you want to delete invoice ${invoice_number}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${this.$store.state.urlBase}/api/invoices/${invoice_number}`;

          const formData = new FormData();
          formData.append("lab_order_id[]", ID);
          invoice_siblings.forEach((sibling) => {
            formData.append("lab_order_id[]", sibling.lab_order_id);
          });

          this.isSubmittingMainAction = true;
          axios({
            method: "delete",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Invoice deleted successfully.",
              }).then(() => {
                this.loadData();
              });
            })
            .catch((error) => {
              if (error.response.message) {
                Swal.fire({
                  icon: "error",
                  title: "Delete Invoice Failed",
                  text: Object.values(error.response.errors)
                    .map((item) => item[0])
                    .join(", "),
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Delete Invoice Failed",
                  text: "An error occurred while deleting the invoice.",
                });
              }
            })
            .finally(() => {
              this.isSubmittingMainAction = false;
            });
        }
      });
    },
    onOpenInvoice(invoice_number) {
      const url = `${this.$store.state.urlBase}/invoices/${invoice_number}/view`;
      window.open(url, "_blank");
    },
    onOpenQuotation(quotation_number) {
      const url = `${this.$store.state.urlBase}/quotations/${quotation_number}/view`;
      window.open(url, "_blank");
    },
    getUserPermissions() {
      this.hasLoaded = false;

      const url = this.$store.state.urlBase + "/api/auth/me";

      axios
        .get(url)
        .then((response) => {
          const responseProfile = response ?? {};
          const profileWithoutPermissions = {
            ...responseProfile,
            permissions: [],
          };
          delete profileWithoutPermissions.permissions;

          this.$store.commit("setProfile", profileWithoutPermissions);
          this.$store.commit(
            "setPermissions",
            responseProfile?.permissions ?? []
          );
          this.userPermissions = responseProfile?.permissions ?? [];
        })
        .catch((error) => {
          console.log("getUserPermissions", error);
        });
    },
    loadData() {
      const queryParam =
        "data=searchDate&dateFrom=" +
        this.dateFrom +
        "&dateTo=" +
        this.dateTo +
        "&client=" +
        this.selectedClient +
        "&specimen=" +
        this.selectedSpecimen +
        "&searchText=" +
        this.searchText +
        "&testStatus=" +
        this.selectedTestStatus +
        "&category=" +
        this.selectedCategory +
        "&billingStatus=" +
        this.selectedStatus;

      const url = `${this.$store.state.urlBase}/api/billings?${queryParam}`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result !== null) {
          let tmpTableData = result.reduce((acc, item) => {
            const hasFindedQuotation =
              acc.find(
                (accItem) => accItem.quotation_number === item.quotation_number
              ) !== undefined;
            const hasFindedInvoice =
              acc.find(
                (accItem) => accItem.invoice_number === item.invoice_number
              ) !== undefined;

            acc.push({
              ...item,
              isSiblingQuotation: hasFindedQuotation && item.quotation_number,
              isSiblingInvoice: hasFindedInvoice && item.invoice_number,
            });
            return acc;
          }, []);

          // Separate records with and without quotation_number
          const withQuotation = tmpTableData.filter(
            (item) => item.quotation_number
          );
          const withoutQuotation = tmpTableData.filter(
            (item) => !item.quotation_number
          );

          // Sort the records with quotation_number
          withQuotation.sort((a, b) => {
            const numA = parseInt(
              (a?.quotation_number ?? "").replace(/\D/g, ""),
              10
            );
            const numB = parseInt(
              (b?.quotation_number ?? "").replace(/\D/g, ""),
              10
            );
            return numA - numB;
          });

          // Concatenate sorted records with records without quotation_number
          this.tableData = [...withQuotation, ...withoutQuotation];
        }
      });
    },
  },
  computed: {
    ...mapState(["profile"]),
    canViewBilling() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 13;
      });
    },
    canEditBilling() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 14;
      });
    },
  },
  beforeDestroy() {
    if (this.polling) {
      clearInterval(this.polling);
    }
  },
};
</script>
