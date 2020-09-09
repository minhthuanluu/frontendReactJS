import React, { useState } from 'react';
import { Button, Icon } from 'antd';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ExportPdf = ({ dataSource }) => {
  const [loading, setLoading] = useState(false);

  const tableWidths = [
    150,
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
    'auto',
  ];

  const tableHeaders = [
    [
      { text: '', style: 'tableHeader', rowSpan: 2 },
      {
        text: 'THỰC HIỆN NĂM HIỆN TẠI',
        style: 'tableHeader',
        colSpan: 5,
        alignment: 'center',
      },
      {},
      {},
      {},
      {},
      {
        text: 'THỰC HIỆN THÁNG HIỆN TẠI',
        style: 'tableHeader',
        colSpan: 8,
        alignment: 'center',
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {
        text: 'CHI TIẾT NGÀY',
        style: 'tableHeader',
        colSpan: 12,
        alignment: 'center',
      },
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
    [
      {},
      { text: 'Kế hoạch', style: 'tableHeader', alignment: 'center' },
      { text: 'Thực hiện', style: 'tableHeader', alignment: 'center' },
      { text: '%TH/KH', style: 'tableHeader', alignment: 'center' },
      {
        text: 'Chênh lệch (so với cùng kỳ năm trước)',
        style: 'tableHeader',
        alignment: 'center',
      },
      { text: '% so với cùng kỳ năm trước', style: 'tableHeader', alignment: 'center' },

      { text: 'Kế hoạch', style: 'tableHeader', alignment: 'center' },
      { text: 'Thực hiện', style: 'tableHeader', alignment: 'center' },
      { text: '%TH/KH', style: 'tableHeader', alignment: 'center' },
      { text: 'Thực hiện tháng trước', style: 'tableHeader', alignment: 'center' },
      { text: '% so với tháng trước', style: 'tableHeader', alignment: 'center' },
      { text: 'Chênh lệch (so với tháng trước)', style: 'tableHeader', alignment: 'center' },
      { text: 'TH cùng kỳ năm trước', style: 'tableHeader', alignment: 'center' },
      { text: '% so với cùng kỳ năm trước', style: 'tableHeader', alignment: 'center' },

      { text: '01/01', style: 'tableHeader', alignment: 'center' },
      { text: '02/01', style: 'tableHeader', alignment: 'center' },
      { text: '03/01', style: 'tableHeader', alignment: 'center' },
      { text: '04/01', style: 'tableHeader', alignment: 'center' },
      { text: '05/01', style: 'tableHeader', alignment: 'center' },
      { text: '06/01', style: 'tableHeader', alignment: 'center' },
      { text: '07/01', style: 'tableHeader', alignment: 'center' },
      { text: '08/01', style: 'tableHeader', alignment: 'center' },
      { text: '09/01', style: 'tableHeader', alignment: 'center' },
      { text: '10/01', style: 'tableHeader', alignment: 'center' },
      { text: '11/01', style: 'tableHeader', alignment: 'center' },
      { text: '12/01', style: 'tableHeader', alignment: 'center' },
    ],
  ];

  const tableBody = [...dataSource].map(item => {
    const newItem = { ...item };
    delete newItem.className;
    return Object.values({
      ...newItem,
      col3: { text: `${newItem.col3}%`, style: 'highlight' },
      col5: { text: `${newItem.col5}%`, style: 'highlight' },
      col10: { text: `${newItem.col10}%`, style: 'highlight' },
    }).map(i => ({
      text: Number.isFinite(i) ? i.toLocaleString() : i,
      alignment: 'right',
    }));
  });

  const docDefinition = {
    pageSize: 'A2',
    pageOrientation: 'landscape',
    styles: {
      tableHeader: {
        color: '#000000',
        fillColor: '#ebebfa',
        bold: true,
      },
      highlight: {
        color: '#f00000',
      },
    },
    content: [
      {
        table: {
          widths: tableWidths,
          headerRows: 2,
          // keepWithHeaderRows: 1,
          body: [...tableHeaders, ...tableBody],
        },
      },
    ],
  };

  const doDownload = () => {
    setLoading(true);
    pdfMake.createPdf(docDefinition).download();
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  };

  return (
    <Button loading={loading} onClick={doDownload}>
      <Icon type="download" /> Tải xuống (.pdf)
    </Button>
  );
};

// const ExportPdf = ({ dataSource }) => <DocumentView dataSource={dataSource} />;

export default ExportPdf;
