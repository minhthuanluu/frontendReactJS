import React, { PureComponent } from 'react';
import { Card, Table } from 'antd';
import styles from './index.less';
import ExportExcel from './ExportExcel';
import ExportPdf from './ExportPdf';

const { Column, ColumnGroup } = Table;

class TableReport extends PureComponent {
  render() {
    const { loading, tableData } = this.props;
    return (
      <Card
        loading={loading}
        bordered={false}
        bodyStyle={{
          padding: 0,
        }}
      >
        <div className={styles.tableButtons}>
          <ExportExcel dataSource={tableData} />
          <ExportPdf dataSource={tableData} />
        </div>
        <div className={styles.salesCard}>
          <Table bordered pagination={false} dataSource={tableData} scroll={{ x: 2630 }}>
            <Column
              fixed="left"
              title=""
              dataIndex="criteriaName"
              key="criteriaName"
              render={(text, row) => <span className={styles[row.className]}>{text}</span>}
            />
            <ColumnGroup title="THỰC HIỆN NĂM HIỆN TẠI">
              <Column
                title="Kế hoạch"
                dataIndex="col1"
                key="col1"
                width={100}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="Thực hiện"
                dataIndex="col2"
                key="col2"
                align="right"
                width={100}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="%TH/KH"
                dataIndex="col3"
                key="col3"
                align="right"
                width={90}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    <span className={styles.textRed}>
                      {`${text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`}
                    </span>
                  </span>
                )}
              />
              <Column
                title="Chênh lệch (so với cùng kỳ năm trước)"
                dataIndex="col4"
                key="col4"
                width={160}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="% so với cùng kỳ năm trước"
                dataIndex="col5"
                key="col5"
                width={120}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    <span className={styles.textRed}>
                      {`${text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`}
                    </span>
                  </span>
                )}
              />
            </ColumnGroup>
            <ColumnGroup title="THỰC HIỆN THÁNG HIỆN TẠI">
              <Column
                title="Kế hoạch"
                dataIndex="col6"
                key="col6"
                align="right"
                width={100}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="Thực hiện"
                dataIndex="col7"
                key="col7"
                align="right"
                width={100}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="%TH/KH"
                dataIndex="col8"
                key="col8"
                align="right"
                width={90}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="Thực hiện tháng trước"
                dataIndex="col9"
                key="col9"
                width={120}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="% so với tháng trước"
                dataIndex="col10"
                key="col10"
                width={110}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    <span className={styles.textRed}>
                      {`${text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}%`}
                    </span>
                  </span>
                )}
              />
              <Column
                title="Chênh lệch (so với tháng trước)"
                dataIndex="col11"
                key="col11"
                width={140}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="TH cùng kỳ năm trước"
                dataIndex="col12"
                key="col12"
                width={120}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="% so với cùng kỳ năm trước"
                dataIndex="col13"
                key="col13"
                width={130}
                align="right"
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
            </ColumnGroup>
            <ColumnGroup title="CHI TIẾT NGÀY">
              <Column
                title="01/01"
                dataIndex="col14"
                key="col14"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="02/01"
                dataIndex="col15"
                key="col15"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="03/01"
                dataIndex="col16"
                key="col16"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="04/01"
                dataIndex="col17"
                key="col17"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="05/01"
                dataIndex="col18"
                key="col18"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="06/01"
                dataIndex="col19"
                key="col19"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="07/01"
                dataIndex="col20"
                key="col20"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="08/01"
                dataIndex="col21"
                key="col21"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="09/01"
                dataIndex="col22"
                key="col22"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="10/01"
                dataIndex="col23"
                key="col23"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="11/01"
                dataIndex="col24"
                key="col24"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
              <Column
                title="12/01"
                dataIndex="col25"
                key="col25"
                align="right"
                width={80}
                render={(text, row) => (
                  <span className={styles[row.className]}>
                    {text.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </span>
                )}
              />
            </ColumnGroup>
          </Table>
        </div>
      </Card>
    );
  }
}

export default TableReport;
