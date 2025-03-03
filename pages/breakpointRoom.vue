<template>
  <div class="container-fluid">
    <div class="border-bottom">
      <div class="container-fluid py-3 position-relative">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1>Breakpoint Room</h1>
              </div>
            </div>
            <div class="col-6 col-md-4">
              <div class="bg-secondary py-1 px-2 border rounded">
                <div class="d-flex flex-row align-items-center">
                  <div class="mr-2" style="cursor: pointer">
                    <i class="fas fa-search"></i>
                  </div>
                  <div class="flex-grow-1">
                    <input type="text" class="w-100 border-0 input-style" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="favorite-button-container">
          <favorite-button path="/breakpointroom" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="d-flex flex-column flex-md-row mt-4 align-items-center">
          <div class="d-flex align-items-center">
            <base-button
              outline
              icon
              type="default"
              @click="modals.addNewBreakpointRoom = true"
            >
              <span class="btn-inner--icon">
                <i class="fas fa-plus"></i>
              </span>
              <span class="btn-inner--text">New Breakpoint Room</span>
            </base-button>
            <div class="ml-4 pr-3">All Breakpoint Room {{ total }}</div>
          </div>
          <div class="ml-md-auto mb-4">
            <base-button
              icon
              outline
              type="default"
              @click="deleteBreakpointRoom()"
              style="margin-right: 0"
            >
              <span class="btn-inner--icon">
                <i class="fas fa-trash-alt"></i>
              </span>
            </base-button>
            <input ref="file" type="file" @change="importData" hidden />
            <base-button
              icon
              outline
              type="default"
              class="mx-4"
              @click="selectFile()"
            >
              <span class="btn-inner--icon">
                <i class="fas fa-file-import"></i>
              </span>
              <span class="btn-inner--text">Import</span>
            </base-button>
            <base-button
              icon
              outline
              type="default"
              class=""
              @click="exportdata()"
            >
              <span class="btn-inner--icon">
                <i class="fas fa-file-export"></i>
              </span>
              <span class="btn-inner--text">Export</span>
            </base-button>
          </div>
        </div>
        <div class="row my-4 mx-1">
          <div
            class="col text-center"
            :class="{
              'active-tab': tableType === 0,
              'tab-table': tableType !== 0,
            }"
            @click="changeTableType(0)"
          >
            Breakpoint Room
          </div>
        </div>
        <div v-if="tableType == 0">
          <div class="card">
            <el-table
              class="table-responsive table-flush"
              header-row-class-name="thead-light"
              highlight-current-row
              row-key="id"
              stripe
              :data="queriedData"
              ref="singleTable"
              @selection-change="onSelectionChange"
              @current-change="handleCurrentChange"
            >
              <el-table-column type="selection" align="left"></el-table-column>
              <el-table-column label="ID" prop="id" min-width="130">
                <template v-slot="{ row }">
                  <b>{{ row.ID }}</b>
                </template>
              </el-table-column>
              <el-table-column label="Name" prop="name" min-width="130">
                <template v-slot="{ row }">
                  <b>{{ row.NAME }}</b>
                </template>
              </el-table-column>
              <el-table-column
                label="Method ID"
                prop="METHOD_ID"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.METHOD_ID }}</b>
                </template>
              </el-table-column>
              <el-table-column
                label="Sort Order"
                prop="sort_order"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <div class="d-flex justify-content-between">
                    <b>{{ row.sort_order }}</b>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="status" prop="status" width="200">
                <template v-slot="{ row }">
                  <div class="d-flex justify-content-between">
                    <b>{{ row.status }}</b>
                  </div>
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
              <div class>
                <p class="card-category">
                  Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
                  <span v-if="selectedRows.length"
                    >&nbsp; &nbsp; {{ selectedRows.length }} rows selected</span
                  >
                </p>
              </div>
              <base-pagination
                class="pagination-no-border"
                v-model="pagination.currentPage"
                :per-page="pagination.perPage"
                :total="total"
              ></base-pagination>
            </div>
          </div>
          <!-- add Breakpoint -->
          <modal
            :show.sync="modals.addNewBreakpointRoom"
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
                <h1 class="text-left">Add Breakpoint Room</h1>
                <div class="row text-left">
                  <div class="col-6">
                    <h3>ID</h3>
                    <base-input
                      alternative
                      v-model="formModalAddBreakpointRoom.breakpointRoom_id"
                      type="breakpointRoom_id"
                      placeholder="ID"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Name</h3>
                    <base-input
                      alternative
                      v-model="formModalAddBreakpointRoom.breakpointRoom_name"
                      type="breakpointRoom_name"
                      placeholder="Breakpoint Room Name"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Method ID</h3>
                    <base-input
                      alternative
                      v-model="
                        formModalAddBreakpointRoom.breakpointRoom_method_id
                      "
                      type="breakpoinRoom_method_id"
                      placeholder="Method ID"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Sort Order</h3>
                    <base-input
                      alternative
                      v-model="
                        formModalAddBreakpointRoom.breakpointRoom_sort_order
                      "
                      type="breakpoinRoom_sort_order"
                      placeholder="Sort Order"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Status</h3>
                    <base-input
                      alternative
                      v-model="formModalAddBreakpointRoom.breakpointRoom_status"
                      type="breakpointRoom_status"
                      placeholder="Status"
                    ></base-input>
                  </div>
                </div>
                <div>
                  <base-button
                    type="primary"
                    class="my-4 btn-block"
                    @click="addNewBreakpointRoom()"
                    >SAVE</base-button
                  >
                </div>
              </template>
            </card>
          </modal>
          <!-- edit Breakpoint Room -->
          <modal
            :show.sync="modals.editBreakpointRoom"
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
                <h1 class="text-left">Edit Breakpoint Room</h1>
                <div class="row text-left">
                  <div class="col-6">
                    <h3>ID</h3>
                    <base-input
                      alternative
                      v-model="formModalEditBreakpointRoom.breakpointRoom_id"
                      type="breakpointRoom_id"
                      placeholder="ID"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Name</h3>
                    <base-input
                      alternative
                      v-model="formModalEditBreakpointRoom.breakpointRoom_name"
                      type="breakpointRoom_name"
                      placeholder="Breakpoint Room Name"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Method ID</h3>
                    <base-input
                      alternative
                      v-model="
                        formModalEditBreakpointRoom.breakpoinRoom_method_id
                      "
                      type="breakpointRoom_method_id"
                      placeholder="Method ID"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Sort order</h3>
                    <base-input
                      alternative
                      v-model="
                        formModalEditBreakpointRoom.breakpointRoom_sort_order
                      "
                      type="breakpointRoom_sort_order"
                      placeholder="Sort Order"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>status</h3>
                    <base-input
                      alternative
                      v-model="
                        formModalEditBreakpointRoom.breakpointRoom_status
                      "
                      type="breakpointRoom_status"
                      placeholder="Status"
                    ></base-input>
                  </div>
                </div>
                <div>
                  <base-button
                    type="primary"
                    class="my-4 btn-block"
                    @click="editBreakpointRoom()"
                    >SAVE</base-button
                  >
                </div>
              </template>
            </card>
          </modal>
        </div>

        <div v-if="tableType == 1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import FavoriteButton from "./components/favorite-button.vue";
