<template>
  <q-card :style="`${mStyle};${currentPos}`">
    <q-card-actions
      v-touch-pan.prevent.mouse="move"
      align="between"
      class="bg-positive q-py-xs text-white">

      <slot class="text-body2" name="title"></slot>

      <q-btn round dense flat icon="close" v-close-popup>
        <q-tooltip>{{ $t("close") }}</q-tooltip>
      </q-btn>
    </q-card-actions>
    <q-card-section>
      <slot></slot>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
  import {movable} from 'src/utils/utils';

  withDefaults(defineProps<{
    mStyle?: string,
  }>(), { mStyle: 'width: 800px; max-width: 95vw' });

  const { currentPos, move } = movable();
</script>

<style scoped>

</style>
