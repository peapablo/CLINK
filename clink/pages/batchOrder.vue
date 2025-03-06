<template>
  <div>
    <div class="w-100 border-bottom bg-primary">
      <div class="container-fluid py-3 position-relative">
        <h1 class="text-white">Batch Order</h1>

        <div class="favorite-button-container">
          <favorite-button path="/batchOrder" />
        </div>
        <!--
        <div class="row align-items-center">
          <div class="col-auto mb-3">
            <div class="d-flex flex-row align-items-center">
              <base-input
                label="Select date"
                class="text-white font-weight-bold"
                style="color:white;"
              >
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
              <base-input
                label="Date from"
                class="mx-4 text-white"
                style="color:white;"
              >
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
              &nbsp;&nbsp;
              <base-input label="Round">
                  <el-select
                    placeholder="Round"
                    v-model="searchRound"
                  >
                    <el-option value="1">1</el-option>
                    <el-option value="2">2</el-option>
                    <el-option value="3">3</el-option>
                    <el-option value="4">4</el-option>
                    <el-option value="5">5</el-option>
                    <el-option value="6">6</el-option>
                    <el-option value="7">7</el-option>
                    <el-option value="8">8</el-option>
                    <el-option value="9">9</el-option>
                    <el-option value="10">10</el-option>
                  </el-select>
                </base-input> &nbsp;&nbsp;
              <div>
                <base-button
                  outline
                  icon
                  class="text-white"
                  type="default"
                  style="border:1px solid white;"
                >
                  <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
                  <span class="btn-inner--text">Search</span>
                </base-button>
              </div>
            </div>
          </div>
          <div class="col">
          </div>
        </div>
        -->
      </div>
    </div>

    <div class="w-100 border-bottom">
      <div class="container-fluid py-3">
        <!--
        <div class="row align-items-center mb-4">
          <div class="col-auto py-1">
            <base-button
              icon
              block
              type="default"
            >
              <span class="btn-inner--icon"><i class="fas fa-barcode"></i></span>
              <span class="btn-inner--text">Print Barcode</span>
            </base-button>
          </div>
          <div class="col-auto py-1">
            <base-button
              icon
              block
              type="default"
              @click="saveOrder"
            >
              <span class="btn-inner--icon"><i class="far fa-save"></i></span>
              <span class="btn-inner--text">Save</span>
            </base-button>
          </div>
          <div class="col-auto col-md text-right py-1">
            <base-button
              icon
              outline
              type="default"
            >
              <span class="btn-inner--icon"><i class="fas fa-printni fa-print"></i></span>
            </base-button>
            <base-button
              icon
              outline
              type="default"
              class="mx-4"
            >
              <span class="btn-inner--icon"><i class="fas fa-file-export"></i></span>
              <span class="btn-inner--text">Export</span>
            </base-button>
          </div>
        </div>
        -->
        <div class="row align-items-center">
          <div class="col-12 col-lg-10 py-1">
            <div class="row align-items-end">
              <div class="col-4 col-md">
                <base-input label="Date">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="form.dateOrder"
                  >
                  </flat-picker>
                </base-input>
              </div>
              <div class="col-4 col-md">
                <base-input label="Test">
                  <el-select
                    placeholder="Test"
                    filterable
                    v-model="form.primaryTest"
                  >
                    <el-option
                      v-for="item in select.primaryTestData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-4 col-md">
                <base-input label="Specimen">
                  <el-select
                    placeholder="Specimen"
                    filterable
                    v-model="form.specimen"
                  >
                    <el-option
                      v-for="item in select.specimenData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-4 col-md">
                <base-input label="Location">
                  <el-select
                    placeholder="Location"
                    filterable
                    v-model="form.location"
                  >
                    <el-option
                      v-for="item in select.locationData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-4 col-md">
                <base-input label="Body Site">
                  <el-select
                    placeholder="Body Site"
                    filterable
                    v-model="form.bodySite"
                  >
                    <el-option
                      v-for="item in select.bodySiteData"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-4 col-md">
                <base-input
                  type="number"
                  min="1"
                  max="300"
                  label="Number of Order"
                  placeholder="Number of Order"
                  v-model="form.orderNumber"
                />
              </div>

              <div class="col-4 col-md mb-1">
                <base-button
                  icon
                  block
                  type="default"
                  @click="createBatchOrder"
                >
                  <span class="btn-inner--icon"
                    ><i class="fas fa-plus-circle"></i
                  ></span>
                  <span class="btn-inner--text">Generate</span>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="card">
        <el-table
          class="table-responsive table-flush"
          header-row-class-name="thead-light"
          row-key="index"
          stripe
          :data="tableData"
          ref="singleTable"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" align="left"> </el-table-column>

          <el-table-column label="No." prop="no" width="80"> </el-table-column>
          <el-table-column label="Specimen" prop="specimen"> </el-table-column>
          <el-table-column label="Test" prop="test"> </el-table-column>
          <el-table-column label="HN" width="160">
            <template v-slot="{ row, $index }">
              <base-input
                v-model="row.hn"
                type="text"
                placeholder=""
                :inputClasses="{
                  'border-danger border': isError($index, 'hn'),
                }"
              >
              </base-input>
            </template>
          </el-table-column>
          <!--
          <el-table-column
            label="Edit HN"
            width="130"
          >
            <template slot-scope="{ $index, row }">
              <base-button
                icon
                type="primary"
                :disabled="row.editHN"
                @click="editHN(row , $index)"
              >
                <span class="btn-inner--icon"><i class="fas fa-search"></i></span>
              </base-button>
            </template>

          </el-table-column>
          -->
          <el-table-column label="First name" prop="firstname" width="160">
            <template v-slot="{ row, $index }">
              <base-input
                v-model="row.firstname"
                type="text"
                placeholder=""
                :inputClasses="{
                  'border-danger border': isError($index, 'firstname'),
                }"
              >
              </base-input>
            </template>
          </el-table-column>
          <el-table-column label="Last name" prop="lastname" width="160">
            <template v-slot="{ row, $index }">
              <base-input
                v-model="row.lastname"
                type="text"
                placeholder=""
                :inputClasses="{
                  'border-danger border': isError($index, 'lastname'),
                }"
              >
              </base-input>
            </template>
          </el-table-column>
          <!--
          <el-table-column
            label="Body site"
            prop="bodySite"
          >
          </el-table-column>
          <el-table-column
            label="Location"
            prop="location"
          >
          </el-table-column>
          -->
          <el-table-column label="Client" prop="client" width="200">
            <template v-slot="{ row }">
              <base-input>
                <el-select
                  placeholder=""
                  filterable
                  v-model="row.client"
                  class="w-100"
                >
                  <el-option
                    v-for="item in select.clientList"
                    :key="item.id"
                    :label="item.business_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </base-input>
            </template>
          </el-table-column>
          <el-table-column label="Comment" prop="comment" width="200">
            <template v-slot="{ row }">
              <base-input v-model="row.comment" type="text" placeholder="">
              </base-input>
            </template>
          </el-table-column>
          <el-table-column label="Lab Comment" prop="note" width="200">
            <template v-slot="{ row }">
              <base-input v-model="row.note" type="text" placeholder="">
              </base-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="col-12 mb-3">
        <base-button
          v-if="tableData !== null && tableData.length > 0"
          icon
          type="default"
          @click="saveOrder"
        >
          <span class="btn-inner--icon"><i class="far fa-save"></i></span>
          <span class="btn-inner--text">Save</span>
        </base-button>
        <!--
          <base-button icon outline type="default" @click="printLabel()">
            <span class="btn-inner--icon"
              ><i class="fas fa-printni fa-print"></i
            ></span>
            <span class="btn-inner--text">Label Sticker</span>
          </base-button>
          -->
      </div>
    </div>
  </div>
