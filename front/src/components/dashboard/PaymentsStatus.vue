<template>
  <q-card flat class="card text-dark">
    <q-card-section class="text-h6">
      Payments status
    </q-card-section>
    <apexchart
      class="q-ma-md"
      type="pie"
      height="400"
      :options="chartOptions"
      :series="series"
    />
  </q-card>
</template>

<script lang="ts" setup>
  import {useI18n} from "vue-i18n";
  import {PaymentsStatusStatisticsOutput} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {useQuery} from "@vue/apollo-composable";
  import {computed} from "vue";

  type Data = {
    paymentsStatusStatistics: PaymentsStatusStatisticsOutput[];
  }

  const QUERY = gql`
       query PaymentsStatusStatistics {
            paymentsStatusStatistics {
                count
                status
                amount
            }
       }
   `;

  const { result } = useQuery<Data>(QUERY);

  const { t } = useI18n();
  const series = computed(() => {
    const data = result.value?.paymentsStatusStatistics || [];
    return ['pending', 'approved', 'rejected'].map((val) => {
      return data.find(s => s.status === val)?.count || 0;
    })
  });

  const chartOptions = {
    labels: [t('payment.pending'), t('payment.approved'), t('payment.rejected')],
    colors: ['#546E7A', '#82dc95', '#E91E63'],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex]
      },
    },
    plotOptions: {
      pie: {
        customScale: 1
      }
    },
    tooltip: {
      y: {
        formatter: function(value, { seriesIndex, dataPointIndex }) {
          console.log(seriesIndex, dataPointIndex);
          return value;
        }
      }
    }
  }

</script>

<style scoped>

</style>
