import { parse } from 'url';
// mock tableListDataSource
let tableListDataSource = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    active: true,
    createdAt: new Date(`2020-01-${Math.floor(i / 2) + 1}`),
    createdBy: 'admin',
    email: `user${i}@mf2.com`,
    id: `id-${Math.floor(Math.random() * 1000000)}`,
    password: '',
    phone: `+84${Math.floor(Math.random() * 1000000)}`,
    roleCode: 'role.admin',
    updatedAt: new Date(`2020-01-${Math.floor(i / 2) + 1}`),
    updatedBy: 'admin',
    userName: `user${i}`,
  });
}

function getUser(req, res, u) {
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = parse(url, true).query;
  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }

      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.active !== undefined) {
    dataSource = dataSource.filter(data => data.active === params.active);
  }

  if (params.userName) {
    dataSource = dataSource.filter(data => data.userName.includes(params.userName || ''));
  }

  if (params.email) {
    dataSource = dataSource.filter(data => data.email.includes(params.email || ''));
  }

  let size = 10;

  if (params.pageSize) {
    size = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    content: dataSource,
    totalElements: 1000,
    size,
    number: parseInt(`${params.pageNumber}`, 10) || 1,
  };
  return res.json(result);
}

function postUser(req, res, u, b) {
  let url = u;

  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, id } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => item.id !== id);
      break;

    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        active: true,
        createdAt: new Date(`2020-01-${Math.floor(i / 2) + 1}`),
        createdBy: 'admin',
        email: `user${i}@mf2.com`,
        id: `id-${i}`,
        password: '',
        phone: `+84${Math.floor(Math.random() * 1000)}`,
        roleCode: 'role.admin',
        updatedAt: new Date(`2020-01-${Math.floor(i / 2) + 1}`),
        updatedBy: 'admin',
        userName: `user${i}`,
      });
      break;

    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.id === id) {
          return { ...item, desc, name };
        }

        return item;
      });
      break;

    default:
      break;
  }

  const result = {
    content: tableListDataSource,
    empty: true,
    first: true,
    last: true,
    number: 0,
    numberOfElements: 0,
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: true,
      sort: {
        empty: true,
        sorted: true,
        unsorted: true,
      },
      unpaged: true,
    },
    size: 0,
    sort: {
      empty: true,
      sorted: true,
      unsorted: true,
    },
    totalElements: tableListDataSource.length,
    totalPages: 0,
  };
  return res.json(result);
}

export default {
  'GET /api/user/search': getUser,
  'POST /api/user': postUser,
};
