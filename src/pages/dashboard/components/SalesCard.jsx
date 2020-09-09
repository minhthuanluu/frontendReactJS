import { Card, Tabs } from 'antd';
import React from 'react';
import { ClusteredStacked } from './Charts';
import styles from '../style.less';

const { TabPane } = Tabs;

const SalesCard = ({ loading }) => (
  <Card
    loading={loading}
    bordered={false}
    bodyStyle={{
      padding: 0,
      marginBottom: 20,
    }}
  >
    <div className={styles.salesCard}>
      <Tabs
        size="large"
        tabBarStyle={{
          marginBottom: 24,
        }}
      >
        <TabPane tab="Thống kê chi tiết theo ngày" key="sales">
          <div className={styles.salesBar}>
            <ClusteredStacked />
          </div>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default SalesCard;
