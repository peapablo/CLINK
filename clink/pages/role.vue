<template>
  <div class="">
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1 ">
            <h1 class="text-white">Role </h1>
          </div>
          <div class="col col-xl text-center">
            <div class="bg-secondary py-1 px-2 border rounded">
              <div class="d-flex flex-row align-items-center">
                <div
                  class="mr-2"
                  style="cursor: pointer;"
                >
                  <i class="fas fa-search"></i>
                </div>
                <div class="flex-grow-1">
                  <input
                    type="text"
                    class="w-100 border-0 input-style"
                    v-model="searchQuery"
                    placeholder="Role Search..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-auto col-xl">

          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid row">
      <div class="col-12">
        <div class="d-flex flex-column flex-md-row mt-4 align-items-center">
          <div class="d-flex align-items-center">
            <base-button
              outline
              icon
              type="default"
              @click="modals.addNewRole = true"
            >
              <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
              <span class="btn-inner--text">New Role</span>
            </base-button>
            <div class="ml-4 pr-4">All Role {{ total }}</div>
          </div>
          <div class="ml-md-auto mb-4">
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

        <div class="card mt-4">
          <el-table
            class="table-responsive table-flush"
            header-row-class-name="thead-light"
            highlight-current-row
            row-key="id"
            :data="queriedData"
            ref="singleTable"
          >
            <el-table-column
              label="Role ID"
              prop="ID"
            >
              <template v-slot="{ row }">
                <b>{{ row.ID }}</b>
              </template>
            </el-table-column>
            <el-table-column
              label="Role Name"
              prop="NAME"
            >
              <template v-slot="{ row }">
                <b>{{ row.NAME }}</b>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="{ $index, row }">
                <a
                  class="mr-2"
                  @click="editRow(row, $index)"
                  style="cursor: pointer"
                >
                  <i class="far fa-edit"></i>
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

        <!-- add role -->
        <modal
          :show.sync="modals.addNewRole"
          size="lg"
          body-classes="p-0"
        >
          <card
            type="secondary"
            header-classes="bg-transparent pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0"
          >
            <template>
              <h1 class="text-left">Add Role</h1>
              <div class="text-center  mb-4">
                <i
                  class="fas fa-user-circle"
                  style="font-size: 80px"
                ></i>
              </div>
              <div class="row text-left">
                <div class="col-6">
                  <h3>Role name</h3>
                  <base-input
                    alternative
                    v-model="formModalAddRole.name"
                    placeholder="Role name"
                  >
                  </base-input>
                </div>
                <div class="col-6">
                  <h3>Role ID</h3>
                  <base-input
                    alternative
                    v-model="formModalAddRole.id"
                    placeholder="Role ID"
                  >
                  </base-input>
                </div>
                <div class="col-6">
                  <h3>Check-in</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.CheckIn"
                        type="CheckIn_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.CheckIn"
                        type="CheckIn_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Result entry</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.ResultEntry"
                        type="ResultEntry_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.ResultEntry"
                        type="ResultEntry_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Prelim</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.Prelim"
                        type="Prelim_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.Prelim"
                        type="Prelim_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Validate</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.Validate"
                        type="Validate_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.Validate"
                        type="Validate_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Approve</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.Approve"
                        type="Approve_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.Approve"
                        type="Approve_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Data Setting</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.DataSetting"
                        type="DataSetting_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.DataSetting"
                        type="DataSetting_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>User Setting</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalAddRole.UserSetting"
                        type="UserSetting_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalAddRole.UserSetting"
                        type="UserSetting_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <base-button
                  type="primary"
                  class="my-4 btn-block"
                  @click="addNewRole()"
                >SAVE</base-button>
              </div>
            </template>
          </card>
        </modal>

        <!-- edit role -->
        <modal
          :show.sync="modals.editRole"
          size="lg"
          body-classes="p-0"
        >
          <card
            type="secondary"
            header-classes="bg-transparent pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0 mb-0"
          >
            <template>
              <h1 class="text-left">Edit Role</h1>
              <div class="text-center  mb-4">
                <i
                  class="fas fa-user-circle"
                  style="font-size: 80px"
                ></i>
              </div>
              <div class="row text-left">
                <div class="col-6">
                  <h3>Role name</h3>
                  <base-input
                    alternative
                    v-model="formModalEditRole.name"
                    placeholder="Role name"
                  >
                  </base-input>
                </div>
                <div class="col-6">
                  <h3>Role ID</h3>
                  <base-input
                    alternative
                    v-model="formModalEditRole.newId"
                    placeholder="Role ID"
                  >
                  </base-input>
                </div>
                <div class="col-6">
                  <h3>Check-in</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.CheckIn"
                        type="CheckIn_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.CheckIn"
                        type="CheckIn_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Result entry</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.ResultEntry"
                        type="ResultEntry_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.ResultEntry"
                        type="ResultEntry_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Prelim</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.Prelim"
                        type="Prelim_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.Prelim"
                        type="Prelim_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Validate</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.Validate"
                        type="Validate_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.Validate"
                        type="Validate_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Approve</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.Approve"
                        type="Approve_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.Approve"
                        type="Approve_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>Data Setting</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.DataSetting"
                        type="DataSetting_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.DataSetting"
                        type="DataSetting_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <h3>User Setting</h3>
                  <div class="row">
                    <div class="col-lg">
                      <base-radio
                        name="1"
                        alternative
                        v-model="formModalEditRole.UserSetting"
                        type="UserSetting_true"
                        >Yes</base-radio
                      >
                    </div>
                    <div class="col-lg">
                      <base-radio
                        alternative
                        name="0"
                        v-model="formModalEditRole.UserSetting"
                        type="UserSetting_false"
                        >No</base-radio
                      >
                    </div>
                  </div>
                </div>
              </div>

              <div class="text-center">
                <base-button
                  type="primary"
                  class="my-4 btn-block"
                  @click="editRole()"
                >SAVE</base-button>
              </div>
            </template>
          </card>
        </modal>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSlider from '@/components/argon-core/BaseSlider';
