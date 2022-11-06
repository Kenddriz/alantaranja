import {MutationPaymentStatusArgs, Payment} from 'src/graphql/types';
import {gql} from '@apollo/client/core';
import {useMutation} from '@vue/apollo-composable';
import {Dialog, Notify} from 'quasar';
import {useI18n} from 'vue-i18n';

type Data = {
  paymentStatus: Payment;
}

const MUTATION = gql`
    mutation PaymentStatus($input: PaymentStatusInput!) {
      paymentStatus(input: $input) {
        id
        status
      }
    }
`;

export const usePaymentStatus = () => {
  const { loading: statusLoading, onDone, mutate } = useMutation<Data, MutationPaymentStatusArgs>(MUTATION);

  onDone(({ data }) => {
    if(data?.paymentStatus) {
      Notify.create({
        color: 'positive',
        message: t(`payment.${data.paymentStatus.status}Success`),
      });
    } else {
      Notify.create({
        color: 'negative',
        message: t('unknownError'),
      });
    }
  })
  const { t } = useI18n();
  function submit(id: string, status: string) {
    Dialog.create({
      title: t('confirmation'),
      message: t(`payment.${status}Confirmation`),
      ok: t('yes'),
      cancel: t('no'),
    }).onOk(() => void mutate({ input: { id, status }}));
  }
  return { statusLoading, submit }
}
