<template>
  <q-dialog ref="dialogRef">
    <q-card :style="`resize: both; min-width: 300px;${currentPos}`">
      <q-bar
        v-touch-pan.prevent.mouse="move"
        class="bg-positive text-white">
          <q-icon name="event" />
          <div>{{ payment.createdAt }}</div>
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">
              {{ $t('close') }}
            </q-tooltip>
          </q-btn>
        </q-bar>

      <q-img style="max-height: 250px" :src="getImage(payment.proof, 'payments')">
        <div class="absolute-full text-subtitle2 flex flex-center">
          <q-btn
            @click="viewImag"
            round
            color="deep-orange"
            icon="visibility" />
        </div>
      </q-img>

      <q-input
        filled
        :label="$t('payment.note')"
        autogrow
        readonly
        :model-value="payment.note.trim()" />

      <q-table
        :rows="payment.documents"
        :columns="columns"
        :rows-per-page-options="[payment.documents.length]"
        row-key="id">
        <template v-slot:bottom>
          <q-td class="text-h6 text-center" width="100%">
            Total = {{ payment.documents.reduce((cum, cur) => cum + cur.price,0) }} Ar
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {useDialogPluginComponent, useQuasar} from 'quasar';
  import {defineAsyncComponent, defineProps} from 'vue';
  import {Payment, PaymentDocument} from 'src/graphql/types';
  import {useI18n} from 'vue-i18n';
  import { getImage, movable } from 'src/utils/utils';

const { dialogRef } = useDialogPluginComponent();

  const props = defineProps<{ payment: Payment }>();

  const { t } = useI18n();

  const columns = [
    {
      name: 'title',
      label: t('document.title'),
      align: 'center',
      field: (row: PaymentDocument) => row.document.title,
      sortable: true
    },
    {
      name: 'fileCount',
      align: 'center',
      label: t('document.fileCount'),
      field: (row: PaymentDocument) => row.document.files.length,
      sortable: true
    },
    {
      name: 'sizes',
      align: 'center',
      label: t('document.size'),
      field: (row: PaymentDocument) => row.document.files.reduce((cum, cur) => cum + cur.size, 0),
      sortable: true
    },
    {
      name: 'amount',
      label: t('payment.amount'),
      field: (row: PaymentDocument) => `${row.price} Ar`,
      sortable: true
    },
  ];

  const { currentPos, move } = movable();

  const { dialog } = useQuasar();

  function viewImag() {
    dialog({
      component: defineAsyncComponent(() => import('components/ImageViewer.vue')),
      componentProps: { url: 'payments/' + props.payment.proof }
    });
  }
</script>

<style scoped>

</style>
