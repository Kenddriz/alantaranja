<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard mStyle="width: 600px; max-width: 95vw">
      <template v-slot:title>
        {{ title }}
      </template>

      <q-card-section style="max-height: 60vh" class="scroll">

        <q-uploader
          flat
          hide-upload-btn
          text-color="primary"
          color="transparent"
          :label="$t('document.selectFiles')"
          multiple
          @added="files.unshift(...$event)"
          @removed="removeFile"
          class="fit" />

      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('cancel')"
          color="primary"
          v-close-popup />
        <q-btn
          flat
          :label="$t('add')"
          color="primary"
          @click="submit" />
      </q-card-actions>

      <q-inner-loading :showing="loading">
        <q-circular-progress
          show-value
          class="q-ma-md text-white"
          center-color="primary"
          size="10em"
          color="orange"
          font-size="12px"
          :value="progress"
          track-color="grey-3"
        >
          {{ progress }}%
        </q-circular-progress>
      </q-inner-loading>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts" setup>

  import {useDialogPluginComponent, useQuasar} from "quasar";
  import MovableCard from "components/MovableCard.vue";
  import {ref} from "vue";
  import {Document, MutationDocumentAddFilesArgs} from "src/graphql/types";
  import {gql} from "@apollo/client";
  import {useMutation} from "@vue/apollo-composable";
  import {useI18n} from "vue-i18n";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  const props = defineProps<{
    id: string,
    title: string
  }>();

  const files = ref<File[]>([]);

  function removeFile(event: File[]) {
    files.value = files.value.filter(f => f['__key'] !== event[0]['__key']);
  }

  const progress = ref<number>(0);

  type Data = {
    documentAddFiles: Document
  }

  const MUTATION = gql`
      mutation DocumentAddFiles($input: DocumentAddFilesInput!, $files: [Upload!]!) {
          documentAddFiles(input: $input, files: $files) {
              id
              files {
                size
                name
              }
          }
      }
    `;

  const { loading, mutate, onDone } = useMutation<Data, MutationDocumentAddFilesArgs>(MUTATION, {
    context: {
      hasUpload: true,
      fetchOptions: {
        onProgress: (prog: ProgressEvent) => {
          progress.value = Number((prog.loaded / prog.total * 100).toFixed(2));
        },
      },
    },
  });

  function submit() {
    void mutate({
      input: { id: props.id, sizes: files.value.map(file => file.size) },
      files: files.value
    });
  }

  const { notify } = useQuasar();

  const { t } = useI18n();

  onDone(({ data }) => {
    if(data?.documentAddFiles) {
      notify({
        color: 'positive',
        message: t('document.uploaded')
      });
      progress.value = 0;
      files.value.length = 0;
      onDialogHide();
    } else {
      notify({
        color: 'negative',
        message: t('unknownError')
      });
    }
  });

</script>

<style scoped>

</style>
