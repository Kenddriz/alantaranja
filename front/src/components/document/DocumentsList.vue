<template>
  <CommonFilters
    v-model:limit="input.limit"
    v-model:filter="filter"
    @update:range="Object.assign(input, $event)"
    v-model:from="input.from"
    v-model:to="input.to">
    <q-btn
      @click="categoryDialog = true"
      color="primary"
      icon="filter_alt"
      flat
      dense />
    <CategoryDialog v-model="categoryDialog">
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
    :loading="loading || loadingRemove"
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
          @click="playDocument(props.row)"
          dense
          color="primary"
          flat
          round
          icon="play_arrow" />

        <q-btn
          @click="remove(props.row.id)"
          dense
          color="deep-orange"
          flat
          round
          icon="delete" />
      </q-td>
    </template>
  </q-table>
</template>

<script lang="ts" setup>
  import {defineAsyncComponent, ref} from "vue";
  import {useDocumentsPaginate} from "src/graphql/document/documents-paginate";
  import {Family, Document} from "src/graphql/types";
  import CommonFilters from "../CommonFilters.vue";
  import CategoryDialog from "../CategoryDialog.vue";
  import {makeTree} from "src/utils/utils";
  import {useQuasar} from "quasar";
  import {useDocumentRemove} from "src/graphql/document/document-remove";

  defineProps<{
    families: Family[],
  }>();

  const categoryDialog = ref(false);
  const ticked = ref([]);
  const filter = ref('');

  const {
    loading,
    input,
    doc,
    columns
  } = useDocumentsPaginate();

  const { dialog } = useQuasar();

  function playDocument(doc: Document) {
    dialog({
      component: defineAsyncComponent(() => import("components/document/DocumentDetails.vue")),
      componentProps: { doc },
    })
  }

  const { remove, loadingRemove } = useDocumentRemove();
</script>

<style scoped>

</style>
