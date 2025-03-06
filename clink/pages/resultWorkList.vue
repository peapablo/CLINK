<template>
  <div>
    <div class="border-bottom bg-primary">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div>
            <h1 class="text-white">Result work list</h1>
          </div>
          <div class="row align-items-center">
            <div class="col">
              <div>
                <label class="form-control-label">Primary Test</label>
                <base-input>
                  <el-select
                    v-model="selected.primaryTest"
                    placeholder="Simple select"
                  >
                    <el-option
                      label="Today"
                      value="today"
                    > </el-option>
                  </el-select>
                </base-input>
              </div>

            </div>
            <div class="col">
              <div>
                <label class="form-control-label">Day</label>
                <base-input>
                  <el-select
                    v-model="selected.day"
                    placeholder="Simple select"
                  >
                    <el-option
                      label="Today"
                      value="today"
                    > </el-option>
                  </el-select>
                </base-input>
              </div>

            </div>
            <div class="col">
              <div>
                <label class="form-control-label">Result</label>
                <base-input>
                  <el-select
                    v-model="selected.result"
                    placeholder="Simple select"
                  >
                    <el-option
                      label="Today"
                      value="today"
                    > </el-option>
                  </el-select>
                </base-input>
              </div>

            </div>
            <div class="col">
              <div>
                <base-button
                  icon
                  type="primary"
                  class="btn btn-search"
                >
                  <span class="btn-inner--text">Search</span>
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-3 ">
      <div class="py-3 ">
        <div class="row">
          <div class="col-12 col-lg-auto">
            <div>
              <base-button
                icon
                type="primary"
                class="btn btn-search "
              >
                <span class="btn-inner--icon"><i class="far fa-bookmark"></i></span>
                <span class="btn-inner--text">Save</span>
              </base-button>

              <base-button
                icon
                type="secondary"
                @click="filterData(1)"
              >
                <span class="btn-inner--icon"><i class="far fa-bookmark"></i></span>
                <span class="btn-inner--text">Pre-Lim</span>
              </base-button>

              <base-button
                icon
                type="secondary"
                @click="filterData(2)"
              >
                <span class="btn-inner--icon"><i class="far fa-list-alt"></i></span>
                <span class="btn-inner--text">Validate</span>
              </base-button>

              <base-button
                icon
                type="secondary"
                @click="filterData(3)"
              >
                <span class="btn-inner--icon"><i class="far fa-check-circle"></i></span>
                <span class="btn-inner--text">Approve</span>
              </base-button>
            </div>
          </div>
          <div class="col-12 col-lg mt-4 mt-lg-0">
            <div class="text-left text-lg-right">
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
              >
                <span class="btn-inner--icon"><i class="fas fa-times "></i></span>
              </base-button>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 card">
        <div>
          <el-table
            :data="queriedData"
            row-key="id"
            header-row-class-name="thead-light"
            stripe
            @selection-change="selectionChange"
          >
            <el-table-column
              v-for="column in tableColumns"
              :key="column.label"
              v-bind="column"
            >
            </el-table-column>
            <el-table-column
              label="Result"
              width="200"
            >
              <template v-slot="{ row }">
                <div class="d-flex justify-content-center">
                  <el-select
                    class="select-danger"
                    placeholder="Single Select"
                    v-model="row.result"
                  >
                    <el-option
                      label="No Growth After 1 Day"
                      value="0"
                    >
                    </el-option>
                  </el-select>

                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Pre.Lim"
              width="100"
            >
              <template v-slot="{row}">
                <div class="d-flex justify-content-center">
                  <base-switch v-model="row.preLim"></base-switch>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Final Result"
              width="140"
            >
              <template v-slot="{row}">
                <div class="d-flex justify-content-center">
                  <base-switch v-model="row.finalResult"></base-switch>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
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
          <div>
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
import { Select, Option, Table, TableColumn } from 'element-ui';
import { BasePagination } from '@/components/argon-core';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin';

export default {
  mixins: [clientPaginationMixin],
  layout: 'DashboardLayout',
  name: 'resultWorkList',
  components: {
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
  },
  data() {
    return {
      filter: 0,
      selected: {
        primaryTest: '',
        day: '',
        result: '',
      },
      tableColumns: [
        {
          type: 'selection',
        },
        {
          prop: 'hisRequestDate',
          label: 'HIS Request Date',
          sortable: false,
          width: 160,
        },
        {
          prop: 'acceptDate',
          label: 'Accept Date',
          sortable: false,
        },
        {
          prop: 'days',
          label: 'Days',
          sortable: false,
        },
        {
          prop: 'labNumber',
          label: 'Lab Number',
          sortable: false,
        },
        {
          prop: 'primaryTest',
          label: 'Primary Test',
          sortable: false,
        },
        {
          prop: 'secondaryTest',
          label: 'Secondary Test',
          sortable: false,
        },
        // {
        //   prop: 'result',
        //   label: 'Result',
        //   sortable: false,
        // },
        // {
        //   prop: 'preLim',
        //   label: 'Pre.Lim',
        //   sortable: false,
        // },
        // {
        //   prop: 'finalResult',
        //   label: 'Final Result',
        //   sortable: false,
        // },
      ],
      tableData: [
        {
          hisRequestDate: '11',
          acceptDate: '',
          days: '',
          labNumber: '',
          primaryTest: '',
          secondaryTest: '',
          result: 0,
          preLim: true,
          finalResult: true,
        },
        {
          hisRequestDate: '',
          acceptDate: '',
          days: '',
          labNumber: '',
          primaryTest: '',
          secondaryTest: '',
          result: 0,
          preLim: true,
          finalResult: true,
        },
      ],
      selectedRows: [],
    };
  },
  methods: {
    filterData(type) {
      this.filter = this.type;
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows;
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
.tableSelect .form-group {
  margin-bottom: 0 rem !important;
}
</style>









