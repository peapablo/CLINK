<template>
  <div class="content">
    <BaseHeader class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Paginated tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <RouteBreadCrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <BaseButton size="sm" type="neutral">New</BaseButton>
          <BaseButton size="sm" type="neutral">Filters</BaseButton>
        </div>
      </div>
    </BaseHeader>

    <div class="container-fluid mt--6">
      <Card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
        <template #header>
          <h3 class="mb-0">Paginated tables</h3>
          <p class="text-sm mb-0">
            This is a client-side example of paginated tables using Element Plus.
          </p>
        </template>

        <div class="d-flex justify-content-between flex-wrap mb-3">
          <ElSelect v-model="pagination.perPage" placeholder="Per page">
            <ElOption v-for="item in pagination.perPageOptions" :key="item" :label="item" :value="item" />
          </ElSelect>

          <BaseInput v-model="searchQuery" prepend-icon="fas fa-search" placeholder="Search..." />
        </div>

        <ElTable :data="queriedData" row-key="id" @sort-change="sortChange" @selection-change="selectionChange">
          <ElTableColumn v-for="column in tableColumns" :key="column.label" v-bind="column" />
          
          <ElTableColumn min-width="180px" align="right" label="Actions">
            <template #default="{ row, $index }">
              <BaseButton @click="handleLike(row)" class="like btn-link" type="info" size="sm" icon>
                <i class="text-white ni ni-like-2"></i>
              </BaseButton>
              <BaseButton @click="handleEdit(row)" class="edit" type="warning" size="sm" icon>
                <i class="text-white ni ni-ruler-pencil"></i>
              </BaseButton>
              <BaseButton @click="handleDelete(row)" class="remove btn-link" type="danger" size="sm" icon>
                <i class="text-white ni ni-fat-remove"></i>
              </BaseButton>
            </template>
          </ElTableColumn>
        </ElTable>

        <template #footer>
          <div class="d-flex justify-content-between flex-wrap">
            <p class="card-category">
              Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              <span v-if="selectedRows.length"> &nbsp; &nbsp; {{ selectedRows.length }} rows selected </span>
            </p>
            <BasePagination class="pagination-no-border" v-model="pagination.currentPage" :per-page="pagination.perPage" :total="total" />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
import BasePagination from '@/components/argon-core/BasePagination';
import users from '@/components/tables/users2';

// ✅ ตาราง & การค้นหา
const searchQuery = ref('');
const tableData = ref(users);
const selectedRows = ref([]);
const tableColumns = ref([
  { type: 'selection' },
  { prop: 'name', label: 'Name', minWidth: 160, sortable: true },
  { prop: 'position', label: 'Position', minWidth: 220, sortable: true },
  { prop: 'city', label: 'Office', minWidth: 135, sortable: true },
  { prop: 'age', label: 'Age', minWidth: 100, sortable: true },
  { prop: 'createdAt', label: 'Start Date', minWidth: 150, sortable: true },
  { prop: 'salary', label: 'Salary', minWidth: 120, sortable: true },
]);

// ✅ Pagination
const pagination = ref({
  perPage: 10,
  perPageOptions: [5, 10, 25, 50],
  currentPage: 1,
});
const total = computed(() => tableData.value.length);
const from = computed(() => (pagination.value.currentPage - 1) * pagination.value.perPage);
const to = computed(() => Math.min(from.value + pagination.value.perPage, total.value));
const queriedData = computed(() =>
  tableData.value
    .filter((item) => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    .slice(from.value, to.value)
);

// ✅ Action Functions
const handleLike = (row) => {
  ElMessage.success(`You liked ${row.name}`);
};

const handleEdit = (row) => {
  ElMessageBox.prompt(`Edit details for ${row.name}`, 'Edit User', {
    confirmButtonText: 'Save',
    cancelButtonText: 'Cancel',
  }).then(({ value }) => {
    row.name = value;
    ElMessage.success('User updated');
  });
};

const handleDelete = (row) => {
  ElMessageBox.confirm(`Are you sure you want to delete ${row.name}?`, 'Warning', {
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    tableData.value = tableData.value.filter((item) => item.id !== row.id);
    ElMessage.success(`${row.name} deleted`);
  });
};

const selectionChange = (rows) => {
  selectedRows.value = rows;
};
</script>

<style>
.no-border-card .card-footer {
  border-top: 0;
}
</style>
