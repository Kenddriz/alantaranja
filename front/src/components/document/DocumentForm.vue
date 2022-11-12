<template>
  <q-card flat>
    <q-form @submit.prevent="$emit('submit')">
      <q-card-section class="q-gutter-y-md">
        <slot name="title"></slot>

        <q-file
          :model-value="files"
          lazy-rules="ondemand"
          :rules="[(v) => validFile(v) || '']"
          @update:model-value="$emit('update:files', $event)"
          multiple
          clearable
          clear-icon="close"
          hide-bottom-space
          dense>
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>

        <q-field
          lazy-rules="ondemand"
          :rules="[() => familyId?.length || '']"
          stack-label
          hide-bottom-space
          label="Category">
          <template v-slot:prepend>
            <q-icon
              class="cursor-pointer"
              @click="categoryDialog = true" name="category" />
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">
              {{ categoryLabel }}
            </div>
          </template>
        </q-field>

        <q-input
          lazy-rules="ondemand"
          :rules="[(v) => v?.length || '']"
          hide-bottom-space
          :model-value="title"
          @update:model-value="$emit('update:title', $event)"
          dense
          label="Title" />

        <q-input
          v-if="showPrice"
          type="number"
          :model-value="price"
          @update:model-value="$emit('update:price', Number($event))"
          dense
          label="Price" />

        <q-input
          lazy-rules="ondemand"
          :rules="[(v) => v?.length || '']"
          hide-bottom-space
          :model-value="description"
          @update:model-value="$emit('update:description', $event)"
          type="textarea"
          dense
          outlined
          :label="$t('description')" />

        <q-checkbox
          color="amber"
          keep-color
          @update:model-value="$emit('update:hidden', $event)"
          :model-value="hidden"
          :label="$t('document.hidden')" />

      </q-card-section>
      <slot></slot>
    </q-form>

    <CategoryDialog v-model="categoryDialog">
      <q-tree
        :nodes="makeTree(families, null)"
        default-expand-all
        :selected="familyId"
        @update:selected="onSelect"
        node-key="key"
      />
    </CategoryDialog>
  </q-card>
</template>

<script lang="ts" setup>
  import CategoryDialog from 'components/CategoryDialog.vue';
  import {CONSTANTS, makeTree} from 'src/utils/utils';
  import {computed, ref} from 'vue';
  import {Family} from 'src/graphql/types';

  const props = defineProps<{
    files: File[],
    title: string;
    description: string;
    price: number;
    hidden: boolean;
    familyId: string,
    families: Family[],
    isUpdate?: boolean,
  }>();

  const emits = defineEmits([
    'update:familyId',
    'update:files',
    'update:title',
    'update:description',
    'update:price',
    'update:hidden',
    'submit',
  ]);

  const categoryDialog = ref(false);

  const categoryLabel = computed(() => props.families.find(f => f.id === props.familyId)?.category?.label);

  function onSelect(familyId: string) {
    emits('update:familyId', familyId);
    categoryDialog.value = false;
  }

  const showPrice = ['0', '1'].includes(String(localStorage.getItem(CONSTANTS.role)));

  function validFile(event: any[]) {
    if(props?.isUpdate) return true;
    return event?.length;
  }
</script>

<style scoped>

</style>
