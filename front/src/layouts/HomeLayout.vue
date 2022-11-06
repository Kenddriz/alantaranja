<template>
  <q-layout view="hHh LpR fff">

    <q-header class="bg-white text-dark">
      <q-toolbar>
        <q-avatar color="grey">
          <q-btn
            to="/"
            color="white"
            flat
            round
            dense
            icon="whatshot" />
        </q-avatar>
        <span class="q-ml-md">ALANTARANJA</span>
        <q-space />

        <slot v-if="$slots.middle" name="middle"></slot>
        <div v-else class="text-primary q-gutter-sm flex items-center">
          <q-icon name="phone" />
          <span>+261 34 18 536 57</span>
        </div>

        <template v-if="$slots.button">
          <q-space />

          <slot name="button"></slot>
        </template>

      </q-toolbar>
    </q-header>

    <slot></slot>

    <AppFooter>
      <q-item dense class="text-primary">
        <q-item-section avatar>
          <q-icon name="email" />
        </q-item-section>
        <q-item-section>
          alantaranja@gmail.com
        </q-item-section>
      </q-item>
    </AppFooter>

  </q-layout>
</template>

<script lang="ts" setup>
import AppFooter from 'layouts/AppFooter.vue';
</script>

<style scoped>

</style>
