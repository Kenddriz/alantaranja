<template>
  <q-card flat>

    <q-card-section class="q-col-gutter-md row q-pt-none">
      <q-select
        :model-value="limit"
        @update:model-value="$emit('update:limit', $event)"
        class="col-12 col-md-4"
        dense
        prefix="Number of rows : "
        :options="[15, 50, 100, 250, 100]">
        <template v-slot:before>
          <slot></slot>
        </template>
      </q-select>

      <q-input
        :model-value="filter"
        @update:model-value="$emit('update:filter', $event)"
        dense
        outlined
        class="col-12 col-md-4"
        label="Search" />

      <q-input
        dense
        readonly
        class="col-12 col-md-4 text-center"
        :model-value="`${$t(label)} : ${range.from||'-'} ${$t('to')} ${range.to||'-'}`">
        <template v-slot:append>
          <q-icon color="primary" name="event" class="cursor-pointer">
            <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
              <q-date
                v-model="range"
                @update:model-value="onCloseDate($event)"
                range>
                <div class="row items-center justify-end">
                  <q-btn
                    color="primary"
                    flat
                    v-close-popup
                    :label="$t('ok')" />
                  <q-btn
                    v-close-popup
                    :label="$t('clear')"
                    @click="onCloseDate()"
                    color="deep-orange"
                    flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
  import {ref} from 'vue';

  withDefaults(defineProps<{
    limit: number;
    filter?: string;
    from: string;
    to: string;
    label?: string;
  }>(), { label: 'date' });

  const emits = defineEmits([
    'update:range',
    'update:limit',
    'update:filter',
    'update:from',
    'update:to'
  ]);
  const defaultRange = { from: '', to: '' };
  const range = ref({ ...defaultRange });
  function onCloseDate(val = defaultRange) {
    Object.assign(range.value, val);
    emits('update:from', val.from);
    emits('update:to', val.to);
  }
</script>

<style scoped>

</style>
