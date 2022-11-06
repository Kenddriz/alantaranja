import { useRouter } from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';
import {apolloClient} from 'boot/apollo-client';
import {defaultUser} from 'src/graphql/users/whoAmi';
import {User} from "src/graphql/types";

export const useSession = () => {
  const route = useRouter();

  const login = (token: string, user: User) => {
    localStorage.setItem(CONSTANTS.token, token);
    localStorage.setItem(CONSTANTS.role, String(user.role));
    localStorage.setItem(CONSTANTS.userId, String(user.id));
    void route.push(user.role ? '/' : '/admin');
  };
  const logout = () => {
    void route.push('/');
    localStorage.clear();
    apolloClient.cache.modify({
      fields: {
        whoAmI() {
          return defaultUser;
        }
      }
    })
  };
  const navigateTo = (path: string) => {
    void route.push(path);
  }
  return { login, logout, navigateTo };
};