import BaseSlider from "@/components/argon-core/BaseSlider";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import axios from "axios";
import { mappingApi } from "@/util/mappingApi";
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
  name: "breakpointRoom",
  components: {
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
      modals: {
        addNewBreakpointRoom: false,
        editBreakpointRoom: false,
      },
      formModalAddBreakpointRoom: {
        breakpointRoom_id: "",
        breakpointRoom_name: "",
        breakpointRoom_method_id: "",
        breakpointRoom_sort_order: "",
        breakpointRoom_status: "",
      },
      formModalEditBreakpointRoom: {
        breakpointRoom_id: "",
        breakpointRoom_name: "",
        breakpointRoom_method_id: "",
        breakpointRoom_sort_order: "",
        breakpointRoom_status: "",
      },
      file: "",
      polling: null,
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      breakpointRoom: null,
      wardComment: "",
      labComment: "",
      selectTestCode: [],
      selectTestName: [],
      selectBreakpointRoom: [],
      selectStatus: [],
      selectedTab: 0,
      tableDataInbox: [],
      tableData: [],
      selectedRows: [],
      currentRow: null,
      selectedTab: 0,
      selectedRows: [],
      currentRow: null,
    };
  },
  mounted() {
    // clearInterval(this.polling);

    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.loadData();
    //  load new data every 5 sec made the selected row disappeared
    this.polling = setInterval(() => {
      this.loadData();
    }, 5000);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.polling);

    next();
  },
  methods: {
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
      this.currentRow = val;
      this.selectBreakpointRoom = [val["NAME"]];
    },
    addNewBreakpointRoom() {
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = `data=add&mode=add&id=${this.formModalAddBreakpointRoom.breakpointRoom_id}&name=${this.formModalAddBreakpointRoom.breakpointRoom_name}&METHOD_ID=${this.formModalAddBreakpointRoom.breakpointRoom_method_id}&sort_order=${this.formModalAddBreakpointRoom.breakpointRoom_sort_order}&status=${this.formModalAddBreakpointRoom.breakpointRoom_status}`; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response.data;
        if (result["status"] == "success") {
          this.modals.addNewBreakpointRoom = false;
          this.$swal("Save Success");
          this.loadData();
          this.formModalAddBreakpointRoom.breakpointRoom_id = "";
          this.formModalAddBreakpointRoom.breakpointRoom_name = "";
          this.formModalAddBreakpointRoom.breakpointRoom_method_id = "";
          this.formModalAddBreakpointRoom.breakpointRoom_sort_order = "";
          this.formModalAddBreakpointRoom.breakpointRoom_status = "";

          return true;
        } else {
          this.$swal("Save Failed");
          this.formModalAddBreakpointRoom.breakpointRoom_id = "";
          this.formModalAddBreakpointRoom.breakpointRoom_name = "";
          this.formModalAddBreakpointRoom.breakpointRoom_method_id = "";
          this.formModalAddBreakpointRoom.breakpointRoom_sort_order = "";
          this.formModalAddBreakpointRoom.breakpointRoom_status = "";
          return false;
        }
      });
    },
    editRow(row, index) {
      this.formModalEditBreakpointRoom.breakpointRoom_id = row.ID;
      this.formModalEditBreakpointRoom.breakpointRoom_name = row.NAME;
      this.formModalEditBreakpointRoom.breakpointRoom_method_id = row.METHOD_ID;
      this.formModalEditBreakpointRoom.breakpointRoom_sort_order =
        row.sort_order;
      this.formModalEditBreakpointRoom.breakpointRoom_status = row.status;
      this.modals.editBreakpointRoom = true;
    },
    editBreakpointRoom() {
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = `data=edit&mode=edit&oldid=${this.formModalEditBreakpointRoom.breakpointRoom_id}&id=${this.formModalEditBreakpointRoom.breakpointRoom_id}&name=${this.formModalEditBreakpointRoom.breakpointRoom_name}&METHOD_ID=${this.formModalEditBreakpointRoom.breakpointRoom_method_id}&sort_order=${this.formModalEditBreakpointRoom.breakpointRoom_sort_order}&status=${this.formModalEditBreakpointRoom.breakpointRoom_status}`; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response.data;
        if (result["status"] == "success") {
          this.modals.editBreakpointRoom = false;
          this.formModalEditBreakpointRoom.breakpointRoom_id = "";
          this.formModalEditBreakpointRoom.breakpointRoom_name = "";
          this.formModalEditBreakpointRoom.breakpointRoom_method_id = "";
          this.formModalEditBreakpointRoom.breakpointRoom_sort_order = "";
          this.formModalEditBreakpointRoom.breakpointRoom_status = "";
          this.$swal("แก้ไขสำเร็จค่ะ");
          this.loadData();
          return true;
        } else {
          this.formModalEditBreakpointRoom.breakpointRoom_id = "";
          this.formModalEditBreakpointRoom.breakpointRoom_name = "";
          this.formModalEditBreakpointRoom.breakpointRoom_method_id = "";
          this.formModalEditBreakpointRoom.breakpointRoom_sort_order = "";
          this.formModalEditBreakpointRoom.breakpointRoom_status = "";
          this.$swal("แก้ไขไม่สำเร็จค่ะ");
          return false;
        }
      });
    },
    deleteBreakpointRoom() {
      if (this.selectedRows != null && this.selectedRows.length > 0) {
        const api = mappingApi("data_breakpoint_room.php");
        const queryParams = "data=test&mode=delete"; // You can add more parameters if needed
        const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

        let breakpoint_room_id_array = [];
        const FormData = require("form-data");
        let formdata = null;
        this.selectedRows.forEach((element) => {
          // console.log(element.ID);
          breakpoint_room_id_array.push(element.ID);
        });
        formdata = new FormData();
        formdata.append("id", breakpoint_room_id_array);
        axios({
          method: "post",
          data: formdata,
          url: url,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          const result = response.data;
          if (result["status"] == "success") {
            this.$swal("ลบรายการสำเร็จ");
            this.loadData();
          } else {
            this.$swal("ลบรายการไม่สำเร็จ");
          }
        });
      } else {
        this.$swal("กรุณาเลือกรายการที่จะลบ");
      }
    },
    exportdata() {
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = "data=export"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios(
        {
          method: "post",
          url: url,
          headers: { "Content-Type": "multipart/form-data" },
        },
        { fileName: "breakpoint_room.csv" },
        { responseType: "blob" }
      )
        .then((response) => {
          const url = URL.createObjectURL(
            new Blob([response.data], {
              type: "application/csv",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "breakpoint_room.csv");
          document.body.appendChild(link);
          link.click();
        })
        .catch((err) => {
          swal.fire({
            title: "Export Failed",
            text: err?.response?.data?.message ?? "Something went wrong",
            icon: "error",
            confirmButtonText: "Confirm",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-default",
              cancelButton: "btn btn-light",
              denyButton: "btn btn-danger",
              actions: "swal2-actions-center",
            },
          });
        });
    },
    selectFile() {
      let datafile = this.$refs.file;
      console.log(this.$refs.file);
      datafile.click();
    },
    importData(event) {
      console.log("this enter");
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = "data=test&mode=importData"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      this.file = event.target.files[0];
      console.log(url);
      let formData = new FormData();
      formData.append("file", this.file);
      axios({
        method: "post",
        data: formData,
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response.data;
        console.log(result);
        if (result["status"] == "success") {
          this.$swal("บันทึกข้อมูลสำเร็จ");
          this.loadData();
          this.$refs.file.value = null;
        } else {
          this.$swal("บันทึกข้อมูลไม่สำเร็จ \n กรุณาตรวจสอบไฟล์อีกครั้ง");
          this.$refs.file.value = null;
        }
      });
    },
    loadData() {
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = "data=list"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response.data;
        if (result != null) {
          let tmpTableData = [];
          result.forEach((element) => {
            if (parseInt(element["status"])) {
              tmpTableData.push(element);
            }
          });
          this.tableData = tmpTableData;
        }
      });
    },
  },
};
</script>
<style>
.swal2-actions {
  justify-content: start !important;
}

.swal-2-actions-center {
  justify-content: center !important;
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
