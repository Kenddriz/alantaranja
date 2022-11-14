<template>
  <div class="row q-col-gutter-lg">
    <OverviewsComponent />
  </div>
  <div class="row q-col-gutter-lg q-mt-lg">

    <div class="col-12 col-md-8">
      <PaymentsMonthly />
    </div>

    <div class="col-12 col-md-4">
      <PaymentsStatus class="fit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import OverviewsComponent from "components/dashboard/OverviewsComponent.vue";
  import PaymentsMonthly from "components/dashboard/PaymentsMonthly.vue";
  import PaymentsStatus from "components/dashboard/PaymentsStatus.vue";

</script>

<style scoped>

</style>
