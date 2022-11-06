import {gql} from "@apollo/client/core";
import {useMutation} from "@vue/apollo-composable";
import {MutationMessageRemoveArgs} from "src/graphql/types";
import {useI18n} from "vue-i18n";
import {Dialog, Notify} from "quasar";

type Data = {
  messageRemove: boolean;
}

const MUTATION = gql`
    mutation MessageRemove($id: String!){
      messageRemove(id: $id)
    }
`;

export const useMessageRemove = () => {
  const { mutate, onDone, loading } = useMutation<Data, MutationMessageRemoveArgs>(MUTATION);
  const { t } = useI18n();

  onDone(({ data }) => {
    if(data?.messageRemove) {
      Notify.create({
        color: 'positive',
        message: t('removeSuccess'),
      });
    } else {
      Notify.create({
        color: 'negative',
        message: t('unknownError'),
      });
    }
  })

  function remove(id: string) {
    Dialog.create({
      title: t('removeTitle'),
      message: t('topic.removeConfirmation'),
      ok: {
        label: t('yes'),
        color: 'deep-orange',
        icon: 'delete_forever',
        unelevated: true,
      },
      cancel: t('no'),
    }).onOk(() => void mutate({ id }))
  }

  return { remove, loading }
}
