import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const adminGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!localStorage.getItem(CONSTANTS.token)) next({ name: 'login' });
  else if(localStorage.getItem(CONSTANTS.role) !== '0') next('/');
  else next();
}
