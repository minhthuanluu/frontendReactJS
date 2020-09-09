import React from 'react';
import { Result } from 'antd';
import check from './CheckPermissions';

const Authorized = ({
  children,
  authority,
  noMatch = <Result status="403" title="403" subTitle="User không có quyền truy cập trang" />,
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized;
