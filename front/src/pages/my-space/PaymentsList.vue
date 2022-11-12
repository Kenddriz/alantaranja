<template>
  <CommonFilters
    v-model:from="input.from"
    v-model:limit="input.limit"
    v-model:filter="input.keyword"
    v-model:page="input.page"
    v-model:to="input.to" />
  <q-table
    class="q-mt-md"
    title="Payments list"
    :rows="payment.items"
    :columns="columns"
    :filter="input.keyword"
    separator="cell"
    row-key="id"
    flat>
    <template v-slot:body-cell-status="props">
      <q-td
        :class="`text-${statusColor[props.value]}`"
        auto-width
        :props="props">
          {{ $t(`payment.${props.value}`) }}
      </q-td>
    </template>
    <template v-slot:body-cell-actions="props">
      <q-td auto-width :props="props">
        <span v-if="!!props.row.downloadAt" class="text-primary">
          {{ $t('payment.downloaded') }}
        </span>
        <span v-else-if="props.row.status === 'pending'">
          {{ $t('payment.processed') }}
        </span>
        <span v-else-if="props.row.status === 'rejected'" class="text-red">
          {{ $t('payment.pRejected') }}
        </span>
        <template v-else-if="props.row.status === 'approved'">
          <q-btn
            flat
            @click="download(props.row)"
            dense
            color="primary"
            icon="file_download"
            no-caps />
          <q-btn
            @click="playDocument(props.row)"
            flat
            color="primary"
            icon="visibility"
            no-caps />
        </template>
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import CommonFilters from 'components/CommonFilters.vue';
  import {computed, defineAsyncComponent, reactive} from 'vue';
  import {
    Document,
    PaginationInput, Payment,
    PaymentsPagination,
    QueryMyPaymentsPaginateArgs,
  } from 'src/graphql/types';
  import {useQuery} from '@vue/apollo-composable';
  import {gql} from '@apollo/client/core';
  import {PAYMENT_FIELDS} from 'src/graphql/payment/payment';
  import {InitialPagination, PAGINATION_META} from 'src/utils/pagination';
  import {useI18n} from 'vue-i18n';
  import {useQuasar} from "quasar";
  import {getExt} from "src/utils/utils";

  type Data = {
    myPaymentsPaginate: PaymentsPagination;
  }
  const QUERY = gql`
    query PaymentsPaginate($input: PaginationInput!){
        myPaymentsPaginate(input: $input){
            items {
                ${PAYMENT_FIELDS}
            }
            ${PAGINATION_META}
        }
    }
  `;
  const input = reactive<PaginationInput>({
    from: '',
    limit: 15,
    page: 1,
    keyword: '',
    to: ''
  });

  const { t } = useI18n();

  const { loading, result } = useQuery<Data, QueryMyPaymentsPaginateArgs>(QUERY, { input });

  const payment = computed(() => result?.value?.myPaymentsPaginate || InitialPagination);

  const columns = [
    {
      name: 'createdAt',
      align: 'center',
      label: t('date'),
      field: 'createdAt',
      sortable: true
    },
    {
      name: 'types',
      align: 'center',
      label: t('document.types'),
      field: (payment: Payment) => {
        const exts = new Set<string>();
        payment.documents.forEach(doc => {
          doc.document.files.forEach(f => exts.add(getExt(f.name)));
        });
        return Array.from(exts).join(',');
      },
      sortable: true
    },
    {
      name: 'fileCount',
      align: 'center',
      label: t('document.fileCount'),
      field: (row: Payment) => row.documents.length,
      sortable: true
    },
    {
      name: 'price',
      label: t('document.price'),
      field: (doc: Payment) => doc.documents.reduce((cum, cur) => cum + cur.price,0),
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      label: t('payment.pStatus'),
      field: 'status',
      sortable: true
    },
    {
      name: 'downloadAt',
      align: 'center',
      label: t('payment.downloadedAt'),
      field: 'downloadAt',
      sortable: true
    },
    {
      name: 'actions',
      align: 'center',
      label: t('actions'),
      field: 'link',
    },
  ];

  const { dialog } = useQuasar();

  function download(payment: Payment) {
    dialog({
      component: defineAsyncComponent(() => import('components/DownloadDialog.vue')),
      componentProps: {
        files: payment.documents.reduce((cum: string[], cur) => {
          return cum.concat(cur.document.files.map(f => f.name));
        }, []),
        paymentId: payment.id,
      },
    })
  }

  function playDocument(payment: Payment) {
    dialog({
      component: defineAsyncComponent(() => import("components/document/DocumentDetails.vue")),
      componentProps: { docs: payment.documents.map(d => d.document) },
    })
  }

  const statusColor = {
    pending: 'info',
    approved: 'positive',
    rejected: 'negative'
  };
</script>

<style scoped>

</style>
