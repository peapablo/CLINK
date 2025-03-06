<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1">
            <h1 class="text-white">
              {{ clientId === "new" ? "Add New Client" : "Edit Client" }}
            </h1>
          </div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/clients/new" />
        </div>
      </div>
    </div>

    <div class="container-fluid py-4">
      <div class="card">
        <div class="card-body p-5">
          <div class="row">
            <div class="col-12 mb-2">
              <h1>
                {{ clientId === "new" ? "Add New Client" : "Edit Client" }}
              </h1>
            </div>

            <!-- Line 1 -->
            <div class="col-12 mb-2">
              <h2>ข้อมูลทั่วไป</h2>
            </div>

            <div class="col-12 col-lg-8 mb-2">
              <h3 class="form-control-label mb-2">
                เลขที่ประจำตัวผู้เสียภาษี <span class="text-red">*</span>
              </h3>

              <div class="tin-input-container">
                <input
                  v-for="(digit, index) in tax_id"
                  :key="index"
                  type="text"
                  inputmode="numeric"
                  :class="{
                    'form-control': true,
                    'tin-input': true,
                    'mr-4': [0, 4, 9].includes(index),
                    'mr-2': ![0, 4, 9].includes(index),
                  }"
                  v-model="tax_id[index]"
                  maxlength="1"
                  @input="filterInput(index)"
                  @keydown="handleBackspace(index, $event)"
                  :ref="'tinInput' + index"
                  :disabled="isSubmitting || isLoading"
                />
              </div>
              <!-- <div v-if="tinError" class="text-red">
                {{ tinError }}
              </div> -->
            </div>
            <div class="d-none d-lg-block col-4"></div>

            <!-- Line 2 -->
            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                ประเภทกิจการ <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-select
                  placeholder=""
                  filterable
                  v-model="business_type"
                  class="w-100"
                  :disabled="isSubmitting || isLoading"
                >
                  <el-option
                    v-for="item in businessTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col-12 col-lg-8 mb-2">
              <h3 class="form-control-label mb-2">
                ขื่อกิจการ <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-input
                  :disabled="isSubmitting || isLoading"
                  v-model="business_name"
                  placeholder=""
                />
              </base-input>
            </div>

            <div class="col-12">
              <hr />
            </div>

            <!-- Line 3 -->
            <div class="col-12 mb-2">
              <h2>ข้อมูลที่อยู่จดทะเบียน</h2>
            </div>

            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                รายละเอียดของที่อยู่ <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-input
                  :disabled="isSubmitting || isLoading"
                  v-model="address_details"
                  placeholder=""
                />
              </base-input>
            </div>

            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                จังหวัด <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-select
                  :disabled="isSubmitting || isLoading"
                  filterable
                  placeholder=""
                  v-model="province_id"
                >
                  <el-option
                    v-for="item in provinceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                เขต/อำเภอ <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-select
                  :disabled="isSubmitting || isLoading"
                  filterable
                  placeholder=""
                  v-model="loadingDistricts ? '' : city_district_id"
                  :loading="loadingDistricts"
                >
                  <el-option
                    v-for="item in districtOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                แขวง/ตำบล <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-select
                  :disabled="isSubmitting || isLoading"
                  filterable
                  placeholder=""
                  v-model="loadingSubDistricts ? '' : district_subdistrict_id"
                  @change="onChangeSubDistrict"
                  :loading="loadingSubDistricts"
                >
                  <el-option
                    v-for="item in subDistrictOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </base-input>
            </div>
            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">
                รหัสไปรษณีย์ <span class="text-red">*</span>
              </h3>

              <base-input>
                <el-input v-model="postal_code" placeholder="" disabled />
              </base-input>
            </div>

            <div class="col-12">
              <hr />
            </div>

            <!-- Line 4 -->
            <div class="col-12 mb-2">
              <h2>ช่องทางติดต่อ</h2>
            </div>

            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">ชื่อผู้ติดต่อ</h3>

              <base-input>
                <el-input
                  :disabled="isSubmitting || isLoading"
                  v-model="contact_name"
                  placeholder=""
                />
              </base-input>
            </div>
            <div class="col-12 col-lg-4 mb-2">
              <h3 class="form-control-label mb-2">เบอร์โทรติดต่อ</h3>

              <base-input>
                <el-input
                  :disabled="isSubmitting || isLoading"
                  v-model="contact_phone"
                  placeholder=""
                />
              </base-input>
            </div>
            <div class="col-12 col-lg-4 mb-4">
              <h3 class="form-control-label mb-2">อีเมล</h3>

              <base-input>
                <el-input
                  :disabled="isSubmitting || isLoading"
                  v-model="email"
                  placeholder=""
                />
              </base-input>
            </div>

            <!-- Call to Action Button -->
            <div class="col-12 text-right">
              <base-button
                class=""
                icon
                type="secondary"
                @click="onCancel"
                :disabled="isSubmitting"
              >
                <span class="btn-inner--text">{{
                  canEditClients ? "Cancel" : "Back"
                }}</span>
              </base-button>

              <base-button
                class=""
                icon
                type="default"
                @click="onSubmit"
                :disabled="isSubmitting || isLoading"
                v-if="canEditClients"
              >
                <span class="btn-inner--icon">
                  <i class="ni ni-send"></i>
                </span>
                <span class="btn-inner--text">Submit</span>
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import FavoriteButton from "../components/favorite-button.vue";
import axios from "axios";
import { mapState } from "vuex";
import {
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Select,
  Option,
} from "element-ui";

