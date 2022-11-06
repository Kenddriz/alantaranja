<template>
  <DocumentsList :families="families" />
</template>

<script lang="ts" setup>
  import {useFamilies} from "src/graphql/family/families";
  import DocumentsList from "components/document/DocumentsList.vue";

  const { families } = useFamilies();
</script>

<style scoped>

</style>
