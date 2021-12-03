import { RouterReducerState } from '@ngrx/router-store';

export { routerReducer } from '@ngrx/router-store';

export const routerFeatureKey = 'router';

export interface State {
  router: RouterReducerState<any>;
}
