<template>
  <q-dialog seamless ref="dialogRef">
    <MovableCard>
      <template v-slot:title>
        {{ $t('topic.update') }}
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
            icon-right="save"
            :label="$t('save')"
            color="primary" />
        </q-card-actions>
      </q-form>
    </MovableCard>
  </q-dialog>
</template>

<script lang="ts" setup>
  import {Notify, useDialogPluginComponent} from "quasar";
  import {ref} from "vue";
  import {gql} from "@apollo/client/core";
  import {useMutation} from "@vue/apollo-composable";
  import { MutationMessageUpdateArgs } from "src/graphql/types";
  import {useI18n} from "vue-i18n";
  import MovableCard from "components/MovableCard.vue";
  import MyEditor from "components/MyEditor.vue";

  const { dialogRef, onDialogHide } = useDialogPluginComponent();

  type Data = {
    messageUpdate: boolean;
  }

  const MUTATION = gql`
    mutation MessageUpdate($input: MessageUpdateInput!) {
      messageUpdate(input: $input)
    }
  `;

  const props = defineProps<{
    id: string,
    body: string,
  }>();

  const message = ref(props.body);

  const { loading, mutate, onDone } = useMutation<Data, MutationMessageUpdateArgs>(MUTATION);
  const { t } = useI18n();
  onDone(({ data }) => {
    if(data?.messageUpdate) {
      onDialogHide();
      Notify.create({
        color: 'positive',
        message: t('updateSuccess')
      });
    } else {
      Notify.create({
        color: 'positive',
        message: t('updateFailed')
      })
    }
  });

  function submit() {
    void mutate({ input: {
        body: message.value,
        id: props.id,
      }
    });
  }
</script>

<style scoped>

</style>
