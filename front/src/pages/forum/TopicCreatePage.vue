<template>
  <q-form @submit.prevent="submit" class="row flex justify-center">
    <q-card class="col-12 col-md-9" flat>
      <q-card-section class="text-h6">
        {{ $t('paths.createTopic') }}
      </q-card-section>
      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="input.title"
          :label="$t('topic.title')">
          <template v-slot:prepend>
            <q-icon name="topic" />
          </template>
        </q-input>

        <DocumentsSelect
          v-model="input.documentId"
          :label="$t('topic.document')" />

        <MyEditor v-model="input.body" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-banner class="bg-grey-3">
          {{ $t('topic.info') }}
          <template v-slot:action>
            <q-icon
              size="lg"
              name="info"
              color="positive" />
          </template>
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-none flex justify-between">
        <q-btn
          unelevated
          icon="arrow_back"
          :label="$t('back')"
          to="/forum" />

        <q-btn
          type="submit"
          color="primary"
          unelevated
          icon-right="post_add"
          :label="$t('submit')" />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script lang="ts" setup>
  import MyEditor from "components/MyEditor.vue";
  import { reactive } from "vue";
  import {MutationTopicCreateArgs, Topic} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {SUBJECT_FIELDS} from "src/graphql/topic/topic";
  import {useMutation} from "@vue/apollo-composable";
  import {addPaginationCache} from "src/utils/pagination";
  import {useQuasar} from "quasar";
  import {useI18n} from "vue-i18n";
  import DocumentsSelect from "components/document/DocumentsSelect.vue";

  const input = reactive({
    title: '',
    body: '',
    documentId: '',
  });

  type Data = {
    topicCreate: Topic;
  }

  const MUTATION = gql`
    mutation TopicCreate($input: TopicCreateInput!) {
        topicCreate(input: $input) {
            ${SUBJECT_FIELDS}
            body
        }
    }
  `;

  const { loading, mutate, onDone } = useMutation<Data, MutationTopicCreateArgs>(MUTATION, {
    update: (cache, { data }) => {
      if(data?.topicCreate) {
        cache.modify({
          fields: {
            topicsPaginate(existingRef: any, { toReference }) {
              return addPaginationCache(data.topicCreate, existingRef, toReference);
            }
          }
        })
      }
    }
  });

  const { notify } = useQuasar();
  const { t } = useI18n();

  onDone(({ data }) => {
    if(data?.topicCreate) {
      notify({
        color: 'positive',
        message: t('creationSuccess')
      });
    } else {
      notify({
        color: 'negative',
        message: t('creationFailed')
      });
    }
  });

  function submit() {
    void mutate({ input });
  }
</script>

<style scoped>

</style>
