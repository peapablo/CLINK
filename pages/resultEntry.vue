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
                    />
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
                  <div><i
                      class="fas fa-user-circle"
                      style="font-size:48px"
                    ></i></div>
                  <div>
                    <small>HN</small>
                    <div class="font-weight-bold">{{ currentLab.HN }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>First Name</small>
                    <div class="font-weight-bold">{{ currentLab.FIRST_NAME }}</div>
                  </div>
                  <div>
                    <small>Gender
                    </small>
                    <div class="font-weight-bold">{{ currentLab.SEX }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Last Name</small>
                    <div class="font-weight-bold">{{ currentLab.LAST_NAME }}</div>
                  </div>
                  <div>
                    <small>Age
                    </small>
                    <div class="font-weight-bold">{{ currentLab.AGE }} Year</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Order Date</small>
                    <div class="font-weight-bold">{{ currentLab.ORDER_TIME }}</div>
                  </div>
                  <div>
                    <small> Check-in Date
                    </small>
                    <div class="font-weight-bold">{{ currentLab.CHECKIN_TIME }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>SID</small>
                    <div class="font-weight-bold"></div>
                  </div>
                  <div>
                    <small>Body Site
                    </small>
                    <div class="font-weight-bold">{{ currentLab.BODY_SITE_NAME }}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Specimen</small>
                    <div class="font-weight-bold">{{ currentLab.SPECIMEN_NAME }}</div>
                  </div>
                  <div class="hilight-text  border rounded  text-center px-2 py-1 mt-3">
                    <div class="text-sm">
                      Special for
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Priority</small>
                    <div class="font-weight-bold">{{ currentLab.PRIORITY_NAME }}</div>
                  </div>
                  <div>
                    <small>Doctor
                    </small>
                    <div class="font-weight-bold"></div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Location</small>
                    <div class="font-weight-bold">{{ currentLab.LOCATION_NAME }}</div>
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

    <div
      class="container-fluid py-3"
      v-if="step == 0"
    >

      <div class="row">
        <div class="col-12 col-md-auto col-xl-auto py-4">
          <base-button
            icon
            type="default"
            class="btn btn-search"
          >

            <span class="btn-inner--icon"><i class="far fa-save "></i></span>
            <span class="btn-inner--text">Save</span>
          </base-button>

          <base-button
            icon
            outline
            type="default"
          >
            <span class="btn-inner--icon"><i class="fas fa-sync-alt "></i></span>
          </base-button>

          <base-button
            icon
            outline
            type="default"
          >
            <span class="btn-inner--icon"><i class="far fa-calendar-check "></i></span>
          </base-button>
          <base-button
            icon
            outline
            type="default"
          >
            <span class="btn-inner--icon"> <i class="fas fa-undo "></i></span>
          </base-button>
          <base-button
            icon
            outline
            type="default"
          >
            <span class="btn-inner--icon"> <i class="far fa-eye "></i></span>
          </base-button>

        </div>
        <div class="col-12 col-md col-xl text-md-right py-4 ">
          <base-button
            icon
            type="secondary"
          >
            <span class="btn-inner--icon"><i class="far fa-list-alt "></i></span>
            <span class="btn-inner--text">Validate</span>
          </base-button>

          <base-button
            icon
            type="secondary"
          >
            <span class="btn-inner--icon"><i class="far fa-check-circle "></i></span>
            <span class="btn-inner--text">Approve</span>
          </base-button>
        </div>
        <div class="col-12 col-md-12 col-xl text-xl-right py-4">
          <div class="text-left text-lg-right">
            <base-button
              outline
              type="default"
            >
              <span class="btn-inner--icon"><i class="far fa-trash-alt "></i></span>
            </base-button>
            <base-button
              outline
              type="default"
            >
              <span class="btn-inner--icon"><i class="fas fa-printfar fa-print "></i></span>
            </base-button>
            <base-button
              outline
              type="default"
            >
              <span class="btn-inner--icon mr-3"><i class="fas fa-file-download "></i></span>
              <span class="btn-inner--text">Export</span>
            </base-button>

          </div>
        </div>
      </div>

      <div class="row my-4 mx-1">
        <div
          class="col-auto text-center"
          :class="{
              'active-tab': selectedTab === 0,
              'tab-table': selectedTab !== 0,
            }"
          @click="changeTab(0)"
        >
          Direct / Microscoplc Exam
        </div>
        <div
          class="col-auto text-center"
          :class="{
              'active-tab': selectedTab === 1,
              'tab-table': selectedTab !== 1,
            }"
          @click="changeTab(1)"
        >
          Culture / Identification
        </div>

        <div class="col text-center tab-table">

        </div>
      </div>

      <div v-if="selectedTab == 0">
        <div class="card">
          <el-collapse
            class="px-3"
            v-model="activeNames"
          >
            <el-collapse-item name="1">
              <template slot="title">
                <div class=" d-flex flex-row">
                  <div>
                    <small> Order No : </small>
                    <span class="font-weight-bold"> {{ currentLab.ORDER_ID }} </span>
                  </div>
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <small>  Test : </small>
                    <span class="font-weight-bold"> {{ currentLab.CATEGORY_NAME }} </span> &gt;
                    <span class="font-weight-bold"> {{ currentLab.TEST_PRIMARY_NAME }} </span>
                  </div>
                </div>
              </template>
              <div>
                <el-table
                  class="table-responsive table-flush"
                  row-key="id"
                  :data="bloodAgarData"
                  ref="singleTable"
                  stripe
                  @selection-change="selectionChange"
                >
                  <el-table-column
                    type="selection"
                    align="left"
                  > </el-table-column>
                  <el-table-column
                    label="Secondary test"
                    prop="secondary"
                    width="130"
                  >
                  </el-table-column>

                  <el-table-column
                    label="Result"
                    prop="result"
                    width="180"
                  >
                    <template v-slot="{ row }">
                      <el-select
                        v-model="row.result"
                        placeholder="Select"
                      >
                        <el-option
                          label="NLF"
                          value="NLF"
                        >
                        </el-option>
                        <el-option
                          label="Few"
                          value="Few"
                        >
                        </el-option>
                        <el-option
                          label="White"
                          value="White"
                        >
                        </el-option>
                      </el-select>
                    </template>

                  </el-table-column>
                  <el-table-column
                    label="Date/Time"
                    prop="date"
                    width="130"
                  >
                  </el-table-column>
                  <el-table-column
                    label="Previous Result"
                    prop="previousResult"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    label="Comment"
                    prop="comment"
                    width="120"
                  >
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
                  <el-table-column
                    label="Result By"
                    prop="resultBy"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    label="Val. by"
                    prop="valby"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    label="App. by"
                    prop="appBy"
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    label="More Detail"
                    prop="moreDetail"
                    width="150"
                  >
                    <div slot-scope="{ $index, row }">
                      <base-button
                        @click.native="handleMoreDetail($index, row)"
                        outline
                        type="secondary"
                        icon
                      >
                        <i class="far fa-comment-alt text-black-50"></i>
                      </base-button>
                    </div>
                  </el-table-column>
                  <el-table-column
                    label="HIS"
                    width="100"
                  >
                    <template v-slot="{ row }">
                      <div class="d-flex justify-content-center">
                        <base-switch v-model="row.status_his"></base-switch>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Pre.Lim"
                    width="100"
                  >
                    <template v-slot="{ row }">
                      <div class="d-flex justify-content-center">
                        <base-switch v-model="row.status_prelim"></base-switch>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Validate"
                    width="100"
                  >
                    <template v-slot="{ row }">
                      <div class="d-flex justify-content-center">
                        <base-switch v-model="row.status_validate"></base-switch>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Approve"
                    width="100"
                  >
                    <template v-slot="{ row }">
                      <div class="d-flex justify-content-center">
                        <base-switch v-model="row.status_approve"></base-switch>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="Finish"
                    prop="finish"
                    width="100"
                  >
                    <template v-slot="{ row }">
                      <div class="d-flex justify-content-center">
                        <base-switch v-model="row.status_finish"></base-switch>
                      </div>
                    </template>
                  </el-table-column>
                  
                  <el-table-column
                    label="INST"
                    width="100"
                  >
                    <div slot-scope="{ $index, row }">
                      <base-button
                        class="px-0"
                        @click.native="handleMoreDetail($index, row)"
                        outline
                        type="secondary"
                        icon
                      >

                        <i class="far fa-edit text-black-50"></i>
                      </base-button>
                    </div>
                  </el-table-column>
                  <el-table-column
                    label="AST"
                    width="100"
                  >
                    <div slot-scope="{ $index, row }">
                      <base-button
                        class="px-0"
                        @click.native="goToDetail($index, row)"
                        outline
                        type="secondary"
                        icon
                      >
                        <i class="far fa-edit text-black-50"></i>
                      </base-button>
                    </div>
                  </el-table-column>
                </el-table>
              </div>
            </el-collapse-item>

          </el-collapse>
        </div>

      </div>

      <div v-if="selectedTab == 1"> </div>

    </div>
    <div
      class="container-fluid py-3"
      v-if="step == 1"
    >
      <div class="row my-4 er align-items-center">
        <div class="col-6 col-lg">
          <div>
            Antimicrobial Susceptibility Test
          </div>

        </div>
        <div class="col-6 col-lg-auto text-right text-lg-center">
          <div>
            <base-button
              icon
              type="primary"
              class="btn btn-search"
            >
              <span class="btn-inner--icon"><i class="far fa-bookmark"></i></span>
              <span class="btn-inner--text">Save</span>
            </base-button>
          </div>

        </div>
        <div class="col-12 col-lg mt-3 mt-lg-0">
          <div class="text-right">
            <base-button
              outline
              type="default"
            >
              <span class="btn-inner--icon"><i class="fas fa-printfar fa-print "></i></span>
            </base-button>
            <base-button
              outline
              type="default"
            >
              <span class="btn-inner--icon mr-3"><i class="fas fa-file-download "></i></span>
              <span class="btn-inner--text">Export</span>
            </base-button>

            <base-button
              outline
              type="default"
              class="ml-3"
              @click="step = 0"
            >
              <span class="btn-inner--icon"><i class="fas fa-times "></i></span>
            </base-button>
          </div>
        </div>
      </div>

      <div class="row mb-4">
        <div class="col-12 col-lg-4">
          <div class="row">
            <div class="col-6">
              <div>
                <small>Isolate No.</small>
                <div>{Isolate No.}</div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <small>Organism</small>
                <div>{Organism}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-lg-auto my-3 my-lg-0">
          <div class="row align-items-end">
            <div class="col-6">
              <div>
                <small>Antibiotic Profile
                </small>
                <div>
                  <template>
                    <el-select
                      v-model="antibioticValue"
                      placeholder="Select"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div>
                <base-button
                  icon
                  outline
                  type="default"
                >
                  <span class="btn-inner--icon"><i class="fas fa-plus"></i></span>
                  <span class="btn-inner--text"> Antibiotic Profile</span>
                </base-button>

              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg">
          <div class="row h-100 align-items-end">
            <div class="col-auto mb-2">
              <div>
                <base-checkbox v-model="checkboxesMic">
                  <span>Mic</span>

                </base-checkbox>
              </div>
            </div>
            <div class="col-auto mb-2">
              <div>
                <base-checkbox v-model="checkboxesZone">
                  Zone
                </base-checkbox>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="card">
        <el-table
          :data="queriedData"
          row-key="id"
          header-row-class-name="thead-light"
          @selection-change="selectionChange"
          stripe
        >
          <el-table-column
            type="selection"
            align="left"
          > </el-table-column>
          <el-table-column
            label="Antibiotic Medicine"
            width="180"
            prop="antibioticMedicine"
          >

          </el-table-column>

          <el-table-column
            label="Code"
            width="180"
            prop="code"
          >
          </el-table-column>

          <el-table-column
            label="Antibiotic NameOffice"
            width="200"
          >
            <template v-slot="{ row }">
              <div class="d-flex justify-content-center">
                <el-select
                  class="select-danger"
                  placeholder="Single Select"
                  v-model="row.antibioticNameOffice"
                >
                  <el-option
                    label="D-TEST"
                    value="d-test"
                  >
                  </el-option>
                </el-select>

              </div>
            </template>
          </el-table-column>

          <el-table-column
            v-for="column in tableColumns"
            :key="column.label"
            v-bind="column"
          >
          </el-table-column>

          <el-table-column
            label="Comment"
            width="120"
          >
            <div class="text-center">
              <i class="far fa-comment-alt text-xl"></i>
            </div>
          </el-table-column>
          <el-table-column
            label="Val. by"
            width="120"
            prop="val"
          >

          </el-table-column>

          <el-table-column
            label="App. by"
            width="120"
            prop="app"
          >

          </el-table-column>

          <el-table-column
            label="Result By"
            width="120"
            prop="result"
          >

          </el-table-column>

          <el-table-column
            label="HIS"
            width="100"
          >
            <template v-slot="{ row }">
              <div class="d-flex justify-content-center">
                <base-switch v-model="row.his"></base-switch>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Status"
            width="120"
            prop="status"
          >

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
</template>
<script>
import {
  Table,
  TableColumn,
  Select,
  Option,
  Collapse,
  CollapseItem,
} from 'element-ui';
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
import { BasePagination } from '@/components/argon-core';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin';
import axios from 'axios';
import swal from 'sweetalert2';

export default {
  mixins: [clientPaginationMixin],
  layout: 'DashboardLayout',
  name: 'resultEntry',
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
    const url_string = window.location.href;
    const url = new URL(url_string);
    const labId = url.searchParams.get('id');
    if(labId == null || labId == ''){
      this.$router.push({
        path: 'orderMonitoring',
      });
    }else{
      this.currentLabId = labId;
      this.fetchData();
    }
  },
  data() {
    return {
      currentLabId: null,
      currentLab: [],
      step: 0,
      selectedTab: 0,
      checkboxesMic: true,
      checkboxesZone: true,
      bloodAgarData: [
        {
          secondary: 'Organism',
          result: 'Result',
          date: '',
          previousResult: '',
          comment: '',
          resultBy: '',
          valby: '',
          appBy: '',
          moreDetail: 'More Detail',
          status_his:false,
          status_prelim:false,
          status_validate:false,
          status_approve:false,
          status_finish:false,
          inst: true,
          ast: true,
        },
        {
          secondary: 'Grading',
          result: 'Result',
          date: '',
          previousResult: '',
          comment: '',
          resultBy: '',
          valby: '',
          appBy: '',
          moreDetail: 'More Detail',
          status_his:false,
          status_prelim:false,
          status_validate:false,
          status_approve:false,
          status_finish:false,
          inst: true,
          ast: true,
        },
        {
          secondary: 'Colony morphology',
          result: 'Result',
          date: '',
          previousResult: '',
          comment: '',
          resultBy: '',
          valby: '',
          appBy: '',
          moreDetail: 'More Detail',
          status_his:false,
          status_prelim:false,
          status_validate:false,
          status_approve:false,
          status_finish:false,
          inst: true,
          ast: true,
        },
      ],
      tableColumns: [
        {
          prop: 'resValue',
          label: 'Res.Value(MIC)',
          sortable: false,
          width: 180,
        },
        {
          prop: 'resText',
          label: 'Res.Text(MIC)',
          sortable: false,
          width: 180,
        },
        {
          prop: 'micS',
          label: 'MIC-S',
          sortable: false,
          width: 100,
        },
        {
          prop: 'micI',
          label: 'MIC-I',
          sortable: false,
          width: 100,
        },
        {
          prop: 'micR',
          label: 'MIC-R',
          sortable: false,
          width: 100,
        },
        {
          prop: 'date',
          label: 'Date/Time',
          sortable: false,
          width: 180,
        },
        {
          prop: 'antibiotic',
          label: 'Antibiotic',
          sortable: false,
          width: 180,
        },
      ],
      tableData: [
        {
          antibioticMedicine: 'Quinolone',
          code: 'CIP1',
          antibioticNameOffice: 'd-test',
          resValue: '<1',
          resText: 'S',
          micS: '1',
          micI: '1',
          micR: '4',
          date: '23/11/21',
          antibiotic: 'Fluoroquin',
          comment: true,
          val: '',
          app: '',
          result: 'Sakorm',
          his: true,
          status: 'IRC',
        },
      ],
      selectedRows: [],
      options: [
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      antibioticValue: '',
      activeNames: ['1'],
    };
  },
  methods: {
    fetchData() {
      const url = this.$store.state.urlBase + 'api/inbox.php?data=labinfo&id='+this.currentLabId;
      axios({
        method: 'get',
        url: url  
      }).then((response) => {
        const result = response.data;
        if (result) {
          this.currentLab = result[0];
          if(this.currentLab['TEST_PRIMARY_ID'] == null || this.currentLab['TEST_PRIMARY_ID'] == '' || this.currentLab['STATUS'] < 2){
            this.$router.push({
              path: 'orderMonitoring',
            });
          } 
        }else{
          this.$router.push({
            path: 'orderMonitoring',
          });
        }
      });
    },
    changeTab(tab) {
      this.selectedTab = tab;
    },
    selectionChange(selectedRows) {
      console.log(selectedRows);
      this.selectedRows = selectedRows;
    },
    async handleComment(index, row) {
      const { value: text } = await swal.fire({
        input: 'textarea',
        inputLabel: 'Comment',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here',
        },
        showCancelButton: true,
      });

      if (text) {
        swal.fire(text);
      }
    },
    async handleMoreDetail(index, row) {
      const { value: text } = await swal.fire({
        input: 'textarea',
        inputLabel: 'More detail',
        inputPlaceholder: 'Type your message here...',
        inputAttributes: {
          'aria-label': 'Type your message here',
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









