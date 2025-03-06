<template>
	<div>
		<div class="border-bottom bg-primary">
			<div class="container-fluid py-3">
				<div class="py-3">
					<div class="row">
						<div class="col-6 col-md-4">
							<div>
								<h1 class="text-white">Result Entry - Culture Identification</h1>
							</div>
						</div>
						<div class="col-6 col-md-4"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="border-bottom">
			<div class="container-fluid py-3">
				<div class="py-3">
					<div class="row">
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
								<div class="col-12 col-lg-auto">
									<div>
										<small>Lab number</small>
										<div class="font-weight-bold">{{ currentLab.LAB_NO }}</div>
									</div>
									<div>
										<small>Order no</small>
										<div class="font-weight-bold">{{ currentLab.ORDER_ID }}</div>
									</div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>First Name</small>
										<div class="font-weight-bold">{{ currentLab.FIRST_NAME }}</div>
									</div>
									<div>
										<small>Gender</small>
										<div v-if="currentLab.SEX == 1" class="font-weight-bold">M</div>
										<div v-if="currentLab.SEX == 2" class="font-weight-bold">F</div>
									</div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>Last Name</small>
										<div class="font-weight-bold">{{ currentLab.LAST_NAME }}</div>
									</div>
									<div>
										<small>Age</small>
										<div class="font-weight-bold">{{ currentLab.AGE }} Year</div>
									</div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>Order Date</small>
										<div class="font-weight-bold">{{ currentLab.ORDER_TIME }}</div>
									</div>
									<div>
										<small>Check-in Date</small>
										<div class="font-weight-bold">{{ currentLab.CHECKIN_TIME }}</div>
									</div>
								</div>
								<div class="col-12 col-lg-auto">
									<div>
										<small>Category</small>
										<div class="font-weight-bold">{{ currentLab.CATEGORY_NAME }}</div>
									</div>
									<div>
										<small>Primary Test</small>
										<div class="font-weight-bold">{{ currentLab.TEST_PRIMARY_NAME }}</div>
									</div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>Specimen</small>
										<div class="font-weight-bold">{{ currentLab.SPECIMEN_NAME }}&nbsp;</div>
									</div>
									<div>
										<small>Body Site</small>
										<div class="font-weight-bold">&nbsp;{{ currentLab.BODY_SITE_NAME }}</div>
									</div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>SID</small>
										<div class="font-weight-bold">&nbsp;</div>
									</div>

									<small>Status</small>
									<div v-html="generateStatusBadge()" style="border-color: none"></div>
								</div>
								<div class="col-6 col-lg">
									<div>
										<small>Location</small>
										<div class="font-weight-bold">{{ currentLab.LOCATION_NAME }}</div>
									</div>
									<div>
										<small>Priority</small>
										<div class="font-weight-bold">{{ currentLab.PRIORITY_NAME }}</div>
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
						class="btn"
						@click="saveResult"
						v-if="canEditResultEntry || canApprove"
					>
						<span class="btn-inner--icon">
							<i class="far fa-save"></i>
						</span>
						<span class="btn-inner--text">Save</span>
					</base-button>

					<base-button icon outline type="default" @click="reloadData()">
						<span class="btn-inner--icon">
							<i class="fas fa-sync-alt"></i>
						</span>
					</base-button>

					<base-button icon outline type="default" hidden>
						<span class="btn-inner--icon">
							<i class="far fa-calendar-check"></i>
						</span>
					</base-button>
					<base-button icon outline type="default" hidden>
						<span class="btn-inner--icon">
							<i class="fas fa-undo"></i>
						</span>
					</base-button>
					<base-button icon outline type="default" hidden>
						<span class="btn-inner--icon">
							<i class="far fa-eye"></i>
						</span>
					</base-button>
				</div>
				<div class="col-12 col-md col-xl text-md-right py-4">
					<base-button
						v-if="canEditResultEntry || canApprove"
						icon
						type="secondary"
						@click="savePreliminary"
						style="background-color: #535287; border-color: #535287"
						class="text-white"
					>
						<span class="btn-inner--icon">
							<i class="far fa-list-alt"></i>
						</span>
						<span class="btn-inner--text">Preliminary</span>
					</base-button>

					<!-- <base-button icon type="secondary" @click="saveValidate">
            <span class="btn-inner--icon">
              <i class="far fa-list-alt"></i>
            </span>
            <span class="btn-inner--text">Validate</span>
					</base-button>-->

					<base-button
						v-if="canApprove"
						icon
						type="secondary"
						@click="saveApprove"
						style="background-color: #377348; border-color: #377348"
						class="text-white"
					>
						<span class="btn-inner--icon">
							<i class="far fa-check-circle"></i>
						</span>
						<span class="btn-inner--text">Approve</span>
					</base-button>
				</div>
				<div class="col-12 col-md-12 col-xl text-xl-right py-4">
					<div class="text-left text-lg-right">
						<base-button type="danger" @click="deleteResult()" v-if="canEditResultEntry">
							<span class="btn-inner--icon">
								<i class="far fa-trash-alt"></i>
							</span>
						</base-button>
						<base-button type="default" @click="printCulture()">
							<span class="btn-inner--icon">
								<i class="fas fa-printfar fa-print"></i>
							</span>
						</base-button>
						<base-button type="default">
							<span class="btn-inner--icon mr-3">
								<i class="fas fa-file-download"></i>
							</span>
							<span class="btn-inner--text">Export</span>
						</base-button>
					</div>
				</div>
			</div>

			<div>
				<div class="card">
					<el-collapse class="px-3" v-model="activeNames">
						<el-collapse-item name="1">
							<template slot="title">
								<div class="d-flex flex-row">
									<div>
										<small>Order No :</small>
										<span class="font-weight-bold">
											{{
											currentLab.ORDER_ID
											}}
										</span>
									</div>
									<div>
										&nbsp;&nbsp;&nbsp;
										<small>Category :</small>
										<span class="font-weight-bold">
											{{
											currentLab.CATEGORY_NAME
											}}
										</span>
										&nbsp;&nbsp;&nbsp;
										<small>Primary Test :</small>
										<span class="font-weight-bold">
											{{
											currentLab.TEST_PRIMARY_NAME
											}}
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
									<el-table-column type="selection" align="left"></el-table-column>
									<el-table-column label="ISO NO" prop="secondary" width="70">
										<template v-slot="{ row }">
											<b>{{ row.ISOLATE_NO }}</b>
										</template>
									</el-table-column>
									<el-table-column label="Test" prop="secondary" width="140">
										<template v-slot="{ row }">
											<b>{{ row.TEST_SECONDARY_NAME }}</b>
										</template>
									</el-table-column>
									<el-table-column label="Barcode" prop="barcode" width="120">
										<template v-slot="{ row }">
											<base-input v-if="row.TEST_SECONDARY_ID == 'ORG'" v-model="row.BARCODE" class="mb-3"></base-input>
										</template>
									</el-table-column>
									<el-table-column label="Result" prop="result" width="370">
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
												></el-option>
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
												></el-option>
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
										<template v-slot="{ row }">
											<b v-if="row.HAS_FLAG > 0" style="color: red">
												<span :title="row.FLAG_COMMENT">{{ row.FLAG }}</span>
											</b>
										</template>
									</el-table-column>
									<el-table-column label="INST IDEN" width="170">
										<div
											slot-scope="{ $index, row }"
											v-if="
                        row.HAS_AST == 1 &&
                        row.VALUE !== null &&
                        deviceidenlistData !== null &&
                        deviceidenlistData.length > 0
                      "
										>
											<input
												type="checkbox"
												v-model="row.INSTRUMENT_IDEN_STATUS"
												true-value="1"
												false-value="0"
												@change="row['INSTRUMENT_IDEN_STATUS'] == 1 ? 1 : 0"
											/>
											Auto Send
											<i class="fas fa-sync-alt"></i>
											<el-select
												placeholder="Select"
												filterable
												v-model="row.INSTRUMENT_IDEN_ID"
												class="col-12 p-0"
											>
												<el-option
													v-for="item in deviceidenlistData"
													:key="item.ID"
													:label="item.NAME"
													:value="item.ID"
												></el-option>
											</el-select>
										</div>
									</el-table-column>
									<el-table-column label="INST AST" width="170">
										<div
											slot-scope="{ $index, row }"
											v-if="
                        row.HAS_AST == 1 &&
                        row.VALUE !== null &&
                        devicesenselistData !== null &&
                        devicesenselistData.length > 0
                      "
										>
											<input
												type="checkbox"
												v-model="row.INSTRUMENT_SENSE_STATUS"
												true-value="1"
												false-value="0"
												@change="row['INSTRUMENT_SENSE_STATUS'] == 1 ? 1 : 0"
											/>
											Auto Send
											<i class="fas fa-sync-alt"></i>
											<el-select
												placeholder="Select"
												filterable
												v-model="row.INSTRUMENT_SENSE_ID"
												class="col-12 p-0"
											>
												<el-option
													v-for="item in devicesenselistData"
													:key="item.ID"
													:label="item.NAME"
													:value="item.ID"
												></el-option>
											</el-select>
										</div>
									</el-table-column>
									<el-table-column label="AST" width="100">
										<div slot-scope="{ $index, row }">
											<base-button
												class="px-0"
												@click.native="goToDetail($index, row)"
												outline
												type="secondary"
												icon
												v-if="row.HAS_AST == 1 && row.VALUE !== null"
											>
												<i class="far fa-edit" style="color: #2c7ef9"></i>
											</base-button>
										</div>
									</el-table-column>
									<el-table-column label="Comment" prop="comment" width="120">
										<div slot-scope="{ $index, row }">
											<base-button @click.native="handleComment($index, row)" outline type="secondary" icon>
												<i class="far fa-comment-alt text-black-50"></i>
											</base-button>
										</div>
									</el-table-column>
									<el-table-column label="Date/Time" prop="date" width="200">
										<template v-slot="{ row }">
											<b>{{ row.VALUE_TIME }}</b>
										</template>
									</el-table-column>
									<el-table-column label="Result / Validate / Approve By" prop="resultBy" width="300">
										<template v-slot="{ row }">
											<b></b>
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
				<base-button
					icon
					type="default"
					@click="addMoreIsolate"
					v-if="canEditResultEntry || canApprove"
				>
					<span class="btn-inner--icon">
						<i class="far fa-list-alt"></i>
					</span>
					<span class="btn-inner--text">+ Add Isolate</span>
				</base-button>
				<base-button icon type="secondary" @click="printLabel">
					<span class="btn-inner--icon">
						<i class="fas fa-printni fa-print"></i>
					</span>
					<span class="btn-inner--text">Print Label</span>
				</base-button>
			</div>
		</div>
		<div class="container-fluid py-3" v-if="step == 1">
			<div class="row my-4 er align-items-center">
				<div class="col-6 col-lg">
					<div>Antimicrobial Susceptibility Test</div>
				</div>
				<div class="col-6 col-lg-auto text-right text-lg-center">
					<div>
						<base-button
							icon
							type="default"
							class="btn"
							@click="saveResultAntibiotic"
							:disabled="disableSaveAntiobioticButton"
						>
							<span class="btn-inner--icon">
								<i class="far fa-bookmark"></i>
							</span>
							<span class="btn-inner--text">Save Antibiotic Result</span>
						</base-button>
					</div>
				</div>
				<div class="col-12 col-lg mt-3 mt-lg-0">
					<div class="text-right">
						<base-button type="default" v-if="step !== 0" @click="printCulture()">
							<span class="btn-inner--icon">
								<i class="fas fa-printfar fa-print"></i>
							</span>
						</base-button>
						<base-button type="default" @click="step !== 0">
							<span class="btn-inner--icon mr-3">
								<i class="fas fa-file-download"></i>
							</span>
							<span class="btn-inner--text">Export</span>
						</base-button>
						<base-button outline type="default" class="ml-3" @click="backToResult()">
							<span class="btn-inner--icon">
								<i class="fas fa-times"></i>
							</span>
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
								<div>{{ currentLab.LAB_NO }}-{{ currentASTRow.ISOLATE_NO }}</div>
							</div>
						</div>
						<div class="col-6">
							<div>
								<small>Organism</small>
								<div>{{ this.fullOrganism }}</div>
							</div>
						</div>
					</div>
				</div>

				<div class="col-12 col-lg">
					<div class="row h-100 align-items-end">
						<div class="col-auto mb-2">
							<div>
								<base-checkbox v-model="checkboxesMic">
									<span>ลงผล Mic</span>
								</base-checkbox>
							</div>
						</div>
						<div class="col-auto mb-2">
							<div>
								<base-checkbox v-model="checkboxesZone">ลงผล Zone</base-checkbox>
							</div>
						</div>
					</div>
				</div>
			</div>
			<form>
				<div class="card">
					<el-table
						:data="antibioticTestData"
						row-key="id"
						header-row-class-name="thead-light"
						@selection-change="selectionChange"
						stripe
					>
						<!-- <el-table-column type="selection" align="left"></el-table-column> -->
						<el-table-column label="Antibiotic" prop="ANTIBIOTIC_ID" width="420">
							<template v-slot="{ row }">
								{{ findAntibioticName(row.ANTIBIOTIC_ID) }}
								<!-- <el-select
                  placeholder="Select"
                  filterable
                  v-model="row.ANTIBIOTIC_ID"
                  class="col-12"
                >
                  <el-option
                    v-for="item in antibioticlistData"
                    :key="item.ID"
                    :label="item.NAME_ABBR"
                    :value="item.ID"
                  ></el-option>
								</el-select>-->
							</template>
						</el-table-column>
						<el-table-column label="VALUE (MIC)" width="140" prop="VALUE" v-if="checkboxesMic === true">
							<template slot-scope="{ $index, row }">
								<base-input
									type="text"
									v-model="row.VALUE"
									class="mic-value"
									@change="calculateResultMIC($index, row)"
									@keydown.enter="onKeyDownEnter($index + 1)"
									:tabindex="$index + 1"
								/>
							</template>
						</el-table-column>
						<el-table-column label="RESULT (MIC)" width="140" v-if="checkboxesMic === true">
							<template v-slot="{ row }">
								<div>{{ row.RESULT }}</div>
								<!-- <base-input
                  type="text"
                  class="mic-result"
                  v-model="row.RESULT"
								/>-->
							</template>
						</el-table-column>
						<el-table-column
							label="VALUE (ZONE)"
							width="140"
							prop="ZONEVALUE"
							v-if="checkboxesZone === true"
						>
							<template slot-scope="{ $index, row }">
								<base-input
									type="text"
									class="zone-value"
									v-model="row.ZONEVALUE"
									@change="calculateResultZONE($index, row)"
									@keydown.enter="onKeyDownEnter($index + 1 + 9999)"
									:tabindex="$index + 1 + 9999"
								/>
							</template>
						</el-table-column>
						<el-table-column label="RESULT (ZONE)" width="140" v-if="checkboxesZone === true">
							<template v-slot="{ row }">
								<div>{{ row.ZONERESULT }}</div>
								<!-- <base-input
                  type="text"
                  class="zone-result"
                  v-model="row.ZONERESULT"
								/>-->
							</template>
						</el-table-column>
						<el-table-column label="MIC (S/I/R)" width="130" v-if="currentLab.IS_SHOW_MIC == 1">
							<template v-slot="{ row }">
								<b>
									{{ row.MIC_S }}/{{ row.MIC_I_L }}-{{ row.MIC_I_R }}/{{
									row.MIC_R
									}}
								</b>
							</template>
						</el-table-column>
						<el-table-column label="ZONE (S/I/R)" width="130" v-if="currentLab.IS_SHOW_ZONE == 1">
							<template v-slot="{ row }">
								<b>
									{{ row.ZONE_S }}/{{ row.ZONE_I_L }}-{{ row.ZONE_I_R }}/{{
									row.ZONE_R
									}}
								</b>
							</template>
						</el-table-column>
						<el-table-column label="HIS" width="50">
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
						<el-table-column label="Show Report" width="120">
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
						<el-table-column label="VALUE" width="70">
							<template v-slot="{ row }">
								<div class="d-flex justify-content-center">
									<input
										type="checkbox"
										v-model="row.IS_REPORT_VALUE"
										true-value="1"
										false-value="0"
										@change="row['IS_REPORT_VALUE'] == '1' ? 1 : 0"
									/>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="ZONE VALUE" width="100">
							<template v-slot="{ row }">
								<div class="d-flex justify-content-center">
									<input
										type="checkbox"
										v-model="row.IS_REPORT_ZONEVALUE"
										true-value="1"
										false-value="0"
										@change="row['IS_REPORT_ZONEVALUE'] == '1' ? 1 : 0"
									/>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="Date/Time" prop="date" width="200">
							<template v-slot="{ row }">
								<b>{{ row.VALUE_TIME }}</b>
							</template>
						</el-table-column>
					</el-table>
					<div
						slot="footer"
						class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap mt-4"
					>
						<div class>
							<p class="card-category">
								Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
								<span
									v-if="selectedRows.length"
								>&nbsp; &nbsp; {{ selectedRows.length }} rows selected</span>
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
			</form>
			<div class="w-auto d-flex flex-row" style="column-gap: 16px">
				<el-select placeholder="Select Antibiotic to Add" filterable v-model="selectedNewAntibiotic">
					<el-option
						v-for="item in antibioticlistData"
						:key="item.ID"
						:label="item.NAME_ABBR"
						:value="item.ID"
					></el-option>
				</el-select>

				<base-button icon type="default" @click="addMoreAntibiotic">
					<span class="btn-inner--icon">
						<i class="far fa-list-alt"></i>
					</span>
					<span class="btn-inner--text">+ Add Antibiotic</span>
				</base-button>
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
	Row,
} from "element-ui";
import RouteBreadCrumb from "@/components/argon-core/Breadcrumb/RouteBreadcrumb";
import { BasePagination } from "@/components/argon-core";
import clientPaginationMixin from "~/components/tables/PaginatedTables/clientPaginationMixin";
import axios from "axios";
import { mappingApi } from "@/util/mappingApi";
import swal from "sweetalert2";
import { mapState } from "vuex";

