<template>
  <q-dialog
    seamless
    auto-close
    @update:model-value="$emit('update:modelValue', $event)"
    :model-value="modelValue">
    <q-card :style="`min-width: 300px;${currentPos}`">
      <q-bar v-touch-pan.prevent.mouse="move" class="bg-positive text-white">
        <q-icon name="filter_list" />
        <div>Toutes catégories</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>{{ $t("close") }}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-card-section>
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue';
import {movable} from 'src/utils/utils';

  defineProps<{
    modelValue: boolean;
  }>();

  const { currentPos, move } = movable();
</script>

<style scoped>

</style>
