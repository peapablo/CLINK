<template>
  <div>
    <div class="border-bottom bg-primary">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1 class="text-white">Result Entry</h1>
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
      </div>
    </div>

    <div class="border-bottom">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-12 col-lg-auto">
              <div>
                <small>Lab number</small>
                <div class="font-weight-bold">{{ currentLab.LAB_NO }}</div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-12 col-lg">
                  <div>
                    <i class="fas fa-user-circle" style="font-size: 48px"></i>
                  </div>
                  <div>
                    <small>HN</small>
                    <div class="font-weight-bold">{{ currentLab.HN }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>First Name</small>
                    <div class="font-weight-bold">
                      {{ currentLab.FIRST_NAME }}
                    </div>
                  </div>
                  <div>
                    <small>Gender </small>
                    <div class="font-weight-bold">{{ currentLab.SEX }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Last Name</small>
                    <div class="font-weight-bold">
                      {{ currentLab.LAST_NAME }}
                    </div>
                  </div>
                  <div>
                    <small>Age </small>
                    <div class="font-weight-bold">
                      {{ currentLab.AGE }} Year
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Order Date</small>
                    <div class="font-weight-bold">
                      {{ currentLab.ORDER_TIME }}
                    </div>
                  </div>
                  <div>
                    <small> Check-in Date </small>
                    <div class="font-weight-bold">
                      {{ currentLab.CHECKIN_TIME }}
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>SID</small>
                    <div class="font-weight-bold"></div>
                  </div>
                  <div>
                    <small>Body Site </small>
                    <div class="font-weight-bold">
                      {{ currentLab.BODY_SITE_NAME }}
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Specimen</small>
                    <div class="font-weight-bold">
                      {{ currentLab.SPECIMEN_NAME }}
                    </div>
                  </div>
                  <div
                    class="
                      hilight-text
                      border
                      rounded
                      text-center
                      px-2
                      py-1
                      mt-3
                    "
                  >
                    <div class="text-sm">Special for</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Priority</small>
                    <div class="font-weight-bold">
                      {{ currentLab.PRIORITY_NAME }}
                    </div>
                  </div>
                  <div>
                    <small>Doctor </small>
                    <div class="font-weight-bold"></div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Location</small>
                    <div class="font-weight-bold">
                      {{ currentLab.LOCATION_NAME }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--
            <div class="col-12 col-lg-auto mt-2 mt-lg-0 text-right">
              <div>
                <base-button
                  outline
                  type="default"
                >
                  <span class="btn-inner--icon"><i class="fas fa-broom"></i></span>
                </base-button>

              </div>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-3" v-if="step == 0">
      <div class="row">
        <div class="col-12 col-md-auto col-xl-auto py-4">
          <base-button
            icon
            type="default"
            class="btn btn-search"
            @click="saveResult"
          >
            <span class="btn-inner--icon"><i class="far fa-save"></i></span>
            <span class="btn-inner--text">Save</span>
          </base-button>

          <base-button
            icon
            outline
            type="default"
            v-if="currentLab.IS_DIRECT_EXAM == 0"
          >
            <span class="btn-inner--icon"><i class="fas fa-sync-alt"></i></span>
            <span class="btn-inner--text">Instrument</span>
          </base-button>

          <base-button icon outline type="default">
            <span class="btn-inner--icon"
              ><i class="far fa-calendar-check"></i
            ></span>
          </base-button>
          <base-button icon outline type="default">
            <span class="btn-inner--icon"> <i class="fas fa-undo"></i></span>
          </base-button>
          <base-button icon outline type="default">
            <span class="btn-inner--icon"> <i class="far fa-eye"></i></span>
          </base-button>
        </div>
        <div class="col-12 col-md col-xl text-md-right py-4">
          <base-button icon type="secondary" @click="saveValidate">
            <span class="btn-inner--icon"><i class="far fa-list-alt"></i></span>
            <span class="btn-inner--text">Validate</span>
          </base-button>

          <base-button icon type="secondary" @click="saveApprove">
            <span class="btn-inner--icon"
              ><i class="far fa-check-circle"></i
            ></span>
            <span class="btn-inner--text">Approve</span>
          </base-button>
        </div>
        <div class="col-12 col-md-12 col-xl text-xl-right py-4">
          <div class="text-left text-lg-right">
            <base-button outline type="default">
              <span class="btn-inner--icon"
                ><i class="far fa-trash-alt"></i
              ></span>
            </base-button>
            <base-button outline type="default" @click="printDirect()">
              <span class="btn-inner--icon"
                ><i class="fas fa-printfar fa-print"></i
              ></span>
            </base-button>
            <base-button outline type="default">
              <span class="btn-inner--icon mr-3"
                ><i class="fas fa-file-download"></i
              ></span>
              <span class="btn-inner--text">Export</span>
            </base-button>
          </div>
        </div>
      </div>
      <div class="row my-4 mx-1">
        <div class="col-auto text-left font-weight-bold">
          Direct / Microscoplc Exam
        </div>
      </div>
      <div>
        <form>
          <div class="card">
            <el-collapse class="px-3" v-model="activeNames">
              <el-collapse-item name="1">
                <template slot="title">
                  <div class="d-flex flex-row">
                    <div>
                      <small> Order No : </small>
                      <span class="font-weight-bold">
                        {{ currentLab.ORDER_ID }}
                      </span>
                    </div>
                    <div>
                      &nbsp;&nbsp;&nbsp;
                      <small> Category : </small>
                      <span class="font-weight-bold">
                        {{ currentLab.CATEGORY_NAME }}
                      </span>
                      &nbsp;&nbsp;&nbsp;
                      <small> Primary Test : </small>
                      <span class="font-weight-bold">
                        {{ currentLab.TEST_PRIMARY_NAME }}
                      </span>
                    </div>
                  </div>
                </template>
                <div>
                  <el-table
                    class="table-responsive table-flush"
                    row-key="id"
                    :data="secondaryTestData"
                    ref="singleTable"
                    stripe
                    @selection-change="selectionChange"
                  >
                    <el-table-column type="selection" align="left">
                    </el-table-column>
                    <el-table-column
                      label="ISOLATE NO"
                      prop="secondary"
                      width="120"
                    >
                      <template v-slot="{ row }">
                        <b>
                          {{ row.ISOLATE_NO }}
                        </b>
                      </template>
                    </el-table-column>
                    <el-table-column label="Test" prop="secondary" width="130">
                      <template v-slot="{ row }">
                        <b>
                          {{ row.TEST_SECONDARY_NAME }}
                        </b>
                      </template>
                    </el-table-column>

                    <el-table-column label="Result" prop="result" width="420">
                      <template v-slot="{ row }">
                        <el-select
                          v-if="row.INPUTTYPE == 1"
                          placeholder="Select"
                          filterable
                          v-model="row.VALUE"
                          class="col-12"
                        >
                          <el-option
                            v-for="item in resultlistData"
                            :key="item.ID"
                            :label="item.NAME"
                            :value="item.ID"
                            v-if="
                              row.INPUT_RESULT_GROUP_ID ==
                              item.INPUT_RESULT_GROUP_ID
                            "
                          >
                          </el-option>
                        </el-select>
                        <el-select
                          v-if="row.INPUTTYPE == 5"
                          placeholder="Select"
                          filterable
                          v-model="row.VALUE"
                          class="col-12"
                        >
                          <el-option
                            v-for="item in organismlistData"
                            :key="item.ID"
                            :label="item.ID + ' - ' + item.NAME"
                            :value="item.ID"
                          >
                          </el-option>
                        </el-select>
                        <el-select
                          v-if="row.INPUTTYPE == 6"
                          placeholder="Select"
                          filterable
                          v-model="row.VALUE"
                          class="col-12"
                        >
                          <el-option value="0" label="No">No</el-option>
                          <el-option value="1" label="Yes">Yes</el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column label="Flag" prop="flag" width="100">
                    </el-table-column>
                    <el-table-column label="Comment" prop="comment" width="120">
                      <div slot-scope="{ $index, row }">
                        <base-button
                          @click.native="handleComment($index, row)"
                          outline
                          type="secondary"
                          icon
                        >
                          <i class="far fa-comment-alt text-black-50"></i>
                        </base-button>
                      </div>
                    </el-table-column>
                    <el-table-column label="Date/Time" prop="date" width="200">
                      <template v-slot="{ row }">
                        <b>
                          {{ row.VALUE_TIME }}
                        </b>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Result / Validate / Approve By"
                      prop="resultBy"
                      width="300"
                    >
                      <template v-slot="{ row }">
                        <b> </b>
                      </template>
                    </el-table-column>
                    <el-table-column label="HIS" width="70">
                      <template v-slot="{ row }">
                        <div class="d-flex justify-content-center">
                          <input
                            type="checkbox"
                            v-model="row.status_his"
                            true-value="1"
                            false-value="0"
                            @change="row['status_his'] == '1' ? 1 : 0"
                          />
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="Report" width="95">
                      <template v-slot="{ row }">
                        <div class="d-flex justify-content-center">
                          <input
                            type="checkbox"
                            v-model="row.status"
                            true-value="1"
                            false-value="0"
                            @change="row['status'] == '1' ? 1 : 0"
                          />
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </form>
        <base-button icon type="secondary" @click="addMoreIsolate">
          <span class="btn-inner--icon"><i class="far fa-list-alt"></i></span>
          <span class="btn-inner--text">+ Add Isolate</span>
        </base-button>
      </div>
    </div>
  </div>
</template>
<script>
// TODO: Implement Order Information Section into Component

// TODO: Remove Special For and Change into Status Badge
// Approve: #93C47E
// Wait for Approve: #FBB552
// Check in: #A1C4FC
// Preliminary: #B7A9ED

// TODO: Change checkbox Mic and Zone wording
// Mic: ลงผล Mic
// Zone: ลงผล Zone

// TODO: Organism column must not be editable

// TODO: Remove Checkbox in Table

// TODO: Input column can new line when press enter

import {
  Table,
  TableColumn,
  Select,
  Option,
  Collapse,
  CollapseItem,
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import axios from "axios";

import { mappingApi } from "@/util/mappingApi";

export default {
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "resultEntryDirect",
  components: {
    BasePagination,
    RouteBreadCrumb,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
  },
  mounted() {
    document.addEventListener("keydown", function (event) {
      if (event.keyCode === 13 && event.target.nodeName === "INPUT") {
        var form = event.target.form;
        var index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
      }
    });

    const url_string = window.location.href;
    const url = new URL(url_string);
    const labId = url.searchParams.get("id");
    if (labId == null || labId == "") {
      this.$router.push({
        path: "orderMonitoring",
      });
    } else {
      alert(`กรุณาติดต่อผู้พัฒนา | Lab ID: ${labId}`);
      this.currentLabId = labId;
      this.fetchData();
    }
  },
  data() {
    return {
      currentLabId: null,
      currentLab: [],
      step: 0,
      checkboxesMic: true,
      checkboxesZone: true,
      organismlistData: [],
      nogrowthlistData: [],
      resultlistData: [],
      secondaryTestData: [],
      tableColumns: [
        {
          prop: "resValue",
          label: "Res.Value(MIC)",
          sortable: false,
          width: 180,
        },
        {
          prop: "resText",
          label: "Res.Text(MIC)",
          sortable: false,
          width: 180,
        },
        {
          prop: "micS",
          label: "MIC-S",
          sortable: false,
          width: 100,
        },
        {
          prop: "micI",
          label: "MIC-I",
          sortable: false,
          width: 100,
        },
        {
          prop: "micR",
          label: "MIC-R",
          sortable: false,
          width: 100,
        },
        {
          prop: "date",
          label: "Date/Time",
          sortable: false,
          width: 180,
        },
        {
          prop: "antibiotic",
          label: "Antibiotic",
          sortable: false,
          width: 180,
        },
      ],
      selectedRows: [],
      antibioticValue: "",
      activeNames: ["1"],
    };
  },
  methods: {
    fetchData() {
      let url =
        this.$store.state.urlBase + "/api/data_lab_result.php?data=list";
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response;
        if (result.data != null && result.data != "") {
          this.resultlistData = [...result.data];
        } else this.resultlistData == [];
      });

      url = this.$store.state.urlBase + "/api/data_organism.php?data=list";
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response;
        if (result.data != null && result.data != "") {
          this.organismlistData = [...result.data];
        } else this.organismlistData == [];
      });

      url = this.$store.state.urlBase + "/api/data_nogrowth.php?data=list";
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        this.nogrowthlistData = response;
      });

      url =
        this.$store.state.urlBase +
        "/api/inbox.php?data=labinfo&id=" +
        this.currentLabId;
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response;
        let currentLabInfo;
        for (let i = 0; i < result.length; i++) {
          if (result[i].id === this.currentLabId) {
            currentLabInfo = result[i];
            break;
          }
        }
        if (result) {
          this.currentLab = currentLabInfo;
          if (
            this.currentLab["TEST_PRIMARY_ID"] == null ||
            this.currentLab["TEST_PRIMARY_ID"] == "" ||
            this.currentLab["STATUS"] < 2
          ) {
            this.$router.push({
              path: "orderMonitoring",
            });
          }
          const url2 =
            this.$store.state.urlBase +
            "/api/lab_result.php?data=list&id=" +
            this.currentLabId;
          axios({
            method: "get",
            url: url2,
          }).then((response) => {
            const result = response;
            if (result.data != null && result.data != "") {
              let resultEntrys = result.data;
              this.secondaryTestData = [...resultEntrys];
            }
          });
        } else {
          this.$router.push({
            path: "orderMonitoring",
          });
        }
      });
    },
    printDirect() {
      event.preventDefault();
      let url =
        this.$store.state.urlBase +
        "/api/print-direct.php?id=" +
        this.currentLabId;
      console.log(url);
      window.open(url, "_blank");
    },
    addMoreIsolate() {
      this.saveResult(false);

      const url =
        this.$store.state.urlBase +
        "/api/lab_result.php?data=add-isolate-list&id=" +
        this.currentLabId;
      axios({
        method: "get",
        url: url,
      }).then((response) => {
        const result = response;
        if (
          result.status != "" &&
          result.status == "success" &&
          result.data != null &&
          result.data != ""
        ) {
          swal.fire("Successfully added Isolate");
          let resultEntrys = result.data;
          this.secondaryTestData = [...resultEntrys];
        } else {
          swal.fire("Unsuccessfully added Isolate (Ex. Maximum added isolate)");
        }
      });
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    selectionChange(selectedRows) {
      //console.log(selectedRows);
      this.selectedRows = selectedRows;
    },
    savePreliminary() {
      this.saveStatus("Preliminary", 6);
    },
    saveValidate() {
      this.saveResult(false);

      this.saveStatus("Validate", 7);
    },
    saveApprove() {
      this.saveResult(false);

      this.saveStatus("Approve", 8);
    },
    saveStatus(buttonText, status) {
      swal
        .fire({
          title: "Do you want to save the changes?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: buttonText,
          customClass: {
            actions: "my-actions",
            cancelButton: "order-1 right-gap",
            confirmButton: "order-2",
            denyButton: "order-3",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            const url =
              this.$store.state.urlBase +
              "/api/lab_result.php?data=update-status&status=" +
              status +
              "&id=" +
              this.currentLabId;
            let formData = new FormData();
            formData.append("status", status);
            axios({
              method: "post",
              url: url,
              data: formData,
              headers: { "Content-Type": "multipart/form-data" },
            }).then((response) => {
              const result = response;
            });
            swal.fire(buttonText, "", "success");
          } else if (result.isDenied) {
            swal.fire("Changes are not saved", "", "info");
          }
        });
    },
    saveResult(showPopup = true) {
      //this.resultlistData.forEach((element) => {
      const url =
        this.$store.state.urlBase +
        "/api/lab_result.php?data=update&id=" +
        this.currentLabId +
        "&nogrowth=" +
        this.currentLab.NOGROWTH_STATUS;
      const FormData = require("form-data");
      let formData = null;

      if (this.secondaryTestData != null && this.secondaryTestData.length > 0) {
        this.secondaryTestData.forEach((element) => {
          formData = new FormData();
          formData.append("ISOLATE_NO", element.ISOLATE_NO);
          formData.append("test_id", element.TEST_SECONDARY_ID);
          formData.append("value", element.VALUE);
          formData.append("INSTRUMENT_IDEN_STATUS", 0);
          formData.append("INSTRUMENT_IDEN_ID", null);
          formData.append("INSTRUMENT_SENSE_STATUS", 0);
          formData.append("INSTRUMENT_SENSE_ID", null);
          formData.append("status_his", element.status_his ? 1 : 0);
          formData.append("status", element.status ? 1 : 0);
          axios({
            method: "post",
            url: url,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then((response) => {
            const result = response;
          });
        });
        if (showPopup) swal.fire("Lab Result successfully saved.");
      }
      //});
    },
    async handleComment(index, row) {
      const { value: text } = await swal.fire({
        input: "textarea",
        inputLabel: "Comment",
        inputPlaceholder: "Type your message here...",
        inputAttributes: {
          "aria-label": "Type your message here",
        },
        showCancelButton: true,
      });

      if (text) {
        swal.fire(text);
      }
    },
    goToDetail(index, row) {
      this.step = 1;
    },
  },
};
</script>

<style scoped>
small {
  color: #8898aa !important;
}
.hilight-text {
  font-weight: bold;
  background-color: #dddddd;
  color: black;
}

.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
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
</style>
