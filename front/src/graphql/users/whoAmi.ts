import { useQuery } from '@vue/apollo-composable';
import { gql } from '@apollo/client/core';
import {User} from 'src/graphql/types';
import {USER_FIELDS} from 'src/graphql/users/user';
import {computed} from 'vue';

export type WhoAmIData = {
  whoAmI: User;
};
export const defaultUser: User = {
  activationCode: 0,
  avatar: 'login.svg',
  createdAt: undefined,
  email: '',
  firstName: '',
  id: 0,
  lastName: '',
  password: '',
  phone: '',
  resetPasswordCode: 0,
  role: -1,
  status: 0,
  updatedAt: undefined,
  lastConnexion: null,

};
export const WHOAMI = gql`
  query WhoAmI {
    whoAmI {
      ${USER_FIELDS}
    }
  }
`;

export const useWHoAmI = () => {
  const { loading: meLoading, result } = useQuery<WhoAmIData>(WHOAMI);
  const currentUser = computed<User>(() => result.value?.whoAmI ?? defaultUser);
  return { meLoading, currentUser };
};
