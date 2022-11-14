import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const teacherGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!localStorage.getItem(CONSTANTS.token)) next({ name: 'login' });
  else {
    const role = Number(localStorage.getItem(CONSTANTS.role));
    if(role === 2) next();
    else next(CONSTANTS.baseRoutes[role]);
  }
}
