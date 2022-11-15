<template>
  <PaymentsStatus
    v-if="getUserRole()"
    class="column justify-center items-center"
    style="height: 80vh;">
    <q-card-section class="full-width text-right q-pr-lg q-pb-none">
      {{ $t('today') }} {{ today }}
    </q-card-section>
  </PaymentsStatus>

  <template v-else>
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
</template>

<script lang="ts" setup>
  import OverviewsComponent from "components/dashboard/OverviewsComponent.vue";
  import PaymentsMonthly from "components/dashboard/PaymentsMonthly.vue";
  import PaymentsStatus from "components/dashboard/PaymentsStatus.vue";
  import {getUserRole} from "src/utils/utils";
  import {useI18n} from "vue-i18n";
  import {date} from "quasar";
  import formatDate = date.formatDate;

  const { t } = useI18n();
  const today = formatDate(new Date(), t('localDate.short'))

</script>

<style scoped>

</style>
