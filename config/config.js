import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;

const GOOGLE_ANALYTICS_ID = '';
const API_BASE_URI = 'https://sample-backend-grateful-platypus-ks.cfapps.io';

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true,
        default: 'vi-VN',
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (GOOGLE_ANALYTICS_ID && GOOGLE_ANALYTICS_ID.length) {
  plugins.push([
    'umi-plugin-ga',
    {
      code: GOOGLE_ANALYTICS_ID,
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['role.admin', 'role.user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              name: 'dashboard',
              icon: 'dashboard',
              path: '/dashboard',
              component: './dashboard',
            },
            {
              name: 'users',
              icon: 'user',
              path: '/users',
              component: './users',
              authority: ['role.admin'],
            },
            {
              name: 'Calendar',
              icon: 'calendar',
              path: '/calendar',
              component: './dashboard',
            },
            {
              name: 'E-Commerce',
              icon: 'shopping-cart',
              path: '/ecommerce',
              component: './dashboard',
              routes: [
                {
                  name: 'Products',
                  icon: 'minus',
                  path: '/products',
                  component: './dashboard',
                },
                {
                  name: 'Orders',
                  icon: 'minus',
                  path: '/orders',
                  component: './dashboard',
                },
              ],
            },
            {
              name: 'Academy',
              icon: 'laptop',
              path: '/academy',
              component: './dashboard',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    USER_DATA_KEY: '7cc7a630624d20f7797cb4c8e93c09c1',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  }, // chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: API_BASE_URI,
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
};
