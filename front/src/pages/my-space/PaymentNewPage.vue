<template>
  <q-table
    :title="$t(`paths.${$route.name}`)"
    :rows="cart"
    :columns="columns"
    dense
    row-key="id"
    flat>
    <template v-slot:top-right>
      {{ cartAmount }} Ar
    </template>
    <template v-slot:body-cell-id="props">
      <q-td class="text-right" :props="props">
        <q-btn
          @click="onRemove(props.value)"
          icon="delete"
          color="deep-orange"
          flat />
      </q-td>
    </template>

    <template v-slot:bottom>
      <q-form @submit.prevent="submit" class="row q-col-gutter-md fit q-py-md">
        <div class="col-12 text-subtitle1 text-right">
          {{ $t('payment.information') }}
        </div>
        <div class="col-12 col-md-6">
          <q-uploader
            bordered
            style="height: 290px"
            accept="image/*"
            hide-upload-btn
            color="transparent"
            text-color="primary"
            class="full-width"
            @added="proof = $event[0]"
            @removed="proof = null"
            flat
            :label="$t('payment.proof')" />
        </div>
        <div class="col-12 col-md-6">
          <div class="text-body1 q-mt-sm">{{ $t('payment.note') }}</div>
          <q-input
            v-model="note"
            :model-value="note"
            class="q-my-sm"
            outlined
            type="textarea"
            :label="$t('payment.notePlaceholder')" />

          <q-card-actions class="q-my-md q-px-none" align="right">
            <q-btn
              :disable="!cart.length || !proof"
              type="submit"
              :loading="loading"
              icon-right="check"
              unelevated
              color="positive"
              :label="$t('validate')" />
          </q-card-actions>
        </div>
      </q-form>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import {useI18n} from 'vue-i18n';
  import { useCart } from 'src/graphql/payment/cart';
  import {MutationPaymentCreateArgs, Payment} from 'src/graphql/types';
  import {useMutation} from '@vue/apollo-composable';
  import {gql} from '@apollo/client/core';
  import {PAYMENT_FIELDS} from 'src/graphql/payment/payment';
  import {addPaginationCache} from 'src/utils/pagination';
  import {ref} from 'vue';
  import {useQuasar} from 'quasar';
  import {CONSTANTS} from 'src/utils/utils';
  import {useRouter} from 'vue-router';

  const { t } = useI18n();

  const columns = [
    {
      name: 'title',
      label: t('document.title'),
      align: 'left',
      field: 'title',
      sortable: true
    },
    {
      name: 'category',
      align: 'center',
      label: t('category.title'),
      field: 'category',
      sortable: true
    },
    {
      name: 'fileCount',
      align: 'center',
      label: t('document.fileCount'),
      field: 'fileCount',
      sortable: true
    },
    {
      name: 'sizes',
      align: 'center',
      label: t('document.size'),
      field: 'size',
      sortable: true
    },
    {
      name: 'price',
      label: t('document.price'),
      field: 'price',
      sortable: true
    },
    {
      name: 'id',
      label: 'Action',
      field: 'id',
      align: 'right',
    },
  ];

  type Data = {
    paymentCreate: Payment;
  }
  const note = ref<string>('');
  const proof = ref<File|null>(null);
  const MUTATION = gql`
    mutation PaymentCreate($input: CreatePaymentInput!, $proof: Upload!){
        paymentCreate(input: $input, proof: $proof) {
            ${PAYMENT_FIELDS}
        }
    }
  `;
  const { loading, mutate, onDone } = useMutation<Data, MutationPaymentCreateArgs>(MUTATION, {
    context: { hasUpload: true },
    update: (cache, { data }) => {
      if(data?.paymentCreate) {
        cache.modify({
          fields: {
            myPaymentsPaginate(existingRef: any, { toReference }) {
              return addPaginationCache(data.paymentCreate, existingRef, toReference);
            }
          }
        })
      }
    }
  });

  function submit() {
    void mutate({
      input: {
        note: note.value,
        documents: cart.value.map(d => ({ id: d.id, price: d.price }))
      },
      proof: proof.value,
    })
  }

  const { dialog } = useQuasar();
  const { push } = useRouter();

  onDone(({ data }) => {
    if(data?.paymentCreate) {
      dialog({
        title: t('payment.title'),
        message: t('payment.paymentSuccess'),
        html: true,
        ok: t('ok'),
      }).onDismiss(() => {
        localStorage.removeItem(CONSTANTS.cart);
        cart.value.length = 0;
        void push('/my-space/payment/list');
      });
    } else {
      dialog({
        title: t('payment.title'),
        message: t('unknownError'),
      });
    }
  });

  const { removeFromCart, cartAmount, cart } = useCart();

  function onRemove(id: string) {
    dialog({
      message: t('payment.removeRow'),
      ok: t('yes'),
      cancel: t('no')
    }).onOk(() => removeFromCart(id));
  }
</script>

<style scoped>

</style>
