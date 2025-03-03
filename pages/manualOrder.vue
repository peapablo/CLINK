<template>
  <div style="background-color: lightgrey">
    <div class="w-100 border-bottom bg-primary">
      <div class="container-fluid py-3">
        <h1 class="text-white">Manual Order</h1>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="row mb-4">
        <div class="col-12">
          <div class="rounded border p-3 bg-white">
            <div class="row">
              <div class="col-12">
                <div class="text-center">
                  <i class="fas fa-user-circle" style="font-size: 80px"></i>
                </div>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <base-input label="Order Date">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="inputOrderDate"
                  ></flat-picker>
                </base-input>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">HN</h3>
                <input class="form-control" type="text" v-model="inputHN" />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Client Name</h3>
                <el-select
                  placeholder="Client Name"
                  v-model="inputClientName"
                  class="w-100"
                >
                  <el-option
                    v-for="item in titleSelect"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Title</h3>
                <el-select
                  placeholder="Title"
                  v-model="inputTitle"
                  class="w-100"
                >
                  <el-option
                    v-for="item in titleSelect"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">First name</h3>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputFirstname"
                />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Last name</h3>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputLastname"
                />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <base-input label="Date of birth">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="inputDateOfBirth"
                  ></flat-picker>
                </base-input>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Age</h3>
                <input class="form-control" type="text" v-model="inputAge" />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Gender</h3>
                <el-select
                  placeholder="Gender"
                  v-model="inputGender"
                  class="w-100"
                >
                  <el-option label="Male" value="1"></el-option>
                  <el-option label="Female" value="2"></el-option>
                </el-select>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Lab number</h3>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputLabNumber"
                />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Doctor</h3>
                <input class="form-control" type="text" v-model="inputDoctor" />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <base-input label="Priority">
                  <el-select
                    placeholder="Select Priority"
                    v-model="inputPriority"
                    filterable
                  >
                    <el-option
                      v-for="item in prioritySelect"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <base-input label="Admit Date">
                  <flat-picker
                    slot-scope="{ focus, blur }"
                    @on-open="focus"
                    @on-close="blur"
                    :config="flatPickerConfig"
                    class="form-control datepicker"
                    v-model="inputAdmitDate"
                  ></flat-picker>
                </base-input>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Admit No.</h3>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputAdmitNo"
                />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <base-input label="Location">
                  <el-select
                    placeholder="Location"
                    filterable
                    v-model="inputLocation"
                  >
                    <el-option
                      v-for="item in locationSelect"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    ></el-option>
                  </el-select>
                </base-input>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Ext HN.</h3>
                <input class="form-control" type="text" v-model="inputExHN" />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Ext Location</h3>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputExLocation"
                />
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Specimen</h3>
                <el-select
                  class="w-100"
                  placeholder="Specimen"
                  v-model="inputSpecimen"
                  filterable
                >
                  <option value="null">-- โปรดระบุ --</option>
                  <el-option
                    v-for="item in specimenCheckbox"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
              </div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">Body Site</h3>
                <el-select
                  placeholder="Body Site"
                  v-model="inputBodySite"
                  filterable
                  class="w-100"
                >
                  <el-option
                    v-for="item in bodySiteSelect"
                    :key="item.ID"
                    :label="item.GROUP_NAME + ' - ' + item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
              </div>
              <div class="d-none d-lg-block col-lg-8"></div>

              <div class="col-12 col-lg-4 mt-4">
                <h3 class="form-control-label">
                  เลือกรูปแบบการทดสอบ (Test / Profile Test)
                </h3>

                <!-- Test -->
                <base-radio
                  class="my-2"
                  name="test"
                  value="test"
                  v-model="inputTestType"
                  type="Test"
                  style="text-transform: capitalize"
                  >Test</base-radio
                >

                <!-- Profile Test -->
                <base-radio
                  class="my-2"
                  name="profile-test"
                  value="profile-test"
                  v-model="inputTestType"
                  type="ProfileTest"
                  style="text-transform: capitalize"
                  >Profile Test</base-radio
                >

                <!-- Test Options -->
                <el-select
                  v-if="inputTestType === 'test'"
                  class="w-100"
                  placeholder="Select Test"
                  filterable
                  v-model="inputTestTypeOption"
                >
                  <el-option
                    v-for="item in directExaminationTestCheckbox"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
                <!-- Profile Test Options -->
                <el-select
                  v-if="inputTestType === 'profile-test'"
                  class="w-100"
                  placeholder="Select Profile Test"
                  filterable
                  v-model="inputTestTypeOption"
                >
                  <el-option
                    v-for="item in profileTests"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="d-none d-lg-block col-lg-8"></div>

              <div class="col-12 col-lg-6 mt-4">
                <h3 class="form-control-label">Ward Comment</h3>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model.lazy="inputWardComment"
                ></textarea>
              </div>

              <div class="col-12 col-lg-6 mt-4">
                <h3 class="form-control-label">Lab Comment</h3>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model.lazy="inputLabComment"
                ></textarea>
              </div>

              <div class="col-12 my-4">
                <div
                  class="
                    d-flex
                    flex-row
                    align-items-center
                    justify-content-center
                  "
                  style="column-gap: 12px"
                >
                  <base-button class="" @click="saveOrder" icon type="default">
                    <span class="btn-inner--icon">
                      <i class="ni ni-send"></i>
                    </span>
                    <span class="btn-inner--text">Add New Manual Order</span>
                  </base-button>

                  <base-button
                    class=""
                    icon
                    type="secondary"
                    @click="cancelCreateOrder"
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
  </div>
