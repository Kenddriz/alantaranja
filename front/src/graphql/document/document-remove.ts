import {gql} from "@apollo/client/core";
import {useMutation} from "@vue/apollo-composable";
import {MutationDocumentRemoveArgs} from "src/graphql/types";
import {deletePaginationCache} from "src/utils/pagination";
import {useI18n} from "vue-i18n";
import {Dialog, Notify} from "quasar";

type Data = {
  documentRemove: string;
}

const MUTATION = gql`
    mutation DocumentRemove($id: String!){
      documentRemove(id: $id)
    }
`;

export const useDocumentRemove = () => {
  const { t } = useI18n();
  const { loading: loadingRemove, mutate, onDone } = useMutation<
    Data,
    MutationDocumentRemoveArgs
    >(MUTATION, {
      update: (cache, { data }) => {
        if(data?.documentRemove) {
          cache.modify({
            fields: {
              documentsPaginate(existingRef, { readField, toReference }) {
                return deletePaginationCache([data.documentRemove], existingRef, readField, toReference);
              }
            }
          })
        }
      }
  });

  onDone(({ data }) => {
    if(data?.documentRemove) {
      Notify.create({
        color: 'positive',
        message: t('removeSuccess'),
      });
    }
    else {
      Notify.create({
        color: 'negative',
        message: t('unknownError'),
      });
    }
  });

  function remove(id: string) {
    Dialog.create({
      message: t('document.removeWarning'),
      ok: {
        label: t('yes'),
        color: 'deep-orange'
      },
      cancel: t('no')
    }).onOk(() => void mutate({ id }))
  }

  return {
    loadingRemove,
    remove
  }
}
