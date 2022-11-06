<template>
  <DocumentCreate
    :right="true"
    :showPrice="false"
    :families="families" />
</template>

<script lang="ts" setup>
  import {useFamilies} from "src/graphql/family/families";
  import DocumentCreate from "components/document/DocumentCreate.vue";

  const { families } = useFamilies();
</script>

<style scoped>

</style>
