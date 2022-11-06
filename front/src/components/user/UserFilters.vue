<template>
  <CommonFilters v-model:range="range">
    <q-btn
      @click="dialog = true"
      color="positive"
      icon="filter_alt"
      flat
      dense />
    <q-dialog
      seamless
      auto-close
      full-height
      v-model="dialog">
      <q-card style="min-width: 300px">
        <q-bar class="bg-positive text-white">
          <q-icon name="filter_list" />
          <div>Toutes catégories</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section>
          <q-tree class="col-12 col-sm-6"
                  :nodes="tree"
                  control-color="grey-6"
                  node-key="key"
                  tick-strategy="leaf"
                  v-model:ticked="ticked"
                  default-expand-all
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </CommonFilters>

</template>

<script lang="ts" setup>
import {computed, ref} from 'vue';
import {useFamilies} from 'src/graphql/family/families';
import { makeTree } from 'src/utils/utils';
import CommonFilters from 'components/CommonFilters.vue';

const range = ref({ from: '2020/07/08', to: '2020/07/17' });

const dialog = ref(false);
const { loading, families } = useFamilies();

const tree = computed(() => makeTree(families.value, null));

const ticked = ref([]);
</script>

<style scoped>

</style>
