<template>
  <BuyDocument :categories="categories">
    <template v-slot:filter>
      <q-btn
        @click="dialog = true"
        color="positive"
        icon="filter_alt"
        flat
        dense />
      <CategoryDialog v-model="dialog">
        <q-tree
          class="col-12 col-sm-6"
          :nodes="makeTree(families, null)"
          control-color="grey-6"
          node-key="key"
          tick-strategy="leaf"
          v-model:ticked="categories"
          default-expand-all
        />
      </CategoryDialog>
    </template>
    <span class="text-deep-orange">{{ cartAmount }} AR</span>
  </BuyDocument>
</template>

<script lang="ts" setup>
  import {useFamilies} from 'src/graphql/family/families';
  import {ref} from 'vue';
  import BuyDocument from '../../components/payment/BuyDocument.vue';
  import CategoryDialog from '../../components/CategoryDialog.vue';
  import {makeTree} from 'src/utils/utils';
  import {useCart} from "src/graphql/payment/cart";

  const { families, loading } = useFamilies();
  const dialog = ref(false);
  const categories = ref<string[]>([]);
  const filterCategories = ref<string>('');

  const { cartAmount } = useCart();
</script>

<style scoped>

</style>
