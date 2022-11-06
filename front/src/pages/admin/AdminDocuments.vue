<template>
  <q-page padding class="row q-col-gutter-md reverse-wrap">
    <div class="col-12 col-md-8">
      <CommonFilters
        v-model:limit="input.limit"
        v-model:filter="filter"
        @update:range="Object.assign(input, $event)"
        v-model:from="input.from"
        v-model:to="input.to">
        <q-btn
          @click="dialog = true"
          color="primary"
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
            v-model:ticked="ticked"
            default-expand-all
          />
        </CategoryDialog>
      </CommonFilters>
      <q-table
        class="q-mt-md"
        title="Documents List"
        :rows="doc.items"
        :columns="columns"
        :filter="filter"
        :loading="loading"
        row-key="id"
        flat>
        <template v-slot:top-right>
          <q-checkbox
            :model-value="false"
            :label="$t('document.hidden')" />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td class="text-right" :props="props">
            <q-btn
              dense
              color="primary"
              flat
              round
              icon="edit" />
            <q-btn
              dense
              color="deep-orange"
              flat
              round
              icon="delete" />
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="col-12 col-md-4">
      <DocumentCreate :families="families" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import DocumentCreate from 'components/document/DocumentCreate.vue';
  import {makeTree} from 'src/utils/utils';
  import {useFamilies} from 'src/graphql/family/families';
  import {useDocumentsPaginate} from 'src/graphql/document/documents-paginate';
  import {ref} from 'vue';
  import CommonFilters from 'components/CommonFilters.vue';
  import CategoryDialog from 'components/CategoryDialog.vue';

  const { families } = useFamilies();
  const dialog = ref(false);
  const ticked = ref([]);
  const filter = ref('');

  const {
    loading,
    input,
    doc,
    columns
  } = useDocumentsPaginate();

</script>

<style lang="scss" scoped>


</style>
