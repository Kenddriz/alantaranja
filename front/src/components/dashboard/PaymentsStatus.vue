<template>
  <q-card flat class="card text-dark">
    <q-card-section class="text-h6 full-width">
      {{ $t('payment.state') }}
    </q-card-section>
    <apexchart
      type="pie"
      class="full-width"
      height="400"
      :options="chartOptions"
      :series="series"
    />
    <slot></slot>
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
    return ['pending', 'approved', 'rejected'].map((val, index) => {
      return data.find(s => s.status === val)?.count || 0;
    })
  });

  const chartOptions = {
    labels: [t('payment.pending'), t('payment.approved'), t('payment.rejected')],
    colors: ['#546E7A', '#62ec78', '#F2C037'],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '18px',
      },
      formatter: function (val: string, opts: any) {
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
        formatter: function(value: number) {
          return value;
        }
      }
    }
  }

</script>

<style scoped>

</style>
