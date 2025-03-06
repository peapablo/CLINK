<template>
  <div class="container-fluid">
    <div class="border-bottom">
      <div class="container-fluid py-3 position-relative">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1>Organisms</h1>
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
          <favorite-button path="/organisms" />
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
              @click="modals.addNewOrganism = true"
            >
              <span class="btn-inner--icon">
                <i class="fas fa-plus"></i>
              </span>
              <span class="btn-inner--text">New Organisms</span>
            </base-button>
            <div class="ml-4 pr-4">All Organisms {{ total }}</div>
          </div>
          <div class="ml-md-auto mb-4">
            <base-button icon outline type="default" style="margin-right: 0">
              <span class="btn-inner--icon">
                <i class="fas fa-printni fa-print"></i>
              </span>
            </base-button>
            <base-button icon outline type="default" class="mx-4">
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
              @click="exportData"
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
            Organisms
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
        </div>
        <div v-if="tableType == 0">
          <div class="card">
            <el-table
              class="table-responsive table-flush"
              header-row-class-name="thead-light"
              highlight-current-row
              row-key="id"
              :data="queriedData"
              ref="singleTable"
              @selection-change="onSelectionChange"
              @current-change="handleCurrentChange"
            >
              <el-table-column label="Organisms ID" prop="id" width="130">
                <template v-slot="{ row }">
                  <b>{{ row.ID }}</b>
                </template>
              </el-table-column>
              <el-table-column label="Name" prop="name" width="130">
                <template v-slot="{ row }">
                  <b>{{ row.NAME }}</b>
                </template>
              </el-table-column>
              <el-table-column
                label="Name ABBR"
                prop="nameABBR"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.NAME_ABBR }}</b>
                </template>
              </el-table-column>
              <el-table-column
                label="Breakpoint Room"
                prop="breakpointRoom"
                width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.breakpoint_name }}</b>
                </template>
              </el-table-column>
              <!-- <el-table-column
                label="Organisms Group"
                prop="organismsGroup"
                width="130"
              >-->
              <!-- <template v-slot="{ row }">
                  <b>{{ row.ORGANISM_GROUP_ID }}</b>
                </template>
              </el-table-column>-->
              <el-table-column
                label="Organisms Year"
                prop="organismsInstrument"
                min-width="130"
              >
                <template v-slot="{ row }">
                  <b>{{ row.ORGANISM_YEAR }}</b>
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
                <template v-slot="{ row }">
                  <a
                    class="mr-2"
                    @click="
                      editOrganisms(
                        row.ID,
                        row.NAME,
                        row.NAME_ABBR,
                        row.breakpoint_name,
                        row.ORGANISM_GROUP_ID,
                        row.ORGANISM_INSTRUMENT_ID,
                        row.ORGANISM_YEAR
                      )
                    "
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
          <!-- add organisms -->
          <modal
            :show.sync="modals.addNewOrganism"
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
                <h1 class="text-left">Add Organism</h1>
                <div class="row text-left">
                  <div class="col-6">
                    <h3>Organism name</h3>
                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_name"
                      type="organism_name"
                      placeholder="Name"
                    ></base-input>
                  </div>
                  <div class="col-6">
                    <h3>Organism Name ABBR</h3>
                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_nameABBR"
                      type="organism_nameABBR"
                      placeholder="Name ABBR"
                    >
                      <!-- prepend-icon="ni ni-lock-circle-open"  was in the base-input -->
                    </base-input>
                  </div>
                  <div class="col-6 mt-3">
                    <h3>Breakpoint Room</h3>
                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_breakpointroom"
                      type="organism_breakpointroom"
                      placeholder="Breakpoint Room"
                    >
                      <el-select
                        placeholder="Breakpoint Room"
                        filterable
                        v-model="formModalAddorganism.organism_breakpointroom"
                      >
                        <el-option
                          v-for="item in select.breakpointroomData"
                          :key="item.ID"
                          :label="item.NAME"
                          :value="item.ID"
                        ></el-option>
                      </el-select>
                    </base-input>
                  </div>
                  <div class="col-6 mt-3">
                    <h3>Organism Group</h3>

                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_group"
                      type="organism_group"
                      placeholder="Organism Group"
                    ></base-input>
                  </div>
                  <div class="col-6 mt-3">
                    <h3>Organism Instrument</h3>

                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_instrument"
                      type="organism_instrument"
                      placeholder="Organism Instrument"
                    ></base-input>
                  </div>
                  <div class="col-6 mt-3">
                    <h3>Organism Year</h3>

                    <base-input
                      alternative
                      v-model="formModalAddorganism.organism_year"
                      type="organism_year"
                      placeholder="Year"
                    ></base-input>
                  </div>
                </div>
                <div>
                  <base-button
                    type="primary"
                    class="my-4 btn-block"
                    @click="addNewOrganism()"
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
import { mappingApi } from "@/util/mappingApi";
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
export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "inbox",
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
        addNewOrganism: false,
        // editOrganisms: false,
      },
      formModalAddorganism: {
        organism_name: "",
        organism_nameABBR: "",
        organism_breakpointroom: "",
        organism_group: "",
        organism_instrument: "",
        organism_year: "",
      },
      formModalEditorganism: {
        organism_name: "",
        organism_nameABBR: "",
        organism_breakpointroom: "",
        organism_group: "",
        organism_instrument: "",
        organism_year: "",
      },
      select: {
        breakpointroomData: [],
      },
      polling: null,
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      specimen: null,
      wardComment: "",
      labComment: "",
      selectTestCode: [],
      selectTestName: [],
      selectSpecimen: [],
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
    clearInterval(this.polling);

    this.$store.commit("initializeStore");

    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.loadData();
    this.getBreakpointroom();

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
    },
    addNewOrganism() {
      console.log("add New organism executed");
    },
    editOrganisms(
      oldid,
      oldname,
      oldnameABBR,
      oldbreakpointRoom,
      oldorganismsGroup,
      oldorganismsInstrument,
      oldorganismsYear
    ) {
      swal
        .fire({
          html: `<h1 class="text-left">Add Organisms</h1>
        <div class="row text-left">
          <div class="col-6">
            <h3>Organisms ID</h3>
            <input type="text" class="form-control" id="id" value="${oldid}"/>
          </div>
          <div class="col-6">
            <h3>Name</h3>
            <input class="form-control" id="name" value="${oldname}"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Name ABBR</h3>
            <input class="form-control" id="nameABBR" value="${oldnameABBR}"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Breakpoint Room</h3>
            <input class="form-control" id="breakpointRoom" value="${oldbreakpointRoom}"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Organisms Group</h3>
            <input class="form-control" id="organismsGroup" value="${oldorganismsGroup}"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Organisms Instrument</h3>
            <input class="form-control" id="organismsInstrument" value="${oldorganismsInstrument}"></input>
          </div>
          <hr>
           <div class="col-6 mt-3">
            <h3>Organisms Year</h3>
            <input class="form-control" id="organismsYear" type="number" value="${oldorganismsYear}"></input>
          </div>
        </div>`,
          buttonsStyling: false,
          showCloseButton: true,
          confirmButtonClass: "btn btn-save",
          confirmButtonText: "Save",
          width: "1000",
        })
        .then((result) => {
          this.id = document.getElementById("id").value;
          this.name = document.getElementById("name").value;
          this.nameABBR = document.getElementById("nameABBR").value;
          this.breakpointRoom = document.getElementById("breakpointRoom").value;
          this.organismsGroup = document.getElementById("organismsGroup").value;
          this.organismsInstrument = document.getElementById(
            "organismsInstrument"
          ).value;
          this.organismsYear = document.getElementById("organismsYear").value;
          if (result.isConfirmed) {
            const api = mappingApi("data_organism.php");
            const queryParams = `data=edit&mode=edit&oldid=${oldid}&id=${this.id}&name=${this.name}&nameABBR=${this.nameABBR}&breakpointRoom=${this.breakpointRoom}&organismsGroup=${this.organismsGroup}&organismsInstrument=${this.organismsInstrument}&organismsYear=${this.organismsYear}`; // You can add more parameters if needed
            const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

            axios({
              method: "post",
              url: url,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
              const result = response;
              if (result["status"] == "success") {
                this.$swal("แก้ไขสำเร็จค่ะ");
                return true;
              } else {
                this.$swal("แก้ไขไม่สำเร็จค่ะ");
                return false;
              }
            });
          }
        });
    },
    getBreakpointroom() {
      const api = mappingApi("data_breakpoint_room.php");
      const queryParams = "data=reason"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios
        .get(url)
        .then((response) => {
          this.select.breakpointroomData = response;
        })
        .catch(function (error) {
          // try catch error
          console.log(error);
        })
        .then(function () {});
    },
    loadData() {
      const api = mappingApi("data_organism.php");
      const queryParams = "data=list"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response;
        if (result != null) {
          let tmpTableData = [];
          result["data"].forEach((element) => {
            if (parseInt(element["status"])) {
              tmpTableData.push(element);
            }
          });
          this.tableData = tmpTableData;
        }
      });
    },
    exportData() {
      const api = "masterdata/data_organism";
      const queryParams = "data=export"; // You can add more parameters if needed
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;

      axios(
        {
          method: "post",
          url: url,
          headers: { "Content-Type": "multipart/form-data" },
        },
        { fileName: "organisms.csv" },
        { responseType: "blob" }
      )
        .then((response) => {
          const url = URL.createObjectURL(
            new Blob([response], {
              type: "application/csv",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "organisms.csv");
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
