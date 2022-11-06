<template>
  <q-inner-loading :showing="loading || rLoading">
    <q-spinner color="amber" size="10em" />
  </q-inner-loading>
  <q-card v-if="topic.get.user" flat>
    <q-list bordered>
      <q-expansion-item header-class="q-pa-md" :model-value="!topic.messages.length">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar
              color="primary"
              text-color="white">
              <q-img
                v-if="topic.get.user.avatar"
                :src="getImageV2(topic.get.user.avatar)" />
              <q-icon v-else name="person" color="white" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ topic.get.title }}</q-item-label>
            <q-item-label caption>
              {{getName(topic.get.user)}}
            </q-item-label>
          </q-item-section>
        </template>

        <q-card-section>
          <span v-html="topic.get.body"></span>
        </q-card-section>
      </q-expansion-item>
    </q-list>

    <q-card-actions class="q-pa-md" align="between">
      <q-btn
        flat
        @click="reply(topic.get.title)"
        color="primary"
        icon="reply"
        :label="$t('topic.reply')" />

      <div class="q-gutter-x-md">
        <q-btn
          color="positive"
          no-caps
          dense
          flat
          :label="$t('topic.responses', { count: topic.get.statistics[0] })"
          icon="comment" />

        <q-btn
          no-caps
          dense
          flat
          :label="$t('topic.views', { count: topic.get.statistics[1] })"
          icon="visibility" />
      </div>
    </q-card-actions>

    <q-card-section>
      <MyChat
        @react="react"
        @reply="reply"
        @update="update"
        @remove="remove"
        :messages="topic.messages" />
    </q-card-section>

    <q-card-actions align="between" class="q-pa-md">
      <q-btn
        flat
        color="primary"
        to="/forum/"
        icon="arrow_back"
        :label="$t('back')" />

      <q-btn
        unelevated
        color="primary"
        @click="reply(topic.get.title)"
        icon="reply"
        :label="$t('topic.reply')" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
  import { defineAsyncComponent } from "vue";
  import { useQuasar } from "quasar";
  import { getImageV2, getName } from "src/utils/utils";
  import { useTopicFind } from "src/graphql/topic/topic-find";
  import MyChat from "components/topic/MyChat.vue";
  import {useMessageEvent} from "src/graphql/topic/message-event";
  import {useReactMessage} from "src/graphql/topic/react-message";
  import {useMessageRemove} from "src/graphql/topic/message-remove";

  const { loading, topic, topicId, responses } = useTopicFind();

  const { dialog } = useQuasar();

  function reply(title: string, messageId = null) {
    dialog({
      component: defineAsyncComponent(() => import('components/topic/MessageCreate.vue')),
      componentProps: {
        topicId,
        title,
        messageId,
      }
    })
  }

  function update(id: string, body: string) {
    dialog({
      component: defineAsyncComponent(() => import('components/topic/MessageUpdate.vue')),
      componentProps: {
        id,
        body,
      }
    })
  }

  //subscription
  useMessageEvent();

  const { react } = useReactMessage();
  const { loading:rLoading, remove } = useMessageRemove();

</script>

<style lang="scss" scoped>
  ::v-deep(.q-message-text-content) {
    line-height: 1.6;
  }
</style>
