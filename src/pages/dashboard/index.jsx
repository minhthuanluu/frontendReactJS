import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { tableData } from './data';

const TableReport = React.lazy(() => import('./components/TableReport'));
const SalesCard = React.lazy(() => import('./components/SalesCard'));

class Dashboard extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={null}>
            <SalesCard loading={loading} />
          </Suspense>
          <Suspense fallback={null}>
            <TableReport loading={loading} tableData={tableData} />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Dashboard;
