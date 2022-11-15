<template>
  <q-dialog ref="dialogRef">
    <q-card>
      <q-card-section class="text-h6">
        {{ title }}
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <span v-html="description" />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
         :label="$t('close')"
          color="primary"
          v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {useDialogPluginComponent} from "quasar";
  import {defineProps} from "vue";

  const { dialogRef } = useDialogPluginComponent();

  defineProps<{
    title: string,
    description: string;
  }>();

</script>

<style scoped>

</style>
