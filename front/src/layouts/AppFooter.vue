<template>
  <q-footer class="bg-white text-dark">
    <q-toolbar>
      <slot v-if="$slots.default"></slot>

      <q-toolbar-title v-else style="font-size: 12px" class="text-bold">
        <q-avatar color="grey">
          <q-btn flat round dense icon="whatshot" />
        </q-avatar>
        ALANTARANJA
      </q-toolbar-title>

      <q-space />
      <q-item-label caption>
        @copyright 2022
      </q-item-label>
    </q-toolbar>
  </q-footer>
</template>

<script lang="ts" setup>
</script>

<style scoped>

</style>
