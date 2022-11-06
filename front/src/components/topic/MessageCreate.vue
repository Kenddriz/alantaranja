<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        {{ title }}
      </template>
      <q-form
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        @submit.prevent="submit">
        <MyEditor v-model="message" />

        <q-card-actions align="right">
          <q-btn
            :loading="loading"
            :disable="!message.length"
            type="submit"
            icon-right="post_add"
            :label="$t('topic.post')"
            color="primary" />
        </q-card-actions>
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {Notify, useDialogPluginComponent} from "quasar";
  import MyEditor from "components/MyEditor.vue";
  import MovableCard from "components/MovableCard.vue";
  import {ref} from "vue";
  import {gql} from "@apollo/client/core";
  import {useMutation} from "@vue/apollo-composable";
  import { MutationMessageCreateArgs } from "src/graphql/types";
  import {useI18n} from "vue-i18n";
  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  type Data = {
    messageCreate: boolean;
  }

  const MUTATION = gql`
    mutation MessageCreate($input: MessageCreateInput!) {
      messageCreate(input: $input)
    }
  `;

  const props = defineProps<{
    topicId: string,
    title: string,
    messageId?: string,
  }>();

  const message = ref('');

  const { loading, mutate, onDone } = useMutation<Data, MutationMessageCreateArgs>(MUTATION);
  const { t } = useI18n();
  onDone(({ data }) => {
    if(data?.messageCreate) {
      onDialogHide();
      Notify.create({
        color: 'positive',
        message: t('creationSuccess')
      });
    } else {
      Notify.create({
        color: 'positive',
        message: t('creationFailed')
      })
    }
  });

  function submit() {
    void mutate({ input: {
        body: message.value,
        messageId: props.messageId,
        topicId: props.topicId,
      }
    });
  }
</script>

<style scoped>

</style>
