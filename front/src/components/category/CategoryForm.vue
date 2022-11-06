<template>
  <q-card flat class="q-pa-md">
    <q-form @submit.prevent="$emit('save')" class="row q-col-gutter-md">
      <slot></slot>
      <div class="col-12" v-bind:class="{ 'col-md-3': !isUpdate }">
        <q-input
          :model-value="label"
          @update:model-value="$emit('update:label', $event)"
          dense
          label="Label"/>
      </div>

      <div class="col-12" v-bind:class="{ 'col-md-3': !isUpdate }">
        <q-select
          dense
          label="Parent"
          :model-value="parentId"
          @update:model-value="$emit('update:parentId', $event)"
          use-input
          emit-value
          option-value="id"
          map-options
          fill-input
          hide-selected
          :options="options"
          @filter="filterFn"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No results
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <div class="col-12" v-bind:class="{ 'col-md-4': !isUpdate }">
        <q-input
          autogrow
          :model-value="description"
          @update:model-value="$emit('update:description', $event)"
          dense
          label="Description"/>
      </div>

      <div class="col-12" v-bind:class="{ 'col-md-2': !isUpdate }">
        <slot name="button"></slot>
      </div>

    </q-form>
  </q-card>
</template>

<script lang="ts" setup>
  import {ref } from 'vue';
  import {Category} from 'src/graphql/types';

  const props = defineProps<{
    categories: Category[],
    label: string,
    description: string,
    parentId?: string,
    isUpdate?: boolean,
  }>();

  const options = ref<Category[]>([...props.categories]);

  function filterFn (val: any, update: any) {
    update(() => {
      const needle = val.toLocaleLowerCase()
      options.value = props.categories.filter(v => v.label.toLocaleLowerCase().indexOf(needle) > -1);
    })
  }
</script>

<style scoped>

</style>
