<template>
  <div>
    <modal
      :show.sync="modals.addNewUser"
      @close="onClose"
      size="xl"
      body-classes="p-0"
    >
      <card
        type="secondary"
        header-classes="bg-transparent pb-5"
        body-classes="px-lg-5 py-lg-5"
        class="border-0 mb-0"
      >
        <button
          type="button"
          class="swal2-close"
          aria-label="Close this dialog"
          style="display: flex"
          @click="onClose"
        >
          ×
        </button>

        <template>
          <form role="form">
            <h1 class="text-left">
              {{
                this.modals.modalType === "create" ? "New User" : "Edit User"
              }}
            </h1>
            <div class="text-center mb-4">
              <i class="fas fa-user-circle" style="font-size: 80px"></i>
            </div>
            <div class="row text-left align-items-center">
              <!-- First Row -->
              <div class="col-3">
                <h3>User Name <span class="text-red">*</span></h3>
                <base-input
                  alternative
                  v-model="formModal.username"
                  type="username"
                  placeholder="username"
                  :inputClasses="{
                    'border-danger border': errors ? errors.username : false,
                  }"
                >
                </base-input>
              </div>
              <div class="col-3">
                <h3>Password <span class="text-red">*</span></h3>
                <div class="row align-items-center justify-content-start">
                  <div class="col-10">
                    <base-input
                      alternative
                      v-model="formModal.password"
                      :type="formModal.showPassword ? 'text' : 'password'"
                      placeholder="Password"
                      :inputClasses="{
                        'border-danger border': errors
                          ? errors.password
                          : false,
                      }"
                    >
                    </base-input>
                  </div>
                  <div class="col-2">
                    <button
                      class="password-button"
                      type="button"
                      @click="toggleShowPassword"
                    >
                      <i
                        :class="{
                          'fa fa-eye': formModal.showPassword,
                          'fa fa-eye-slash': !formModal.showPassword,
                        }"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-3">
                <h3>First Name <span class="text-red">*</span></h3>
                <base-input
                  alternative
                  v-model="formModal.firstname"
                  type="firstname"
                  placeholder="firstname"
                  :inputClasses="{
                    'border-danger border': errors ? errors.username : false,
                  }"
                >
                </base-input>
              </div>
              <div class="col-3">
                <h3>Last Name <span class="text-red">*</span></h3>
                <base-input
                  alternative
                  v-model="formModal.lastname"
                  type="lastname"
                  placeholder="lastname"
                  :inputClasses="{
                    'border-danger border': errors ? errors.lastname : false,
                  }"
                >
                </base-input>
              </div>
              <!-- First Row -->

              <!-- Second Row -->
              <div class="col-3 mt-3">
                <h3>Phone <span class="text-red">*</span></h3>
                <base-input
                  alternative
                  v-model="formModal.phone"
                  type="phone"
                  placeholder="phone"
                  :inputClasses="{
                    'border-danger border': errors ? errors.phone : false,
                  }"
                >
                </base-input>
              </div>
              <div class="col-3 mt-3">
                <h3>E-Mail <span class="text-red">*</span></h3>
                <base-input
                  alternative
                  v-model="formModal.email"
                  type="email"
                  placeholder="email"
                  :inputClasses="{
                    'border-danger border': errors ? errors.email : false,
                  }"
                >
                </base-input>
              </div>
              <hr />
              <div
                :class="{
                  'custom-el-select-error': errors ? errors.location_id : false,
                  'col-3 mt-3': true,
                }"
              >
                <base-input>
                  <h3>Location <span class="text-red">*</span></h3>
                  <el-select
                    placeholder="Location"
                    filterable
                    v-model="formModal.location_id"
                  >
                    <el-option
                      v-for="item in locationSelect"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    >
                    </el-option>
                  </el-select>
                </base-input>
              </div>
              <div class="col-3 mt-3">
                <h3>Position</h3>
                <base-input
                  alternative
                  v-model="formModal.position"
                  type="text"
                  placeholder=""
                >
                </base-input>
              </div>
              <!-- Second Row -->

              <!-- Third Row -->
              <div class="col-3 mt-3">
                <h3>เลขที่ ท.น.</h3>
                <base-input
                  alternative
                  v-model="formModal.med_user_code"
                  type="text"
                  placeholder=""
                >
                </base-input>
              </div>
              <div class="col-3 mt-3">
                <h3 class="d-inline-block">E-Signature</h3>
                <span
                  style="color: #aeb5be; display: inline-block; font-size: 12px"
                  >(ขนาดไม่เกิน 300KB)</span
                >
                <base-button
                  icon
                  type="info"
                  style="
                    color: #182b4d;
                    background-color: #8fbde7;
                    border-color: #8fbde7;
                  "
                  @click="onUpload"
                >
                  <i class="fa fa-upload"></i>
                  {{
                    modals.modalType === "create"
                      ? formModal.signature_picture === null
                        ? "Upload your signature"
                        : "Upload again"
                      : "Upload your signature"
                  }}
                </base-button>

                <input
                  type="file"
                  id="signature_picture"
                  @change="onChangeSignaturePicture"
                  class="d-none"
                />
              </div>
              <div class="col-6"></div>

              <div class="col-3"></div>
              <div
                class="col-3 d-flex flex-row align-items-center mt-2"
                style="column-gap: 12px"
                v-if="formModal.signature_picture !== null"
              >
                <a
                  target="_blank"
                  v-if="formModal.signature_picture_path !== null"
                  :href="formModal.signature_picture_path"
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
                  >ลบรูปภาพ</span
                >
              </div>
              <!-- Third Row -->

              <!-- Fourth Row -->
              <template v-if="currentRow ? isSelf(currentRow) : true">
                <div class="col-12 my-4">
                  <h3 style="text-transform: capitalize; font-weight: bold">
                    user access permission
                  </h3>
                </div>

                <div class="col-12">
                  <base-button
                    type="success"
                    @click="toggleAllPermissions"
                    style="background-color: #9ec18a; border-color: #9ec18a"
                  >
                    <base-checkbox
                      :checked="areAllPermissionsSelected()"
                      style="
                        text-transform: capitalize;
                        pointer-events: none;
                        color: #182b4d;
                      "
                      >check all</base-checkbox
                    >
                  </base-button>
                </div>

                <div
                  class="col-3 mt-5 fw-bold"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  inbox section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 0, 3)"
                  :key="index"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  order monitoring section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 3, 6)"
                  :key="index + 'permission-order-monitoring'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  statistic section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 8, 9)"
                  :key="index + 'permission-stat'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>
                <div class="col-3 mt-5"></div>
                <div class="col-3 mt-5"></div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  clients section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 10, 12)"
                  :key="index + 'permission-clients'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>
                <div class="col-3 mt-5"></div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  billing section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 12, 14)"
                  :key="index + 'permission-billing'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>
                <div class="col-3 mt-5"></div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  billing data section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 14, 16)"
                  :key="index + 'permission-billing-data'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>
                <div class="col-3 mt-5"></div>

                <div
                  class="col-3 mt-5"
                  style="text-transform: capitalize; font-weight: bold"
                >
                  admin section
                </div>
                <div
                  class="col-3 mt-5"
                  v-for="(permission, index) in arraySlice(permissions, 6, 8)"
                  :key="index + 'permission-admin'"
                >
                  <!-- <div @click="togglePermission(permission.id)"> -->
                  <base-checkbox
                    :checked="isPermissionSelected(permission.id)"
                    @input="togglePermission(permission.id)"
                    style="text-transform: capitalize"
                  >
                    {{ permission.title }}
                  </base-checkbox>
                  <!-- </div> -->
                </div>
              </template>
              <!-- Fourth Row -->

              <!-- Fifth Row -->
              <div class="col-12 text-right">
                <base-button
                  type="secondary"
                  class="my-4"
                  @click="onClose"
                  style="text-transform: uppercase"
                  >cancel</base-button
                >
                <base-button
                  type="primary"
                  class="my-4"
                  @click="submitFormModal"
                  style="text-transform: uppercase"
                  >save</base-button
                >
              </div>
              <!-- Fifth Row -->
            </div>
          </form>
        </template>
      </card>
    </modal>

    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1">
            <h1 class="text-white">User</h1>
          </div>
          <!-- <div class="col col-xl text-center">
            <div class="bg-secondary py-1 px-2 border rounded">
              <div class="d-flex flex-row align-items-center">
                <div class="mr-2" style="cursor: pointer">
                  <i class="fas fa-search"></i>
                </div>
                <div class="flex-grow-1">
                  <input
                    type="text"
                    class="w-100 border-0 input-style"
                    placeholder="Search..."
                    v-model="searchText"
                    @input="onChangeSearchText"
                  />
                </div>
              </div>
            </div>
          </div> -->
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/user" />
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-12 col-lg-4">
          <base-button
            icon
            type="default"
            @click="onNewUser"
            class="d-inline-block"
          >
            <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
            <span class="btn-inner--text">New User</span>
          </base-button>
          <div class="ml-4 pr-4 d-inline-block">All User {{ total }}</div>
        </div>

        <div class="col-12 col-lg-5 text-right">
          <div
            class="bg-white py-2 px-2 border rounded d-inline-block mr-4 w-75"
          >
            <div class="d-flex flex-row align-items-center">
              <div class="mr-2" style="cursor: pointer">
                <i class="fas fa-search"></i>
              </div>
              <div class="flex-grow-1">
                <input
                  type="text"
                  class="w-100 border-0 input-style"
                  v-model="searchText"
                  @input="onChangeSearchText"
                  placeholder="Text Search..."
                  style="font-size: 0.875rem; outline: none"
                />
              </div>
            </div>
          </div>
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

        <div class="col-12 col-lg-3 text-right">
          <base-button icon type="default">
            <span class="btn-inner--icon"
              ><i class="fas fa-printni fa-print"></i
            ></span>
          </base-button>
          <base-button icon type="default" class="" @click="onExport">
            <span class="btn-inner--icon"
              ><i class="fas fa-file-export"></i
            ></span>
            <span class="btn-inner--text">Export</span>
          </base-button>
        </div>

        <!-- <div class="row my-4 mx-1">
          <div
            class="col text-center"
            :class="{
              'active-tab': tableType === 0,
              'tab-table': tableType !== 0,
            }"
            @click="changeTableType(0)"
          >
            User
          </div>
          <div
            class="col text-center"
            :class="{
              'active-tab': tableType === 1,
              'tab-table': tableType !== 1,
            }"
            @click="changeTableType(1)"
          >
            Role
          </div>
        </div> -->
        <div class="col-12 mt-4">
          <div class="card">
            <el-table
              class="table-responsive table-flush"
              header-row-class-name="thead-light"
              highlight-current-row
              row-key="id"
              :data="filteredUsers"
              ref="singleTable"
              @selection-change="onSelectionChange"
              @current-change="handleCurrentChange"
            >
              <el-table-column label="User ID" prop="id" width="80">
                <template v-slot="{ row }">
                  <b>{{ row.id }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="User Name"
                prop="username"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.username }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="Firstname"
                prop="firstname"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.firstname ? row.firstname : "-" }}</b>
                </template>
              </el-table-column>

              <el-table-column label="Lastname" prop="lastname" min-width="130">
                <template v-slot="{ row }">
                  <b>{{ row.lastname ? row.lastname : "-" }}</b>
                </template>
              </el-table-column>
              <!-- <el-table-column label="Role" prop="roleName" min-width="130">
                <template v-slot="{ row }">
                  <b>{{ row.roleName }}</b>
                </template>
              </el-table-column> -->
              <el-table-column label="email" prop="EMAIL" min-width="130">
                <template v-slot="{ row }">
                  <b> {{ row.email }}</b>
                </template>
              </el-table-column>
              <!-- <el-table-column label="IP" prop="IP_ADDRESS" width="130">
                <template v-slot="{ row }">
                  <b>{{ row.IP_ADDRESS }}</b>
                </template>
              </el-table-column> -->

              <!-- <el-table-column label="status" prop="status" width="200">
                <template v-slot="{ row }">
                  <div class="d-flex justify-content-between">
                    <b>{{ row.status }}</b>
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column>
                <template slot-scope="{ $index, row }">
                  <a
                    class="mr-2"
                    @click="onEditUser(row.id, $index)"
                    style="cursor: pointer"
                  >
                    <i class="far fa-edit" style="color: #2c7ef9"></i>
                  </a>
                  <a
                    @click="onDelete(row.id)"
                    style="cursor: pointer"
                    v-if="isSelf(row.id)"
                  >
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import FavoriteButton from "./components/favorite-button.vue";
import BaseSlider from "@/components/argon-core/BaseSlider";
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
import * as Yup from "yup";

