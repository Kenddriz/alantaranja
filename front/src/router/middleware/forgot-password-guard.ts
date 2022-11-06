import {NavigationGuardNext, RouteLocationNormalized} from 'vue-router';
import {CONSTANTS} from 'src/utils/utils';

export const forgotPasswordGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  if(localStorage.getItem(CONSTANTS.forgotPassword))next();
  else next({ name: 'login' });
}
