// utils/mappingAPI.js
const data = {
  "data_category.php": "masterdata/data_category",
  "data_specimen.php": "masterdata/data_specimen",
  "inbox.php": "order/inbox",
  "data_test_primary.php": "masterdata/data_test_primary",
  "data_body_site.php": "masterdata/data_body_site",
  "print-label.php": "print-label",
  "data_title.php": "masterdata/data_title",
  "data_location.php": "masterdata/data_location",
  "data_priority.php": "masterdata/data_priority",
  "data_body_site_group.php": "masterdata/data_body_site_group",
  "batch_order.php": "order/batch_order",
  "data_pattern.php": "masterdata/data_pattern",
  "data_nogrowth.php": "masterdata/data_nogrowth",
  "lab_order_status.php": "masterdata/data_lab_order_status",
  "data_lab_result.php": "masterdata/data_lab_result",
  "data_organism.php": "masterdata/data_organism",
  "data_device.php": "masterdata/data_device",
  "data_antibiotic.php": "masterdata/data_antibiotic",
  "lab_result.php": "lab_result",
  "data_result.php": "masterdata/data_result",
  "data_breakpoint_room.php": "masterdata/data_breakpoint_room",
  "data_breakpoint.php": "masterdata/data_breakpoint",
  "export-worklist.php": "export-worklist",
  "summary.php": "dashboard/summary",
  "print-culture.php": "print-culture",
};

export default function mappingApi(api) {
  if (!Object.prototype.hasOwnProperty.call(data, api)) {
    console.error("API not found:", api);
    return api;
  }
  return data[api];
}
