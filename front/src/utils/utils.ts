import {computed, ref} from 'vue';
import {User} from "src/graphql/types";

export const REGEXP = {
  email: /^[^\s()<>@,;:\\/]+@\w[\w.-]+\.[a-z]{2,}$/i,
  StrongPassword: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
  mediumPassword: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
}

export const getImage = (name: string, folder = 'avatars') => {
  return name ? process.env.api + folder + '/' + name : '';
}

export const getImageV2 = (url: string) =>  url ? process.env.api + url : '';
export const getName = (user: User) => ` ${user.lastName} ${user.firstName}`;

export const makeTree = (items: any[], parentId?: string | null): any[] => {
  return items
    .filter((item) => item.parentId == parentId)
    .map((item) => ({
      key: item.id,
      ...item.category,
      children: makeTree(items, item.category.id),
    }));
};

export const movable = () => {
  const pos = ref([0, 0]);
  function move (ev: any) {
    pos.value = [pos.value[0] + ev.delta.x, pos.value[1] + ev.delta.y];
  }
  const currentPos = computed(() => `transform:translate(${pos.value[0]}px,${pos.value[1]}px`);
  return { currentPos, move }
}

export const CONSTANTS = {
  role: 'role',
  token: 'token',
  userId: 'userId',
  forgotPassword: 'forgotPassword',
  pendingAccount: 'pendingAccount',
  cart: 'cart',
  status: {
    pending: 0,
    approved: 1,
    rejected: 2,
    payed: 3,
    expired: 4
  },
}

export function getExt(name: string) {
  return name.substring(name.lastIndexOf('.') + 1);
}
