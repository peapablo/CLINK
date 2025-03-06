<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl">
            <h1 class="text-white mb-0">Billing Data</h1>
          </div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/masterdata" />
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="row mx-1">
        <div
          class="col text-center py-1"
          :class="{
            'active-tab': activeIndex === 0,
            'tab-table': activeIndex !== 0,
          }"
          @click="onChangeTab(0)"
        >
          ราคากลาง
        </div>
        <div
          class="col text-center py-1"
          :class="{
            'active-tab': activeIndex === 1,
            'tab-table': activeIndex !== 1,
          }"
          @click="onChangeTab(1)"
        >
          ข้อมูลผู้ออกเอกสาร
        </div>
      </div>

      <div>
        <div class="card">
          <div class="card-body p-5">
            <!-- Price Management -->
            <div v-if="activeIndex === 0">
              <div class="row">
                <div class="col-12 mb-2">
                  <h1>ราคากลาง</h1>
                </div>

                <div class="col-12">
                  <div class="card">
                    <el-table
                      class="table-responsive table-flush"
                      header-row-class-name="thead-light price-management-masterdata text-center"
                      highlight-current-row
                      row-key="id"
                      stripe
                      :data="tableData"
                      ref="singleTable"
                    >
                      <el-table-column label="Test">
                        <template v-slot="{ row }">
                          <b>{{ row.TEST_NAME }}</b>
                        </template>
                      </el-table-column>
                      <el-table-column label="Price (Baht per Test)">
                        <template v-slot="{ row }">
                          <div
                            class="text-center"
                            v-if="!currentEditRows.includes(row.id)"
                          >
                            <span>{{ row.PRICE }}</span>
                            <a
                              v-if="canEditBillingData"
                              style="cursor: pointer"
                              @click="onStartEditRow(row)"
                            >
                              <i class="far fa-edit" style="color: #2c7ef9"></i>
                            </a>
                          </div>
                          <div
                            class="text-center"
                            v-if="currentEditRows.includes(row.id)"
                          >
                            <input
                              class="
                                form-control form-control-sm
                                w-25
                                d-inline-block
                              "
                              type="number"
                              v-model="currentEditValues[row.id]"
                            />
                            <a
                              style="cursor: pointer; display: inline-block"
                              @click="onCancelEditRow(row)"
                            >
                              <i
                                class="fa fa-times"
                                style="color: #ff4d4f; font-size: 24px"
                              ></i>
                            </a>
                            <a
                              style="cursor: pointer; display: inline-block"
                              @click="onSubmitEditRow(row)"
                            >
                              <i
                                class="fa fa-check"
                                style="color: #32c113; font-size: 24px"
                              ></i>
                            </a>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>

            <!-- Billing Masterdata -->
            <div v-if="activeIndex === 1">
              <div class="row">
                <div class="col-12 mb-2">
                  <h1>ข้อมูลผู้ออกเอกสาร</h1>
                </div>

                <div class="col-12 mb-2">
                  <h2>ข้อมูลทั่วไป</h2>
                </div>

                <div class="col-12 col-lg-8 mb-2">
                  <h3 class="form-control-label mb-2">
                    เลขที่ประจำตัวผู้เสียภาษี <span class="text-red">*</span>
                  </h3>

                  <div class="tin-input-container">
                    <input
                      v-for="(digit, index) in tin"
                      :key="index"
                      type="text"
                      inputmode="numeric"
                      :class="{
                        'form-control': true,
                        'tin-input': true,
                        'mr-4': [0, 4, 9].includes(index),
                        'mr-2': ![0, 4, 9].includes(index),
                      }"
                      v-model="tin[index]"
                      maxlength="1"
                      @input="filterInput(index)"
                      @keydown="handleBackspace(index, $event)"
                      :ref="'tinInput' + index"
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
                      v-model="companyPrefix"
                      class="w-100"
                    >
                      <el-option
                        v-for="item in companyPrefixOptions"
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
                    <el-input v-model="companyTitle" placeholder="" />
                  </base-input>
                </div>
                <div class="col-12 col-lg-4 mb-2">
                  <h3 class="form-control-label mb-2">ชื่อผู้ติดต่อ</h3>

                  <base-input>
                    <el-input v-model="contactPersonName" placeholder="" />
                  </base-input>
                </div>
                <div class="col-12 col-lg-4 mb-2">
                  <h3 class="form-control-label mb-2">เบอร์โทรติดต่อ</h3>

                  <base-input>
                    <el-input v-model="contactPhone" placeholder="" />
                  </base-input>
                </div>
                <div class="col-12 col-lg-4 mb-4">
                  <h3 class="form-control-label mb-2">อีเมล</h3>

                  <base-input>
                    <el-input v-model="contactEmail" placeholder="" />
                  </base-input>
                </div>
                <div class="col-12 col-lg-4">
                  <h3 class="form-control-label mb-2 d-inline-block">Logo</h3>
                  <span
                    style="
                      color: #aeb5be;
                      display: inline-block;
                      font-size: 12px;
                    "
                    >(ขนาดไม่เกิน 3MB)</span
                  >

                  <base-button
                    icon
                    type="info"
                    style="
                      color: #182b4d;
                      background-color: #8fbde7;
                      border-color: #8fbde7;
                    "
                    @click="onUploadLogo"
                    class="d-block w-100"
                    v-if="canEditBillingData"
                  >
                    <i class="fa fa-upload"></i>
                    {{ logo === null ? "Upload your logo" : "Upload again" }}
                  </base-button>
                  <div
                    class="mt-4 d-flex flex-row justify-content-between"
                    v-if="logo !== null"
                  >
                    <a
                      target="_blank"
                      v-if="logo !== null"
                      :href="logoLink"
                      style="
                        cursor: pointer;
                        color: #aeb5be;
                        display: inline-block;
                        font-size: 14px;
                        text-decoration: underline;
                      "
                      >กดเพื่อดูรูปภาพ
                    </a>
                    <span
                      @click="onDeleteLogoPicture"
                      class="text-danger"
                      style="
                        cursor: pointer;
                        display: inline-block;
                        font-size: 14px;
                        text-decoration: underline;
                      "
                      v-if="canEditBillingData"
                      >ลบรูปภาพ</span
                    >
                  </div>

                  <input
                    type="file"
                    id="logo_picture"
                    @change="onChangeLogoPicture"
                    class="d-none"
                  />
                </div>
                <div class="col-12 col-lg-4">
                  <h3 class="form-control-label mb-2 d-inline-block">
                    E-Signature
                  </h3>
                  <span
                    style="
                      color: #aeb5be;
                      display: inline-block;
                      font-size: 12px;
                    "
                    >(ขนาดไม่เกิน 3MB)</span
                  >

                  <base-button
                    icon
                    type="info"
                    style="
                      color: #182b4d;
                      background-color: #8fbde7;
                      border-color: #8fbde7;
                    "
                    @click="onUploadSignature"
                    class="d-block w-100"
                    v-if="canEditBillingData"
                  >
                    <i class="fa fa-upload"></i>
                    {{
                      eSignature === null
                        ? "Upload your signature"
                        : "Upload again"
                    }}
                  </base-button>
                  <div
                    class="mt-4 d-flex flex-row justify-content-between"
                    v-if="eSignature !== null"
                  >
                    <a
                      target="_blank"
                      v-if="eSignature !== null"
                      :href="eSignatureLink"
                      style="
                        cursor: pointer;
                        color: #aeb5be;
                        display: inline-block;
                        font-size: 14px;
                        text-decoration: underline;
                      "
                      >กดเพื่อดูลายเซ็น
                    </a>
                    <span
                      @click="onDeleteSignaturePicture"
                      class="text-danger"
                      style="
                        cursor: pointer;
                        display: inline-block;
                        font-size: 14px;
                        text-decoration: underline;
                      "
                      v-if="canEditBillingData"
                      >ลบรูปภาพ</span
                    >
                  </div>

                  <input
                    type="file"
                    id="signature_picture"
                    @change="onChangeSignaturePicture"
                    class="d-none"
                  />
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
                    <el-input v-model="companyAddress" placeholder="" />
                  </base-input>
                </div>
                <div class="col-12 col-lg-4 mb-2">
                  <h3 class="form-control-label mb-2">
                    จังหวัด <span class="text-red">*</span>
                  </h3>

                  <base-input>
                    <el-select
                      :disabled="isSubmittingCompanyData"
                      filterable
                      placeholder=""
                      v-model="companyProvince"
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
                      :disabled="isSubmittingCompanyData"
                      filterable
                      placeholder=""
                      v-model="companyDistrict"
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
                      :disabled="isSubmittingCompanyData"
                      filterable
                      placeholder=""
                      v-model="companySubDistrict"
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
                    <el-input
                      v-model="companyPostalCode"
                      placeholder=""
                      disabled
                    />
                  </base-input>
                </div>

                <div class="col-12">
                  <hr />
                </div>

                <!-- Line 4 -->
                <div class="col-12 mb-2">
                  <h2>ข้อมูลบัญชีธนาคารสำหรับรับโอน</h2>
                </div>
                <div class="col-12 mb-4">
                  <base-input>
                    <textarea
                      rows="5"
                      v-model="accountInfo"
                      :placeholder="'หมายเลขบัญชี: XXXX-XXXX-XXXX-XXXX\nชื่อบัญชี: XXXX\nธนาคาร: ธนาคารXXX สาขา XXX'"
                      class="form-control"
                    />
                  </base-input>
                </div>

                <div class="col-12 text-right" v-if="canEditBillingData">
                  <base-button
                    class=""
                    icon
                    type="secondary"
                    :disabled="isSubmittingCompanyData"
                  >
                    <span class="btn-inner--text">Cancel</span>
                  </base-button>

                  <base-button
                    class=""
                    icon
                    type="default"
                    @click="onSubmitCompanyData"
                    :disabled="isSubmittingCompanyData"
                  >
                    <span class="btn-inner--icon">
                      <i class="ni ni-send"></i>
                    </span>
                    <span class="btn-inner--text">Save</span>
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
import Swal from "sweetalert2";
import FavoriteButton from "./components/favorite-button.vue";
import axios from "axios";
import { mapState } from "vuex";
import {
  Table,
  TableColumn,
  Collapse,
  CollapseItem,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Select,
  Option,
} from "element-ui";

