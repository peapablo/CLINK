<template>
  <div>
    <BaseHeader class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">Widgets</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <RouteBreadCrumb />
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
          <StatsCard title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40">
            <template #footer>
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </StatsCard>
        </div>
        <div class="col-xl-3 col-md-6">
          <StatsCard title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35">
            <template #footer>
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </StatsCard>
        </div>
        <div class="col-xl-3 col-md-6">
          <StatsCard title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins">
            <template #footer>
              <span class="text-danger mr-2"><i class="fa fa-arrow-down"></i> 5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </StatsCard>
        </div>
        <div class="col-xl-3 col-md-6">
          <StatsCard title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32">
            <template #footer>
              <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </StatsCard>
        </div>
      </div>
    </BaseHeader>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-4">
          <!-- Image-Text card -->
          <div class="card">
            <img class="card-img-top" src="~/static/img/theme/img-1-1000x900.jpg" alt="Image placeholder">
            <div class="card-body">
              <h5 class="h2 card-title mb-0">Get started with Argon</h5>
              <small class="text-muted">by John Snow on Oct 29th at 10:23 AM</small>
              <p class="card-text mt-4">Argon is a great free UI package based on Bootstrap 4 that includes the most important components and features.</p>
              <a href="#!" class="btn btn-link px-0">View article</a>
            </div>
          </div>

          <MembersCard />

          <!-- Messages -->
          <div class="card">
            <div class="card-header">
              <h5 class="h3 mb-0">Latest messages</h5>
            </div>
            <div class="card-body p-0">
              <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4">
                  <div class="d-flex w-100 justify-content-between">
                    <div>
                      <div class="d-flex w-100 align-items-center">
                        <img src="~/static/img/theme/team-1.jpg" alt="Image placeholder" class="avatar avatar-xs mr-2">
                        <h5 class="mb-1">Tim</h5>
                      </div>
                    </div>
                    <small>2 hrs ago</small>
                  </div>
                  <h4 class="mt-3 mb-1"> New order for Argon Dashboard</h4>
                  <p class="text-sm mb-0">Doasdnec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                </a>
                <a href="#" class="list-group-item list-group-item-action flex-column align-items-start py-4 px-4">
                  <div class="d-flex w-100 justify-content-between">
                    <div>
                      <div class="d-flex w-100 align-items-center">
                        <img src="~/static/img/theme/team-2.jpg" alt="Image placeholder" class="avatar avatar-xs mr-2">
                        <h5 class="mb-1">Mike</h5>
                      </div>
                    </div>
                    <small>1 day ago</small>
                  </div>
                  <h4 class="mt-3 mb-1"><span class="text-info">●</span> Your theme has been updated</h4>
                  <p class="text-sm mb-0">Doasdnec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                </a>
              </div>
            </div>
          </div>

          <CreditCard />
        </div>

        <div class="col-lg-4">
          <!-- Calendar widget -->
          <ClientOnly>
            <CalendarWidget />
          </ClientOnly>

          <TimelineCard />

          <ProgressTrackList />

          <PaypalCard />
        </div>

        <div class="col-lg-4">
          <VectorMapCard />

          <VisaCard />
          <StatsCards />
          <TaskList />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue';
import StatsCard from '@/components/argon-core/Cards/StatsCard'
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb'
import TimelineCard from '~/components/widgets/TimelineCard'
import MembersCard from "~/components/widgets/MembersCard";
import CreditCard from "~/components/widgets/CreditCard";
import ProgressTrackList from "~/components/widgets/ProgressTrackList";
import PaypalCard from "~/components/widgets/PaypalCard";
import VectorMapCard from "~/components/widgets/VectorMapCard";
import VisaCard from "~/components/widgets/VisaCard";
import StatsCards from "~/components/widgets/StatsCards";
import TaskList from "~/components/widgets/TaskList";
import CalendarWidget from '~/components/widgets/CalendarWidget';
import BaseHeader from '~/components/argon-core/Headers/BaseHeader'
import BaseButton from '~/components/argon-core/Buttons/BaseButton'
import ClientOnly from '~/components/ClientOnly.vue'

defineComponent({
  layout: 'DashboardLayout',
  components: {
    BaseHeader,
    BaseButton,
    StatsCard,
    RouteBreadCrumb,
    TimelineCard,
    MembersCard,
    CreditCard,
    ProgressTrackList,
    PaypalCard,
    VectorMapCard,
    VisaCard,
    StatsCards,
    TaskList,
    CalendarWidget
  }
});
</script>
