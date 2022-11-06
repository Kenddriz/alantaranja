<template>
  <q-page padding class="row q-col-gutter-md reverse-wrap">
    <div class="col-12 col-md-8">
      <DocumentsList :families="families" />
    </div>
    <div class="col-12 col-md-4">
      <DocumentCreate :families="families" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
  import DocumentCreate from 'components/document/DocumentCreate.vue';
  import DocumentsList from "components/document/DocumentsList.vue";
  import {useFamilies} from 'src/graphql/family/families';

  const { families } = useFamilies();


</script>

<style lang="scss" scoped>


</style>
