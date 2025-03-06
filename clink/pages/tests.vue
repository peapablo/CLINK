<template>
  <div>
    <modal :show.sync="modals.open" size="xl" body-classes="p-0">
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
          @click="onCloseTest"
        >
          ×
        </button>

        <template>
          <form role="form">
            <h1 class="text-left">
              {{
                this.modals.modalType === "create"
                  ? "Add new profile test"
                  : "Edit profile test"
              }}
            </h1>

            <div class="row text-left align-items-center">
              <!-- First Row -->
              <div class="col-12 mt-5">
                <h3>Profile Test ID</h3>
                <base-input
                  alternative
                  v-model="formModal.id"
                  type="text"
                  placeholder=""
                >
                </base-input>
              </div>
              <!-- First Row -->

              <!-- Second Row -->
              <div class="col-12 mt-3">
                <h3>Profile Test Name</h3>
                <base-input
                  alternative
                  v-model="formModal.title"
                  type="text"
                  placeholder=""
                >
                </base-input>
              </div>
              <!-- Second Row -->

              <!-- Third Row -->
              <div class="col-12 mt-3">
                <h3>Tests</h3>
                <el-select
                  class="w-100"
                  placeholder=""
                  filterable
                  multiple
                  v-model="formModal.test_primary_id"
                >
                  <el-option
                    v-for="item in categories"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select>
              </div>
              <!-- Third Row -->

              <!-- Fourth Row -->
              <div class="col-12 text-right">
                <base-button
                  type="secondary"
                  class="my-4"
                  @click="onCloseTest"
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
              <!-- Fourth Row -->
            </div>
          </form>
        </template>
      </card>
    </modal>

    <div class="w-100 border-bottom">
      <div class="container-fluid bg-primary py-3 position-relative">
        <div class="row align-items-center">
          <div class="col-auto col-xl py-1">
            <h1 class="text-white">Profile Test</h1>
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
          <div class="col-auto col-xl"></div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/tests" />
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-12 col-lg-8">
          <base-button
            icon
            type="default"
            @click="onNewTest"
            class="d-inline-block"
            style="background-color: #1575fa; border-color: #1575fa"
          >
            <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
            <span class="btn-inner--text">New Profile Test</span>
          </base-button>
          <div class="ml-4 pr-4 d-inline-block">
            All profile tests {{ total }}
          </div>
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
                  @input="onChangeSearchText"
                  placeholder="Text Search..."
                  style="font-size: 0.875rem; outline: none"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-1">
          <base-button icon type="default" @click="onConfirmSearch">
            <span class="btn-inner--icon">
              <i class="fas fa-search"></i>
            </span>
          </base-button>
        </div>

        <div class="col-12 mt-4">
          <div class="card">
            <el-table
              class="table-responsive table-flush"
              header-row-class-name="thead-light"
              highlight-current-row
              row-key="id"
              :data="filteredData"
              ref="singleTable"
              @selection-change="onSelectionChange"
              @current-change="handleCurrentChange"
            >
              <el-table-column label="Profile test ID" prop="id" width="120">
                <template v-slot="{ row }">
                  <b>{{ row.id }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="Profile test name"
                prop="title"
                min-width="80"
              >
                <template v-slot="{ row }">
                  <b>{{ row.title }}</b>
                </template>
              </el-table-column>

              <el-table-column
                label="Test name"
                prop="test_primary"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <div
                    v-for="item in row.test_primary"
                    v-if="row.test_primary.length > 0"
                  >
                    {{ item.ID }}
                  </div>

                  <div v-if="(row.test_primary || []).length === 0">-</div>
                </template>
              </el-table-column>

              <el-table-column>
                <template slot-scope="{ $index, row }">
                  <a
                    class="mr-2"
                    @click="onEditTest(row.id)"
                    style="cursor: pointer"
                  >
                    <i class="far fa-edit" style="color: #2c7ef9"></i>
                  </a>
                  <a @click="onDeleteTest(row.id)" style="cursor: pointer">
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
import moment from "moment";

const INITIAL_STATE_FORM = {
  id: "",
  title: "",
  test_primary_id: [],
};

export default {
  name: "Tests",
  layout: "DashboardLayout",
  middleware: "protected",
  mixins: [clientPaginationMixin],
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
      searchText: "",
      modals: {
        open: false,
        modalType: "create",
      },
      formModal: INITIAL_STATE_FORM,
      currentRowId: null,

      categories: [],
      tableData: [],
      filteredData: [],
      selectedRows: [],
    };
  },

  mounted() {
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken == null) {
      this.$router.push("/login");
    }

    this.loadData();
    this.getCategories();
  },

  methods: {
    onChangeSearchText(event) {
      this.searchText = event.target.value;
    },
    onConfirmSearch() {
      const lowerCaseSearchText = this.searchText.toLowerCase();
      const newData = this.tableData
        .filter(
          (test) =>
            test.id.toLowerCase().includes(lowerCaseSearchText) ||
            test.title.toLowerCase().includes(lowerCaseSearchText)
        )
        .sort((a, b) => {
          return moment(a.updated_at).isBefore(b.updated_at) ? 1 : -1;
        });
      this.filteredData = newData;
    },
    onSelectionChange(selectedRows) {
      this.selectedRows = selectedRows;
    },

    resetModalState() {
      this.formModal = INITIAL_STATE_FORM;
    },

    onCloseTest() {
      this.resetModalState();

      this.currentRowId = null;
      this.modals.modalType = "create";
      this.modals.open = false;
    },
    onNewTest() {
      this.resetModalState();

      this.currentRowId = null;
      this.modals.modalType = "create";
      this.modals.open = true;
    },
    onEditTest(id) {
      this.resetModalState();

      const url = this.$store.state.urlBase + "/api/data_profile_tests/" + id;
      axios
        .get(url)
        .then((response) => {
          const { id: dataId, title, test_primary } = response.data;

          this.formModal.id = dataId;
          this.formModal.title = title;
          this.formModal.test_primary_id = test_primary;

          this.currentRowId = id;
          this.modals.modalType = "edit";
          this.modals.open = true;
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "View Test Failed",
            text:
              err?.response?.data?.message ?? err?.response?.data?.toString(),
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },
    onDeleteTest(id) {
      swal
        .fire({
          title: "Delete Test",
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
            this.deleteTest(id);
          }
        });
    },

    createTest() {
      if (
        this.formModal.id === "" ||
        this.formModal.title === "" ||
        this.formModal.test_primary_id.length === 0
      ) {
        swal.fire({
          icon: "error",
          title: "Please fill in Test ID, Test Name and Category",
          showConfirmButton: false,
          timer: 1000,
        });
        return;
      }

      const formData = new FormData();
      formData.append("id", this.formModal.id);
      formData.append("title", this.formModal.title);
      console.log(
        "this.formModal.test_primary_id",
        this.formModal.test_primary_id
      );
      this.formModal.test_primary_id.forEach((element) => {
        formData.append("test_primary_id[]", element);
      });

      const url = this.$store.state.urlBase + "/api/data_profile_tests";
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.currentRowId = null;
          this.modals.open = false;
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
              err?.response?.data?.message ?? err?.response?.data?.toString(),
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },
    updateTest() {
      const formData = new FormData();
      formData.append("id", this.formModal.id);
      formData.append("title", this.formModal.title);
      this.formModal.test_primary_id.forEach((element) => {
        formData.append("test_primary_id[]", element?.ID ?? element);
      });

      const url =
        this.$store.state.urlBase +
        "/api/data_profile_tests/" +
        this.currentRowId +
        "?_method=PUT";
      axios({
        method: "post",
        url: url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((response) => {
          this.currentRowId = null;
          this.modals.open = false;
          this.modals.modalType = "create";

          swal
            .fire({
              icon: "success",
              title: "Update Success",
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
            title: "Update Failed",
            text:
              err?.response?.data?.message ?? err?.response?.data?.toString(),
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },
    deleteTest(id) {
      const url = this.$store.state.urlBase + "/api/data_profile_tests/" + id;
      axios
        .delete(url)
        .then((response) => {
          swal.fire({
            icon: "success",
            title: "Delete Test Success",
            showConfirmButton: false,
            timer: 1000,
          });

          this.loadData();
        })
        .catch((err) => {
          swal.fire({
            icon: "error",
            title: "Delete Test Failed",
            text:
              err?.response?.data?.message ?? err?.response?.data?.toString(),
            showConfirmButton: false,
            timer: 1000,
          });
        });
    },

    loadData() {
      const url = this.$store.state.urlBase + "/api/data_profile_tests";
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response.data;

        let tmpTableData = [];
        result
          .sort((a, b) => {
            return moment(a.updated_at).isBefore(b.updated_at) ? 1 : -1;
          })
          .forEach((element) => {
            tmpTableData.push({
              ...element,
            });
          });

        this.tableData = tmpTableData;
        this.filteredData = tmpTableData;
      });
    },
    getCategories() {
      const url =
        this.$store.state.urlBase +
        "/api/masterdata/data_test_primary?data=list";

      axios
        .get(url)
        .then((response) => {
          this.categories = response.data;
        })
        .catch((err) => {
          console.log("getCategories error:", err);
        });
    },
    submitFormModal() {
      if (this.modals.modalType === "create") {
        this.createTest();
      } else {
        this.updateTest();
      }
    },
  },

  computed: {
    // filteredData() {
    //   if (!this.searchText || this.searchText === "") {
    //     return this.tableData;
    //   }
    //   const lowerCaseSearchText = this.searchText.toLowerCase();
    //   return this.tableData.filter(
    //     (test) =>
    //       test.id.toLowerCase().includes(lowerCaseSearchText) ||
    //       test.title.toLowerCase().includes(lowerCaseSearchText)
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
</style>
