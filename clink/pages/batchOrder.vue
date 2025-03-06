<template>
  <div>
    <div class="w-100 border-bottom bg-primary">
      <div class="container-fluid py-3 position-relative">
        <h1 class="text-white">Batch Order</h1>

        <div class="favorite-button-container">
          <favorite-button path="/batchOrder" />
        </div>
      </div>
    </div>

    <div class="w-100 border-bottom">
      <div class="container-fluid py-3">
        <div class="row align-items-center">
          <div class="col-12 col-lg-10 py-1">
            <div class="row align-items-end">
              <div class="col-4 col-md">
                <base-input label="Date">
                  <flat-picker
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="form.dateOrder"
                  />
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
                    />
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
                    />
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
                    />
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
                    />
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
          <el-table-column type="selection" align="left" />

          <el-table-column label="No." prop="no" width="80" />
          <el-table-column label="Specimen" prop="specimen" />
          <el-table-column label="Test" prop="test" />
          <el-table-column label="HN" width="160">
            <template v-slot="{ row, $index }">
              <base-input
                v-model="row.hn"
                type="text"
                placeholder=""
                :inputClasses="{
                  'border-danger border': isError($index, 'hn'),
                }"
              />
            </template>
          </el-table-column>
          <el-table-column label="First name" prop="firstname" width="160">
            <template v-slot="{ row, $index }">
              <base-input
                v-model="row.firstname"
                type="text"
                placeholder=""
                :inputClasses="{
                  'border-danger border': isError($index, 'firstname'),
                }"
              />
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
              />
            </template>
          </el-table-column>
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
                  />
                </el-select>
              </base-input>
            </template>
          </el-table-column>
          <el-table-column label="Comment" prop="comment" width="200">
            <template v-slot="{ row }">
              <base-input v-model="row.comment" type="text" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="Lab Comment" prop="note" width="200">
            <template v-slot="{ row }">
              <base-input v-model="row.note" type="text" placeholder="" />
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
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ofetch } from "ofetch";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import { mappingApi } from "@/util/mappingApi";
import FavoriteButton from "./components/favorite-button.vue";
import { ElSelect, ElOption, ElTable, ElTableColumn } from "element-plus";

export default {
  name: "batchOrder",
  components: {
    flatPicker,
    ElSelect,
    ElOption,
    ElTable,
    ElTableColumn,
    FavoriteButton,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const select = reactive({
      primaryTestData: [],
      locationData: [],
      bodySiteData: [],
      specimenData: [],
      clientList: [],
    });

    const form = reactive({
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
    });

    const tableData = ref([]);
    const errorData = ref([]);
    const dateFrom = ref(
      new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString()
    );
    const searchRound = ref(null);
    const flatPickerConfig = reactive({
      allowInput: true,
      altInput: true,
      altFormat: "d-m-Y",
      dateFormat: "Y-m-d",
    });
    const disabledSubmitButton = ref(false);

    const isError = (index, field) => {
      return errorData.value.find((item) => {
        return item.index === index && item[field];
      });
    };

    const saveOrder = () => {
      let isEmpty = false;

      tableData.value.forEach((item, idx) => {
        if (item.hn === "" || item.firstname === "" || item.lastname === "") {
          isEmpty = true;
          errorData.value.push({
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
        errorData.value = [];
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
              disabledSubmitButton.value = true;

              const url =
                store.state.urlBase + "/api/order/batch_order_multiple";
              const FormData = require("form-data");
              if (tableData.value !== null && tableData.value.length > 0) {
                let formData = null;
                let chkSuccess = true;
                formData = new FormData();

                tableData.value.forEach((element, index) => {
                  formData.append(`ORDER_TIME[${index}]`, form.dateOrder);
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

                ofetch(url, {
                  method: "post",
                  body: formData,
                  headers: { "Content-Type": "multipart/form-data" },
                })
                  .then((response) => {
                    const result = response;
                    if (result["status"] !== "success") chkSuccess = false;

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
                      tableData.value = [];
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

                    disabledSubmitButton.value = false;
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
    };

    const editHN = (row, index) => {
      console.log(row);
    };

    const createBatchOrder = () => {
      if (form.dateOrder === "" || form.primaryTest === "") {
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
        const numberOrder = form.orderNumber;
        for (let i = 0; i < numberOrder; i++) {
          const dateRow = {
            no: i + 1,
            labNo: "LAB01",
            hn: "",
            editHN: false,
            firstname: "",
            lastname: "",
            specimen: form.specimen,
            bodySite: form.bodySite,
            test: form.primaryTest,
            location: form.location,
            client: "",
            comment: "",
            note: "",
          };
          tableData.value.push(dateRow);
        }
      }
    };

    const getLocation = () => {
      const url =
        store.state.urlBase + "/api/" + mappingApi("data_location.php");
      const params = {
        data: "list",
      };
      ofetch(url, {
        params,
      })
        .then((response) => {
          select.locationData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const getBodySite = () => {
      const url =
        store.state.urlBase + "/api/" + mappingApi("data_body_site.php");
      const params = {
        data: "list",
      };
      ofetch(url, {
        params,
      })
        .then((response) => {
          select.bodySiteData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const getSpecimen = () => {
      const api = mappingApi("data_specimen.php");
      const queryParam = "data=list";
      const url = `${store.state.urlBase}/api/${api}?${queryParam}`;
      ofetch(url)
        .then((response) => {
          select.specimenData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const getClients = () => {
      const url = `${store.state.urlBase}/api/customers`;

      ofetch(url, {
        method: "get",
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result !== null) {
          let tmpTableData = result;
          select.clientList = tmpTableData;
        }
      });
    };

    const getTestPrimary = () => {
      const api = mappingApi("data_test_primary.php");
      const queryParam = "data=list";
      const url = `${store.state.urlBase}/api/${api}?${queryParam}`;
      ofetch(url)
        .then((response) => {
          select.primaryTestData = response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
    };

    const selectionChange = (selectedRows) => {
      console.log(selectedRows);
      selectedRows.value = selectedRows;
    };

    onMounted(() => {
      store.commit("initializeStore");

      if (store.state.accessToken === null) {
        router.push("/login");
      }

      getLocation();
      getBodySite();
      getSpecimen();
      getClients();
      getTestPrimary();
    });

    const permissions = computed(() => store.state.permissions);

    const canCreateTestPermision = computed(() => {
      return permissions.value.some(
        (permission) => permission.permission_id === 2
      );
    });

    watch(
      () => canCreateTestPermision.value,
      (val) => {
        if (!val && permissions.value.length !== 0) {
          router.push("/dashboard");
        }
      }
    );

    watch(
      () => permissions.value,
      (val) => {
        if (!canCreateTestPermision.value && val.length !== 0) {
          router.push("/dashboard");
        }
      }
    );

    return {
      select,
      form,
      tableData,
      errorData,
      dateFrom,
      searchRound,
      flatPickerConfig,
      disabledSubmitButton,
      isError,
      saveOrder,
      editHN,
      createBatchOrder,
      getLocation,
      getBodySite,
      getSpecimen,
      getClients,
      getTestPrimary,
      selectionChange,
      permissions,
      canCreateTestPermision,
    };
  },
};
</script>

<style scoped>
small {
  color: #8898aa !important;
}
</style>