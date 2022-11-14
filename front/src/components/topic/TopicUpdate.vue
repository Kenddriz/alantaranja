<template>
  <q-dialog ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        {{ $t('topic.update') }}
      </template>
      <q-form
        autocorrect="off"
        autocomplete="off"
        spellcheck="false"
        @submit.prevent="submit">

        <q-card-section class="q-gutter-y-md">
          <q-input
            lazy-rules="ondemand"
            :rules="[v => v?.length || '']"
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
          <q-banner class="">
            {{ $t('topic.info') }}
            <template v-slot:action>
              <q-icon
                size="lg"
                name="info"
                color="amber" />
            </template>
          </q-banner>
        </q-card-section>

        <q-card-actions align="right" class="q-pt-none q-pr-md">
          <q-btn
            type="submit"
            color="primary"
            outline
            icon-right="post_add"
            :label="$t('submit')" />
        </q-card-actions>
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts" setup>
  import MyEditor from "components/MyEditor.vue";
  import {reactive, ref} from "vue";
  import {MutationTopicUpdateArgs, Topic, TopicUpdateInput} from "src/graphql/types";
  import {gql} from "@apollo/client/core";
  import {SUBJECT_FIELDS} from "src/graphql/topic/topic";
  import {useMutation} from "@vue/apollo-composable";
  import {useDialogPluginComponent, useQuasar} from "quasar";
  import {useI18n} from "vue-i18n";
  import DocumentsSelect from "components/document/DocumentsSelect.vue";
  import MovableCard from "components/MovableCard.vue";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  const props = defineProps<{ topic: Topic }>();

  const input = reactive<TopicUpdateInput>({
    title: props.topic.title,
    body: props.topic.body,
    documentId: props.topic.documentId,
    id: props.topic.id
  });

  type Data = {
    topicUpdate: Topic;
  }

  const MUTATION = gql`
    mutation TopicCreate($input: TopicUpdateInput!) {
        topicUpdate(input: $input) {
            ${SUBJECT_FIELDS}
            body
        }
    }
  `;

  const { loading, mutate, onDone } = useMutation<Data, MutationTopicUpdateArgs>(MUTATION);

  const { notify } = useQuasar();
  const { t } = useI18n();

  onDone(({ data }) => {
    if(data?.topicUpdate) {
      notify({
        color: 'positive',
        message: t('updateSuccess')
      });
      onDialogHide();
    } else {
      notify({
        color: 'negative',
        message: t('updateFailed')
      });
    }
  });

  function submit() {
    if(!input.body) {
      notify({
        color: 'negative',
        message: t('topic.missingBody')
      });
      return ;
    }
    void mutate({ input });
  }
</script>

<style scoped>

</style>
