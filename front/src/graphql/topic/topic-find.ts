import {Message, QueryTopicGetArgs, Topic} from "src/graphql/types";
import {gql} from "@apollo/client/core";
import {SUBJECT_FIELDS} from "src/graphql/topic/topic";
import {useRoute} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import {computed, watch} from "vue";
import {defaultTopic, MESSAGE_FIELDS} from "src/graphql/topic/message";

export type TopicData = {
  topicGet: Topic;
  topicMessages: Message[],
}

export const TOPIC_QUERY = gql`
  query TopicGet($id: String!) {
    topicGet(id: $id) {
      ${SUBJECT_FIELDS}
      body
      user{id lastName firstName avatar}
    }
    topicMessages(topicId: $id) {
      ${MESSAGE_FIELDS}
    }
  }
`;

export const makeTree = (items: any[], messageId?: string | null): any[] => {
  return items
    .filter((item) => item.messageId == messageId)
    .map((item) => ({
      ...item,
      responses: makeTree(items, item.id),
    }));
};

export const useTopicFind = () => {
  const { params } = useRoute();
  const topicId = String(params['id']);
  const { loading, result } = useQuery<TopicData, QueryTopicGetArgs>(TOPIC_QUERY, {
    id: topicId,
  });

  const topic = computed(() => {
    const sub = result.value || {
      topicGet: defaultTopic,
      topicMessages: []
    };

    const statistics: number[] = [0, 0];
    const messages: Message[] = [];
    sub.topicMessages?.forEach(m => {
      if(!m.messageId) {
        if(m.body) statistics[0] += 1;
        else statistics[1] += 1;
      }
      if(m.body)messages.push(m);
    });

    return {
      get: {
        ...sub.topicGet,
        statistics,
      },
      messages: makeTree(messages, null),
    }
  });

  watch(() => result.value?.topicGet, val => {
    if(val) document.title = val.title;
  }, { immediate: true });

  function responses(messageId: string) {
    return result.value?.topicMessages?.filter(m => m.messageId === messageId);
  }

  return {
    topic,
    topicId,
    loading,
    responses,
  }
}
