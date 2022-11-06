<template>
  <DocumentForm
    @submit="submit"
    v-model:title="input.title"
    v-model:description="input.description"
    v-model:price="input.price"
    v-model:hidden="input.hidden"
    v-model:familyId="input.familyId"
    :families="families"
    v-model:files="files">
    <template v-slot:title>
      <q-card-section class="q-py-none flex items-center justify-between">
        New document
        <q-icon class="q-ml-md" size="sm" name="file_present" />
      </q-card-section>
    </template>
    <q-card-actions
      :align="right ? 'right': ''"
      class="q-px-md q-pb-md">
      <q-btn
        type="submit"
        rounded
        :class="right ? '' : 'full-width'"
        :loading="loading"
        label="Upload"
        unelevated
        color="primary"
        icon="upload_file" />
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
</template>

<script lang="ts" setup>
  import DocumentForm from './DocumentForm.vue';
  import {reactive, ref} from 'vue';
  import {Document, DocumentCreateInput, Family, MutationDocumentCreateArgs} from 'src/graphql/types';
  import {gql} from '@apollo/client';
  import {DOCUMENT_FIELDS} from 'src/graphql/document/document';
  import {useMutation} from '@vue/apollo-composable';
  import {addPaginationCache} from 'src/utils/pagination';
  import {useI18n} from 'vue-i18n';
  import {useQuasar} from 'quasar';

  withDefaults(defineProps<{
    right?: boolean,
    families: Family[]
  }>(), { right: false });

  const { t } = useI18n();

  const files = ref<File[]>([]);

  const progress = ref<number>(0);

  const defaultInput = {
    title: '',
    description: '',
    price: 0,
    hidden: false,
    sizes: [],
    familyId: '',
  }

  const input = reactive<DocumentCreateInput>({ ...defaultInput });

  type Data = {
    documentCreate: Document
  }

  const MUTATION = gql`
    mutation DocumentCreate($input: DocumentCreateInput!, $files: [Upload!]!) {
        documentCreate(input: $input, files: $files) {
            ${DOCUMENT_FIELDS}
        }
    }
  `;

  const { loading, mutate, onDone } = useMutation<Data, MutationDocumentCreateArgs>(MUTATION, {
    context: {
      hasUpload: true,
      fetchOptions: {
        onProgress: (prog: ProgressEvent) => {
          progress.value = Number((prog.loaded / prog.total * 100).toFixed(2));
        },
      },
    },
    update: (cache, { data }) => {
      if(data?.documentCreate) {
        cache.modify({
          fields: {
            documentsPaginate(existingRef: any, { toReference }) {
              return addPaginationCache(data.documentCreate, existingRef, toReference);
            }
          }
        })
      }
    }
  });

  function submit() {
    input.sizes = files.value.map(file => file.size);
    void mutate({ input, files: files.value });
  }

  const { notify } = useQuasar();

  onDone(({ data }) => {
    if(data?.documentCreate) {
      notify({
        color: 'positive',
        message: t('document.uploaded')
      });
      progress.value = 0;
      Object.assign(input, defaultInput);
      files.value.length = 0;
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
