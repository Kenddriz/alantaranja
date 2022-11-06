<template>
  <q-dialog
    ref="dialogRef"
    full-width
    full-height
  >
    <q-card class="no-border-radius">
      <q-img style="max-height: 100%" contain :src="getImageV2(url)">
        <div class="absolute-top-right transparent">
          <q-btn
            color="red"
            dense
            icon="close"
            v-close-popup />
        </div>
      </q-img>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
  import {useDialogPluginComponent} from 'quasar';
  import {defineProps} from 'vue';
  import {getImageV2} from 'src/utils/utils';

  const { dialogRef } = useDialogPluginComponent();

  const props = defineProps<{ url: string }>();
</script>

<style scoped>

</style>
