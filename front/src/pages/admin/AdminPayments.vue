<template>
  <CommonFilters
    v-model:from="input.from"
    v-model:limit="input.limit"
    v-model:filter="input.keyword"
    v-model:page="input.page"
    v-model:to="input.to" />
  <q-table
    class="q-mt-md"
    :title="$t('payment.list')"
    :rows="payment.items"
    :columns="columns"
    :loading="loading || statusLoading"
    row-key="id"
    flat>
    <template v-slot:top-right>
      <div class="q-gutter-md">
        <q-checkbox
          v-for="(stat, index) in ['pending', 'approved', 'rejected']"
          :key="index"
          :val="stat"
          v-model="input.status"
          :label="$t(`payment.${stat}`)"
          color="amber" />
      </div>
    </template>
    <template v-slot:body-cell-proof="props">
      <q-td :props="props">
        <q-avatar
          class="cursor-pointer"
          @click="viewImag(props.row.proof)">
          <q-img :src="props.value" />
        </q-avatar>
      </q-td>
    </template>
    <template v-slot:body-cell-id="props">
      <q-td :props="props">
        <template v-if="props.row.status === 'pending'">
          <q-btn
            @click="submit(props.value, 'approved')"
            flat
            dense
            color="primary"
            icon="check" />
          <q-btn
            @click="submit(props.value, 'rejected')"
            flat
            dense
            color="deep-orange"
            icon="close" />
        </template>
        <q-btn
          flat
          @click="openDetails(props.row)"
          dense
          color="primary"
          icon="read_more" />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import CommonFilters from 'components/CommonFilters.vue';
  import {computed, defineAsyncComponent, reactive} from 'vue';
  import {
    DocumentsPagination,
    PaginationInput,
    Payment, PaymentsPaginateInput,
    QueryPaymentsPaginateArgs
  } from 'src/graphql/types';
  import {gql} from '@apollo/client/core';
  import {PAYMENT_FIELDS} from 'src/graphql/payment/payment';
  import {InitialPagination, PAGINATION_META} from 'src/utils/pagination';
  import {useI18n} from 'vue-i18n';
  import {useQuery} from '@vue/apollo-composable';
  import {USER_FIELDS} from 'src/graphql/users/user';
  import {date, useQuasar} from 'quasar';
  import {getImage} from 'src/utils/utils';
  import {usePaymentStatus} from 'src/graphql/payment/payment-status';
  import formatDate = date.formatDate;
  import {getAmount} from "src/utils/file";

  type Data = {
    paymentsPaginate: DocumentsPagination;
  }

  const QUERY = gql`
    query DocumentsPaginate($input: PaymentsPaginateInput!){
        paymentsPaginate(input: $input){
            items {
                ${PAYMENT_FIELDS}
                user{${USER_FIELDS}}
            }
            ${PAGINATION_META}
        }
    }
  `;
  const input = reactive<PaymentsPaginateInput>({
    from: '',
    limit: 15,
    page: 1,
    keyword: '',
    to: '',
    status: ['pending'],
  });

  const { t } = useI18n();

  const { loading, result } = useQuery<Data, QueryPaymentsPaginateArgs>(QUERY, { input });

  const payment = computed(() => result?.value?.paymentsPaginate || InitialPagination);

  const columns = [
    {
      name: 'createdAt',
      align: 'left',
      label: t('date'),
      field: (row: Payment) => formatDate(row.createdAt, t('localDate.long')),
      sortable: true
    },
    {
      name: 'user',
      align: 'center',
      label: t('user.name'),
      field: (row: Payment) => row.user.lastName + ' ' + row.user.firstName,
      sortable: true
    },
    {
      name: 'phone',
      align: 'center',
      label: t('user.phone'),
      field: (row: Payment) => row.user.phone,
      sortable: true
    },
    {
      name: 'documentCount',
      align: 'center',
      label: t('payment.documentCount'),
      field: (row: Payment) => row.documents.length,
      sortable: true
    },
    {
      name: 'proof',
      align: 'center',
      label: t('payment.proof'),
      field: (row: Payment) => getImage(row.proof, 'payments'),
      sortable: true
    },
    {
      name: 'amount',
      label: t('payment.amount'),
      field: (doc: Payment) => getAmount(doc.documents),
      sortable: true
    },
    {
      name: 'status',
      align: 'center',
      label: t('payment.status'),
      field: (row: Payment) => t(`payment.${row.status}`),
      sortable: true
    },
    {
      name: 'id',
      align: 'right',
      label: t('actions'),
      field: 'id',
      sortable: true
    },
  ];

  const { dialog } = useQuasar();

  function openDetails(payment: Payment) {
    dialog({
      component: defineAsyncComponent(() => import('components/payment/PaymentDetails.vue')),
      componentProps: { payment }
    });
  }

  function viewImag(proof: string) {
    dialog({
      component: defineAsyncComponent(() => import('components/ImageViewer.vue')),
      componentProps: { url: 'payments/' + proof }
    });
  }

  const { statusLoading, submit } = usePaymentStatus();

</script>

<style lang="scss" scoped>


</style>
