import React from 'react';
import { Card } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

export default () => (
  <PageHeaderWrapper content="This page can only be viewed with admin privileges">
    <Card>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt asperiores ipsam corporis
      commodi optio aperiam nisi quam quod, quae quibusdam eveniet sapiente libero incidunt debitis
      saepe rerum id voluptas accusantium!
    </Card>
  </PageHeaderWrapper>
);