export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "UserList",
  components: {
    Modal,
    BaseAlert,
    BaseSlider,
    BasePagination,
    FavoriteButton,
    [Tooltip.name]: Tooltip,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Select.name]: Select,
    [Option.name]: Option,
  },

  data() {
    return {
      errors: {},
      validationSchema: Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().test("len", "Password is required", (val) => {
          if (
            this.modals.modalType === "edit" &&
            this.formModal.password === ""
          ) {
            return true;
          }

          return val.length > 0;
        }),
        firstname: Yup.string().required("Firstname is required"),
        lastname: Yup.string().required("Lastname is required"),
        phone: Yup.string().required("Phone is required"),
        email: Yup.string().required("Email is required"),
        location_id: Yup.string().required("Location is required"),
        // position: Yup.string().required("Position is required"),
        // med_user_code: Yup.string().required("Med User Code is required"),
        permissions: Yup.array()
          .min(1, "Permissions is required")
          .required("Permissions is required"),
      }),
      searchText: "",
      modals: {
        addNewUser: false,
        modalType: "create",
      },
      formModal: {
        showPassword: false,
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        location_id: "",
        position: "",
        // เลขที่ใบ ทน.
        med_user_code: "",
        signature_picture: null,
        signature_picture_path: null,
        permissions: [],
      },
      select: {
        locationData: [],
      },
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      specimen: null,
      wardComment: "",
      labComment: "",
      selectTestCode: [
        {
          label: "true",
          value: true,
        },
        {
          label: "false",
          value: false,
        },
      ],
      selectTestName: [
        {
          label: "true",
          value: true,
        },
        {
          label: "false",
          value: false,
        },
      ],
      selectSpecimen: [
        {
          label: "true",
          value: true,
        },
        {
          label: "false",
          value: false,
        },
      ],
      selectStatus: [
        {
          label: "true",
          value: true,
        },
        {
          label: "false",
          value: false,
        },
      ],
      selectedTab: 0,
      tableData: [],
      filteredUsers: [],
      selectedRows: [],
      currentRow: null,
      locationSelect: [],
      location: "",
      roleSelect: [],
      inputRole: "",
      permissions: [],
    };
  },

  mounted() {
    // clearInterval(this.polling);

    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken == null) {
      this.$router.push("/login");
    }

    this.getLocation();
    this.getPermissions();
    this.loadData();

    // this.polling = setInterval(() => {
    //   this.loadData();
    // }, 5000);
  },
  methods: {
    toggleShowPassword() {
      this.formModal.showPassword = !this.formModal.showPassword;
    },
    onExport() {
      const url = `${this.$store.state.urlBase}/export-user`;

      window.open(url, "_blank");
    },
    onUpload() {
      document.querySelector("input#signature_picture").click();
    },
    onChangeSignaturePicture(event) {
      const file = event.target.files[0];
      this.formModal.signature_picture = file;
      this.formModal.signature_picture_path = null;
      event.target.value = null;
    },
    onDeleteSignaturePicture() {
      this.formModal.signature_picture = null;
      this.formModal.signature_picture_path = null;
    },

    isSelf(_id) {
      return this.$store.state.profile?.id !== _id;
    },
    onChangeSearchText(event) {
      this.searchText = event.target.value;
    },
    onConfirmSearch() {
      const lowerCaseSearchText = this.searchText.toLowerCase();
      const newData = this.tableData.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseSearchText) ||
          user.firstname.toLowerCase().includes(lowerCaseSearchText) ||
          user.lastname.toLowerCase().includes(lowerCaseSearchText) ||
          user.email.toLowerCase().includes(lowerCaseSearchText)
      );
      this.filteredUsers = newData;
    },

    changeTab(tab) {
      this.selectedTab = tab;
    },
    changeTableType(type) {
      this.tableType = type;
    },
    onSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    handleCurrentChange(val) {
      this.currentRow = val.id;
    },

    arraySlice(array = [], start = 0, stop = 3) {
      return array.slice(start, stop);
    },

    togglePermission(permissionId) {
      const permissionIndex = this.formModal.permissions.findIndex(
        (permission) => permission.permission_id === permissionId
      );

      if (permissionIndex > -1) {
        // If the permission is currently selected, remove it
        this.formModal.permissions = [
          ...this.formModal.permissions.filter(
            (permission) => permission.permission_id !== permissionId
          ),
        ];
      } else {
        const newPermissions = [...this.formModal.permissions];
        newPermissions.push({
          permission_id: permissionId,
        });

        this.formModal.permissions = newPermissions;
      }
    },
    toggleAllPermissions() {
      if (this.areAllPermissionsSelected()) {
        // If all permissions are currently selected, deselect all
        this.formModal.permissions = [];
      } else {
        // If not all permissions are currently selected, select all
        this.formModal.permissions = this.permissions.map((permission) => ({
          permission_id: permission.id,
        }));
      }
    },
    areAllPermissionsSelected() {
      return this.permissions.length === this.formModal.permissions.length;
    },

    resetModalState() {
      this.formModal.showPassword = false;
      this.formModal.username = "";
      this.formModal.password = "";
      this.formModal.firstname = "";
      this.formModal.lastname = "";
      this.formModal.phone = "";
      this.formModal.email = "";
      this.formModal.location_id = "";
      this.formModal.position = "";
      this.formModal.med_user_code = "";
      this.formModal.signature_picture = null;
      this.formModal.signature_picture_path = null;
      this.formModal.permissions = [];
    },

    onClose() {
      this.resetModalState();

      this.errors = {};
      this.currentRow = null;
      this.modals.modalType = "create";
      this.modals.addNewUser = false;
    },
    onNewUser() {
      this.resetModalState();

      this.currentRow = null;
      this.modals.addNewUser = true;
      this.modals.modalType = "create";
    },
    onEditUser(id) {
      this.resetModalState();

      const url = this.$store.state.urlBase + "/api/users/" + id;
      axios
        .get(url)
        .then((res) => {
          const {
            firstname,
            lastname,
            username,
            email,
            location_id,
            med_user_code,
            position,
            phone,
            permissions,
            signature_picture,
            signature_picture_path,
          } = res.data;

          this.formModal.password = "";
          this.formModal.username = username;
          this.formModal.firstname = firstname;
          this.formModal.lastname = lastname;
          this.formModal.phone = phone;
          this.formModal.email = email;
          this.formModal.location_id = location_id
            ? location_id.toString()
            : null;
          this.formModal.med_user_code = med_user_code;
          this.formModal.position = position;
          this.formModal.permissions = permissions;
          this.formModal.signature_picture_path = signature_picture_path;
          this.formModal.signature_picture = signature_picture;

          this.currentRow = id;
          this.modals.addNewUser = true;
          this.modals.modalType = "edit";
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "View User Failed",
            text:
              err?.response?.data?.message ?? err?.response?.data?.toString(),
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },

    onDelete(user_id) {
      swal
        .fire({
          title: "Delete User",
          text: "This account will be deleted and cannot access this system anymore",
          icon: "warning",
          showCancelButton: true,
          confirmButtonClass: "btn btn-danger",
          cancelButtonClass: "btn btn-secondary ml-1",
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          buttonsStyling: false,
        })
        .then((result) => {
          if (result.value) {
            this.delete(user_id);
          }
        });
    },
    delete(user_id) {
      if (user_id) {
        const url = this.$store.state.urlBase + "/api/users/" + user_id;
        axios({
          method: "DELETE",
          url,
        })
          .then((res) => {
            swal
              .fire({
                icon: "success",
                title: "Delete Success",
                showConfirmButton: false,
                timer: 1000,
              })
              .then(() => {
                this.loadData();
              });
          })
          .catch((err) => {
            swal.fire({
              icon: "error",
              title: "Delete Failed",
              showConfirmButton: false,
              timer: 1000,
            });
          });
      }
    },
    submitFormModal() {
      this.validationSchema
        .validate(this.formModal, {
          abortEarly: false,
        })
        .then(() => {
          this.errors = {};

          if (this.modals.modalType === "create") {
            if (
              this.formModal.username === "" ||
              this.formModal.password === "" ||
              this.formModal.email === ""
            ) {
              swal.fire({
                icon: "error",
                title: "Please fill in username, password and email",
                showConfirmButton: false,
                timer: 1000,
              });
              return;
            }

            const formData = new FormData();
            formData.append(
              "username",
              this.formModal.username ? this.formModal.username.trim() : ""
            );
            formData.append(
              "password",
              this.formModal.password ? this.formModal.password.trim() : ""
            );
            formData.append("firstname", this.formModal.firstname ?? "");
            formData.append("lastname", this.formModal.lastname ?? "");
            formData.append("phone", this.formModal.phone ?? "");
            formData.append("email", this.formModal.email ?? "");
            formData.append("location_id", this.formModal.location_id ?? "");
            formData.append("position", this.formModal.position ?? "");
            formData.append(
              "med_user_code",
              this.formModal.med_user_code ?? ""
            );
            if (this.formModal.signature_picture) {
              formData.append(
                "signature_picture",
                this.formModal.signature_picture
              );
            }
            this.formModal.permissions.forEach((permission) => {
              formData.append("permission_id[]", permission.permission_id);
            });
            const url = this.$store.state.urlBase + "/api/users";
            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then((response) => {
                this.currentRow = null;
                this.modals.addNewUser = false;
                this.modals.modalType = "create";

                swal
                  .fire({
                    icon: "success",
                    title: "Create Success",
                    showConfirmButton: false,
                    timer: 1000,
                  })
                  .then(() => {
                    this.resetModalState();
                    this.loadData();
                  });
              })
              .catch((err) => {
                swal.fire({
                  icon: "error",
                  title: "Create Failed",
                  text:
                    err?.response?.data?.message ??
                    err?.response?.data?.toString(),
                  showConfirmButton: false,
                  showConfirmButton: true,
                  buttonsStyling: false,
                  confirmButtonText: "Confirm",
                  customClass: {
                    confirmButton: "btn btn-default",
                    cancelButton: "btn btn-light",
                    denyButton: "btn btn-danger",
                  },
                });
              });
          } else if (this.modals.modalType === "edit") {
            const formData = new FormData();
            formData.append(
              "username",
              this.formModal.username ? this.formModal.username.trim() : ""
            );
            if (this.formModal.password !== "") {
              formData.append(
                "password",
                this.formModal.password ? this.formModal.password.trim() : ""
              );
            }
            formData.append("firstname", this.formModal.firstname);
            formData.append("lastname", this.formModal.lastname);
            formData.append("phone", this.formModal.phone);
            formData.append("email", this.formModal.email);
            formData.append("location_id", this.formModal.location_id);
            formData.append("position", this.formModal.position);
            formData.append("med_user_code", this.formModal.med_user_code);
            if (
              this.formModal.signature_picture_path === null &&
              this.formModal.signature_picture
            ) {
              formData.append(
                "signature_picture",
                this.formModal.signature_picture
              );
            }
            this.formModal.permissions.forEach((permission) => {
              formData.append("permission_id[]", permission.permission_id);
            });
            const url =
              this.$store.state.urlBase +
              "/api/users/" +
              this.currentRow +
              "?_method=PUT";
            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then((response) => {
                this.currentRow = null;
                this.modals.addNewUser = false;
                this.modals.modalType = "create";

                swal
                  .fire({
                    icon: "success",
                    title: "Edit Success",
                    showConfirmButton: false,
                    timer: 1000,
                  })
                  .then(() => {
                    this.resetModalState();
                    this.loadData();
                  });
              })
              .catch((err) => {
                swal.fire({
                  icon: "error",
                  title: "Create Failed",
                  text:
                    err?.response?.data?.message ??
                    err?.response?.data?.toString(),
                  showConfirmButton: true,
                  buttonsStyling: false,
                  confirmButtonText: "Confirm",
                  customClass: {
                    confirmButton: "btn btn-default",
                    cancelButton: "btn btn-light",
                    denyButton: "btn btn-danger",
                  },
                });
              });
          }
        })
        .catch((err) => {
          const newErrors = err.inner.reduce((all, e) => {
            all[e.path] = e.message;
            return all;
          }, {});
          this.errors = newErrors;

          swal.fire({
            icon: "error",
            title:
              "กรุณากรอกรายละเอียดในช่องที่ทำเครื่องหมาย * <br/> ให้ครบถ้วน เพื่อดำเนินการต่อ",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              popup: "custom-swal2-container",
            },
          });
          return;
        });
    },

    loadData() {
      const url = this.$store.state.urlBase + "/api/users";
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response;

        let tmpTableData = [];
        result.forEach((element) => {
          tmpTableData.push(element);
        });

        this.tableData = tmpTableData;
        this.filteredUsers = tmpTableData;
      });
    },
    getLocation() {
      const url =
        this.$store.state.urlBase + "/api/masterdata/data_location?data=reason";
      axios
        .get(url)
        .then((response) => {
          this.locationSelect = response;
        })
        .catch(function (error) {
          // handle error
          console.log("getLocation error:", error);
        });
    },
    getPermissions() {
      const url = this.$store.state.urlBase + "/api/masterdata/permissions";

      axios
        .get(url)
        .then((response) => {
          this.permissions = response;
        })
        .catch((err) => {
          console.log("getPermissions error:", err);
        });
    },
  },

  computed: {
    isPermissionSelected() {
      return (permissionId) =>
        this.formModal.permissions.find(
          (permission) => permission.permission_id === permissionId
        ) !== undefined;
    },
    // filteredUsers() {
    //   if (!this.searchText || this.searchText === "") {
    //     return this.tableData;
    //   }
    //   const lowerCaseSearchText = this.searchText.toLowerCase();
    //   return this.tableData.filter(
    //     (user) =>
    //       user.username.toLowerCase().includes(lowerCaseSearchText) ||
    //       user.firstname.toLowerCase().includes(lowerCaseSearchText) ||
    //       user.lastname.toLowerCase().includes(lowerCaseSearchText) ||
    //       user.email.toLowerCase().includes(lowerCaseSearchText)
    //   );
    // },
  },
};
</script>
<style>
.btn-save {
  color: white !important;
  background-color: #98999d;
  border-color: #98999d;
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
}

.custom-el-select-error .el-input__inner {
  border-color: #f56c6c !important;
  border-radius: 0.25rem !important;
}

.custom-swal2-container {
  width: 50vw !important;
}
</style>
<style scoped>
.active-tab {
  font-weight: bold;
  border-bottom: 4px solid #808080;
}
.tab {
  cursor: pointer;
}
.tab-table {
  cursor: pointer;
  border-bottom: 1px solid #808080;
  padding-bottom: 4p;
}
.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
.swal2-actions {
  justify-content: start !important;
}

.password-button {
  background-color: #ffffff !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
  cursor: pointer !important;
  border-radius: 8px;
  transition: all 300ms ease-in-out;
}

.password-button:hover {
  background-color: #eeee;
}
</style>
