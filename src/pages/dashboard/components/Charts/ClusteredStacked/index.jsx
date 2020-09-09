import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';

class ClusteredStacked extends React.Component {
  axisFormatter = val => `${val / 1000}k`;

  render() {
    const { DataView } = DataSet;
    const data = [
      {
        State: '01/01',
        'Thuê bao phát triển mới': 4194,
        'Khách hàng cá nhân': 3631,
        'Khách hàng doanh nghiệp': 563,
      },
      {
        State: '02/01',
        'Thuê bao phát triển mới': 4401,
        'Khách hàng cá nhân': 3784,
        'Khách hàng doanh nghiệp': 617,
      },
      {
        State: '03/01',
        'Thuê bao phát triển mới': 4223,
        'Khách hàng cá nhân': 3495,
        'Khách hàng doanh nghiệp': 728,
      },
      {
        State: '04/01',
        'Thuê bao phát triển mới': 3681,
        'Khách hàng cá nhân': 3117,
        'Khách hàng doanh nghiệp': 564,
      },
      {
        State: '05/01',
        'Thuê bao phát triển mới': 3185,
        'Khách hàng cá nhân': 2728,
        'Khách hàng doanh nghiệp': 457,
      },
      {
        State: '06/01',
        'Thuê bao phát triển mới': 3413,
        'Khách hàng cá nhân': 2756,
        'Khách hàng doanh nghiệp': 657,
      },
      {
        State: '07/01',
        'Thuê bao phát triển mới': 4257,
        'Khách hàng cá nhân': 3382,
        'Khách hàng doanh nghiệp': 875,
      },
      {
        State: '08/01',
        'Thuê bao phát triển mới': 3895,
        'Khách hàng cá nhân': 2845,
        'Khách hàng doanh nghiệp': 1050,
      },
      {
        State: '09/01',
        'Thuê bao phát triển mới': 3661,
        'Khách hàng cá nhân': 2908,
        'Khách hàng doanh nghiệp': 753,
      },
      {
        State: '10/01',
        'Thuê bao phát triển mới': 4175,
        'Khách hàng cá nhân': 3109,
        'Khách hàng doanh nghiệp': 1066,
      },
      {
        State: '11/01',
        'Thuê bao phát triển mới': 3912,
        'Khách hàng cá nhân': 3109,
        'Khách hàng doanh nghiệp': 803,
      },
      {
        State: '12/01',
        'Thuê bao phát triển mới': 3590,
        'Khách hàng cá nhân': 2939,
        'Khách hàng doanh nghiệp': 651,
      },
    ];
    const ages = ['Thuê bao phát triển mới', 'Khách hàng cá nhân', 'Khách hàng doanh nghiệp'];
    const dv = new DataView();
    dv.source(data)
      .transform({
        type: 'fold',
        fields: ages,
        key: 'age',
        value: 'population',
        retains: ['State'],
      })
      .transform({
        type: 'map',
        callback: obj => {
          const key = obj.age;
          let type;

          if (key === 'Thuê bao phát triển mới') {
            type = 'a';
          } else if (key === 'Khách hàng cá nhân') {
            type = 'b';
          } else if (key === 'Khách hàng doanh nghiệp') {
            type = 'c';
          } else {
            type = 'd';
          }

          return { ...obj, type };
        },
      });
    const colorMap = {
      'Thuê bao phát triển mới': '#fbd441',
      'Khách hàng cá nhân': '#5acb76',
      'Khách hàng doanh nghiệp': '#48a2fd',
    };
    const cols = {
      population: {
        tickInterval: 1000,
      },
    };
    return (
      <div>
        <Chart
          height={window.innerHeight / 2}
          data={dv}
          scale={cols}
          padding={[20, 160, 80, 60]}
          forceFit
        >
          <Axis name="population" label={{ formatter: this.axisFormatter }} />
          <Legend position="bottom" />
          <Tooltip />
          <Geom
            type="interval"
            position="State*population"
            color={['age', age => colorMap[age]]}
            tooltip={[
              'age*population',
              (age, population) => ({
                name: age,
                value: population,
              }),
            ]}
            adjust={[
              {
                type: 'dodge',
                dodgeBy: 'type',
                marginRatio: 0,
              },
              {
                type: 'stack',
              },
            ]}
          />
        </Chart>
      </div>
    );
  }
}

export default ClusteredStacked;
