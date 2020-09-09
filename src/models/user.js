// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { queryCurrent, query as queryUsers } from '@/services/user';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    *fetchCurrent(_, { call, put }) {
      // const response = yield call(queryCurrent);
      // yield put({
      //   type: 'saveCurrentUser',
      //   payload: response,
      // });
      const response = yield JSON.parse(localStorage.getItem(USER_DATA_KEY));
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
