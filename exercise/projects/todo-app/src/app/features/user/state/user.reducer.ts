import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { User } from './user.model';

export const userFeatureKey = 'user';

export interface State {
  items: {
    [id: number]: User;
  };
  loading: boolean;
  error: string | null;
  editedUserId: number | null;
}

export const initialState: State = {
  items: {},
  loading: false,
  error: null,
  editedUserId: null
};

const userReducer = createReducer(
  initialState,

  on(UserActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null,
    editedUserId: null
  })),

  on(UserActions.loadUsersSuccess, (state, { users }) => {
    const newState = {
      items: users.reduce((result, user) => {
        result[user.id] = user;
        return result;
      }, {}),
      loading: false,
      error: null,
      editedUserId: null
    };
    return newState;
  }),

  on(UserActions.loadUsersFailure, (state, { error }) => ({
    items: {},
    loading: false,
    error,
    editedUserId: null
  })),

  on(UserActions.removeUser, state => ({
    ...state,
    loading: true,
    error: null,
    editedUserId: null
  })),

  on(UserActions.removeUserSuccess, (state, { id }) => {
    const newState = {
      items: {
        ...state.items
      },
      loading: false,
      error: null,
      editedUserId: null
    };
    delete newState.items[id];
    return newState;
  }),

  on(UserActions.removeUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    editedUserId: null
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}