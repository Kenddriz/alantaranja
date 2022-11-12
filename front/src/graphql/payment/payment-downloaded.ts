import {MutationPaymentDownloadedArgs, Payment} from 'src/graphql/types';
import {gql} from '@apollo/client/core';
import {useMutation} from '@vue/apollo-composable';

type Data = {
  paymentDownloaded: Payment;
}

const MUTATION = gql`
    mutation PaymentDownloaded($id: String!) {
      paymentDownloaded(id: $id) {
        id
        downloadAt
      }
    }
`;

export const usePaymentDownloaded = () => {
  const { onDone, mutate } = useMutation<Data, MutationPaymentDownloadedArgs>(MUTATION);
  function submitDownloaded(id: string) {
    void mutate({ id });
  }
  return { submitDownloaded, onDone }
}
