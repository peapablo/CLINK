<template>
  <div>
    <BaseHeader class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 d-inline-block mb-0">Alternative</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <ol class="breadcrumb breadcrumb-links">
              <li class="breadcrumb-item"><NuxtLink to="/"><i class="fas fa-home"></i></NuxtLink></li>
              <li class="breadcrumb-item"><a href="#">Dashboards</a></li>
              <li class="breadcrumb-item active" aria-current="page">Alternative</li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <BaseButton size="sm" type="neutral">New</BaseButton>
          <BaseButton size="sm" type="neutral">Filters</BaseButton>
        </div>
      </div>

      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-primary border-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">Tasks completed</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">8/24</span>
                  <BaseProgress class="progress-xs mt-3 mb-0" type="success" :value="30" />
                </div>
                <div class="col-auto">
                  <BaseDropdown title-classes="btn btn-sm btn-neutral mr-0" menu-on-right :has-toggle="false">
                    <template #title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </BaseDropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600">See details</a>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-info border-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">Contacts</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">123/267</span>
                  <BaseProgress class="progress-xs mt-3 mb-0" type="success" :value="50" />
                </div>
                <div class="col-auto">
                  <BaseDropdown title-classes="btn btn-sm btn-neutral mr-0" menu-on-right :has-toggle="false">
                    <template #title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </BaseDropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600">See details</a>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-danger border-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">Items sold</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">200/300</span>
                  <BaseProgress class="progress-xs mt-3 mb-0" type="success" :value="80" />
                </div>
                <div class="col-auto">
                  <BaseDropdown title-classes="btn btn-sm btn-neutral mr-0" menu-on-right :has-toggle="false">
                    <template #title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </BaseDropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600">See details</a>
              </p>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-default border-0">
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">Notifications</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">50/62</span>
                  <BaseProgress class="progress-xs mt-3 mb-0" type="success" :value="90" />
                </div>
                <div class="col-auto">
                  <BaseDropdown title-classes="btn btn-sm btn-neutral mr-0" menu-on-right :has-toggle="false">
                    <template #title>
                      <i class="fas fa-ellipsis-h"></i>
                    </template>
                    <a class="dropdown-item" href="#">Action</a>
                    <a class="dropdown-item" href="#">Another action</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                  </BaseDropdown>
                </div>
              </div>
              <p class="mt-3 mb-0 text-sm">
                <a href="#!" class="text-nowrap text-white font-weight-600">See details</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseHeader>

    <div class="container-fluid mt--6">
      <div class="card-deck flex-column flex-xl-row">
        <Card>
          <template #header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                <h5 class="h3 mb-0">Sales value</h5>
              </div>
            </div>
          </template>
          <LineChart
            :height="350"
            ref="bigChart"
            :chartData="bigLineChart.chartData"
            :extraOptions="bigLineChart.extraOptions" />
        </Card>

        <Card header-classes="bg-transparent">
          <template #header>
            <div class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </div>
            </div>
          </template>
          <BarChart
            :height="350"
            ref="barChart"
            :chartData="redBarChart.chartData" />
        </Card>
      </div>

      <div class="row">
        <div class="col-xl-8">
          <LightTable :itemLimit="5" />
        </div>
        <div class="col-xl-4">
          <VectorMapCard />
        </div>
      </div>

      <div class="card-deck flex-column flex-xl-row">
        <MembersCard :showSearch="false" />
        <TaskList />
        <Card>
          <template #header>
            <h5 class="h3 mb-0">Progress track</h5>
          </template>
          <ProgressTrackList :itemLimit="5" />
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

import BaseHeader from '@/components/argon-core/BaseHeader.vue';
import BaseButton from '@/components/argon-core/BaseButton.vue';
import BaseProgress from '@/components/argon-core/BaseProgress.vue';
import BaseDropdown from '@/components/argon-core/BaseDropdown.vue';
import LineChart from '@/components/argon-core/Charts/LineChart.vue';
import BarChart from '@/components/argon-core/Charts/BarChart.vue';
import LightTable from '~/components/pages/dashboard/LightTable.vue';
import VectorMapCard from '~/components/widgets/VectorMapCard.vue';
import MembersCard from '~/components/widgets/MembersCard.vue';
import TaskList from '~/components/widgets/TaskList.vue';
import ProgressTrackList from '~/components/pages/dashboard/ProgressTrackList.vue';
import Card from '~/components/argon-core/Card.vue';

const bigLineChart = reactive({
  chartData: {
    datasets: [
      {
        label: 'Performance',
        data: [0, 20, 10, 30, 15, 40, 20, 60, 60],
      },
    ],
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  extraOptions: {},
});

const redBarChart = reactive({
  chartData: {
    labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Sales',
        data: [25, 20, 30, 22, 17, 29],
      },
    ],
  },
});
</script>

<style scoped>
</style>
