<template>
  <div style="min-height: 80vh" class="row">
    <DocumentCreate
      class="col-12 col-md-6"
      :right="true"
      :showPrice="false"
      :families="families" />
    <div class="col-12 col-md-6 column justify-center">
      <q-img src="/add_docs.svg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {useFamilies} from "src/graphql/family/families";
  import DocumentCreate from "components/document/DocumentCreate.vue";

  const { families } = useFamilies();
</script>

<style scoped>

</style>
