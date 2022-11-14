<template>
  <q-card flat class="card q-pa-md text-dark">
    <apexchart
      type="bar"
      height="400"
      :options="chartOptions"
      :series="series"
    />
  </q-card>
</template>

<script lang="ts" setup>
  import {computed} from "vue";
  import {PaymentsMonthlyOutput} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {useQuery} from "@vue/apollo-composable";
  import {useI18n} from "vue-i18n";

  type Data = {
    paymentsMonthly: PaymentsMonthlyOutput[]
  }

  const QUERY = gql`
    query PaymentsMonthly {
        paymentsMonthly {
            month
            amount
        }
    }
  `;

  const { t, tm } = useI18n();

  const { result } = useQuery<Data>(QUERY);

  const defaultSerie = new Array(12).fill(0);

  const defaultSeries = [{
    name: t('payment.amount'),
    data: defaultSerie,
  }];
  const series = computed(() => {
    {
      const newSeries = [...defaultSeries];
      const data = result.value?.paymentsMonthly;
      if(data) {
        for(let index = 0; index < 12; index++) {
          const val = data.find(v => v.month === index + 1);
          if(val)newSeries[0].data[index] = val.amount;
        }
      }
      return newSeries;
    }
  });
  const chartOptions = {
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 1000
    },
    title: {
      text: t('payment.monthly', { year: (new Date).getFullYear() }),
      align: 'left',
      style: {
        fontSize:  '18px',
        fontWeight:  '600',
        color: 'black'
      }
    },
    legend: {
      show: false,
    },
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        distributed: true,
        columnWidth: '10%',
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: tm('localDate.shortMonths'),
      labels: {
        style: {
          colors: 'black'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Amount',
        style: {
          color: 'black'
        }
      },
      labels: {
        style: {
          colors: 'black'
        }
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + ' Ar';
        }
      }
    },
    colors: ['#795548', '#546E7A', '#21BA45', '#E91E63'],
  }
</script>

<style scoped>

</style>