export default {
  middleware: "protected",
  layout: "DashboardLayout",
  name: "billings-masterdata",
  components: {
    FavoriteButton,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data() {
    return {
      userPermissions: [],

      activeIndex: 0,
      // Dropdown State
      loadingProvinces: false,
      loadingDistricts: false,
      loadingSubDistricts: false,
      subDistrictOptions: [],
      districtOptions: [],
      provinceOptions: [],
      companyPrefixOptions: [
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
      // Price Management
      tableData: [],
      currentEditRows: [],
      currentEditValues: {},
      // Billing Masterdata
      isSubmittingCompanyData: false,
      tin: Array(13).fill(""),
      companyPrefix: "",
      companyTitle: "",
      companyAddress: "",
      companyProvince: "",
      companyDistrict: "",
      companySubDistrict: "",
      companyPostalCode: "",
      contactPersonName: "",
      contactPhone: "",
      contactEmail: "",
      logo: null,
      eSignature: null,
      accountInfo: "",
    };
  },
  mounted() {
    clearInterval(this.polling);
    this.loadTestData();
    this.loadCompanyData();
    this.getProvinces();
    this.getUserPermissions();
  },
  watch: {
    companyProvince(newVal) {
      if (newVal) {
        this.getDistricts();

        this.districtOptions = [];
        this.subDistrictOptions = [];
      }
    },
    companyDistrict(newVal) {
      if (newVal) {
        this.getSubDistricts();
      }
    },
  },
  methods: {
    onChangeTab(index) {
      this.activeIndex = index;
    },
    filterInput(index) {
      const value = this.tin[index];
      if (!/^\d$/.test(value)) {
        this.tin[index] = "";
      } else {
        this.moveToNextBox(index);
      }
    },
    moveToNextBox(index) {
      if (this.tin[index].length === 1 && index < 12) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`tinInput${index + 1}`]?.[0];
          if (nextInput) {
            nextInput.focus();
          }
        });
      }
      this.validateTIN();
    },
    validateTIN() {
      // if (this.tax_id.join("").length !== 13) {
      //   this.tinError = "TIN must be exactly 13 digits long.";
      // } else {
      //   this.tinError = "";
      // }
    },
    handleBackspace(index, event) {
      if (event.key === "Backspace" && this.tin[index] === "" && index > 0) {
        this.$nextTick(() => {
          const prevInput = this.$refs[`tinInput${index - 1}`]?.[0];
          if (prevInput) {
            prevInput.focus();
          }
        });
      }
    },
    onUploadLogo() {
      document.getElementById("logo_picture").click();
    },
    onUploadSignature() {
      document.getElementById("signature_picture").click();
    },
    onChangeSignaturePicture(event) {
      const file = event.target.files[0];
      if (file.size > 3000000) {
        Swal.fire({
          icon: "error",
          title: "ขนาดไฟล์ใหญ่เกินไป",
          text: "กรุณาอัพโหลดรูปภาพขนาดไม่เกิน 3MB",
        });
        return;
      }
      this.eSignature = file;
    },
    onChangeLogoPicture(event) {
      const file = event.target.files[0];
      if (file.size > 3000000) {
        Swal.fire({
          icon: "error",
          title: "ขนาดไฟล์ใหญ่เกินไป",
          text: "กรุณาอัพโหลดรูปภาพขนาดไม่เกิน 3MB",
        });
        return;
      }
      this.logo = file;
    },
    onDeleteSignaturePicture() {
      this.eSignature = null;
    },
    onDeleteLogoPicture() {
      this.logo = null;
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
      if (this.companyProvince) {
        this.loadingDistricts = true;
        const url = `${this.$store.state.urlBase}/api/geo/provinces/${this.companyProvince}/districts`;
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
      if (this.companyDistrict) {
        this.loadingSubDistricts = true;
        const url = `${this.$store.state.urlBase}/api/geo/districts/${this.companyDistrict}/sub-districts`;
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
    loadCompanyData() {
      const url = `${this.$store.state.urlBase}/api/configs`;
      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          const {
            tax_id,
            business_type,
            business_name,
            address_details,
            district_subdistrict_id,
            city_district_id,
            province_id,
            postal_code,
            contact_name,
            contact_phone,
            bank_account_info,
            email,
            // signature_file,
            // logo_file,
            signature_file_path,
            logo_file_path,
          } = response;

          this.tin = tax_id.split("").slice(0, 13);
          if (this.tin.length < 13) {
            this.tin = [...Array(13)].map((_, i) => this.tin[i] ?? "");
          }
          this.companyPrefix = business_type;
          this.companyTitle = business_name;
          this.companyAddress = address_details;
          this.companyProvince = province_id;
          this.companyDistrict = city_district_id;
          this.companySubDistrict = district_subdistrict_id;
          this.companyPostalCode = postal_code;
          this.contactPersonName = contact_name;
          this.contactPhone = contact_phone;
          this.contactEmail = email;
          this.accountInfo = bank_account_info;
          this.eSignature = signature_file_path;
          this.logo = logo_file_path;
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Get company data failed",
              text: error.response.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Get company data failed",
              text: "An error occurred while getting company data.",
            });
          }
        });
    },
    loadTestData() {
      const url = `${this.$store.state.urlBase}/api/masterdata/data_test_primary?data=list`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          const results = response.map((item) => ({
            id: item.ID,
            TEST_NAME: item.NAME,
            PRICE: item.price,
          }));

          this.tableData = results;
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Get test data failed",
              text: error.response.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Get test data failed",
              text: "An error occurred while getting test data.",
            });
          }
        });
    },
    onStartEditRow(row) {
      this.currentEditRows.push(row.id);
      this.currentEditValues[row.id] = row.PRICE;
    },
    onCancelEditRow(row) {
      this.currentEditRows = this.currentEditRows.filter((id) => id !== row.id);
      this.currentEditValues[row.id] = null;
    },
    onSubmitEditRow(row) {
      const url = `${this.$store.state.urlBase}/api/masterdata/data_test_primary`;

      const finded = this.tableData.find((item) => item.id === row.id);
      const newValue = this.currentEditValues[row.id];

      const formData = new FormData();
      formData.append("TEST_PRIMARY_ID", row.id);
      formData.append("price", newValue);

      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.currentEditRows = this.currentEditRows.filter(
            (id) => id !== row.id
          );
          this.currentEditValues[row.id] = null;
          this.loadTestData();
        })
        .catch((error) => {
          if (error.response.message) {
            Swal.fire({
              icon: "error",
              title: "Update test data failed",
              text: error.response.message,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Update test data failed",
              text: "An error occurred while updating test data.",
            });
          }
        });
    },
    onChangeSubDistrict(newVal) {
      const subDistrict = this.subDistrictOptions.find(
        (item) => item.value === newVal
      );
      if (subDistrict) {
        this.companySubDistrict = newVal;
        this.companyPostalCode = subDistrict.zip_code;
      }
    },
    validateCompanyForm() {
      const requiredFields = [
        "tin",
        "companyPrefix",
        "companyTitle",
        "companyAddress",
        "companyProvince",
        "companyDistrict",
        "companySubDistrict",
        "companyPostalCode",
      ];

      for (let key of requiredFields) {
        if (key === "tin") {
          if (this.tin.join("").length !== 13) {
            Swal.fire({
              icon: "error",
              title: "Validation Error",
              text: "เลขประจำตัวผู้เสียภาษีต้องมี 13 หลัก",
            });
            return false;
          }
        } else if (!this[key] || String(this[key] ?? "").length === 0) {
          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: "กรุณากรอกข้อมูลให้ครบถ้วน",
          });
          return false;
        }
      }

      return true;
    },
    onSubmitCompanyData() {
      const validated = this.validateCompanyForm();
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
            const formData = new FormData();
            formData.append("tax_id", this.tin.join(""));
            formData.append("business_type", this.companyPrefix);
            formData.append("business_name", this.companyTitle);
            formData.append("address_details", this.companyAddress);
            formData.append("district_subdistrict_id", this.companySubDistrict);
            formData.append("city_district_id", this.companyDistrict);
            formData.append("province_id", this.companyProvince);
            formData.append("postal_code", this.companyPostalCode);
            formData.append("contact_name", this.contactPersonName);
            formData.append("contact_phone", this.contactPhone);
            formData.append("email", this.contactEmail);
            formData.append("bank_account_info", this.accountInfo);

            if (typeof this.logo === "object") {
              formData.append("logo_file", this.logo);
            }
            if (typeof this.eSignature === "object") {
              formData.append("signature_file", this.eSignature);
            }

            const url = `${this.$store.state.urlBase}/api/configs/update`;

            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then((response) => {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Company data has been updated successfully.",
                }).then(() => {
                  this.loadCompanyData();
                });
              })
              .catch((error) => {
                if (error.response.message) {
                  Swal.fire({
                    icon: "error",
                    title: "Update company data failed",
                    text: error.response.message,
                  });
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Update company data failed",
                    text: "An error occurred while updating company data.",
                  });
                }
              });
          }
        });
      }
    },
  },
  computed: {
    ...mapState(["profile"]),
    eSignatureLink() {
      if (typeof this.eSignature === "string") {
        return this.eSignature;
      } else {
        return URL.createObjectURL(this.eSignature);
      }
    },
    logoLink() {
      if (typeof this.logo === "string") {
        return this.logo;
      } else {
        return URL.createObjectURL(this.logo);
      }
    },
    canViewBillingData() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 15;
      });
    },
    canEditBillingData() {
      return this.userPermissions.some((permission) => {
        return permission.permission_id === 16;
      });
    },
  },
};
</script>

<style>
#document-issuer .el-collapse-item__header,
#universal-price .el-collapse-item__header {
  font-size: 18px;
}

.tin-input-container {
  display: flex;
  gap: 5px;
}
.tin-input {
  text-align: center;
}

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

.el-table__header-wrapper .thead-light.price-management-masterdata th {
  background-color: #172b4d !important;
  color: #ffffff !important;
  text-align: center !important;
}

.el-table__header-wrapper .thead-light.price-management-masterdata th .cell {
  justify-content: center !important;
}
</style>
