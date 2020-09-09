const { uniq } = require('lodash');
const RouterConfig = require('../../config/config').default.routes;

const BASE_URL = `http://localhost:${process.env.PORT || 8000}`;

function formatter(routes, parentPath = '') {
  const fixedParentPath = parentPath.replace(/\/{1,}/g, '/');
  let result = [];
  routes.forEach(item => {
    if (item.path) {
      result.push(`${fixedParentPath}/${item.path}`.replace(/\/{1,}/g, '/'));
    }
    if (item.routes) {
      result = result.concat(
        formatter(item.routes, item.path ? `${fixedParentPath}/${item.path}` : parentPath),
      );
    }
  });
  return uniq(result.filter(item => !!item));
}

beforeAll(async () => {
  await page.goto(`${BASE_URL}`);
  await page.evaluate(() => {
    localStorage.setItem(
      '7cc7a630624d20f7797cb4c8e93c09c1',
      '{"id":"8cdbfd78-ce70-41e6-a8cc-77ac35594922","accessToken":"42765a34-6f11-494f-983e-415934952c98","refreshToken":"ca92b764-dc46-4601-bdad-ed275e9681ea","userId":"090750e0-70b6-4ffa-b85d-7255477bb3d7","userName":"admin","userRole":"role.admin","expiredAt":1579167596424,"refreshExpiredAt":1579252196424,"features":[{"id":"1c3d8859-3ecd-447c-91fc-e037ae91268d","createdAt":1579076252321,"createdBy":"SYSTEM","updatedAt":1579076252321,"updatedBy":"SYSTEM","name":"Manage user","screenId":"/api/users"},{"id":"64b53d07-b944-46d6-ba27-462adfe46caa","createdAt":1579076252406,"createdBy":"SYSTEM","updatedAt":1579076252406,"updatedBy":"SYSTEM","name":"View dashboard","screenId":"/api/statistic"}]}',
    );
  });
});

describe('Ant Design Pro E2E test', () => {
  const testPage = path => async () => {
    await page.goto(`${BASE_URL}${path}`);
    await page.waitForSelector('footer', {
      timeout: 2000,
    });
    const haveFooter = await page.evaluate(
      () => document.getElementsByTagName('footer').length > 0,
    );
    expect(haveFooter).toBeTruthy();
  };

  const routers = formatter(RouterConfig);
  routers.forEach(route => {
    it(`test pages ${route}`, testPage(route));
  });
});
