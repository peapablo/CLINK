<template>
  <div>
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Tables</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <RouteBreadCrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral">New</base-button>
          <base-button size="sm" type="neutral">Filters</base-button>
        </div>
      </div>
    </base-header>
    
    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <LightTable />
        </div>
      </div>
      <InlineActionsTable />
      <StripedTable />
      <CheckboxTable />
      <CheckboxColoredTable />
      <TranslucentTable />
      <DarkTable />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu, ElTable, ElTableColumn } from 'element-plus';
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
import LightTable from '@/components/tables/RegularTables/LightTable';
import InlineActionsTable from '@/components/tables/RegularTables/InlineActionsTable';
import StripedTable from '@/components/tables/RegularTables/StripedTable';
import CheckboxTable from '@/components/tables/RegularTables/CheckboxTable';
import CheckboxColoredTable from '@/components/tables/RegularTables/CheckboxColoredTable';
import TranslucentTable from '@/components/tables/RegularTables/TranslucentTable';
import DarkTable from '@/components/tables/RegularTables/DarkTable';

// Projects & Users data
import projects from '@/components/tables/projects';
import users from '@/components/tables/users';

const projectData = ref(projects);
const userData = ref(users);
</script>
