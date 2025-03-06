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
          <div class="card border-0">
            <div ref="mapContainer" class="map-canvas" style="height: 600px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { Loader } from "@googlemaps/js-api-loader";

definePageMeta({
  layout: "DashboardLayout",
});

const route = useRoute();
const routeName = computed(() => route.name);
const mapContainer = ref(null);
const config = useRuntimeConfig();
const API_KEY = config.public.apiKey; // ใช้จาก .env

onMounted(async () => {
  if (!API_KEY) {
    console.error("Google Maps API key is missing");
    return;
  }

  const loader = new Loader({
    apiKey: API_KEY,
    version: "weekly",
  });

  const google = await loader.load();
  let lat = 40.748817, lng = -73.985428, color = "#5e72e4";
  let myLatlng = new google.maps.LatLng(lat, lng);

  const map = new google.maps.Map(mapContainer.value, {
    center: myLatlng,
    zoom: 8,
    scrollwheel: false,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: [
      { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#444444" }] },
      { featureType: "landscape", elementType: "all", stylers: [{ color: "#f2f2f2" }] },
      { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "road", elementType: "all", stylers: [{ saturation: -100 }, { lightness: 45 }] },
      { featureType: "road.highway", elementType: "all", stylers: [{ visibility: "simplified" }] },
      { featureType: "road.arterial", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
      { featureType: "water", elementType: "all", stylers: [{ color: color }, { visibility: "on" }] },
    ],
  });

  let marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    animation: google.maps.Animation.DROP,
    title: "Hello World!",
  });

  let contentString = `
    <div class="info-window-content">
      <h2>Argon Dashboard PRO</h2>
      <p>A beautiful premium dashboard for Bootstrap 4.</p>
    </div>
  `;

  let infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });
});
</script>
