<template>
  <div class="container-fluid">
    <div class="border-bottom">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1>Setting</h1>
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
    <div class="row">
      <div class="col-12">
        <div class="row my-4 mx-1">
          <div
            class="col text-center"
            :class="{
              'active-tab': tableType === 0,
              'tab-table': tableType !== 0,
            }"
            @click="changeTableType(0)"
          >
            General
          </div>
          <div
            class="col text-center"
            :class="{
              'active-tab': tableType === 1,
              'tab-table': tableType !== 1,
            }"
            @click="changeTableType(1)"
          >
            Connection
          </div>
        </div>
        <div v-if="tableType == 0">
          <div class="card">
            <!-- Card header -->
            <div class="card-header">
              <h3 class="mb-0">HIS/LIS Configuration</h3>
            </div>
            <!-- Card body -->
            <div class="card-body">
              <form>
                <div class="form-group row">
                  <label class="col-md-2 col-form-label form-control-label"
                    >Lab No. for Speclman Check In</label
                  >
                  <div class="col-md-10">
                    <base-checkbox v-model="checkboxes.generate" class="mb-3">
                      Auto Generate New Lab No.
                    </base-checkbox>
                    <base-checkbox
                      v-model="checkboxes.generateCatagory"
                      class="mb-3"
                    >
                      Generate New Lab No. by Catagory
                    </base-checkbox>
                    <base-checkbox
                      v-model="checkboxes.generateCatagory"
                      class="mb-3"
                    >
                      Generate New Lab No. by Specimen
                    </base-checkbox>
                    <base-checkbox v-model="checkboxes.auto" class="mb-3">
                      Auto Check In
                    </base-checkbox>
                  </div>
                </div>
                <hr />
                <!--
                <div class="form-group row">
                  <label
                    for="example-search-input"
                    class="col-md-2 col-form-label form-control-label"
                    >Auto Print</label
                  >
                  <div class="col-md-10">
                    <div class="row">
                      <base-checkbox v-model="checkboxes.generate" class="mb-3">
                        Auto Print Barcode:
                      </base-checkbox>
                      <base-input />
                    </div>
                    <base-checkbox
                      v-model="checkboxes.generateCatagory"
                      class="mb-3"
                    >
                      Auto Print Barcode Client
                    </base-checkbox>
                    <div class="row">
                      <base-checkbox v-model="checkboxes.generate" class="mb-3">
                        Auto Print Report for Whole Order:
                      </base-checkbox>
                      <base-input />
                    </div>
                    <base-checkbox v-model="checkboxes.auto" class="mb-3">
                      Barcode Printer Model is Zebra
                    </base-checkbox>
                  </div>
                </div>
                <hr />
                <div class="form-group row">
                  <label
                    for="example-email-input"
                    class="col-md-2 col-form-label form-control-label"
                    >Result Pending</label
                  >
                  <div class="col-md-10">
                    <div class="row">
                      <base-checkbox v-model="checkboxes.generate" class="mb-3">
                        Message for Result Pending:
                      </base-checkbox>
                      <base-input />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="form-group row">
                  <label
                    for="example-url-input"
                    class="col-md-2 col-form-label form-control-label"
                    >Backup Database</label
                  >
                  <div class="col-md-10">
                    <div class="row">
                      <base-checkbox v-model="checkboxes.generate" class="mb-3">
                        Time of day when backup process will be
                        started(HH:MM:SS):
                      </base-checkbox>

                      <base-input
                        type="time"
                        value="12:00:00"
                        id="example-time-input"
                      />
                    </div>
                    <div class="row">
                      Folder to Store the Backup File:<base-input />
                    </div>
                  </div>
                </div>
                <hr />
                <div class="form-group row">
                  <label
                    for="example-tel-input"
                    class="col-md-2 col-form-label form-control-label"
                    >Result Pending</label
                  >
                  <div class="col-md-10">
                    <div class="row">
                      Auto Log off Time:
                      <base-input />Minute
                    </div>
                    <div class="row">
                      <p>Date Format:</p>
                      <base-input type="date" id="example-time-input" />
                    </div>
                    <div class="row">
                      <p>Time Format:</p>
                      <base-input
                        type="time"
                        value="12:00:00"
                        id="example-time-input"
                      />
                    </div>
                  </div>
                </div>
                -->
              </form>
            </div>
          </div>
        </div>
        <div v-if="tableType == 1"></div>
      </div>
    </div>
  </div>
