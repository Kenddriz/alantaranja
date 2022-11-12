<template>
  <q-dialog ref="dialogRef">
    <DocumentForm
      style="width: 700px; max-width: 90vw;"
      @submit="submit"
      v-model:title="input.title"
      v-model:description="input.description"
      v-model:price="input.price"
      v-model:hidden="input.hidden"
      v-model:familyId="input.familyId"
      :families="families"
      :isUpdate="true"
      v-model:files="files">
      <template v-slot:title>
        <q-card-section class="q-py-none flex items-center justify-between">
          Update document
          <q-btn
            v-close-popup
            unelevated
            color="deep-orange"
            icon="close"
            round
            dense />
        </q-card-section>
      </template>
      <q-card-actions
        align="right"
        class="q-px-md q-pb-md">
        <q-btn
          v-close-popup
          :label="$t('cancel')"
          unelevated
          color="deep-orange"
          icon="save" />

        <q-btn
          type="submit"
          :loading="loading"
          :label="$t('save')"
          unelevated
          color="primary"
          icon="save" />
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
    </DocumentForm>
  </q-dialog>
</template>

<script lang="ts" setup>
  import DocumentForm from './DocumentForm.vue';
  import {reactive, ref} from 'vue';
  import {
    Document,
    DocumentUpdateInput,
    Family,
    MutationDocumentUpdateArgs
  } from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {DOCUMENT_FIELDS} from 'src/graphql/document/document';
  import {useMutation} from '@vue/apollo-composable';
  import {useI18n} from 'vue-i18n';
  import {useDialogPluginComponent, useQuasar} from 'quasar';

  const { dialogRef, onDialogCancel } = useDialogPluginComponent();

  const props = defineProps<{
    families: Family[],
    doc: Document,
  }>();

  const { t } = useI18n();

  const files = ref<File[]>([]);

  const progress = ref<number>(0);

  const input = reactive<DocumentUpdateInput>({
    id: props.doc.id,
    title: props.doc.title,
    description: props.doc.description,
    price: props.doc.price,
    hidden: props.doc.hidden,
    sizes: [],
    familyId: props.doc.family?.id,
  });

  type Data = {
    documentUpdate: Document
  }

  const MUTATION = gql`
    mutation DocumentUpdate($input: DocumentUpdateInput!, $files: [Upload!]!) {
        documentUpdate(input: $input, files: $files) {
            ${DOCUMENT_FIELDS}
        }
    }
  `;

  const { loading, mutate, onDone } = useMutation<Data, MutationDocumentUpdateArgs>(MUTATION, {
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
    input.sizes = files.value.map(file => file.size);
    void mutate({ input, files: files.value });
  }

  const { notify } = useQuasar();

  onDone(({ data }) => {
    if(data?.documentUpdate) {
      notify({
        color: 'positive',
        message: t('document.uploaded')
      });
      progress.value = 0;
      files.value.length = 0;
      onDialogCancel();
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
