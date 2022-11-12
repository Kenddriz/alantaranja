<template>
  <CommonFilters
    v-model:to="input.to"
    v-model:from="input.from"
    v-model:limit="input.limit"
    v-model:filter="input.keyword"
    class="q-mt-md">
    <slot name="filter"></slot>
  </CommonFilters>
  <q-table
    class="q-mt-md"
    :title="$t('paths.document')"
    :rows="doc.items"
    :columns="columns"
    :loading="loadingDocs"
    row-key="id"
    flat>
    <template v-slot:top-right>
      <slot></slot>
    </template>
    <template v-slot:body-cell-action="props">
      <q-td class="text-right" :props="props">
        <!--remove_shopping_cart-->
        <q-btn
          v-if="inCart(props.row.id)"
          @click="removeFromCart(props.row.id)"
          icon="remove_shopping_cart"
          color="deep-orange"
          flat />
        <q-btn
          v-else
          @click="addToCart(props.row)"
          icon="add_shopping_cart"
          color="primary"
          flat />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import {useDocumentsPaginate} from 'src/graphql/document/documents-paginate';
  import {useCart} from 'src/graphql/payment/cart';
  import CommonFilters from '../CommonFilters.vue';
  import { watch } from 'vue';

  const props = defineProps<{
    categories: string[]
  }>();

  const {
    loading: loadingDocs,
    input,
    doc,
    columns
  } = useDocumentsPaginate();

  watch(() => props.categories, val => {
    input.categories = val;
  });

  columns.splice(6, 2);

  const { addToCart, inCart, removeFromCart } = useCart();
</script>

<style scoped>

</style>
