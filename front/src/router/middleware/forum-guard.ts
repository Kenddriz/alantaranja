import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const forumGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!localStorage.getItem(CONSTANTS.token)) next({ name: 'login' });
  else next();
}
