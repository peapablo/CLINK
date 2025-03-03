<template>
  <div>
    <div class="w-100 border-bottom">
      <div class="container-fluid py-3">
        <div class="row align-items-center mb-4">
          <div class="col-auto col-xl py-1">
            <h1>Work List</h1>
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
                    placeholder="Work List Search..."
                  />
                </div>
              </div>
            </div>

          </div>
          <div class="col-auto col-xl text-right py-1">
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

            <base-button
              icon
              outline
              type="default"
            >
              <span class="btn-inner--icon"><i class="fas fa-broom"></i></span>
            </base-button>
          </div>
        </div>

      </div>
    </div>

    <div class="container-fluid py-3">
      <div class="card">

        <el-table
          class="table-responsive table-flush"
          header-row-class-name="thead-light"
          row-key="orderId"
          stripe
          :data="queriedData"
          ref="singleTable"
        >

          <el-table-column
            label="Date"
            prop="date"
            width="130"
          >

          </el-table-column>
          <el-table-column
            label="Order ID"
            prop="orderId"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="HN"
            prop="hn"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="First name"
            prop="firstname"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="Last name"
            prop="lastname"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="Specimen"
            prop="specimen"
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="Primary Test"
            prop="primaryTest"
            width="180"
          >
          </el-table-column>
          <el-table-column
            label="Remark"
            prop="remark"
          >
            <template v-slot="{row}">
              <input
                type="text"
                class="form-control"
                v-model="row.note"
              />
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
    </div>
  </div>
</template>
<script>
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
import { BasePagination } from '@/components/argon-core';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin';
import { Select, Option, Table, TableColumn } from 'element-ui';
import flatPicker from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  mixins: [clientPaginationMixin],
  layout: 'DashboardLayout',
  name: 'workList',
  components: {
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    BasePagination,
    RouteBreadCrumb,
  },
  data() {
    return {
      tableData: [
        {
          date: '01-01-2021',
          orderId: '123',
          hn: 'HN001',
          firstname: 'Firstname',
          lastname: 'Lastname',
          specimen: 'Specimen',
          primaryTest: 'Primary Test',
          Remark: 'Note',
        },
      ],
      dateFrom:
        new Date().getFullYear().toString() +
        '-' +
        new Date().getMonth().toString() +
        '-' +
        new Date().getDate().toString(),
      dateTo:
        new Date().getFullYear().toString() +
        '-' +
        new Date().getMonth().toString() +
        '-' +
        new Date().getDate().toString(),
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: 'd-m-Y',
        dateFormat: 'Y-m-d',
      },
    };
  },
  methods: {},
};
</script>
<style>
</style>

<style scoped>
small {
  color: #8898aa !important;
}
.input-style {
  background-color: transparent;
}
.input-style:focus-visible {
  outline: -webkit-focus-ring-color auto 0px !important;
}
</style>






