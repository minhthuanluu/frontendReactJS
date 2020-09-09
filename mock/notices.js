import { notices } from './noticesData';

const getNotices = (req, res) => {
  res.json(notices);
};

export default {
  'GET /api/notices': getNotices,
};
