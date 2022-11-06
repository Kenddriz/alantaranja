<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    use-input
    input-debounce="0"
    :options="options"
    @filter="filterFn"
    :loading="loading"
    emit-value
    map-options
    option-label="title"
    option-value="id"
    behavior="menu"
  >
    <template v-slot:prepend>
      <q-icon name="article" />
    </template>
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No results
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
  import {useQuery} from '@vue/apollo-composable';
  import {gql} from '@apollo/client/core';
  import {reactive, ref} from 'vue';
  import {QueryDocumentsSearchArgs, Document } from "src/graphql/types";

  defineProps<{ modelValue?: string }>();

  type Data = {
    documentsSearch: Document[]
  };
  const QUERY = gql`
    query DocumentSearch($input: SearchDocumentsInput!){
      documentsSearch(input: $input){
         id
         title
      }
    }
  `;
  const options = ref([]);
  const input = reactive({ title: '' });
  const { loading, result, onResult } = useQuery<Data, QueryDocumentsSearchArgs>(QUERY, { input }, { fetchPolicy: 'no-cache' });

  onResult(({ data }) => {
    options.value = data ? data?.usersSearch : [];
  });

  function filterFn (val: string, update: any) {
    if (val === '') {
      update(() => {
        if(!result.value?.documentsSearch) return;
        options.value = [...result.value?.documentsSearch]
      })
    }
    else {
      update(() => {
        const needle = val.toLowerCase()
        options.value = result.value?.usersSearch?.filter(v => v.name.toLowerCase().indexOf(needle) > -1);
      });
    }
    if(!options.value?.length) input.name = val;
  }

</script>

<style scoped>

</style>
