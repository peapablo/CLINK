<template>
  <div class="bg-default">
    <!-- Header -->
    <div class="header bg-primary py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Ooops!</h1>
              <p class="text-lead text-white"><br/><br/>Page not found.<br/><br/><br/></p>

              <nuxt-link to="/dashboard" class="font-weight-bold text-white mt-5">Back to dashboard</nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <section class="py-6">
      <div class="container">
        <div class="row row-grid align-items-center">
          <div class="col-md-6">
            <!-- Optional additional content can go here -->
          </div>
          <div class="col-md-6">
            <!-- Optional additional content can go here -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  layout: 'AuthLayout'
});
</script>
