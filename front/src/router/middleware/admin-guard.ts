import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const adminGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!localStorage.getItem(CONSTANTS.token)) next({ name: 'login' });
  else {
    const role = Number(localStorage.getItem(CONSTANTS.role));
    if(role <= 1) next();
    else next(CONSTANTS.baseRoutes[role]);
  }
}
