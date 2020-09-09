module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    USER_DATA_KEY: 'user_data',
    page: true,
  },
};