import { Modal, BaseAlert, BasePagination } from '@/components/argon-core';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin';
import { ofetch } from 'ofetch';
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';

import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Tooltip,
  Select,
  Option,
} from 'element-ui';
export default {
  mixins: [clientPaginationMixin],
  layout: 'DashboardLayout',
  name: 'inbox',
  components: {
    Modal,
    BaseAlert,
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
    RouteBreadCrumb,
  },
  data() {
    return {
      modals: {
        addNewRole: false,
        editRole: false,
      },
      formModalAddRole: {
        id: "",
        name: "",
        CheckIn: "",
        ResultEntry: "",
        Prelim: "",
        Validate: "",
        Approve: "",
        DataSetting: "",
        UserSetting: "",
      },
      formModalEditRole: {
        newId: "",
        name: "",
        oldId: "",
        CheckIn: "",
        ResultEntry: "",
        Prelim: "",
        Validate: "",
        Approve: "",
        DataSetting: "",
        UserSetting: "",
      },
      roleSelect: [],
      tableData: [],
    };
  },
  mounted() {
    this.getRole();
  },
  methods: {
    addNewRole() {
      const url =
        this.$store.state.urlBase +
        "s/api/sys_role.php?data=add&mode=add&roleName=" +
        this.formModalAddRole.name +
        "&roleId=" +
        this.formModalAddRole.id+
        "&roleCheckIn=" +
        this.formModalAddRole.CheckIn+
        "&roleResultEntry=" +
        this.formModalAddRole.ResultEntry+
        "&rolePrelim=" +
        this.formModalAddRole.Prelim+
        "&roleValidate=" +
        this.formModalAddRole.Validate+
        "&roleApprove=" +
        this.formModalAddRole.Approve+
        "&roleDataSetting=" +
        this.formModalAddRole.DataSetting+
        "&roleUserSetting=" +
        this.formModalAddRole.UserSetting;

      axios({
        method: 'post',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        const result = response;
        if (result['status'] == 'success') {
          this.modals.addNewRole = false;
          this.$swal('บันทึกสำเร็จค่ะ');
          this.getRole();
          this.formModalAddRole.name = "";
          this.formModalAddRole.id = "";
          this.formModalAddRole.CheckIn = "";
          this.formModalAddRole.ResultEntry = "";
          this.formModalAddRole.Prelim = "";
          this.formModalAddRole.Validate = "";
          this.formModalAddRole.Approve = "";
          this.formModalAddRole.DataSetting = "";
          this.formModalAddRole.UserSetting = "";
          return true;
        } else {
          this.$swal('Save failed');
          return false;
        }
      });
    },
    editRow(row, index) {
      this.formModalEditRole.name = row.NAME;
      this.formModalEditRole.newId = row.ID;
      this.formModalEditRole.oldId = row.ID;
      this.formModalEditRole.CheckIn = row.ALLOW_CHECKIN;
      this.formModalEditRole.ResultEntry = row.ALLOW_RESULT;
      this.formModalEditRole.Prelim = row.ALLOW_PRELIMINARY;
      this.formModalEditRole.Validate = row.ALLOW_VALIDATE;
      this.formModalEditRole.Approve = row.ALLOW_APPROVE;
      this.formModalEditRole.DataSetting = row.ALLOW_DATA_SETTING;
      this.formModalEditRole.UserSetting = row.ALLOW_USER_SETTING;
      this.modals.editRole = true;
    },
    editRole() {
      const url =
        this.$store.state.urlBase +
        's/api/sys_role.php?data=edit&mode=edit&roleName=' +
        this.formModalEditRole.name +
        '&roleNewId=' +
        this.formModalEditRole.newId +
        "&roleOldId=" +
        this.formModalEditRole.oldId+
        "&roleCheckIn=" +
        this.formModalEditRole.CheckIn+
        "&roleResultEntry=" +
        this.formModalEditRole.ResultEntry+
        "&rolePrelim=" +
        this.formModalEditRole.Prelim+
        "&roleValidate=" +
        this.formModalEditRole.Validate+
        "&roleApprove=" +
        this.formModalEditRole.Approve+
        "&roleDataSetting=" +
        this.formModalEditRole.DataSetting+
        "&roleUserSetting=" +
        this.formModalEditRole.UserSetting;
      axios({
        method: 'post',
        url: url,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((response) => {
        const result = response;
        if (result['status'] == 'success') {
          this.modals.editRole = false;
          this.$swal('บันทึกสำเร็จค่ะ');
          this.getRole();
          return true;
        } else {
          this.$swal('Save failed');
          return false;
        }
      });
    },
    getRole() {
      const url = this.$store.state.urlBase + 'api/sys_role.php?data=reason';
      axios
        .get(url)
        .then((response) => {
          this.roleSelect = response;
          this.tableData = response;
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
<style>
.swal2-actions {
  justify-content: start !important;
}
.btn-save {
  color: white !important;
  background-color: #98999d;
  border-color: #98999d;
  box-shadow: 0 4px 6px rgb(50 50 93 / 11%), 0 1px 3px rgb(0 0 0 / 8%);
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
</style>



