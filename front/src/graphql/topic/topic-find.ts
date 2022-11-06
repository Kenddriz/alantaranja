import {Message, QueryTopicGetArgs, Topic} from "src/graphql/types";
import {gql} from "@apollo/client/core";
import {SUBJECT_FIELDS} from "src/graphql/topic/topic";
import {useRouter} from "vue-router";
import {useQuery} from "@vue/apollo-composable";
import {computed, ref, watch} from "vue";
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
  const { currentRoute } = useRouter();

  const topicId = ref<string>(String(currentRoute.value.params['id']));
  const { loading, result, refetch } = useQuery<TopicData, QueryTopicGetArgs>(TOPIC_QUERY, {
    id: topicId.value,
  });

  watch(() => currentRoute.value, val => {
    topicId.value = String(val.params['id']);
    refetch({ id: topicId.value });
  });

  const topic = computed(() => {

    if(result.value?.topicGet) document.title = result.value?.topicGet.title;

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
