<template>
  <div>
    <div class="border-bottom bg-primary">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-6 col-md-4">
              <div>
                <h1 class="text-white">Result monitoring</h1>
              </div>

            </div>
            <div class="col-6 col-md-4">
              <div class="bg-secondary py-1 px-2 border rounded">
                <div class="d-flex flex-row align-items-center">
                  <div
                    class="mr-2"
                    style="cursor: pointer;"
                  >
                    <i class="fas fa-search"></i>
                  </div>
                  <div class="flex-grow-1">
                    <input
                      type="text"
                      class="w-100 border-0 input-style"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="border-bottom">
      <div class="container-fluid py-3">
        <div class="py-3">
          <div class="row">
            <div class="col-12 col-lg-auto">
              <div>
                <small>Lab number</small>
                <div class="font-weight-bold">{HN NUmber}</div>
              </div>
            </div>
            <div class="col">
              <div class="row">
                <div class="col-12 col-lg">
                  <div><i
                      class="fas fa-user-circle"
                      style="font-size:48px"
                    ></i></div>
                  <div>
                    <small>HN</small>
                    <div class="font-weight-bold">{HN NUmber}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>First Name</small>
                    <div class="font-weight-bold">{firstname}</div>
                  </div>
                  <div>
                    <small>Gender
                    </small>
                    <div class="font-weight-bold">{Male}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Last Name</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                  <div>
                    <small>Age
                    </small>
                    <div class="font-weight-bold">{44 Year}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Order Date</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                  <div>
                    <small> Date
                    </small>
                    <div class="font-weight-bold">{44 Year}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>SID</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                  <div>
                    <small>Body Site
                    </small>
                    <div class="font-weight-bold">{44 Year}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Specimen</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                  <div class="hilight-text  border rounded  text-center px-2 py-1 mt-3">
                    <div class="text-sm">
                      Special for
                    </div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Priority</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                  <div>
                    <small>Doctor
                    </small>
                    <div class="font-weight-bold">{44 Year}</div>
                  </div>
                </div>
                <div class="col-6 col-lg">
                  <div>
                    <small>Location</small>
                    <div class="font-weight-bold">{lastname}</div>
                  </div>
                </div>
              </div>

            </div>
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
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid py-3">

    </div>
  </div>
</template>
<script>
export default {
  layout: 'DashboardLayout',
  components: {},
  data() {
    return {};
  },
  methods: {},
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
</style>









