import React from 'react';
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from '@progress/kendo-react-excel-export';
import { Button, Icon } from 'antd';

const BASE_OPTIONS = {
  color: '#000000',
  wrap: true,
  verticalAlign: 'center',
  borderTop: {
    color: '#444444',
    size: 1,
  },
  borderRight: {
    color: '#444444',
    size: 1,
  },
  borderBottom: {
    color: '#444444',
    size: 1,
  },
  borderLeft: {
    color: '#444444',
    size: 1,
  },
};

const HEADER_CELL_OPTIONS = {
  ...BASE_OPTIONS,
  textAlign: 'center',
  color: '#000000',
  background: '#ebebfa',
  bold: true,
};

const BODY_CELL_OPTIONS = {
  ...BASE_OPTIONS,
  textAlign: 'right',
  format: '#,##0',
};

const BODY_CELL_PERCENT_OPTIONS = {
  ...BASE_OPTIONS,
  textAlign: 'right',
  color: '#ff0000',
};

class ExportExcel extends React.PureComponent {
  exporter;

  export = () => {
    this.exporter.save();
  };

  render() {
    const { dataSource } = this.props;
    return (
      <React.Fragment>
        <Button style={{ marginRight: 8 }} onClick={this.export}>
          <Icon type="download" /> Tải xuống (.xlsx)
        </Button>

        <ExcelExport
          data={dataSource}
          fileName="Report.xlsx"
          ref={exporter => {
            this.exporter = exporter;
          }}
        >
          <ExcelExportColumn
            field="criteriaName"
            width={180}
            headerCellOptions={HEADER_CELL_OPTIONS}
            cellOptions={{ ...BODY_CELL_OPTIONS, textAlign: 'left' }}
          />
          <ExcelExportColumnGroup
            title="THỰC HIỆN NĂM HIỆN TẠI"
            headerCellOptions={HEADER_CELL_OPTIONS}
          >
            <ExcelExportColumn
              field="col1"
              title="Kế hoạch"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col2"
              title="Thực hiện"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col3"
              title="%TH/KH"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_PERCENT_OPTIONS}
            />
            <ExcelExportColumn
              field="col4"
              title="Chênh lệch (so với cùng kỳ năm trước)"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col5"
              title="% so với cùng kỳ năm trước"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_PERCENT_OPTIONS}
            />
          </ExcelExportColumnGroup>
          <ExcelExportColumnGroup
            title="THỰC HIỆN THÁNG HIỆN TẠI"
            headerCellOptions={HEADER_CELL_OPTIONS}
          >
            <ExcelExportColumn
              field="col6"
              title="Kế hoạch"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col7"
              title="Thực hiện"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col8"
              title="%TH/KH"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_PERCENT_OPTIONS}
            />
            <ExcelExportColumn
              field="col9"
              title="Thực hiện tháng trước"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col10"
              title="% so với tháng trước"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_PERCENT_OPTIONS}
            />
            <ExcelExportColumn
              field="col11"
              title="Chênh lệch (so với tháng trước)"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col12"
              title="TH cùng kỳ năm trước"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col13"
              title="% so với cùng kỳ năm trước"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_PERCENT_OPTIONS}
            />
          </ExcelExportColumnGroup>
          <ExcelExportColumnGroup title="CHI TIẾT NGÀY" headerCellOptions={HEADER_CELL_OPTIONS}>
            <ExcelExportColumn
              field="col14"
              title="01/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col15"
              title="02/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col16"
              title="03/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col17"
              title="04/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col18"
              title="05/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col19"
              title="06/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col20"
              title="07/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col21"
              title="08/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col22"
              title="09/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col23"
              title="10/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col24"
              title="11/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
            <ExcelExportColumn
              field="col25"
              title="12/01"
              width={120}
              headerCellOptions={HEADER_CELL_OPTIONS}
              cellOptions={BODY_CELL_OPTIONS}
            />
          </ExcelExportColumnGroup>
        </ExcelExport>
      </React.Fragment>
    );
  }
}

export default ExportExcel;
