<script setup>
import { useRoute } from 'vue-router';
import TimeLine from '@/components/argon-core/Timeline/TimeLine.vue';
import TimeLineItem from '@/components/argon-core/Timeline/TimeLineItem.vue';
import RouteBreadcrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb.vue';
import BaseHeader from '@/components/argon-core/BaseHeader.vue';
import Badge from '@/components/argon-core/Badge.vue';

const route = useRoute();
</script>

<template>
  <div>
    <BaseHeader class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ route.name }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <RouteBreadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <button class="btn btn-neutral btn-sm">New</button>
          <button class="btn btn-neutral btn-sm">Filters</button>
        </div>
      </div>
    </BaseHeader>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col-lg-6">
          <Card header-classes="bg-transparent">
            <template #header>
              <h3 class="mb-0">Timeline</h3>
            </template>

            <TimeLine type="one-side">
              <TimeLineItem badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-muted font-weight-bold">10:30 AM</small>
                <h5 class="mt-3 mb-0">New message</h5>
                <p class="text-sm mt-1 mb-0">Lorem ipsum dolor sit amet...</p>
                <div class="mt-3">
                  <Badge rounded type="success">design</Badge>
                  <Badge rounded type="success">system</Badge>
                  <Badge rounded type="success">creative</Badge>
                </div>
              </TimeLineItem>
            </TimeLine>
          </Card>
        </div>

        <div class="col-lg-6">
          <Card shadow gradient="default" header-classes="bg-transparent">
            <template #header>
              <h3 class="mb-0 text-white">Dark timeline</h3>
            </template>

            <TimeLine type="one-side">
              <TimeLineItem badge-type="success" badge-icon="ni ni-bell-55">
                <small class="text-light font-weight-bold">10:30 AM</small>
                <h5 class="text-white mt-3 mb-0">New message</h5>
                <p class="text-light text-sm mt-1 mb-0">Lorem ipsum dolor sit amet...</p>
                <div class="mt-3">
                  <Badge rounded type="success">design</Badge>
                  <Badge rounded type="success">system</Badge>
                  <Badge rounded type="success">creative</Badge>
                </div>
              </TimeLineItem>
            </TimeLine>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
