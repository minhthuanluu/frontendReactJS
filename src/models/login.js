import router from 'umi/router';
import { accountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, doLogout } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const response = yield call(accountLogin, payload);
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        }); // Login successfully
        yield put({
          type: 'saveCurrentUser',
          payload: response,
        });

        if (response.accessToken) {
          const urlParams = new URL(window.location.href);
          const params = getPageQuery();
          let { redirect } = params;

          if (redirect) {
            const redirectUrlParams = new URL(redirect);

            if (redirectUrlParams.origin === urlParams.origin) {
              redirect = redirect.substr(urlParams.origin.length);

              if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
              }
            } else {
              window.location.href = '/';
              return;
            }
          }

          router.replace(redirect || '/');
        }
      } catch (e) {
        // console.error(e);
      }
    },

    logout() {
      doLogout();
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload);
      return { ...state, status: payload.status, type: payload.type };
    },
  },
};
export default Model;