</template>
<script>
import swal from "sweetalert2";
import { Select, Option } from "element-ui";
import { mappingApi } from "@/util/mappingApi";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
export default {
  layout: "DashboardLayout",
  name: "manualOrder",
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    flatPicker,
  },
  data() {
    return {
      titleSelect: [],
      locationSelect: [],
      prioritySelect: [],
      bodySiteGroupSelect: [],
      bodySiteSelect: [],
      filterBodySite: [],
      inputOrderDate:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      inputHN: "",
      inputClientName: "",
      inputTitle: "",
      inputFirstname: "",
      inputLastname: "",
      inputDateOfBirth:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      inputGender: "",
      inputAge: "",
      inputLabNumber: "",
      inputDoctor: "",
      inputPriority: "",
      inputAdmitDate: "",
      inputAdmitNo: "",
      inputSpecimen: "",
      inputTestPrimary: "",
      inputLocation: "",
      inputExLocation: "",
      inputExHN: "",
      inputBodySite: "",
      inputTestType: "test",
      inputTestTypeOption: "",
      inputWardComment: "",
      inputLabComment: "",
      specimen: "",
      testPrimary: "",
      hn: "",
      name: "",
      firstname: "",
      lastname: "",
      labNumber: "",
      location: "",
      specimenCheckbox: [],
      specimenNote: "",
      directExaminationTestCheckbox: [],
      profileTests: [],
      primaryTestTab: 0,
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
    };
  },
  mounted() {
    this.getTitle();
    this.getLocation();
    this.getPriority();
    this.getBodySiteGroup();
    this.getBodySite();
    this.getSpecimen();
    this.getTestPrimary();
    this.getProfileTests();
  },
  watch: {
    inputTestType: {
      handler() {
        console.log("watch inputTestType");
        this.inputTestTypeOption = "";
      },
    },
  },
  methods: {
    cancelCreateOrder() {
      this.$router.push("/inbox");
    },
    saveOrder() {
      swal
        .fire({
          title: "ยืนยันการเพิ่มบันทึกเคสใหม่",
          showCloseButton: true,
          confirmButtonText: "บันทึกข้อมูล",
          showDenyButton: true,
          showCancelButton: true,
          cancelButtonText: "ยกเลิก",
          denyButtonText: `บันทึกและล้างฟอร์มข้อมูล`,
          width: 1000,
        })
        .then((result) => {
          if (result.isConfirmed || result.isDenied) {
            //save ข้อมูล
            const api = mappingApi("batch_order.php");
            const url = this.$store.state.urlBase + "/api/" + api;
            const FormData = require("form-data");
            let formData = new FormData();
            formData.append("ORDER_TIME", this.inputOrderDate);
            formData.append("SPECIMEN_ID", this.inputSpecimen);
            formData.append("BODY_SITE_ID", this.inputBodySite);
            formData.append("LOCATION_ID", this.inputLocation);
            formData.append("HN", this.inputHN);
            formData.append("SEX", this.inputGender);
            formData.append("ADMIT_TIME", this.inputAdmitDate);
            formData.append("ADMIT_NO", this.inputAdmitNo);
            formData.append("FIRST_NAME", this.inputFirstname);
            formData.append("LAST_NAME", this.inputLastname);
            formData.append("COMMENT_WARD", this.inputWardComment);
            formData.append("COMMENT_LAB", this.inputLabComment);

            formData.append(
              this.inputTestType === "test"
                ? "TEST_PRIMARY_ID"
                : "TEST_PROFILE_ID",
              this.inputTestTypeOption
            );

            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
              const result = response.data;
              if (result["status"] != "success") this.chkSuccess = false;
              console.log(result);
            });

            if (result.isDenied) this.clearTestData();

            swal.fire("บันทึกสำเร็จ", "", "success");
          }
        });
    },
    clearTestData() {
      this.inputOrderDate =
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString();
      this.inputHN = "";
      this.inputTitle = "";
      this.inputFirstname = "";
      this.inputLastname = "";
      this.inputGender = "";
      this.inputAge = "";
      this.inputLabNumber = "";
      this.inputDoctor = "";
      this.inputPriority = "";
      this.inputAdmitDate = "";
      this.inputAdmitNo = "";
      this.inputSpecimen = "";
      this.inputTestPrimary = "";
      this.inputLocation = "";
      this.inputExLocation = "";
      this.inputExHN = "";
      this.inputBodySite = "";
      this.inputWardComment = "";
      this.inputLabComment = "";
      this.inputTestType = "test";
    },
    addBodySiteToNote() {
      const result = this.bodySiteSelect.find((item) => {
        return item.ID === this.inputBodySite;
      });

      this.specimenNote = result.NAME;
    },
    filterBodySiteFromGroup() {
      const bodySiteGroup = this.inputBodySiteGroup;
      const fullData = [...this.bodySiteSelect];
      let result = [];
      fullData.forEach((element) => {
        if (element.GROUP_ID === bodySiteGroup) {
          result.push(element);
        }
      });

      this.filterBodySite = [];
      this.filterBodySite = [...result];
    },
    getTitle() {
      const api = mappingApi("data_title.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.titleSelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getLocation() {
      const api = mappingApi("data_location.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.locationSelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getPriority() {
      const api = mappingApi("data_priority.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.prioritySelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getBodySiteGroup() {
      const api = mappingApi("data_body_site_group.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.bodySiteGroupSelect = response.data;
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
      const api = mappingApi("data_body_site.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.bodySiteSelect = response.data;
          this.filterBodySite = response.data;
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
          this.specimenCheckbox = response.data;
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
          this.directExaminationTestCheckbox = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getProfileTests() {
      const url = this.$store.state.urlBase + "/api/data_profile_tests";
      axios
        .get(url)
        .then((response) => {
          this.profileTests = response.data;
        })
        .catch((error) => {
          console.log("getProfileTests: " + error);
        });
    },
  },
};
</script>
<style>
/* .swal2-actions {
  justify-content: start !important;
} */
.btn-search {
  color: white !important;
  background-color: #98999d;
  border-color: #98999d;
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
}
</style>

<style scoped>
small {
  color: #8898aa !important;
}
.tab {
  cursor: pointer;
}
.active-tab {
  font-weight: bold;
  background-color: #dddddd;
  color: black;
}
</style>
