<template>
  <div class="d-inline-block ml-1">
    <template v-if="Object.keys(this.urgentOrderIds).length > 0 && canView">
      ( <i class="fa fa-solid fa-exclamation-circle" style="color: red"></i>
      {{
        (urgentAmount !== undefined && urgentAmount !== null
          ? urgentAmount
          : 0
        ).toLocaleString("en-US")
      }}
      )
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

export default {
  name: "VeryUrgentSidebarComponent",
  props: {
    componentData: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (this.canView) {
      if (Object.keys(this.urgentOrderIds).length > 0) {
        swal.fire({
          title: "กรุณารับ Lab และตรวจสอบข้อมูล",
          iconHtml: `
              <div class="text-center">
                <i class="fa fa-solid fa-exclamation-circle" style="color: red; font-size: 80px"></i>
              </div>
            `,
          html: `
              <div class="text-center" style="font-size: 20px">
                ${Object.keys(this.urgentOrderIds ?? {}).map((id) => {
                  return `<span>Order ID: ${id}</span><br/>`;
                })}
              </div>
            `.replaceAll(",", ""),
          showCloseButton: true,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: "รับทราบ",
          buttonsStyling: false,
          customClass: {
            confirmButton: "btn btn-default",
            cancelButton: "btn btn-light",
            denyButton: "btn btn-danger",
            icon: "very-urgent-swal2-icon",
          },
        });
      }
    }
  },
  computed: {
    ...mapState(["permissions", "urgentAmount", "urgentOrderIds"]),
    canView: function () {
      return this.permissions.find((p) => p.permission_id === 1) !== undefined;
    },
  },
};
</script>

<style>
.very-urgent-swal2-icon {
  border-color: transparent !important;
}
</style>
