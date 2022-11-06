import {Message, QueryTopicGetArgs} from "src/graphql/types";
import {gql} from "@apollo/client/core";
import {MESSAGE_FIELDS} from "src/graphql/topic/message";
import { useSubscription} from "@vue/apollo-composable";
import {onBeforeUnmount, watch} from "vue";
import {TOPIC_QUERY, TopicData} from "src/graphql/topic/topic-find";
import {useRoute} from "vue-router";
import {apolloClient} from "boot/apollo-client";
import {cloneDeep} from "@apollo/client/utilities";

type Data = {
  messageEvent: Message;
}

const SUBSCRIPTION = gql`
    subscription MessageEvent {
      messageEvent {
        ${MESSAGE_FIELDS}
        topicId
      }
    }
`;

export const useMessageEvent = () => {
  const { params } = useRoute();
  const { stop, result } = useSubscription<Data>(SUBSCRIPTION);
  watch(() => result.value?.messageEvent, (val) => {

    if(val) {

      const query = {
        query: TOPIC_QUERY,
        variables: {
          id: String(params['id'])
        }
      }
      const topic = apolloClient.cache.readQuery<TopicData, QueryTopicGetArgs>({ ...query });

      if(topic && val.topicId === topic.topicGet.id) {

        const valId = val.id.replace('_', '');
        const topicMessages = cloneDeep(topic.topicMessages);
        const findIndex = topicMessages.findIndex(m => m.id === valId);
        if (findIndex >= 0) {
         //If no user anymore, means from remove data
          if(!val.user) {
            apolloClient.cache.modify({
              fields: {
                topicMessages(existingRef: any, { readField }) {
                  return existingRef.filter(
                    (eRef: any) => readField('id', eRef) != valId
                  )
                }
              }
            })
          }
        } else {
          apolloClient.cache.modify({
            fields: {
              topicMessages(existingRef: any, { toReference }) {
                return [...existingRef, toReference(val)]
              }
            }
          });
        }
      }
    }
  });

  onBeforeUnmount(() => {
    stop();
  });
}
