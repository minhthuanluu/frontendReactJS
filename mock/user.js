export default {
  // Supported values are Object and Array
  'GET /api/currentUser': {
    name: 'Admin',
    avatar: 'https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png',
    userid: '00000001',
    email: 'admin@mf2.com',
    signature: 'Be tolerant to diversity, tolerance is a virtue',
    title: 'Interaction Expert',
    group: 'Ant Financial-XX Business Group-XX Platform Department-XX Technology Department-UED',
    tags: [
      {
        key: '0',
        label: 'Very idea',
      },
      {
        key: '1',
        label: 'Focus on design',
      },
      {
        key: '2',
        label: 'Spicy ~',
      },
      {
        key: '3',
        label: 'Long legs',
      },
      {
        key: '4',
        label: 'Sister Chuan',
      },
      {
        key: '5',
        label: 'Haina Baichuan',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'Viet Nam',
    geographic: {
      province: {
        label: 'Ba Dinh',
        key: '330000',
      },
      city: {
        label: 'Ha Noi',
        key: '330100',
      },
    },
    address: '21 Nguyen Thai Hoc',
    phone: '0909000999',
  },
  // GET POST Can be omitted
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login': (req, res) => {
    const { password, userName, type } = req.body;

    if (password === '123456' && userName === 'admin') {
      res.send({
        id: '66c6c0b7-aa49-4ac2-b12d-f7b3aef56370',
        accessToken: '67ecbcf2-d836-4e70-b8d2-7d946e7bae93',
        refreshToken: '435c1656-71b6-4d1d-8580-76d286a0ba93',
        userId: '090750e0-70b6-4ffa-b85d-7255477bb3d7',
        userName: 'admin',
        userRole: 'role.admin',
        expiredAt: 1579147633193,
        refreshExpiredAt: 1579232233193,
        features: [
          {
            id: '1c3d8859-3ecd-447c-91fc-e037ae91268d',
            createdAt: 1579076252321,
            createdBy: 'SYSTEM',
            updatedAt: 1579076252321,
            updatedBy: 'SYSTEM',
            name: 'Manage user',
            screenId: '/api/users',
          },
          {
            id: '64b53d07-b944-46d6-ba27-462adfe46caa',
            createdAt: 1579076252406,
            createdBy: 'SYSTEM',
            updatedAt: 1579076252406,
            updatedBy: 'SYSTEM',
            name: 'View dashboard',
            screenId: '/api/statistic',
          },
        ],
      });
      return;
    }

    if (password === '123456' && userName === 'user') {
      res.send({
        id: '66c6c0b7-aa49-4ac2-b12d-f7b3aef56370',
        accessToken: '67ecbcf2-d836-4e70-b8d2-7d946e7bae93',
        refreshToken: '435c1656-71b6-4d1d-8580-76d286a0ba93',
        userId: '090750e0-70b6-4ffa-b85d-7255477bb3d7',
        userName: 'user',
        userRole: 'role.user',
        expiredAt: 1579147633193,
        refreshExpiredAt: 1579232233193,
        features: [
          {
            id: '64b53d07-b944-46d6-ba27-462adfe46caa',
            createdAt: 1579076252406,
            createdBy: 'SYSTEM',
            updatedAt: 1579076252406,
            updatedBy: 'SYSTEM',
            name: 'View dashboard',
            screenId: '/api/statistic',
          },
        ],
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req, res) => {
    res.send({
      status: 'ok',
      currentAuthority: 'user',
    });
  },
  'GET /api/500': (req, res) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req, res) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req, res) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req, res) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
