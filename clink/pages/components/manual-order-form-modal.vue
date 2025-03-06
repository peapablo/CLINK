<template>
  <Modal :show.sync="open" @close="cancelCreateOrder" size="xl">
    <div class="row mb-4">
      <button
        type="button"
        class="swal2-close"
        aria-label="Close this dialog"
        style="display: flex; top: 20px; right: 20px"
        @click="cancelCreateOrder"
      >
        ×
      </button>

      <div class="col-12">
        <div class="p-3 bg-white">
          <div class="row">
            <!-- <div class="col-12">
              <h1 class="text-center">
                {{
                  this.modalType === "create"
                    ? "Add Manual Order"
                    : "Edit Order"
                }}
              </h1>
            </div> -->

            <div class="col-12" v-if="modalType === 'create'">
              <div class="text-center">
                <i class="fas fa-user-circle" style="font-size: 80px"></i>
              </div>
            </div>
            <div
              class="col-12"
              v-if="modalType === 'edit'"
              style="border-bottom: 1px solid #cccccc"
            >
              <div
                class="d-flex flex-row align-items-center"
                style="column-gap: 16px"
              >
                <div>
                  <i
                    v-if="createdGender === '2'"
                    class="fas fa-female"
                    style="color: rgb(206, 130, 178); font-size: 36px"
                  ></i>
                  <i
                    v-if="createdGender === '1'"
                    class="fas fa-male"
                    style="font-size: 36px"
                  ></i>
                </div>

                <div>
                  <h4 style="margin-bottom: 0">Order ID</h4>
                  <h1 style="margin-bottom: 0">{{ createdOrderID }}</h1>
                </div>
              </div>
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <base-input label="Order Date">
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  :config="flatPickerConfig"
                  class="form-control datepicker"
                  v-model="inputOrderDate"
                ></flat-picker>
              </base-input>
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                HN <span class="text-red">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors ? errors.inputHN : false,
                }"
                type="text"
                v-model="inputHN"
              />
            </div>

            <div
              :class="{
                'custom-el-select-error': errors
                  ? errors.inputCustomerId
                  : false,
                'col-12 col-lg-4 mt-4': true,
              }"
            >
              <h3 class="form-control-label">
                Client Name <span class="text-red">*</span>
              </h3>
              <base-input
                :class="{
                  'pointer-events-none': !showSaveButton,
                }"
              >
                <el-select
                  placeholder="Client Name"
                  filterable
                  v-model="inputCustomerId"
                  class="w-100"
                >
                  <el-option
                    v-for="item in clientSelect"
                    :key="item.id"
                    :label="item.business_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </base-input>
            </div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputTitle : false,
                'col-12 col-lg-4 mt-4': true,
              }"
            >
              <h3 class="form-control-label">
                Title <span class="text-red">*</span>
              </h3>
              <base-input
                :class="{
                  'pointer-events-none': !showSaveButton,
                }"
              >
                <el-select
                  placeholder="Title"
                  filterable
                  v-model="inputTitle"
                  class="w-100"
                >
                  <el-option
                    v-for="item in titleSelect"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                  </el-option>
                </el-select>
              </base-input>
            </div>

            <div class="col-12 col-lg-4 mt-4">
              <h3 class="form-control-label">
                First name <span class="text-red">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors
                    ? errors.inputFirstname
                    : false,
                  'pointer-events-none': !showSaveButton,
                }"
                type="text"
                v-model="inputFirstname"
              />
            </div>

            <div class="col-12 col-lg-4 mt-4">
              <h3 class="form-control-label">
                Last name <span class="text-red">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors ? errors.inputLastname : false,
                  'pointer-events-none': !showSaveButton,
                }"
                type="text"
                v-model="inputLastname"
              />
            </div>

            <div
              :class="{
                'custom-flat-datepicker-error': errors
                  ? errors.inputDateOfBirth
                  : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <base-input label="Date of birth" :required="true">
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  :config="flatPickerConfigMaxDate"
                  class="form-control datepicker"
                  v-model="inputDateOfBirth"
                ></flat-picker>
              </base-input>
            </div>

            <div class="col-12 col-lg-4 mt-4">
              <h3 class="form-control-label">
                Year of Birth <span class="text-red">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors ? errors.inputAge : false,
                }"
                disabled
                type="text"
                :value="getAgeObject.years"
                placeholder="กรุณาเลือกวันเกิด"
              />
            </div>

            <div class="col-12 col-lg-4 mt-4">
              <h3 class="form-control-label">
                Month of Birth <span class="text-r ed">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors ? errors.inputAge : false,
                }"
                disabled
                type="text"
                :value="getAgeObject.months"
                placeholder="กรุณาเลือกวันเกิด"
              />
            </div>

            <div class="col-12 col-lg-4 mt-4">
              <h3 class="form-control-label">
                Days of Birth <span class="text-red">*</span>
              </h3>
              <input
                :class="{
                  'form-control': true,
                  'border-danger border': errors ? errors.inputAge : false,
                }"
                disabled
                type="text"
                :value="getAgeObject.days"
                placeholder="กรุณาเลือกวันเกิด"
              />
            </div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputGender : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                Gender <span class="text-red">*</span>
              </h3>
              <el-select
                placeholder="Gender"
                v-model="inputGender"
                class="w-100"
              >
                <el-option label="Male" value="1"></el-option>
                <el-option label="Female" value="2"></el-option>
              </el-select>
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Lab number</h3>
              <input
                class="form-control"
                type="text"
                v-model="inputLabNumber"
              />
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Doctor</h3>
              <input class="form-control" type="text" v-model="inputDoctor" />
            </div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputPriority : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <base-input
                label="Priority"
                :required="true"
                :inputClasses="{
                  'border-danger border': errors ? errors.inputPriority : false,
                }"
              >
                <el-select
                  placeholder="Select Priority"
                  v-model="inputPriority"
                  filterable
                >
                  <el-option
                    v-for="item in prioritySelect"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
              </base-input>
            </div>

            <div
              :class="{
                'custom-flat-datepicker-error': errors
                  ? errors.inputAdmitDate
                  : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <base-input
                label="Admit Date"
                :required="true"
                :inputClasses="{
                  'border-danger border': errors
                    ? errors.inputAdmitDate
                    : false,
                }"
              >
                <flat-picker
                  slot-scope="{ focus, blur }"
                  @on-open="focus"
                  @on-close="blur"
                  :config="flatPickerConfig"
                  class="form-control datepicker"
                  v-model="inputAdmitDate"
                ></flat-picker>
              </base-input>
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Admit No.</h3>
              <input class="form-control" type="text" v-model="inputAdmitNo" />
            </div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputLocation : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <base-input label="Location" :required="true">
                <el-select
                  placeholder="Location"
                  filterable
                  v-model="inputLocation"
                >
                  <el-option
                    v-for="item in locationSelect"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
              </base-input>
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Ext HN.</h3>
              <input class="form-control" type="text" v-model="inputExHN" />
            </div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Ext Location</h3>
              <input
                class="form-control"
                type="text"
                v-model="inputExLocation"
              />
            </div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputSpecimen : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                Specimen <span class="text-red">*</span>
              </h3>
              <el-select
                class="w-100"
                placeholder="Specimen"
                v-model="inputSpecimen"
                filterable
              >
                <option value="null">-- โปรดระบุ --</option>
                <el-option
                  v-for="item in specimenCheckbox"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                ></el-option>
              </el-select>
            </div>

            <div class="d-none d-lg-block col-12 col-lg-4 mt-4"></div>

            <div
              :class="{
                'custom-el-select-error': errors ? errors.inputBodySite : false,
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">Body Site (Optional)</h3>
              <el-select
                placeholder="Body Site"
                v-model="inputBodySite"
                filterable
                class="w-100"
              >
                <el-option
                  v-for="item in bodySiteSelect"
                  :key="item.ID"
                  :label="item.GROUP_NAME + ' - ' + item.NAME"
                  :value="item.ID"
                ></el-option>
              </el-select>
            </div>
            <div class="d-none d-lg-block col-lg-8"></div>

            <div
              :class="{
                'col-12 col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                {{
                  modalType === "edit"
                    ? "รูปแบบการทดสอบ: Test"
                    : "เลือกรูปแบบการทดสอบ (Test / Profile Test)"
                }}

                <span class="text-red">*</span>
              </h3>

              <!-- Test -->
              <base-radio
                :class="{
                  'my-2': true,
                  'pointer-events-none': !showSaveButton,
                }"
                name="test"
                value="test"
                v-model="inputTestType"
                type="Test"
                style="text-transform: capitalize"
                v-if="modalType === 'create'"
                >Test</base-radio
              >

              <!-- Profile Test -->
              <base-radio
                :class="{
                  'my-2': true,
                  'pointer-events-none': !showSaveButton,
                }"
                name="profile-test"
                value="profile-test"
                v-model="inputTestType"
                type="ProfileTest"
                style="text-transform: capitalize"
                v-if="modalType === 'create'"
                >Profile Test</base-radio
              >

              <!-- Test Options -->
              <div
                :class="{
                  'custom-el-select-error': errors
                    ? errors.inputTestTypeOption
                    : false,
                  'pointer-events-none': !showSaveButton,
                }"
              >
                <el-select
                  v-if="
                    (inputTestType === 'test' && modalType === 'create') ||
                    modalType === 'edit'
                  "
                  class="w-100"
                  placeholder="Select Test"
                  filterable
                  :value="inputTestTypeOption"
                  @change="onChangeTestTypeOption"
                >
                  <el-option
                    v-for="item in directExaminationTestCheckbox"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  ></el-option>
                </el-select>
                <!-- Profile Test Options -->
                <el-select
                  v-if="
                    inputTestType === 'profile-test' && modalType === 'create'
                  "
                  class="w-100"
                  placeholder="Select Profile Test"
                  filterable
                  :value="inputTestTypeOption"
                  @change="onChangeTestTypeOption"
                >
                  <el-option
                    v-for="item in profileTests"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>

            <div
              :class="{
                'col-lg-4 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
              v-if="modalType === 'edit'"
            >
              <h3 class="form-control-label">Category</h3>

              <base-input v-model="createdTestCategory" disabled />
            </div>

            <div
              :class="[
                'd-none d-lg-block',
                {
                  'col-lg-8': modalType === 'create',
                  'col-lg-4': modalType === 'edit',
                },
              ]"
            ></div>

            <div
              :class="{
                'col-12 col-lg-6 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                Ward Comment
                <div v-if="isCheckedIn" class="ml-4 d-inline-block">
                  <base-checkbox v-model="inputCheckReportWardComment">
                    แสดงข้อความใน Report</base-checkbox
                  >
                </div>
              </h3>
              <textarea
                class="form-control"
                rows="3"
                v-model.lazy="inputWardComment"
              ></textarea>
            </div>

            <div
              :class="{
                'col-12 col-lg-6 mt-4': true,
                'pointer-events-none': !showSaveButton,
              }"
            >
              <h3 class="form-control-label">
                Lab Comment

                <div v-if="isCheckedIn" class="ml-4 d-inline-block">
                  <base-checkbox v-model="inputCheckReportLabComment">
                    แสดงข้อความใน Report</base-checkbox
                  >
                </div>
              </h3>
              <textarea
                class="form-control"
                rows="3"
                v-model.lazy="inputLabComment"
              ></textarea>
            </div>

            <div class="col-12 my-4" v-if="showSaveButton">
              <div
                class="
                  d-flex
                  flex-row
                  align-items-center
                  justify-content-center
                "
                style="column-gap: 12px"
              >
                <base-button class="" @click="saveOrder" icon type="default">
                  <span class="btn-inner--icon">
                    <i class="ni ni-send"></i>
                  </span>
                  <span class="btn-inner--text">{{
                    this.modalType === "create"
                      ? "Add New Manual Order"
                      : "Save Manual Order"
                  }}</span>
                </base-button>

                <base-button
                  class=""
                  icon
                  type="secondary"
                  @click="cancelCreateOrder"
                >
                  <span class="btn-inner--text">Cancel</span>
                </base-button>
              </div>
            </div>

            <template v-if="modalType !== 'create'">
              <div class="col-12">
                <h3 style="text-transform: capitalize">
                  ประวัติการแก้ไขข้อมูล
                </h3>
              </div>

              <div class="col-12 mt-4">
                <div class="card">
                  <el-table
                    class="table-responsive table-flush"
                    header-row-class-name="thead-light"
                    highlight-current-row
                    row-key="id"
                    :data="logHistory"
                    ref="logHistoryTable"
                  >
                    <el-table-column label="ลำดับ" prop="id" width="80">
                      <template v-slot="{ row, $index }">
                        <b>{{ $index + 1 }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column label="วันที่" prop="Date" min-width="130">
                      <template v-slot="{ row }">
                        <b>{{ formatDate(row.created_at) }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="การกระทำ"
                      prop="type"
                      min-width="130"
                    >
                      <template v-slot="{ row }">
                        <b>{{ row.action }}</b>
                      </template>
                    </el-table-column>

                    <el-table-column
                      label="ผู้ใช้งาน"
                      prop="user"
                      min-width="130"
                    >
                      <template v-slot="{ row }">
                        <b>
                          {{
                            row.created_by_user
                              ? row.created_by_user.firstname +
                                " " +
                                row.created_by_user.lastname
                              : "-"
                          }}</b
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import { EventBus } from "@/util/event-bus";
import BaseSlider from "@/components/argon-core/BaseSlider";
import { Modal, BaseAlert, BasePagination } from "@/components/argon-core";
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
import swal from "sweetalert2";
import { mappingApi } from "@/util/mappingApi";
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";
import * as Yup from "yup";

export default {
  middleware: "protected",
  mixins: [clientPaginationMixin],
  name: "ManualOrderFormModal",
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
    flatPicker,
  },

  data() {
    return {
      errors: {},
      validationSchema: Yup.object().shape({
        inputHN: Yup.string().required("กรุณาระบุ HN"),
        inputTitle: Yup.string().required("กรุณาระบุคำนำหน้า"),
        inputCustomerId: Yup.number().not([0]).required("กรุณาระบุชื่อลูกค้า"),
        inputFirstname: Yup.string().required("กรุณาระบุชื่อจริง"),
        inputLastname: Yup.string().required("กรุณาระบุนามสกุล"),
        inputDateOfBirth: Yup.string().required("กรุณาระบุวันเดือนปีเกิด"),
        inputGender: Yup.string().required("กรุณาระบุเพศ"),
        inputPriority: Yup.string().required("กรุณาระบุความสำคัญ"),
        inputAdmitDate: Yup.string().required("กรุณาระบุวันที่ Admit"),
        inputLocation: Yup.string().required("กรุณาระบุ Location"),
        inputSpecimen: Yup.string().required("กรุณาระบุ Specimen"),
        // inputBodySite: Yup.string().required("กรุณาระบุ Body Site"),
        inputTestType: Yup.string().required("กรุณาระบุ Test Type"),
        inputTestTypeOption: Yup.string().test(
          "testType",
          "กรุณาระบุ Test",
          (val) => {
            if (this.inputTestType === "test") {
              return val !== "" && val !== null;
            } else if (this.inputTestType === "profile-test") {
              return val !== "" && val !== null;
            }
          }
        ),
      }),
      editValidationSchema: Yup.object().shape({
        inputHN: Yup.string().required("กรุณาระบุ HN"),
        inputTitle: Yup.string().required("กรุณาระบุคำนำหน้า"),
        inputCustomerId: Yup.number()
          .not([0, ""])
          .required("กรุณาระบุชื่อลูกค้า"),
        inputFirstname: Yup.string().required("กรุณาระบุชื่อจริง"),
        inputLastname: Yup.string().required("กรุณาระบุนามสกุล"),
        inputDateOfBirth: Yup.string().required("กรุณาระบุวันเดือนปีเกิด"),
        inputGender: Yup.string().required("กรุณาระบุเพศ"),
        inputPriority: Yup.string().required("กรุณาระบุความสำคัญ"),
        inputAdmitDate: Yup.string().required("กรุณาระบุวันที่ Admit"),
        inputLocation: Yup.string().required("กรุณาระบุ Location"),
        inputSpecimen: Yup.string().required("กรุณาระบุ Specimen"),
        // inputBodySite: Yup.string().required("กรุณาระบุ Body Site"),
        inputTestType: Yup.string().required("กรุณาระบุ Test Type"),
        inputTestTypeOption: Yup.string().test(
          "testType",
          "กรุณาระบุ Test",
          (val) => {
            return val !== "" || val !== null;
          }
        ),
      }),

      open: false,
      modalType: "create",
      orderId: null,
      addOnFunction: null,
      isCheckedIn: false,
      isOpenFromSidebar: false,

      useGetAge: true,

      titleSelect: [],
      clientSelect: [],
      locationSelect: [],
      prioritySelect: [],
      bodySiteGroupSelect: [],
      bodySiteSelect: [],

      filterBodySite: [],
      inputOrderDate:
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString(),
      inputHN: "",
      inputTitle: "",
      inputFirstname: "",
      inputLastname: "",
      inputDateOfBirth: "",
      inputGender: "",
      inputAge: "",
      inputLabNumber: "",
      inputDoctor: "",
      inputPriority: "",
      inputCustomerId: "",
      inputAdmitDate: "",
      inputAdmitNo: "",
      inputSpecimen: "",
      inputTestPrimary: "",
      inputLocation: "",
      inputExLocation: "",
      inputExHN: "",
      inputBodySite: "",
      inputTestType: "test",
      inputTestTypeOption: "",
      inputWardComment: "",
      inputLabComment: "",
      inputCheckReportWardComment: false,
      inputCheckReportLabComment: false,

      createdOrderID: "",
      createdGender: "",
      createdTestCategory: null,

      specimen: "",
      testPrimary: "",
      hn: "",
      name: "",
      firstname: "",
      lastname: "",
      labNumber: "",
      location: "",
      specimenCheckbox: [],
      specimenNote: "",
      directExaminationTestCheckbox: [],
      profileTests: [],
      primaryTestTab: 0,
      flatPickerConfig: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
      },
      flatPickerConfigMaxDate: {
        allowInput: true,
        altInput: true,
        altFormat: "d-m-Y",
        dateFormat: "Y-m-d",
        maxDate: new Date(),
      },

      logHistory: [],
    };
  },

  created() {
    EventBus.$on(
      "open-edit-manual-order-form-modal",
      (_data, addOnFunction, _isOpenFromSidebar) => {
        this.orderId = _data.id ?? null;
        this.isOpenFromSidebar = _isOpenFromSidebar ?? false;
        this.useGetAge = false;
        this.errors = {};

        this.logHistory = [];

        if (_data.status === 2) {
          this.isCheckedIn = true;
          this.inputCheckReportWardComment = _data.WARD_ON_REPORT === true;
          this.inputCheckReportLabComment = _data.LAB_ON_REPORT === true;
        } else {
          this.isCheckedIn = false;
          this.inputCheckReportWardComment = false;
          this.inputCheckReportLabComment = false;
        }

        this.inputTitle = _data.TITLE_ID ?? "";
        this.inputOrderDate = _data.ORDER_TIME ?? "";
        this.inputSpecimen = _data.SPECIMEN_ID ?? "";
        this.inputBodySite = _data.BODY_SITE_ID ?? "";
        this.inputLocation = _data.LOCATION_ID ?? "";
        this.inputCustomerId = _data.CUSTOMER_ID ?? "";
        this.inputHN = _data.HN ?? "";
        this.inputGender = _data.SEX ? _data.SEX.toString() : "";
        this.inputAge = _data.AGE;
        this.inputDateOfBirth = _data.BIRTHDAY ?? "";
        this.inputAdmitDate = _data.ADMIT_TIME ?? "";
        this.inputAdmitNo = _data.ADMIT_NO ?? "";
        this.inputFirstname = _data.FIRST_NAME ?? "";
        this.inputLastname = _data.LAST_NAME ?? "";
        this.inputWardComment = _data.COMMENT_WARD ?? "";
        this.inputLabComment = _data.COMMENT_LAB ?? "";
        this.inputPriority = _data.PRIORITY_ID ?? "";
        this.inputLabNumber = _data.LAB_NO ?? "";
        this.inputExHN = _data.EXT_HN ?? "";
        this.inputExLocation = _data.EXT_LOCATION ?? "";
        this.inputDoctor = _data.DOCTOR_ID ?? "";

        this.inputTestType = _data.TEST_PRIMARY_ID ? "test" : "profile-test";
        this.inputTestTypeOption =
          _data.TEST_PRIMARY_ID ?? _data.TEST_PROFILE_ID ?? "";

        this.createdOrderID = _data.ORDER_ID ?? "";
        this.createdGender = _data.SEX ? _data.SEX.toString() : "";
        this.createdTestCategory = _data.CATEGORY_NAME ?? null;

        this.addOnFunction = addOnFunction ?? null;
        this.open = true;
        this.modalType = "edit";

        this.getClients();
      }
    );

    EventBus.$on(
      "open-manual-order-form-modal",
      (modalType, orderId, _isOpenFromSidebar) => {
        this.open = true;
        this.modalType = modalType ?? "create";
        this.orderId = orderId ?? null;
        this.isOpenFromSidebar = _isOpenFromSidebar ?? false;
        this.useGetAge = true;
        this.errors = {};

        this.inputOrderDate =
          new Date().getFullYear().toString() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate().toString();
        this.inputDateOfBirth = "";
        this.inputHN = "";
        this.inputTitle = "";
        this.inputFirstname = "";
        this.inputLastname = "";
        this.inputGender = "";
        this.inputAge = "";
        this.inputLabNumber = "";
        this.inputDoctor = "";
        this.inputPriority = "";
        this.inputCustomerId = "";
        this.inputAdmitDate = "";
        this.inputAdmitNo = "";
        this.inputSpecimen = "";
        this.inputTestPrimary = "";
        this.inputLocation = "";
        this.inputExLocation = "";
        this.inputExHN = "";
        this.inputBodySite = "";
        this.inputWardComment = "";
        this.inputLabComment = "";
        this.inputTestType = "test";
        this.inputTestTypeOption = "";
        
        this.getClients();
      }
    );

    EventBus.$on("close-manual-order-form-modal", () => {
      this.open = false;
      this.orderId = null;
      this.clearTestData();
    });
  },
  mounted() {
    this.$store.commit("initializeStore");
    if (this.$store.state.accessToken === null) {
      this.$router.push("/login");
    }

    this.getTitle();
    this.getLocation();
    this.getPriority();
    this.getBodySiteGroup();
    this.getBodySite();
    this.getSpecimen();
    this.getTestPrimary();
    this.getProfileTests();
    this.getClients();
  },
  watch: {
    inputTestType: {
      handler() {
        this.inputTestTypeOption = "";
      },
    },
    inputDateOfBirth: {
      handler() {
        if (this.modalType === "edit") {
          this.useGetAge = true;
        }
      },
    },
    // inputTestTypeOption: {
    //   handler() {
    //     this.createdTestCategory = null;
    //   },
    // },
    orderId: {
      handler() {
        if (this.orderId) this.getLogHistory();
      },
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    onChangeDateOfBirth(val) {
      if (this.modalType === "edit") {
        this.useGetAge = true;
        this.inputDateOfBirth = val;
      }
    },
    onChangeTestTypeOption(val) {
      if (this.modalType === "edit") {
        this.createdTestCategory = null;
      }

      this.inputTestTypeOption = val;
    },
    cancelCreateOrder() {
      this.open = false;
      this.orderId = null;
      this.clearTestData();
      // this.$router.push("/inbox");
    },
    getUrgentAmount() {
      const url = this.$store.state.urlBase + "/api/order/total-very-urgent";
      axios.get(url).then((response) => {
        const urgentAmount = response.data?.amount ?? 0;
        const orderIds = response.data?.order_id ?? [];

        this.$store.commit("setUrgentAmount", urgentAmount);
        this.$store.commit("setUrgentOrderIds", orderIds);
      });
    },
    saveOrder() {
      if (this.modalType === "create") {
        this.validationSchema
          .validate(
            {
              inputHN: this.inputHN,
              inputTitle: this.inputTitle,
              inputCustomerId: this.inputCustomerId,
              inputFirstname: this.inputFirstname,
              inputLastname: this.inputLastname,
              inputDateOfBirth: this.inputDateOfBirth,
              inputGender: this.inputGender,
              inputPriority: this.inputPriority,
              inputAdmitDate: this.inputAdmitDate,
              inputLocation: this.inputLocation,
              inputSpecimen: this.inputSpecimen,
              inputBodySite: this.inputBodySite,
              inputTestType: this.inputTestType,
              inputTestTypeOption: this.inputTestTypeOption,
            },
            { abortEarly: false }
          )
          .then(() => {
            swal
              .fire({
                title: "Please confirm adding a new Manual Order.",
                showCloseButton: true,
                confirmButtonText: "บันทึกข้อมูล",
                showDenyButton: true,
                showCancelButton: true,
                cancelButtonText: "ยกเลิก",
                denyButtonText: `บันทึกและล้างฟอร์มข้อมูล`,
                width: 1000,
              })
              .then((result) => {
                if (result.isConfirmed || result.isDenied) {
                  //save ข้อมูล
                  const api = mappingApi("batch_order.php");
                  const url = this.$store.state.urlBase + "/api/" + api;
                  const FormData = require("form-data");
                  let formData = new FormData();

                  formData.append("TITLE_ID", this.inputTitle);
                  formData.append("ORDER_TIME", this.inputOrderDate);
                  formData.append("SPECIMEN_ID", this.inputSpecimen);
                  formData.append("BODY_SITE_ID", this.inputBodySite);
                  formData.append("LOCATION_ID", this.inputLocation);
                  formData.append("HN", this.inputHN);
                  formData.append("SEX", this.inputGender);
                  formData.append("AGE", this.getAge ?? this.inputAge ?? "");
                  formData.append("ADMIT_TIME", this.inputAdmitDate);
                  formData.append("ADMIT_NO", this.inputAdmitNo);
                  formData.append("CUSTOMER_ID", this.inputCustomerId);
                  formData.append("FIRST_NAME", this.inputFirstname);
                  formData.append("LAST_NAME", this.inputLastname);
                  formData.append("BIRTHDAY", this.inputDateOfBirth);
                  formData.append("COMMENT_WARD", this.inputWardComment);
                  formData.append("COMMENT_LAB", this.inputLabComment);
                  formData.append("PRIORITY_ID", this.inputPriority);
                  formData.append("LAB_NO", this.inputLabNumber);
                  formData.append("EXT_HN", this.inputExHN);
                  formData.append("EXT_LOCATION", this.inputExLocation);
                  formData.append("DOCTOR_ID", this.inputDoctor);

                  formData.append(
                    this.inputTestType === "test"
                      ? "TEST_PRIMARY_ID"
                      : "TEST_PROFILE_ID",
                    this.inputTestTypeOption
                  );

                  axios({
                    method: "post",
                    url: url,
                    data: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                  }).then((response) => {
                    const result = response.data;
                    if (result["status"] != "success") this.chkSuccess = false;
                  });

                  if (result.isDenied) this.clearTestData();

                  swal.fire("Successfully", "", "success");

                  this.errors = {};

                  this.getUrgentAmount();
                }
              });
          })
          .catch((err) => {
            const newErrors = err.inner.reduce((all, e) => {
              all[e.path] = e.message;
              return all;
            }, {});
            this.errors = newErrors;

            swal.fire({
              icon: "error",
              title:
                "Please fill out all the information which is marked by * to proceed.",
              confirmButtonText: "Confirm",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-default",
                popup: "custom-swal2-container",
              },
            });
            return;
          });
      } else if (this.modalType === "edit") {
        this.editValidationSchema
          .validate(
            {
              inputHN: this.inputHN,
              inputTitle: this.inputTitle,
              inputCustomerId: this.inputCustomerId,
              inputFirstname: this.inputFirstname,
              inputLastname: this.inputLastname,
              inputDateOfBirth: this.inputDateOfBirth,
              inputGender: this.inputGender,
              inputPriority: this.inputPriority,
              inputLocation: this.inputLocation,
              inputAdmitDate: this.inputAdmitDate,
              inputSpecimen: this.inputSpecimen,
              inputBodySite: this.inputBodySite,
              inputTestType: this.inputTestType,
              inputTestTypeOption: this.inputTestTypeOption,
            },
            { abortEarly: false }
          )
          .then(() => {
            const url =
              this.$store.state.urlBase + "/api/order/inbox/" + this.orderId;
            const formData = new FormData();

            formData.append("TITLE_ID", this.inputTitle);
            formData.append("ORDER_TIME", this.inputOrderDate);
            formData.append("SPECIMEN_ID", this.inputSpecimen);
            formData.append("BODY_SITE_ID", this.inputBodySite);
            formData.append("LOCATION_ID", this.inputLocation);
            formData.append("CUSTOMER_ID", this.inputCustomerId);
            formData.append("HN", this.inputHN);
            formData.append("SEX", this.inputGender);
            formData.append(
              "AGE",
              this.useGetAge ? this.getAge : this.inputAge
            );
            formData.append("BIRTHDAY", this.inputDateOfBirth);
            formData.append("ADMIT_TIME", this.inputAdmitDate);
            formData.append("ADMIT_NO", this.inputAdmitNo);
            formData.append("FIRST_NAME", this.inputFirstname);
            formData.append("LAST_NAME", this.inputLastname);
            formData.append("COMMENT_WARD", this.inputWardComment);
            formData.append("COMMENT_LAB", this.inputLabComment);
            formData.append("PRIORITY_ID", this.inputPriority);
            formData.append("LAB_NO", this.inputLabNumber);
            formData.append("EXT_HN", this.inputExHN);
            formData.append("EXT_LOCATION", this.inputExLocation);
            formData.append("DOCTOR_ID", this.inputDoctor);

            formData.append(
              this.inputTestType === "test"
                ? "TEST_PRIMARY_ID"
                : "TEST_PROFILE_ID",
              this.inputTestTypeOption
            );

            if (this.isCheckedIn) {
              formData.append(
                "WARD_ON_REPORT",
                this.inputCheckReportWardComment
              );
              formData.append("LAB_ON_REPORT", this.inputCheckReportLabComment);
            }

            axios
              .post(url, formData)
              .then((response) => {
                swal
                  .fire({
                    title: "Save successfully",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  })
                  .then(() => {
                    this.clearTestData();
                    this.modalType = "create";
                    this.open = false;
                    this.orderId = null;
                    if (this.addOnFunction) this.addOnFunction();

                    this.getUrgentAmount();
                  });
              })
              .catch((err) => {
                swal.fire({
                  title: "Save failed",
                  text: err,
                  icon: "error",
                  timer: 1500,
                  showConfirmButton: false,
                });
              });
          })
          .catch((err) => {
            const newErrors = err.inner.reduce((all, e) => {
              all[e.path] = e.message;
              return all;
            }, {});
            this.errors = newErrors;

            swal.fire({
              icon: "error",
              title:
                "Please fill out all the information which is marked by * to proceed.",
              confirmButtonText: "Confirm",
              buttonsStyling: false,
              customClass: {
                confirmButton: "btn btn-default",
                popup: "custom-swal2-container",
              },
            });
            return;
          });
      }
    },
    clearTestData() {
      this.inputOrderDate =
        new Date().getFullYear().toString() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate().toString();
      this.inputHN = "";
      this.inputTitle = "";
      this.inputFirstname = "";
      this.inputLastname = "";
      this.inputGender = "";
      this.inputDateOfBirth = "";
      this.inputAge = "";
      this.inputLabNumber = "";
      this.inputDoctor = "";
      this.inputPriority = "";
      this.inputCustomerId = "";
      this.inputAdmitDate = "";
      this.inputAdmitNo = "";
      this.inputSpecimen = "";
      this.inputTestPrimary = "";
      this.inputLocation = "";
      this.inputExLocation = "";
      this.inputExHN = "";
      this.inputBodySite = "";
      this.inputWardComment = "";
      this.inputLabComment = "";
      this.inputTestType = "test";
      this.inputTestTypeOption = "";

      this.errors = {};
      this.inputTestTypeOption = "";
      this.isCheckedIn = false;
      this.logHistory = [];
      this.useGetAge = true;
    },
    addBodySiteToNote() {
      const result = this.bodySiteSelect.find((item) => {
        return item.ID === this.inputBodySite;
      });

      this.specimenNote = result.NAME;
    },
    filterBodySiteFromGroup() {
      const bodySiteGroup = this.inputBodySiteGroup;
      const fullData = [...this.bodySiteSelect];
      let result = [];
      fullData.forEach((element) => {
        if (element.GROUP_ID === bodySiteGroup) {
          result.push(element);
        }
      });

      this.filterBodySite = [];
      this.filterBodySite = [...result];
    },
    getTitle() {
      const api = mappingApi("data_title.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.titleSelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getLocation() {
      const api = mappingApi("data_location.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.locationSelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getPriority() {
      const api = mappingApi("data_priority.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.prioritySelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getBodySiteGroup() {
      const api = mappingApi("data_body_site_group.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.bodySiteGroupSelect = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getBodySite() {
      const api = mappingApi("data_body_site.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

      axios
        .get(url)
        .then((response) => {
          this.bodySiteSelect = response.data;
          this.filterBodySite = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getSpecimen() {
      const api = mappingApi("data_specimen.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.specimenCheckbox = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getTestPrimary() {
      const api = mappingApi("data_test_primary.php");
      const queryParam = "data=list";
      const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
      axios
        .get(url)
        .then((response) => {
          this.directExaminationTestCheckbox = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    },
    getProfileTests() {
      const url = this.$store.state.urlBase + "/api/data_profile_tests";
      axios
        .get(url)
        .then((response) => {
          this.profileTests = response.data;
        })
        .catch((error) => {
          console.log("getProfileTests: " + error);
        });
    },
    getClients() {
      const url = `${this.$store.state.urlBase}/api/customers`;

      axios({
        method: "get",
        url: url,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        const result = response.data;
        if (result !== null) {
          let tmpTableData = result;
          this.clientSelect = tmpTableData;
        }
      });
    },
    getLogHistory() {
      const url =
        this.$store.state.urlBase +
        "/api/order/inbox/" +
        this.orderId +
        "/history";
      axios
        .get(url)
        .then((response) => {
          this.logHistory = response.data;
        })
        .catch((error) => {
          console.log("getLogHistory: " + error);
        });
    },
  },
  computed: {
    ...mapState(["permissions"]),
    getAgeObject() {
      if (this.inputDateOfBirth) {
        let birthYear = moment(this.inputDateOfBirth).year();
        let birthMonth = moment(this.inputDateOfBirth).month();
        let birthDate = moment(this.inputDateOfBirth).date();

        let todayYear = moment().year();
        let todayMonth = moment().month();
        let todayDate = moment().date();

        let days = "";
        let months = "";
        let years = "";

        if (todayDate < birthDate) {
          days = todayDate - birthDate + 30;
          todayMonth = todayMonth - 1;
        } else {
          days = todayDate - birthDate;
        }

        if (todayMonth < birthMonth) {
          months = todayMonth - birthMonth + 12;
          todayYear = todayYear - 1;
        } else {
          months = todayMonth - birthMonth;
        }

        years = todayYear - birthYear;

        return {
          years: years,
          months: months,
          days: days,
        };
      } else {
        return "";
      }
    },
    getAge() {
      // return age from inputDateOfBirth
      if (this.inputDateOfBirth) {
        if (this.useGetAge) {
          const birthDate = new Date(this.inputDateOfBirth);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          return age;
        } else {
          return this.inputAge;
        }
      } else {
        return "";
      }
    },
    getAgeYear() {
      // return age from inputDateOfBirth
      if (this.inputDateOfBirth) {
        const birthDate = new Date(this.inputDateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age;
      } else {
        return "";
      }
    },
    getAgeMonth() {
      // return age from inputDateOfBirth
      if (this.inputDateOfBirth) {
        const birthDate = new Date(this.inputDateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return m;
      } else {
        return "";
      }
    },
    getAgeDay() {
      // return age from inputDateOfBirth
      if (this.inputDateOfBirth) {
        const birthDate = new Date(this.inputDateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return today.getDate() - birthDate.getDate();
      } else {
        return "";
      }
    },
    isInbox() {
      return this.$route.name === "inbox";
    },
    isOrderMonitoring() {
      return this.$route.name === "orderMonitoring";
    },
    canEditPatientDataPermission() {
      return this.permissions.some(
        (permission) => permission.permission_id === 3
      );
    },
    canCreateTestPermission() {
      return this.permissions.some(
        (permission) => permission.permission_id === 2
      );
    },
    canEditResultEntry() {
      return this.permissions.some(
        (permission) => permission.permission_id === 5
      );
    },
    showSaveButton() {
      if (this.isOpenFromSidebar && this.canCreateTestPermission) {
        return true;
      } else if (this.isInbox) {
        return this.canEditPatientDataPermission;
      } else if (this.isOrderMonitoring) {
        return this.canEditResultEntry;
      } else {
        return this.canCreateTestPermission;
      }
    },
  },
};
</script>

<style>
.custom-el-select-error .el-input__inner {
  border-color: #f56c6c !important;
  border-radius: 0.25rem !important;
}

.custom-flat-datepicker-error input.datepicker {
  border-color: #f56c6c !important;
  border-radius: 0.25rem !important;
}

.custom-swal2-container {
  width: 50vw !important;
}

.pointer-events-none {
  pointer-events: none;
}
</style>
