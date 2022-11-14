<template>
  <q-dialog :maximized="maximized" ref="dialogRef">
    <q-card v-bind:style="{ 'width: 700px; max-width: 80vw;': !maximized }">
      <q-card-section class="text-subtitle1 flex justify-between items-center">
        {{ docs[selectedIndex.docIndex]?.title }}
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
          <template v-for="(doc, docIndex) in docs" :key="docIndex">
            <q-item
              clickable
              :key="fileIndex"
              :active="fileIndex + docIndex === selectedIndex.docIndex + selectedIndex.fileIndex"
              active-class="bg-primary text-white"
              @click="setSelected(docIndex, fileIndex)"
              v-for="(file, fileIndex) in doc.files">
              <q-item-section v-if="names = file.name.split('/')">
                <q-item-label lines="1">
                  {{ names[names.length -1] }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
          </template>
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
  import {computed, reactive, ref} from "vue";
  import {fileType} from "src/utils/file";

  const props = defineProps<{
    docs: Document[]
  }>();

  const { dialogRef } = useDialogPluginComponent();

  const selectedIndex = reactive({
    docIndex: 0,
    fileIndex: 0,
  });

  function setSelected(docIndex: number, fileIndex: number) {
    Object.assign(selectedIndex, { docIndex, fileIndex });
  }

  const url = computed(() => getImageV2(props.docs[selectedIndex.docIndex]?.files[selectedIndex.fileIndex]?.name?.replace('/', '')));

  const maximized = ref(true);

</script>

<style scoped>

</style>
