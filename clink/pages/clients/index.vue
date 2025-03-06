<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1">
            <h1 class="text-white">Client List</h1>
          </div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/clients" />
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-12 col-lg-4">
          <base-button
            icon
            type="default"
            @click="onNew"
            class="d-inline-block"
            v-if="canEditClients"
          >
            <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
            <span class="btn-inner--text">New Client</span>
          </base-button>
          <div class="ml-4 pr-4 d-inline-block">All Client {{ total }}</div>
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
          <!-- <base-button icon type="default">
            <span class="btn-inner--icon"
              ><i class="fas fa-printni fa-print"></i
            ></span>
          </base-button> -->
          <base-button icon type="default" class="" @click="onExport">
            <span class="btn-inner--icon"
              ><i class="fas fa-file-export"></i
            ></span>
            <span class="btn-inner--text">Export</span>
          </base-button>
        </div>

        <div class="col-12 mt-4">
          <div class="card">
            <el-table
              class="table-responsive table-flush"
              header-row-class-name="thead-light"
              highlight-current-row
              row-key="id"
              :data="tableData"
              ref="singleTable"
              @selection-change="onSelectionChange"
            >
              <el-table-column
                label="ชื่อกิจการ"
                prop="business_name"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.business_name }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="เลขที่ประจำตัวผู้เสียภาษี"
                prop="tax_id"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.tax_id ? row.tax_id : "-" }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="ชื่อผู้ติดต่อ"
                prop="contact_name"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.contact_name ? row.contact_name : "-" }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="เบอร์ติดต่อ"
                prop="contact_phone"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b> {{ row.contact_phone }}</b>
                </template>
              </el-table-column>

              <el-table-column>
                <template slot-scope="{ $index, row }">
                  <a
                    class="mr-2"
                    @click="onEdit(row.id, $index)"
                    style="cursor: pointer"
                  >
                    <i class="far fa-edit" style="color: #2c7ef9"></i>
                  </a>
                  <a
                    @click="onDelete(row.id)"
                    style="cursor: pointer"
                    v-if="canEditClients"
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
import Swal from "sweetalert2";
import FavoriteButton from "../components/favorite-button.vue";
import { Modal, BaseAlert, BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import axios from "axios";
import { mapState } from "vuex";
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

export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "clients",
  components: {
    FavoriteButton,
    Modal,
    BaseAlert,
    BasePagination,
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
      searchText: "",
      tableData: [],
      selectedRows: [],
      userPermissions: [],
    };
  },
  mounted() {
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken == null) {
      this.$router.push("/login");
    }

    this.loadData();
    this.getUserPermissions();
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
    loadData() {
      const url = `${this.$store.state.urlBase}/api/customers`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "application/json" },
        params: { search: this.searchText },
      }).then((response) => {
        const result = response;
        if (result !== null) {
          let tmpTableData = result;
          this.tableData = tmpTableData;
        }
      });
    },
    handleDelete(id) {
      const url = `${this.$store.state.urlBase}/api/customers/${id}`;

      axios({
        method: "delete",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          const result = response;
          if (result !== null) {
            Swal.fire({
              title: "Success",
              text: "Client has been deleted",
              icon: "success",
              confirmButtonClass: "btn btn-success",
              confirmButtonText: "Close",
              buttonsStyling: false,
            });
            this.loadData();
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "Error",
            text: "Cannot delete this client",
            icon: "error",
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Close",
            buttonsStyling: false,
          });
        });
    },
    onChangeSearchText(event) {
      this.searchText = event.target.value;
    },
    onNew() {
      this.$router.push("/clients/new");
    },
    onEdit(id) {
      this.$router.push(`/clients/${id}`);
    },
    onDelete(id) {
      Swal.fire({
        title: "Delete Client",
        text: "This client will be deleted permanently",
        icon: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn btn-danger",
        cancelButtonClass: "btn btn-secondary ml-1",
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        buttonsStyling: false,
      }).then((result) => {
        if (result.value) {
          this.handleDelete(id);
        }
      });
    },
    onConfirmSearch() {
      this.pagination.currentPage = 1;
      this.loadData();
    },
    onSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },
    onExport() {
      const url = `${this.$store.state.urlBase}/api/customers/export`;

      axios
        .get(url, { responseType: "blob" })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "clients.xlsx");
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => {
          Swal.fire({
            title: "Error",
            text: "Cannot export clients",
            icon: "error",
            confirmButtonClass: "btn btn-danger",
            confirmButtonText: "Close",
            buttonsStyling: false,
          });
        });
    },
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
