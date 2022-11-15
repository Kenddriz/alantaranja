import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS, getUserRole} from 'src/utils/utils';

export const teacherGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(!localStorage.getItem(CONSTANTS.token)) next({ name: 'login' });
  else {
    const role = getUserRole();
    if(role === 2) next();
    else next(CONSTANTS.baseRoutes[role]);
  }
}