</template>
<script>

import BaseSlider from "@/components/argon-core/BaseSlider";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
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
  mixins: [clientPaginationMixin],
  layout: "DashboardLayout",
  name: "inbox",
  components: {
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
  },

  data() {
    return {
      dateFilter: "today",
      tableType: 0,
      testCode: null,
      testName: null,
      specimen: null,
      wardComment: "",
      labComment: "",
      checkboxes: {
        generate: false,
        generateCatagory: false,
        auto: false,
      },
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
      tableData: [
        {
          userID: 1,
          username: "01",
          ip: "012344455",
          firstname: "John",
          lastname: "Michael",
          image: "img/theme/team-1.jpg",
          group: "10/09/2018",
          email: "Argon Dashboard PRO",
          status: true,
          sex: 1,
        },
        {
          userID: 2,
          username: "01",
          ip: "012344455",
          firstname: "Alexandra",
          lastname: "Smith",
          image: "img/theme/team-2.jpg",
          group: "08/09/2018",
          email: "Argon Design System",
          status: false,
          sex: 0,
        },
        {
          userID: 3,
          username: "01",
          ip: "012344455",
          firstname: "Samantha",
          lastname: "Ivy",
          image: "img/theme/team-3.jpg",
          group: "30/08/2018",
          email: "Black Dashboard",
          status: false,
          sex: 0,
        },
      ],
      selectedRows: [],
      currentRow: null,
    };
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
    addNewUser() {
      swal
        .fire({
          html: `<h1 class="text-left">Add User</h1>
           <div class="text-center">
                  <i
                    class="fas fa-user-circle"
                    style="font-size: 80px"
                  ></i>
                </div>
        <div class="row text-left">
          <div class="col-6">
            <h3>User Name</h3>
            <input type="text" class="form-control" id="userName"/>
          </div>
          <div class="col-6">
            <h3>Password</h3>
            <input class="form-control" id="password"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>First Name</h3>
            <input class="form-control" id="firstname"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Last Name</h3>
            <input class="form-control" id="lastname"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Phone</h3>
            <input class="form-control" id="phone"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>E-Mail</h3>
            <input class="form-control" id="email"></input>
          </div>
           <div class="col-6 mt-3">
            <h3>Group</h3>
            <input class="form-control" id="group"></input>
          </div>
          <div class="col-6 mt-3">
            <h3>Lab Type</h3>
            <input class="form-control" id="labType"></input>
          </div>
          <div>
          <label for="location">Location</label>

<select name="location" id="location">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="mercedes">Mercedes</option>
  <option value="audi">Audi</option>
</select>
          </div>
          <div class="row">
          <div class="col-6 mt-3">
          <input type="checkbox" id="permission1" name="permission1" value="validate">
<label for="permission1"> Validate</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission2" name="permission2" value="addTest">
<label for="permission2"> Add Test Validate Screen</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission3" name="permission3" value="validateResult">
<label for="permission3"> Change Validate Result</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission4" name="permission4" value="confindentalTest">
<label for="permission4">See Confindental Test</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission5" name="permission5" value="confindentalResult">
<label for="permission5"> See Confindental Result</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission6" name="permission6" value=" deleteResult">
<label for="permission6"> Delete Result</label></div><div class="col-6 mt-3">
<input type="checkbox" id="permission7" name="permission7" value="deleteCalidateResult">
<label for="permission"> Delete Validate Result</label></div>
          </div>
          
        </div>`,
          buttonsStyling: false,
          showCloseButton: true,
          confirmButtonClass: "btn btn-save",
          confirmButtonText: "Save",
          width: "1000",
        })
        .then((result) => {
          this.userName = document.getElementById("userName").value;
          this.password = document.getElementById("password").value;
          this.firstname = document.getElementById("firstname").value;
          this.lastname = document.getElementById("lastname").value;
          this.phone = document.getElementById("phone").value;
          this.email = document.getElementById("email").value;
          this.group = document.getElementById("group").value;
          this.labType = document.getElementById("labType").value;
          if (result.isConfirmed) {
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



