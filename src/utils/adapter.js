export const tableData2ProTableAdapter = async data => ({
  pageSize: data.size,
  current: data.number,
  data: data.content,
  total: data.totalElements,
});
