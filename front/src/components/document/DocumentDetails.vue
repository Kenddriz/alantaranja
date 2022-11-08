<template>
  <q-dialog :maximized="maximized" ref="dialogRef">
    <q-card v-bind:style="{ 'width: 700px; max-width: 80vw;': !maximized }">
      <q-card-section class="text-subtitle1 flex justify-between items-center">
        {{ doc.title }}
        <q-btn
          @click="maximized = !maximized"
          :icon="maximized ? 'fullscreen_exit' : 'fullscreen'"
          round
          flat />
      </q-card-section>

      <q-separator />

      <q-card-section class="row">

        <q-list class="col-12 col-md-2">
          <q-item-label header>Fichiers</q-item-label>
          <q-item
            clickable
            :key="index"
            :active="index === selectedIndex"
            active-class="bg-primary text-white"
            @click="selectedIndex = index"
            v-for="(file, index) in doc.files">
            <q-item-section v-if="names = file.name.split('/')">
              <q-item-label lines="1">
                {{ names[names.length -1] }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="col-12 col-md-10 q-pa-xs">
          <template v-if="type = fileType(url)">
            <video
              v-if="type === 'video'"
              style="max-height: 75vh; outline: unset!important;"
              controls
              class="fit"
              :src="url" />
          </template>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <!--<q-btn flat :label="$t('download')" color="primary" v-close-popup />-->
        <q-btn
          flat
          :label="$t('close')"
          color="deep-orange"
          v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {useDialogPluginComponent} from "quasar";
  import { Document } from "src/graphql/types";
  import { getImageV2 } from "src/utils/utils";
  import {computed, ref} from "vue";
  import {fileType} from "src/utils/file";

  const props = defineProps<{
    doc: Document
  }>();

  const { dialogRef } = useDialogPluginComponent();

  const selectedIndex = ref(0);

  const url = computed(() => getImageV2(props.doc.files[selectedIndex.value].name.replace('/', '')));

  const maximized = ref(true);

</script>

<style scoped>

</style>
