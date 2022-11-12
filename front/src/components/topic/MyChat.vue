<template>
  <template v-for="(mes, index) in messages" :key="index">
    <q-chat-message
      class="text-body2"
      :name="`<strong class='text-capitalize text-${mes.messageId ? 'primary' : 'positive'}'>
          ${getName(mes.user)}
        </strong>`"
      :text="[mes.body]"
      text-html
      name-html
      :sent="sent"
      bg-color="grey-2">
      <template v-slot:stamp>
        <q-card-actions class="q-pa-none" align="between">
          {{ mes.createdAt }}
          <div class="q-gutter-x-sm">
            <q-btn
              color="primary"
              size="sm"
              flat
              round
              @click="react(mes.id, 'like')"
              icon="thumb_up">
              <q-badge
                color="transparent"
                text-color="primary"
                floating
                :label="getReactionValue(mes.reactions, 'like')" />
            </q-btn>

            <q-btn
              @click="react(mes.id, 'dislike')"
              color="deep-orange"
              size="sm"
              flat
              round
              icon="thumb_down">
              <q-badge
                color="transparent"
                text-color="deep-orange"
                floating
                :label="getReactionValue(mes.reactions, 'dislike')" />
            </q-btn>

            <q-btn
              @click="reply($t('topic.replyTo', { name: getName(mes.user) }) , mes.id)"
              color="primary"
              size="sm"
              flat
              round
              icon="reply" />

            <q-btn
              v-if="userId === mes.user.id"
              size="sm"
              flat
              round
              color="primary"
              icon="more_vert">
              <q-menu
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <q-list style="min-width: 100px">
                  <q-item @click="$emit('remove', mes.id)" clickable>
                    <q-item-section avatar>
                      <q-icon color="negative" name="delete_forever" />
                    </q-item-section>
                    <q-item-section>{{ $t('delete') }}</q-item-section>
                  </q-item>

                  <q-item @click="update(mes.id, mes.body)" clickable>
                    <q-item-section avatar>
                      <q-icon color="positive" name="edit" />
                    </q-item-section>
                    <q-item-section>{{ $t('edit') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-actions>
      </template>
      <template v-slot:avatar>
        <router-link :to="mes.user.id === userId ? profileLink : '' ">
          <img
            class="q-message-avatar q-message-avatar--sent"
            :src="getImage(mes.user.avatar)||'/add_files.svg'"
          >
        </router-link>
      </template>
    </q-chat-message>
    <!--Responses-->
    <MyChat
      :sent="!sent"
      @reply="reply"
      @react="react"
      @update="update"
      @remove="$emit('remove', $event)"
      :messages="mes.responses" />
  </template>
</template>

<script lang="ts" setup>
import {Message, MessageReaction} from "src/graphql/types";
import {CONSTANTS, getImage, getName} from "src/utils/utils";

  withDefaults(defineProps<{
    messages: Message[],
    sent?: boolean,
  }>(), { sent: false });

  const emits = defineEmits(['reply', 'react', 'remove', 'update']);

  function reply(title: string, id:string) {
    emits('reply', title, id);
  }

function update(title: string, id:string) {
  emits('update', title, id);
}

  function react(messageId:string, label: string) {
    emits('react', messageId, label);
  }

  function getReactionValue(reactions: MessageReaction[], label: string) {
    return reactions.find(re => re.label === label)?.value || 0;
  }

  const userId = Number(localStorage.getItem(CONSTANTS.userId));

  const profileLink = CONSTANTS.baseRoutes[Number(localStorage.getItem(CONSTANTS.role))] + '/profile';

</script>

<style scoped>

</style>