</template>
<script>
import { Select, Option, Table, TableColumn } from "element-ui";
import FavoriteButton from "./components/favorite-button.vue";
import axios from "axios";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import swal from "sweetalert2";
import { mappingApi } from "@/util/mappingApi";
import { mapState } from "vuex";

export default {
  middleware: "protected",
  layout: "DashboardLayout",
  name: "batchOrder",
  components: {
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    FavoriteButton,
  },
  mounted() {
    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.getLocation();
    this.getBodySite();
    this.getSpecimen();
    this.getClients();
    this.getTestPrimary();
  },
  data() {
    return {
      select: {
        primaryTestData: [],
        locationData: [],
        bodySiteData: [],
        specimenData: [],
        clientList: [],
      },
      form: {
        dateOrder:
          new Date().getFullYear().toString() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate().toString(),
        primaryTest: "",
        location: "",
        bodySite: "",
        specimen: "",
        orderNumber: 1,
      },
      tableData: [],
      errorData: [],
      dateFrom:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      searchRound: null,
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      disabledSubmitButton: false,
    };
  },
  methods: {
    isError(index, field) {
      return this.errorData.find((item) => {
        return item.index === index && item[field];
      });
    },
    saveOrder() {
      let isEmpty = false;

      this.tableData.forEach((item, idx) => {
        if (item.hn === "" || item.firstname === "" || item.lastname === "") {
          isEmpty = true;
          this.errorData.push({
            index: idx,
            hn: item.hn === "",
            firstname: item.firstname === "",
            lastname: item.lastname === "",
          });
        }
      });

      if (isEmpty) {
        swal.fire({
          title: "Please fill HN, First name and Last name",
          icon: "error",
          confirmButtonText: "Confirm",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
            cancelButton: "btn btn-light",
          },
        });
        return;
      } else {
        this.errorData = [];
        swal
          .fire({
            icon: "question",
            title: "Save Order",
            text: "Are you sure to save order?",
            confirmButtonText: "Confirm",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
            },
          })
          .then((result) => {
            if (result.isConfirmed) {
              this.disabledSubmitButton = true;

              const url =
                this.$store.state.urlBase + "/api/order/batch_order_multiple";
              const FormData = require("form-data");
              if (this.tableData !== null && this.tableData.length > 0) {
                let formData = null;
                let chkSuccess = true;
                formData = new FormData();

                this.tableData.forEach((element, index) => {
                  formData.append(`ORDER_TIME[${index}]`, this.form.dateOrder);
                  formData.append(`SPECIMEN_ID[${index}]`, element.specimen);
                  formData.append(`TEST_PRIMARY_ID[${index}]`, element.test);
                  formData.append(`BODY_SITE_ID[${index}]`, element.bodySite);
                  formData.append(`LOCATION_ID[${index}]`, element.location);
                  formData.append(`HN[${index}]`, element.hn);
                  formData.append(`FIRSTNAME[${index}]`, element.firstname);
                  formData.append(`LASTNAME[${index}]`, element.lastname);
                  formData.append(`COMMENT_WARD[${index}]`, element.comment);
                  formData.append(`COMMENT_LAB[${index}]`, element.note);
                  formData.append(`CUSTOMER_ID[${index}]`, element.client);
                });

                axios({
                  method: "post",
                  url: url,
                  data: formData,
                  headers: { "Content-Type": "multipart/form-data" },
                })
                  .then((response) => {
                    const result = response.data;
                    if (result["status"] !== "success") this.chkSuccess = false;

                    if (chkSuccess) {
                      swal.fire({
                        icon: "success",
                        title: "Successfully",
                        confirmButtonText: "Confirm",
                        showCancelButton: false,
                        showCloseButton: false,
                        showDenyButton: false,
                        buttonsStyling: false,
                        customClass: {
                          confirmButton: "btn btn-default",
                          cancelButton: "btn btn-light",
                        },
                      });
                      this.tableData = [];
                    } else {
                      swal.fire({
                        icon: "error",
                        title: "Unsuccessfully.  Please recheck the information again",
                        confirmButtonText: "Confirm",
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false,
                        showDenyButton: false,
                        buttonsStyling: false,
                        customClass: {
                          confirmButton: "btn btn-default",
                          cancelButton: "btn btn-light",
                        },
                      });
                    }

                    this.disabledSubmitButton = false;
                  })
                  .catch((err) => {
                    swal.fire({
                      icon: "error",
                      title: "Unsuccessfully.  Please recheck the information again",
                      text: err?.message ?? err,
                      confirmButtonText: "Confirm",
                      showCancelButton: false,
                      showCloseButton: false,
                      showDenyButton: false,
                      buttonsStyling: false,
                      customClass: {
                        confirmButton: "btn btn-default",
                        cancelButton: "btn btn-light",
                      },
                    });
                  });
              }
            }
          });
      }
    },
    editHN(row, index) {
      console.log(row);
    },
    createBatchOrder() {
      if (this.form.dateOrder === "" || this.form.primaryTest === "") {
        swal.fire({
          title: "Please select date, test, specimen and location",
          icon: "error",
          confirmButtonText: "Confirm",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
          },
        });
      } else {
        const numberOrder = this.form.orderNumber;
        for (let i = 0; i < numberOrder; i++) {
          const dateRow = {
            no: i + 1,
            labNo: "LAB01",
            hn: "",
            editHN: false,
            firstname: "",
            lastname: "",
            specimen: this.form.specimen,
            bodySite: this.form.bodySite,
            test: this.form.primaryTest,
            location: this.form.location,
            client: "",
            comment: "",
            note: "",
          };
          this.tableData.push(dateRow);
        }
      }
    },
    getLocation() {
      const url =
        this.$store.state.urlBase + "/api/" + mappingApi("data_location.php");
      const params = {
        data: "list",
      };
      axios
        .get(url, {
          params,
        })
        .then((response) => {
          this.select.locationData = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getBodySite() {
      const url =
        this.$store.state.urlBase + "/api/" + mappingApi("data_body_site.php");
      const params = {
        data: "list",
      };
      axios
        .get(url, {
          params,
        })
        .then((response) => {
          this.select.bodySiteData = response.data;
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
          this.select.specimenData = response.data;
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
        const result = response.data;
        if (result !== null) {
          let tmpTableData = result;
          this.select.clientList = tmpTableData;
        }
      });
    },
    getTestPrimary() {
      const api = mappingApi("data_test_primary.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.select.primaryTestData = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    selectionChange(selectedRows) {
      console.log(selectedRows);
      this.selectedRows = selectedRows;
    },
  },
  computed: {
    ...mapState(["permissions"]),
    canCreateTestPermision() {
      return this.permissions.some(
        (permission) => permission.permission_id === 2
      );
    },
  },
  watch: {
    canCreateTestPermision: {
      handler: function (val) {
        if (!val && this.permissions.length !== 0) {
          this.$router.push("/dashboard");
        }
      },
    },
    permissions: {
      handler: function (val) {
        if (!this.canCreateTestPermision && val.length !== 0) {
          this.$router.push("/dashboard");
        }
      },
    },
  },
};
</script>
<style></style>

<style scoped>
small {
  color: #8898aa !important;
}
</style>