export default {
	middleware: "protected",
	mixins: [clientPaginationMixin],
	layout: "DashboardLayout",
	name: "resultEntryCulture",
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
		this.$store.commit("initializeStore");

		if (this.$store.state.accessToken === null) {
			this.$router.push("/login");
		}

		const url_string = window.location.href;
		const url = new URL(url_string);
		const labId = url.searchParams.get("id");
		if (labId == null || labId == "") {
			this.$router.push({
				path: "orderMonitoring",
			});
		} else {
			this.currentLabId = labId;
			this.fetchData();
		}
	},
	data() {
		return {
			disableSaveAntiobioticButton: false,

			selectedNewAntibiotic: null,

			currentLabId: null,
			currentLab: [],
			selectIndex: null,
			selectResult: null,
			step: 0,
			currentASTRow: null,
			checkboxesMic: true,
			checkboxesZone: true,
			secondaryTestData: [],
			antibioticTestData: [],
			resultlistData: [],
			organismlistData: [],
			antibioticlistData: [],
			deviceidenlistData: [],
			devicesenselistData: [],
			tableColumns: [
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
			],
			tableData: [
				/*
        {
          antibioticMedicine: 'Quinolone',
          code: 'CIP1',
          antibioticNameOffice: 'd-test',
          resValue: '',
          resText: '',
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
        },*/
			],
			selectedRows: [],
			options: [
				{
					value: "Option1",
					label: "Option1",
				},
				{
					value: "Option2",
					label: "Option2",
				},
				{
					value: "Option3",
					label: "Option3",
				},
				{
					value: "Option4",
					label: "Option4",
				},
				{
					value: "Option5",
					label: "Option5",
				},
			],
			antibioticValue: "",
			activeNames: ["1"],
		};
	},
	methods: {
		findAntibioticName(id) {
			const finded = this.antibioticlistData.find((ad) => ad.ID == id);
			return finded ? finded.NAME_ABBR : "";
		},
		generateStatusBadge() {
			const status = this.currentLab?.status;

			if (!status) {
				return `<div></div>`;
			}

			switch (status) {
				case 8: {
					return `<div class="hilight-text border rounded text-center px-2 py-1 " style="background-color: #93C47E">
                    <div class="font-weight-bold">Approve</div>
                  </div>
            `;
				}
				case 7: {
					return `<div
              class="
                      hilight-text
                      border
                      rounded
                      text-center
                      px-2
                      py-1

                    "
              style="background-color: #FBB552"
            >
              <div class="font-weight-bold">Wait for Approve</div>
            </div>`;
				}
				case 2: {
					return `<div
              class="
                      hilight-text
                      border
                      rounded
                      text-center
                      px-2
                      py-1

                    "
              style="background-color: #A1C4FC"
            >
              <div class="font-weight-bold">Check in</div>
            </div>`;
				}
				case 6: {
					return `<div
              class="
                      hilight-text
                      border
                      rounded
                      text-center
                      px-2
                      py-1

                    "
              style="background-color: #B7A9ED"
            >
              <div class="font-weight-bold">Preliminary</div>
            </div>`;
				}
				default: {
					return `<div class="hilight-text border rounded text-center px-2 py-1">
                      <div class="font-weight-bold">Others</div>
                  </div>
                  `;
				}
			}
		},
		onEnterMICValue(index, row) {
			alert(1);
		},
		onKeyDownEnter(index) {
			// Calculate the next tabindex
			const nextTabIndex = index + 1;

			// Use $nextTick to wait for the DOM to update
			this.$nextTick(() => {
				// Select the input with the next tabindex
				const nextInput = this.$el.querySelector(
					`input[tabindex="${nextTabIndex}"]`
				);

				// If the input exists, focus on it
				if (nextInput) {
					nextInput.focus();
				}
			});
		},
		calculateResultMIC(index, row) {
			let value = row.VALUE;
			let leftValue = parseFloat(row.MIC_I_L);
			let rightValue = parseFloat(row.MIC_I_R);
			let sValue = parseFloat(row.MIC_S);
			let rValue = parseFloat(row.MIC_R);
			if (value !== null && value !== "") {
				if (value.indexOf(">=") !== -1)
					value = parseFloat(value.replace(">=", ""));
				else if (value.indexOf("<=") !== -1)
					value = parseFloat(value.replace("<=", ""));
				else if (value.indexOf(">") !== -1)
					value = parseFloat(value.replace(">", "")) + 0.0001;
				else if (value.indexOf("<") !== -1)
					value = parseFloat(value.replace("<", "")) - 0.0001;

				//console.log(value + '/S ' + sValue + '/R '+ rValue);
				//console.log(row.MIC_S + ' / ' + row.MIC_R);

				/*if(row.MIC_I_L !== null && row.MIC_I_R !== null){
          if(row.VALUE < leftValue)
            row.RESULT = row.MIC_S_TEXT;
          else if(row.VALUE < rightValue)
              row.RESULT = row.MIC_I_TEXT;
          else
              row.RESULT = row.MIC_R_TEXT;
        }else{*/
				if (row.MIC_S !== null && value <= sValue) {
					row.RESULT = row.MIC_S_TEXT;
					//console.log('S');
				} else if (
					row.MIC_I_L !== null &&
					row.MIC_I_R !== null &&
					value > sValue &&
					value < rValue
				) {
					row.RESULT = row.MIC_I_TEXT;
					//console.log('I');
				} else if (row.MIC_R !== null && value >= rValue) {
					row.RESULT = row.MIC_R_TEXT;
					//console.log('R');
				} else {
					row.RESULT = "NS";
					//row.RESULT = row.MIC_NULL_TEXT;
					//console.log('NS');
				}
				//}
			} else {
				row.RESULT = "";
			}
		},
		calculateResultZONE(index, row) {
			let value = row.ZONEVALUE;
			let leftValue = parseFloat(row.ZONE_I_L);
			let rightValue = parseFloat(row.ZONE_I_R);
			let sValue = parseFloat(row.ZONE_S);
			let rValue = parseFloat(row.ZONE_R);
			if (value !== null && value !== "") {
				if (value.indexOf(">=") !== -1)
					value = parseFloat(value.replace(">=", ""));
				else if (value.indexOf("<=") !== -1)
					value = parseFloat(value.replace("<=", ""));
				else if (value.indexOf(">") !== -1)
					value = parseFloat(value.replace(">", "")) + 0.00001;
				else if (value.indexOf("<") !== -1)
					value = parseFloat(value.replace("<", "")) - 0.00001;

				if (row.ZONE_I_L !== null && row.ZONE_I_R !== null) {
					if (row.ZONEVALUE > leftValue) row.ZONERESULT = row.ZONE_S_TEXT;
					else if (row.ZONEVALUE >= rightValue)
						row.ZONERESULT = row.ZONE_I_TEXT;
					else row.ZONERESULT = row.ZONE_R_TEXT;
				} else {
					if (row.ZONE_S !== null && row.ZONEVALUE >= sValue)
						row.ZONERESULT = row.ZONE_S_TEXT;
					else if (row.ZONE_R !== null && row.ZONEVALUE <= rValue)
						row.ZONERESULT = row.ZONE_R_TEXT;
					else row.ZONERESULT = "NS";
					//row.ZONERESULT = row.ZONE_NULL_TEXT;
				}
			} else {
				row.ZONERESULT = "";
			}
		},
		fetchData() {
			let api = mappingApi("data_lab_result.php");
			let queryParam = "data=list";
			let url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result !== null && result !== "") {
					this.resultlistData = [...result];
				} else {
					this.resultlistData == [];
				}
			});

			api = mappingApi("data_organism.php");
			queryParam = "data=list";
			url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result.data !== null && result.data !== "") {
					this.organismlistData = [...result.data];
				} else this.organismlistData == [];
			});

			api = mappingApi("data_device.php");
			queryParam = "data=list-sense";
			url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result.data !== null && result.data !== "") {
					this.devicesenselistData = [...result.data];
				} else this.devicesenselistData == [];
			});

			api = mappingApi("data_device.php");
			queryParam = "data=list-iden";
			url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;
			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result.data !== null && result.data !== "") {
					this.deviceidenlistData = [...result.data];
				} else this.deviceidenlistData == [];
			});

			api = mappingApi("data_antibiotic.php");
			queryParam = "data=list";
			url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result.data !== null && result.data !== "") {
					this.antibioticlistData = [...result.data];
				} else this.antibioticlistData == [];
			});

			api = mappingApi("inbox.php");
			queryParam = `data=labinfo&id=${this.currentLabId}`;
			url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				let currentLabInfo;
				currentLabInfo = result[0];
				if (result) {
					this.currentLab = currentLabInfo;
					api = mappingApi("lab_result.php");
					queryParam = `data=list&id=${this.currentLabId}`;
					const url2 = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

					axios({
						method: "get",
						url: url2,
					}).then((response) => {
						const result = response;
						if (result.data !== null && result.data !== "") {
							let resultEntrys = result.data;
							this.secondaryTestData = [...resultEntrys];
						}
					});
					if (
						this.currentLab["TEST_PRIMARY_ID"] == null ||
						this.currentLab["TEST_PRIMARY_ID"] == "" ||
						this.currentLab["STATUS"] < 2
					) {
						this.$router.push({
							path: "orderMonitoring",
						});
					}
				} else {
					this.$router.push({
						path: "orderMonitoring",
					});
				}
			});
		},
		reloadData() {
			this.fetchData();
			swal.fire("Refresh ข้อมูลใหม่เรียบร้อยแล้วค่ะ");
		},
		printCulture() {
			const api = mappingApi("print-culture.php");
			const queryParam = `id=${this.currentLabId}`;
			const url = `${this.$store.state.urlBase}/${api}?${queryParam}`;

			window.open(url, "_blank");
		},
		printLabel(row) {
			if (this.selectedRows == null || this.selectedRows.length == 0)
				this.$swal("Please select the  list of Print Label");
			else {
				let ids = "";
				let isolatenos = "";
				this.selectedRows.forEach((element) => {
					ids += element["ID"] + ",";
					isolatenos += element["ISOLATE_NO"] + ",";
				});

				if (ids !== "") {
					ids = ids.substring(0, ids.length - 1);
					isolatenos = isolatenos.substring(0, isolatenos.length - 1);

					let row = this.selectedRows[0];
					api = mappingApi("print-label.php");
					queryParams = `lab=${ids}&iso=${isolatenos}`;
					url = `${this.$store.state.urlBase}/api/${api}?${queryParams}`;
					window.open(url, "_blank");
				}
			}
		},
		addMoreIsolate() {
			this.saveResult(false);

			const url =
				this.$store.state.urlBase +
				"/api/lab_result?data=add-isolate-list&id=" +
				this.currentLabId;
			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (
					result.status !== "" &&
					result.status == "success" &&
					result.data !== null &&
					result.data !== ""
				) {
					swal.fire("Successfully added Isolate");
					let resultEntrys = result.data;
					this.secondaryTestData = [...resultEntrys];
				} else {
					swal.fire("Unsuccessfully added Isolate (Ex. Maximum added isolate)");
				}
			});
		},
		addMoreAntibiotic() {
			if (
				this.selectedNewAntibiotic == null ||
				this.selectedNewAntibiotic == ""
			) {
				swal.fire({
					icon: "error",
					title: "กรุณาเลือก Antibiotic ที่ต้องการเพิ่ม",
					confirmButtonText: "Confirm",
					buttonsStyling: false,
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-default",
						cancelButton: "btn btn-light",
					},
				});
				return;
			} else {
				const api = mappingApi("lab_result.php");
				const queryParam = `data=add-antibiotic-list&labid=${this.currentLabId}&is=${this.currentASTRow.ISOLATE_NO}&stid=${this.currentASTRow.TEST_SECONDARY_ID}&antibiotic_id=${this.selectedNewAntibiotic}`;
				const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

				axios({
					method: "get",
					url: url,
				})
					.then((response) => {
						// Fetch New Data Antibiotic
						const newDataApi = mappingApi("lab_result.php");
						const newDataQueryParam = `data=antibiotic-list&id=${this.currentLabId}&is=${this.currentASTRow.ISOLATE_NO}&stid=${this.currentASTRow.TEST_SECONDARY_ID}`;
						const newDataUrl = `${this.$store.state.urlBase}/api/${newDataApi}?${newDataQueryParam}`;

						axios({
							method: "get",
							url: newDataUrl,
						})
							.then((response) => {
								const result = response;

								let resultAntibioticEntrys = result.data;
								if (resultAntibioticEntrys !== null) {
									// for (let i = 0; i < resultAntibioticEntrys.length; i++) {
									//   this.calculateResultZONE(i, resultAntibioticEntrys[i]);
									//   this.calculateResultMIC(i, resultAntibioticEntrys[i]);
									// }
								}
								this.antibioticTestData = [...resultAntibioticEntrys];

								this.selectedNewAntibiotic = null;
								swal.fire("เพิ่ม Antibiotic ใหม่สำเร็จ");
							})
							.catch((err) => {
								swal.fire("เพิ่มแถวข้อมูล Antibiotic ไม่สำเร็จ");
							});
					})
					.catch((err) => {
						swal.fire("เพิ่มแถวข้อมูล Antibiotic ไม่สำเร็จ");
					});
			}
		},
		changeTab(tab) {
			this.selectedTab = tab;
		},
		selectionChange(selectedRows) {
			this.selectedRows = selectedRows;
		},
		savePreliminary() {
			this.saveResult(false);

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
						const api = mappingApi("lab_result.php");
						const queryParam = `data=update-status&status=${status}&id=${this.currentLabId}`;
						const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

						let formData = new FormData();
						formData.append("status", status);
						axios({
							method: "post",
							url: url,
							data: formData,
							headers: { "Content-Type": "multipart/form-data" },
						}).then((response) => {
							const result = response;
							this.fetchData();
						});
						swal.fire(buttonText, "", "success");
					} else if (result.isDenied) {
						swal.fire("Changes are not saved", "", "info");
					}
				});
		},
		deleteResult() {
			if (this.selectedRows !== null && this.selectedRows.length > 0) {
				const api = mappingApi("lab_result.php");
				const queryParam = `data=delete-result&id=${this.currentLabId}`;
				const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

				const FormData = require("form-data");
				let formData = null;

				this.selectedRows.forEach((element) => {
					formData = new FormData();
					formData.append("is", element.ISOLATE_NO);
					formData.append("stid", element.TEST_SECONDARY_ID);
					axios({
						method: "post",
						url: url,
						data: formData,
						headers: { "Content-Type": "multipart/form-data" },
					}).then((response) => {
						const result = response;
					});
				});
				this.fetchData();
				swal.fire("ลบรายการที่เลือกสำเร็จ");
			} else {
				swal.fire("กรุณาเลือกรายการที่จะลบ");
			}
		},
		saveResult(showPopup = true) {
			//this.resultlistData.forEach((element) => {
			const api = mappingApi("lab_result.php");
			const queryParam = `data=update&id=${this.currentLabId}`;
			const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			const FormData = require("form-data");

			if (
				this.secondaryTestData !== null &&
				this.secondaryTestData.length > 0
			) {
				this.secondaryTestData.forEach((element) => {
					let formData = new FormData();
					formData.append("ISOLATE_NO", element.ISOLATE_NO);
					formData.append("BARCODE", element.BARCODE);
					formData.append("test_id", element.TEST_SECONDARY_ID);
					formData.append("value", element.VALUE);
					formData.append(
						"INSTRUMENT_IDEN_STATUS",
						element.INSTRUMENT_IDEN_STATUS ? 1 : 0
					);
					formData.append("INSTRUMENT_IDEN_ID", element.INSTRUMENT_IDEN_ID);
					formData.append(
						"INSTRUMENT_SENSE_STATUS",
						element.INSTRUMENT_SENSE_STATUS ? 1 : 0
					);
					formData.append("INSTRUMENT_SENSE_ID", element.INSTRUMENT_SENSE_ID);
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
				this.fetchData();
				if (showPopup) swal.fire("Lab Result successfully saved.");
			}
			//});
		},

		async saveResultAntibiotic() {
			try {
				this.disableSaveAntiobioticButton = true;

				// Update MIC and Zone visibility
				let api = mappingApi("lab_result.php");
				let queryParam = `data=update-showmiczone&id=${this.currentLabId}`;
				let url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

				const FormData = require("form-data");
				let formData = new FormData();

				this.currentLab.IS_SHOW_MIC = this.checkboxesMic ? 1 : 0;
				this.currentLab.IS_SHOW_ZONE = this.checkboxesZone ? 1 : 0;
				formData.append("IS_SHOW_MIC", this.currentLab.IS_SHOW_MIC);
				formData.append("IS_SHOW_ZONE", this.currentLab.IS_SHOW_ZONE);
				await axios({
					method: "post",
					url: url,
					data: formData,
					headers: { "Content-Type": "multipart/form-data" },
				});

				// Update Antibiotic Results
				api = mappingApi("lab_result.php");
				const baseurl = `${this.$store.state.urlBase}/api/${api}?data=update-ast&id=`;
				await Promise.all(
					this.antibioticTestData.map((element) => {
						const url = baseurl + element.ID;
						let formData = new FormData();
						formData.append("test_id", this.currentASTRow.TEST_SECONDARY_ID);
						formData.append("antibiotic_id", element.ANTIBIOTIC_ID);
						formData.append("value", element.VALUE);
						formData.append("result", element.RESULT);
						formData.append("zonevalue", element.ZONEVALUE);
						formData.append("zoneresult", element.ZONERESULT);
						formData.append("status_his", element.status_his);
						formData.append("IS_REPORT_VALUE", element.IS_REPORT_VALUE);
						formData.append("IS_REPORT_ZONEVALUE", element.IS_REPORT_ZONEVALUE);
						formData.append("status", element.status);

						return axios({
							method: "post",
							url: url,
							data: formData,
							headers: { "Content-Type": "multipart/form-data" },
						});
					})
				);

				// Check Rules and Apply Flags
				api = mappingApi("lab_result.php");
				queryParam = `data=update-flag&id=${this.currentASTRow.ID}&is=${this.currentASTRow.ISOLATE_NO}&stid=${this.currentASTRow.TEST_SECONDARY_ID}`;
				const ruleurl = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

				const response = await axios({
					method: "post",
					url: ruleurl,
					headers: { "Content-Type": "multipart/form-data" },
				});

				const result = response;
				const rulesDetect = result.rule_results.filter(
					(rule) => rule[0].type === "true"
				);

				// Sequentially handle all applicable rules
				for (const rule of rulesDetect) {
					const params = rule[0].params;

					// Handle 'show_popup_yes_no'
					if (params.show_popup_yes_no) {
						const userChoice = await swal.fire({
							title: params.show_popup_yes_no,
							showCancelButton: true,
							confirmButtonText: "Yes",
							cancelButtonText: "No",
						});

						if (userChoice.isConfirmed) {
							if (params.exec_popup_yes_add_flag) {
								console.log(`Adding flag: ${params.exec_popup_yes_add_flag}`);
							}
							if (params.exec_popup_yes_add_result) {
								console.log(
									`Adding result: ${params.exec_popup_yes_add_result}`
								);
							}
							if (params.exec_popup_yes_show_popup2 === "choice") {
								const choices = params.exec_popup2_choices.split(",");
								const addResults =
									params.exec_popup2_choices_add_result.split(",");

								const choiceResult = await swal.fire({
									title: params.exec_popup2_title,
									input: "select",
									inputOptions: choices.reduce((obj, item, index) => {
										obj[index] = item;
										return obj;
									}, {}),
									showCancelButton: false,
								});

								if (choiceResult.value !== null) {
									const selectedChoice = addResults[choiceResult.value];
									console.log(`Adding choice result: ${selectedChoice}`);
								}
							}
						} else if (userChoice.dismiss === swal.DismissReason.cancel) {
							if (params.exec_popup_no_add_result) {
								console.log(
									`Adding No result: ${params.exec_popup_no_add_result}`
								);
							}
						}
					}

					// Handle 'show_popup_yes_no_nottest'
					if (params.show_popup_yes_no_nottest) {
						const userChoice = await swal.fire({
							title: params.show_popup_yes_no_nottest,
							showDenyButton: true,
							showCancelButton: true,
							confirmButtonText: "Yes",
							denyButtonText: "No",
							cancelButtonText: "Not test",
						});

						if (userChoice.isConfirmed) {
							if (params.exec_popup_yes_add_flag) {
								console.log(`Adding flag: ${params.exec_popup_yes_add_flag}`);
							}
							if (params.exec_popup_yes_add_result) {
								console.log(
									`Adding result: ${params.exec_popup_yes_add_result}`
								);
							}
						} else if (userChoice.isDenied) {
							if (params.exec_popup_no_add_result) {
								console.log(
									`Adding No result: ${params.exec_popup_no_add_result}`
								);
							}
						} else if (userChoice.dismiss === swal.DismissReason.cancel) {
							if (params.exec_popup_nottest_add_result) {
								console.log(
									`Adding Not test result: ${params.exec_popup_nottest_add_result}`
								);
							}
						}
					}
				}

				swal.fire({
					type: "success",
					title: "บันทึกผล AST และตรวจสอบ Flag สำเร็จ",
					confirmButtonText: "Confirm",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-default",
						actions: "swal2-actions-center",
					},
				});
			} catch (error) {
				swal.fire({
					type: "error",
					title: "Lab Result failed.",
					confirmButtonText: "Confirm",
					buttonsStyling: false,
					customClass: {
						confirmButton: "btn btn-default",
					},
				});
			} finally {
				this.disableSaveAntiobioticButton = false;
			}
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
			this.saveResult(false);

			this.selectedIndex = index;
			this.selectedResult = row;

			this.checkboxesMic = this.currentLab.IS_SHOW_MIC === 1 ? true : false;
			this.checkboxesZone = this.currentLab.IS_SHOW_ZONE === 1 ? true : false;

			const api = mappingApi("lab_result.php");
			const queryParam = `data=antibiotic-list&id=${this.currentLabId}&is=${row.ISOLATE_NO}&stid=${row.TEST_SECONDARY_ID}`;
			const url = `${this.$store.state.urlBase}/api/${api}?${queryParam}`;

			axios({
				method: "get",
				url: url,
			}).then((response) => {
				const result = response;
				if (result.status !== "" && result.status == "success") {
					this.step = 1;
					this.currentASTRow = row;

					let resultAntibioticEntrys = result.data;
					if (resultAntibioticEntrys !== null) {
						for (let i = 0; i < resultAntibioticEntrys.length; i++) {
							this.calculateResultZONE(i, resultAntibioticEntrys[i]);
							this.calculateResultMIC(i, resultAntibioticEntrys[i]);
						}
					}
					this.antibioticTestData = [...resultAntibioticEntrys];
					//console.log(this.antibioticTestData);
				} else {
					swal.fire("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบใหม่อีกครั้งค่ะ");
				}
			});
		},
		backToResult() {
			this.fetchData();
			this.step = 0;
		},
		checkToggleSwitch($value) {
			return $value !== 0;
		},
	},
	computed: {
		...mapState(["permissions"]),
		fullOrganism() {
			const findOrganism = this.organismlistData.find(
				(d) => d.ID === this.currentASTRow.VALUE
			);
			return findOrganism ? findOrganism.NAME : "";
		},
		canViewResultEntry() {
			return this.permissions.some((permission) => {
				return permission.permission_id === 4 || permission.permission_id === 5;
			});
		},
		canEditResultEntry() {
			return this.permissions.some((permission) => {
				return permission.permission_id === 5;
			});
		},
		canApprove() {
			return this.permissions.some((permission) => {
				return permission.permission_id === 6;
			});
		},
	},
	watch: {
		permissions: {
			handler: function (val) {
				if (val.length !== 0) {
					if (!this.canViewResultEntry) {
						this.$router.push("/dashboard");
					}
				}
			},
			deep: true,
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

.swal2-actions-center {
	justify-content: center !important;
}
</style>
