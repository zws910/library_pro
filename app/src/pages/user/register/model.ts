import { Effect, Reducer } from 'umi';

import { fakeRegister, checkMobileCount } from './service';

export interface StateType {
  status?: 'ok' | 'error';
  currentAuthority?: 'user' | 'guest' | 'admin';
  mobileValid?: 'ok' | 'error';
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    checkMobile: Effect;
    submit: Effect;
  };
  reducers: {
    registerHandle: Reducer<StateType>;
    mobileHandle: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'userAndregister',

  state: {
    status: undefined,
    mobileValid: undefined,
  },

  effects: {
    *submit({ payload }, { call, put }) {
      const response = yield call(fakeRegister, payload);
      console.log(response);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
    },
    *checkMobile({ payload, callback }, { call, put }) {
      const response = yield call(checkMobileCount, payload);

      if (response) {
        console.log(200);
        if (callback && typeof callback === 'function') {
          callback(response);
        }
      }
      yield put({
        type: 'mobileHandle',
        payload: response,
      });
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.status,
      };
    },
    mobileHandle(state, { payload }) {
      if (payload.count === 0) {
        return {
          ...state,
          mobileValid: 'ok',
        };
      } else {
        return {
          ...state,
          mobileValid: 'error',
        };
      }
    },
  },
};

export default Model;
