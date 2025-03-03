<template>
  <div class="bg-default">
    <!-- Header -->
    <div class="header py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome to C-Link</h1>
              <p class="text-lead text-white">
                A laboratory information management system.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-header bg-transparent pb-3">
              <div
                class="text-muted text-center mt-2 mb-3 p-1"
                style="background-color: lightgrey"
              >
                <img
                  src="~/static/img/logo/logo-clink.png"
                  style="width: 140px"
                />
              </div>
            </div>
            <div class="card-body px-lg-5 py-lg-1">
              <div class="text-center text-muted mb-4">
                <h3>โปรดระบุผู้ใช้งาน / Login Account</h3>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Login"
                    :rules="{ required: true, email: false }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Login name"
                    v-model="model.loginname"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 2 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <base-checkbox class="mt-3" v-model="model.rememberMe"
                    >Remember me</base-checkbox
                  >
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      :disabled="isSubmitting"
                    >
                      {{ isSubmitting ? "Logging In..." : "Login" }}
                    </base-button>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  layout: "AuthLayout",
  data() {
    return {
      model: {
        loginname: "",
        password: "",
        rememberMe: false,
      },
      isSubmitting: false,
    };
  },

  mounted() {
    this.$store.commit("initializeStore");
  },

  watch: {
    "$store.state.accessToken": function (val) {
      if (val) {
        this.$router.push("/dashboard");
        swal.fire({
          iconHtml: `
              <div class="text-center">
                 <i class="fas fa-user-circle" style="font-size: 80px"></i>
              </div>
            `,
          title: "ยินดีต้อนรับ",
          html: `
              <h3 class="text-center">
                ${this.$store.state?.profile?.firstname} ${this.$store.state?.profile?.lastname} เลข ท.น. ${this.$store.state?.profile?.med_user_code}
                <br />
                ตำแหน่ง ${this.$store.state?.profile?.position}
              </h3>`,
          showConfirmButton: false,
          showCancelButton: false,
          showCloseButton: true,
          timer: 3000,
          customClass: {
            icon: "login-swal2-icon",
          },
        });
      }
    },
  },

  methods: {
    onSubmit() {
      if (this.model.loginname != "" && this.model.password != "") {
        this.isSubmitting = true;

        const url = this.$store.state.urlBase + "/oauth/token";

        let bodyFormData = new FormData();
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("scope", "*");
        bodyFormData.append("client_id", process.env.VUE_APP_AUTH_CLIENT_ID);
        bodyFormData.append(
          "client_secret",
          process.env.VUE_APP_AUTH_CLIENT_SECRET
        );

        bodyFormData.append("username", this.model.loginname);
        bodyFormData.append("password", this.model.password);

        axios({
          method: "post",
          url: url,
          data: bodyFormData,
        })
          .then((response) => {
            const { access_token: accessToken } = response.data;

            const url = this.$store.state.urlBase + "/api/auth/me";
            axios
              .get(url, {
                headers: {
                  Authorization: "Bearer " + accessToken,
                },
              })
              .then((response) => {
                const profile = response.data ?? {};
                delete profile["permissions"];
                this.$store.commit("setProfile", profile);

                if (this.model.rememberMe) {
                  this.$store.commit("setAccessToken", accessToken);
                  this.$store.commit("removeExpired");
                } else {
                  this.$store.commit("setAccessToken", accessToken);
                  this.$store.commit(
                    "setExpired",
                    new Date().getTime() + 86400000
                  );
                }

                this.isSubmitting = false;
              })
              .catch((err) => {
                swal
                  .fire({
                    icon: "error",
                    title: "ลงชื่อเข้าใช้งานไม่สำเร็จ",
                    confirmButtonText: "ตกลง",
                    showCancelButton: false,
                    buttonsStyling: false,
                    customClass: {
                      confirmButton: "btn btn-default",
                      cancelButton: "btn btn-light",
                      actions: "swal2-actions-center",
                    },
                  })
                  .then(() => {
                    this.isSubmitting = false;
                  });
              });
          })
          .catch((err) => {
            swal
              .fire({
                icon: "error",
                title: "Username หรือ Password ไม่ถูกต้อง",
                confirmButtonText: "ตกลง",
                showCancelButton: false,
                buttonsStyling: false,
                customClass: {
                  confirmButton: "btn btn-default",
                  cancelButton: "btn btn-light",
                  actions: "swal2-actions-center",
                },
              })
              .then(() => {
                this.isSubmitting = false;
              });
          });
      }
    },
  },
};
</script>

<style>
.login-swal2-icon {
  border-color: transparent !important;
}
.swal2-actions-center {
  justify-content: center !important;
}
</style>
