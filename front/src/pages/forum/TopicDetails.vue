<template>
  <q-card v-if="topic.get.user" flat>
    <q-card-actions class="q-pa-md" align="between">
      <q-btn
        no-caps
        color="primary"
        dense
        flat
        label="details"
        icon="read_more">
        <q-popup-proxy
          transition-show="flip-up"
          transition-hide="flip-down">
          <q-banner>
            <div class="q-py-sm text-subtitle1">
              <mark class="q-px-md">«{{ topic.get.document.title }}»</mark>
            </div>
            <span v-html="topic.get.body" />

            <template v-if="userId === topic.get.user.id" v-slot:action>
              <q-btn
                @click="updateTopic"
                flat
                dense
                round
                color="primary"
                icon="edit" />
              <q-btn
                @click="removeTopic(topic.get.id)"
                flat
                dense
                round
                color="deep-orange"
                icon="delete_forever" />
            </template>
          </q-banner>
        </q-popup-proxy>
      </q-btn>

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

        <q-btn
          flat
          @click="reply(topic.get.title)"
          color="primary"
          icon="reply"
          :label="$t('topic.reply')" />
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

    <q-card-actions align="right" class="q-pa-md">
      <q-btn
        flat
        color="primary"
        @click="reply(topic.get.title)"
        icon="reply"
        :label="$t('topic.reply')" />
    </q-card-actions>
  </q-card>

  <q-inner-loading :showing="loading || rLoading || loadingTopicRemove">
    <q-spinner color="amber" size="10em" />
  </q-inner-loading>
</template>

<script lang="ts" setup>
  import { defineAsyncComponent } from "vue";
  import { useQuasar } from "quasar";
  import {CONSTANTS, getImageV2, getName} from "src/utils/utils";
  import { useTopicFind } from "src/graphql/topic/topic-find";
  import MyChat from "components/topic/MyChat.vue";
  import {useMessageEvent} from "src/graphql/topic/message-event";
  import {useReactMessage} from "src/graphql/topic/react-message";
  import {useMessageRemove} from "src/graphql/topic/message-remove";
  import TopicUpdate from "components/topic/TopicUpdate.vue";
  import {useTopicRemove} from "src/graphql/topic/topic-remove";

  const { loading, topic, topicId, responses } = useTopicFind();

  const { dialog } = useQuasar();

  function reply(title: string, messageId = null) {
    dialog({
      component: defineAsyncComponent(() => import('components/topic/MessageCreate.vue')),
      componentProps: {
        topicId: topicId.value,
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
  function updateTopic() {
    if(userId !== topic.value.get.user.id) return;
    dialog({
      component: defineAsyncComponent(() => import('components/topic/TopicUpdate.vue')),
      componentProps: { topic: topic.value.get }
    })
  }

  //subscription
  useMessageEvent();

  const { react } = useReactMessage();
  const { loading:rLoading, remove } = useMessageRemove();

  const userId = Number(localStorage.getItem(CONSTANTS.userId));

  const {
    loadingTopicRemove,
    removeTopic
  } = useTopicRemove();

</script>

<style lang="scss" scoped>
  ::v-deep(.q-message-text-content) {
    line-height: 1.6;
  }
</style>
