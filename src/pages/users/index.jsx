import { Button, Dropdown, Form, Icon, Menu, message, Modal } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { IntlProvider, viVNIntl, TableDropdown } from '@ant-design/pro-table';
import { trim } from 'lodash';
import UserForm from './components/UserForm';
import { queryUser, addUser, removeUser, updateUser } from './service';
import { tableData2ProTableAdapter } from '@/utils/adapter';

/**
 * Lưu thông tin thành viên
 * @param fields
 */
const handleSave = async fields => {
  const hide = message.loading('Đang lưu...');

  try {
    if (fields.id) {
      await updateUser(fields);
    } else {
      await addUser(fields);
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    hide();
  }
};

/**
 *  Xóa thành viên
 * @param selectedRows
 */
const handleRemove = async selectedRows => {
  const hide = message.loading('Đang xóa...');
  if (!selectedRows) return true;

  try {
    await removeUser({
      id: selectedRows.map(row => row.id),
    });
    message.success('Xóa thành công');
    return true;
  } catch (error) {
    message.error(error.message);
    return false;
  } finally {
    hide();
  }
};

/**
 * Lấy danh sách thành viên
 * @param {object} params
 */
const fetchUsers = async params => {
  let filter = '';
  Object.keys(params).map(key => {
    if (params[key] && params[key].length > 0) {
      switch (key) {
        case 'active':
        case 'roleCode':
          filter += `${key}==${params[key]};`;
          break;
        default:
          filter += `${key}=="*${params[key]}*";`;
          break;
      }
    }
    return filter;
  });
  const response = await queryUser({
    filter: trim(filter, ';'),
    pageNumber: params.current,
    pageSize: params.pageSize,
  });
  return tableData2ProTableAdapter(response);
};

const TableList = () => {
  const [modalVisible, handleModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const actionRef = useRef();

  const tableOptionSelect = (key, user, action) => {
    switch (key) {
      case 'delete':
        Modal.confirm({
          title: 'Bạn xác nhận muốn xóa thành viên này?',
          content: `Tên: ${user.userName}`,
          async onOk() {
            await handleRemove([user]);
            action.reload();
          },
        });
        break;
      case 'edit':
        setSelectedUser(user);
        handleModalVisible(true);
        break;
      default:
        break;
    }
  };

  // const onChangeUserActive = async (active, user) => {
  //   handleSave({
  //     ...user,
  //     active,
  //   });
  // };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      copyable: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Vai trò',
      dataIndex: 'roleCode',
      valueEnum: {
        'role.admin': {
          text: 'Quản trị viên',
        },
        'role.user': {
          text: 'Thành viên',
        },
      },
      render: value => {
        if (value === 'Quản trị viên') {
          return <span className="ant-tag ant-tag-magenta">Quản trị viên</span>;
        }
        if (value === 'Thành viên') {
          return <span className="ant-tag ant-tag-blue">Thành viên</span>;
        }
        return JSON.stringify(value);
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      valueType: 'date',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'active',
      valueEnum: {
        false: {
          text: 'Không hoạt động',
          status: 'Default',
        },
        true: {
          text: 'Đang hoạt động',
          status: 'Success',
        },
      },
    },
    {
      title: '',
      valueType: 'option',
      dataIndex: 'id',
      render: (text, row, index, action) => [
        // <Switch
        //   size="small"
        //   checked={row.active}
        //   onChange={event => onChangeUserActive(event, row)}
        // />,
        <TableDropdown
          onSelect={key => tableOptionSelect(key, row, action)}
          menus={[
            {
              key: 'edit',
              name: (
                <Fragment>
                  <Icon type="edit" /> Chỉnh sửa
                </Fragment>
              ),
            },
            {
              key: 'delete',
              name: (
                <Fragment>
                  <Icon type="delete" /> Xóa
                </Fragment>
              ),
            },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageHeaderWrapper>
      <IntlProvider value={viVNIntl}>
        <ProTable
          headerTitle="Danh sách thành viên"
          actionRef={actionRef}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) => (
              <div>
                Hiển thị từ {range[0]} - {range[1]} - trên tổng số {total} bản ghi
              </div>
            ),
          }}
          toolBarRender={(action, { selectedRows }) => [
            <Button
              icon="plus"
              type="primary"
              onClick={() => {
                setSelectedUser(undefined);
                handleModalVisible(true);
              }}
            >
              Thêm mới
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu
                    onClick={async e => {
                      if (e.key === 'remove') {
                        await handleRemove(selectedRows);
                        action.reload();
                      }
                    }}
                    selectedKeys={[]}
                  >
                    <Menu.Item key="remove">Xóa</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  Thao tác <Icon type="down" />
                </Button>
              </Dropdown>
            ),
          ]}
          tableAlertRender={false}
          request={fetchUsers}
          columns={columns}
          rowSelection={{}}
        />
      </IntlProvider>
      <UserForm
        selectedUser={selectedUser}
        onSubmit={async value => {
          const success = await handleSave(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={modalVisible}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create()(TableList);
