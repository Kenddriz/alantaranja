import {gql} from "@apollo/client/core";
import {useMutation} from "@vue/apollo-composable";
import {MutationReactMessageArgs} from "src/graphql/types";

type Data = {
  reactMessage: boolean;
}

const MUTATION = gql`
    mutation ReactMessage($input: MessageReactionInput!) {
      reactMessage(input: $input)
    }
`;

export const useReactMessage = () => {
  const { loading, mutate } = useMutation<Data, MutationReactMessageArgs>(MUTATION);

  function react(messageId: string, label: 'like'|'dislike') {
    void mutate({
      input: {
        messageId,
        label,
      }
    })
  }
  return { react, loading }
}
