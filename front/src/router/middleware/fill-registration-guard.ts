import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const fillRegistrationGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(sessionStorage.getItem(CONSTANTS.pendingAccount))next();
  else next({ name: 'login' });
}
