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
        v-model:ticked="input.categories"
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
        v-model="hiddenOnly"
        :model-value="hiddenOnly"
        @update:model-value="onCheckHidden"
        :label="$t('document.hidden')" />
    </template>
    <template v-slot:body-cell-action="props">
      <q-td class="text-right" :props="props">
        <q-btn
          size="sm"
          color="primary"
          flat
          round
          icon="post_add" />

        <q-btn
          @click="updateDocument(props.row)"
          size="sm"
          color="primary"
          flat
          round
          icon="edit" />

        <q-btn
          @click="playDocument(props.row)"
          size="sm"
          color="primary"
          flat
          round
          icon="play_arrow" />

        <q-btn
          @click="remove(props.row.id)"
          size="sm"
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

  const props = defineProps<{
    families: Family[],
  }>();

  const categoryDialog = ref(false);
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
      componentProps: { docs: [doc] },
    })
  }

  function updateDocument(doc: Document) {
    dialog({
      component: defineAsyncComponent(() => import("components/document/DocumentUpdate.vue")),
      componentProps: { doc, families: props.families },
    })
  }

  const { remove, loadingRemove } = useDocumentRemove();

  const hiddenOnly = ref(false);

  function onCheckHidden(check: boolean) {
    input.hidden = check ? [true] : [true, false];
  }
</script>

<style scoped>

</style>
