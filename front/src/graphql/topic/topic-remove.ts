import {gql} from "@apollo/client/core";
import {useMutation} from "@vue/apollo-composable";
import {deletePaginationCache} from "src/utils/pagination";
import {useI18n} from "vue-i18n";
import {Dialog, Notify} from "quasar";
import {MutationTopicRemoveArgs} from "src/graphql/types";
import {useRouter} from "vue-router";

type Data = {
  topicRemove: string;
}

const MUTATION = gql`
    mutation TopicRemove($id: String!){
      topicRemove(id: $id)
    }
`;

export const useTopicRemove = () => {
  const { t } = useI18n();
  const { push } = useRouter();
  const { loading: loadingTopicRemove, mutate, onDone } = useMutation<
    Data,
    MutationTopicRemoveArgs
    >(MUTATION, {
      update: (cache, { data }) => {
        if(data?.topicRemove) {
          cache.modify({
            fields: {
              topicsPaginate(existingRef, { readField, toReference }) {
                return deletePaginationCache([data.topicRemove], existingRef, readField, toReference);
              }
            }
          })
        }
      }
  });

  onDone(({ data }) => {
    if(data?.topicRemove) {
      Notify.create({
        color: 'positive',
        message: t('removeSuccess'),
      });
      void push('/forum');
    }
    else {
      Notify.create({
        color: 'negative',
        message: t('unknownError'),
      });
    }
  });

  function removeTopic(id: string) {
    Dialog.create({
      message: t('topic.removeWarning'),
      ok: {
        label: t('yes'),
        color: 'deep-orange'
      },
      cancel: t('no')
    }).onOk(() => void mutate({ id }))
  }

  return {
    loadingTopicRemove,
    removeTopic
  }
}