export default {
  middleware: "protected",
  layout: "DashboardLayout",
  name: "clients-new",
  components: {
    FavoriteButton,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      clientId: this.$route.params.id, // Access the dynamic route parameter
      hasFetch: false,
      // Dropdown State
      loadingProvinces: false,
      loadingDistricts: false,
      loadingSubDistricts: false,
      subDistrictOptions: [],
      districtOptions: [],
      provinceOptions: [],
      userPermissions: [],
      businessTypeOptions: [
        {
          label: "บริษัทจำกัด",
          value: "company_limited",
        },
        {
          label: "บริษัทจำกัด (มหาชน)",
          value: "public_company",
        },
        {
          label: "ห้างหุ้นส่วนจำกัด",
          value: "limited_partnership",
        },
      ],

      // Input State
      tax_id: Array(13).fill(""),
      business_type: "",
      business_name: "",
      address_details: "",

      district_subdistrict_id: "",
      city_district_id: "",
      province_id: "",
      postal_code: "",
      contact_name: "",
      contact_phone: "",
      email: "",
      // Error State
      tinError: "",
      // CTA State
      isLoading: false,
      isSubmitting: false,
    };
  },
  watch: {
    "$route.params.id": function (newId) {
      this.clientId = newId; // Update clientId if the route parameter changes
    },
    province_id(newVal) {
      if (newVal) {
        this.getDistricts();

        if (this.hasFetch) {
          this.city_district_id = "";
          this.district_subdistrict_id = "";
        }
        this.districtOptions = [];
        this.subDistrictOptions = [];
      }
    },
    city_district_id(newVal) {
      if (newVal) {
        this.getSubDistricts();
        if (this.hasFetch) {
          this.district_subdistrict_id = "";
        }
      }
    },
  },
  methods: {
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
    onCancel() {
      this.$router.push("/clients");
    },
    filterInput(index) {
      const value = this.tax_id[index];
      if (!/^\d$/.test(value)) {
        this.tax_id[index] = "";
      } else {
        this.moveToNextBox(index);
      }
    },
    moveToNextBox(index) {
      if (this.tax_id[index].length === 1 && index < 12) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`tinInput${index + 1}`]?.[0];
          if (nextInput) {
            nextInput.focus();
          }
        });
      }
      this.validateTIN();
    },
    handleBackspace(index, event) {
      if (event.key === "Backspace" && this.tax_id[index] === "" && index > 0) {
        this.$nextTick(() => {
          const prevInput = this.$refs[`tinInput${index - 1}`]?.[0];
          if (prevInput) {
            prevInput.focus();
          }
        });
      }
    },
    validateTIN() {
      if (this.tax_id.join("").length !== 13) {
        this.tinError = "TIN must be exactly 13 digits long.";
      } else {
        this.tinError = "";
      }
    },
    validateForm() {
      const requiredFields = [
        "tax_id",
        "business_type",
        "business_name",
        "address_details",
        "district_subdistrict_id",
        "city_district_id",
        "province_id",
        "postal_code",
      ];

      for (let key of requiredFields) {
        if (key === "tax_id") {
          if (this.tax_id.join("").length !== 13) {
            Swal.fire({
              icon: "error",
              title: "Validation Error",
              text: "Please fill out all the information before submitting.",
            });
            return false;
          }
        } else if (!this[key] || String(this[key] ?? "").length === 0) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "Please fill out all the information before submitting.",
          });
          return false;
        }
      }

      return true;
    },
    fetchData() {
      if (this.clientId) {
        const url = `${this.$store.state.urlBase}/api/customers/${this.clientId}`;
        this.isLoading = true;
        axios({
          method: "get",
          url: url,
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            const result = response;
            if (!!result) {
              this.tax_id = result.tax_id.split("");
              this.business_type = result.business_type;
              this.business_name = result.business_name;
              this.address_details = result.address_details;
              this.province_id = result.province_id;
              this.city_district_id = result.city_district_id;
              this.district_subdistrict_id = result.district_subdistrict_id;
              this.postal_code = result.postal_code;
              this.contact_name = result.contact_name;
              this.contact_phone = result.contact_phone;
              this.email = result.email;

              setTimeout(() => {
                this.isLoading = false;
                this.hasFetch = true;
              }, 1000);
            }
          })
          .catch((error) => {
            if (error.response.message) {
              Swal.fire({
                icon: "error",
                title: "Client Fetch Failed",
                text: error.response.message,
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Client Fetch Failed",
                text: "An error occurred while fetching the client.",
              });
            }
          });
      }
    },
    getProvinces() {
      this.loadingProvinces = true;
      const url = `${this.$store.state.urlBase}/api/geo/provinces`;
      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          const result = response;
          if (result !== null) {
            let tmpData = result;
            this.provinceOptions = tmpData.map((item) => {
              return {
                ...item,
                label: item.name_th,
                value: item.id,
              };
            });
          }
        })
        .finally(() => {
          this.loadingProvinces = false;
        });
    },
    getDistricts() {
      if (this.province_id) {
        this.loadingDistricts = true;
        const url = `${this.$store.state.urlBase}/api/geo/provinces/${this.province_id}/districts`;
        axios({
          method: "get",
          url: url,
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            const result = response;
            if (result !== null) {
              let tmpData = result;
              this.districtOptions = tmpData.map((item) => {
                return {
                  ...item,
                  label: item.name_th,
                  value: item.id,
                };
              });
            }
          })
          .finally(() => {
            this.loadingDistricts = false;
          });
      }
    },
    getSubDistricts() {
      if (this.city_district_id) {
        this.loadingSubDistricts = true;
        const url = `${this.$store.state.urlBase}/api/geo/districts/${this.city_district_id}/sub-districts`;
        axios({
          method: "get",
          url: url,
          headers: { "Content-Type": "application/json" },
        })
          .then((response) => {
            const result = response;
            if (result !== null) {
              let tmpData = result;
              this.subDistrictOptions = tmpData.map((item) => {
                return {
                  ...item,
                  label: item.name_th,
                  value: item.id,
                };
              });
            }
          })
          .finally(() => {
            this.loadingSubDistricts = false;
          });
      }
    },
    onChangeSubDistrict(newVal) {
      const subDistrict = this.subDistrictOptions.find(
        (item) => item.value === newVal
      );
      if (subDistrict) {
        this.district_subdistrict_id = newVal;
        this.postal_code = subDistrict.zip_code;
      }
    },
    createClient() {
      const url = `${this.$store.state.urlBase}/api/customers`;
      const formData = new FormData();
      formData.append("tax_id", this.tax_id.join(""));
      formData.append("business_type", this.business_type);
      formData.append("business_name", this.business_name);
      formData.append("address_details", this.address_details);
      formData.append("district_subdistrict_id", this.district_subdistrict_id);
      formData.append("city_district_id", this.city_district_id);
      formData.append("province_id", this.province_id);
      formData.append("postal_code", this.postal_code);
      formData.append("contact_name", this.contact_name);
      formData.append("contact_phone", this.contact_phone);
      formData.append("email", this.email);

      this.isSubmitting = true;
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          const result = response;
          if (result !== null) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Client has been created successfully.",
            }).then(() => {
              this.$router.push("/clients");
            });
          }
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Client Creation Failed",
              text: Object.values(error.response.errors)
                .map((item) => item[0])
                .join(", "),
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Client Creation Failed",
              text: "An error occurred while updating the client.",
            });
          }
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    updateClient() {
      const url = `${this.$store.state.urlBase}/api/customers/${this.clientId}?_method=PUT`;
      const formData = new FormData();
      formData.append("tax_id", this.tax_id.join(""));
      formData.append("business_type", this.business_type);
      formData.append("business_name", this.business_name);
      formData.append("address_details", this.address_details);
      formData.append("district_subdistrict_id", this.district_subdistrict_id);
      formData.append("city_district_id", this.city_district_id);
      formData.append("province_id", this.province_id);
      formData.append("postal_code", this.postal_code);
      if (this.contact_name) formData.append("contact_name", this.contact_name);
      if (this.contact_phone)
        formData.append("contact_phone", this.contact_phone);
      if (this.email) formData.append("email", this.email);

      this.isSubmitting = true;
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          const result = response;
          if (result !== null) {
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Client has been updated successfully.",
            }).then(() => {
              // this.fetchData();
              this.$router.push("/clients");
            });
          }
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Client Update Failed",
              text: Object.values(error.response.errors)
                .map((item) => item[0])
                .join(", "),
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Client Update Failed",
              text: "An error occurred while updating the client.",
            });
          }
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    handleSubmit() {
      if (this.clientId === "new") {
        this.createClient();
      } else {
        this.updateClient();
      }
    },
    onSubmit() {
      const validated = this.validateForm();
      if (validated) {
        Swal.fire({
          title: "Are you sure?",
          text: "Do you want to submit this form?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            this.handleSubmit();
          }
        });
      }
    },
  },
  mounted() {
    this.getProvinces();
    this.getUserPermissions();
    if (this.clientId !== "new") {
      this.fetchData();
    }
  },
  computed: {
    ...mapState(["profile"]),
    canViewClients() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 11;
      });
    },
    canEditClients() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 12;
      });
    },
  },
};
</script>

<style>
.tin-input-container {
  display: flex;
  gap: 5px;
}
.tin-input {
  text-align: center;
}
</style>
