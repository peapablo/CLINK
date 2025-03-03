<template>
  <div>
    <BaseHeader class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">{{ routeName }}</h6>
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
            <RouteBreadcrumb />
          </nav>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <BaseButton size="sm" type="neutral">New</BaseButton>
          <BaseButton size="sm" type="neutral">Filters</BaseButton>
        </div>
      </div>
    </BaseHeader>

    <div class="container-fluid mt--6">
      <div class="row">
        <div class="col">
          <div class="card">
            <div class="card-body pt-0">
              <ClientOnly>
                <WorldMap class="map map-big" :map-data="mapData" :points="points" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

definePageMeta({
  layout: "DashboardLayout",
});

const route = useRoute();
const routeName = computed(() => route.name);

const mapData = ref({
  AUS: 760,
  BRA: 900,
  CAN: 120,
  DEU: 1300,
  FRA: 540,
  GBR: 690,
  GEO: 200,
  IND: 200,
  ROU: 600,
  RUS: 757,
  USA: 1800,
});

const points = ref([
  { name: "Brazil", centered: "BRA" },
  { name: "France", centered: "FRA" },
  { name: "Italy", centered: "ITA" },
  { name: "Oman", centered: "OMN" },
  { name: "Indonesia", centered: "IDN" },
  { name: "Romania", centered: "ROU" },
]);
</script>

<style>
#worldMap {
  width: 100%;
}
</style>
