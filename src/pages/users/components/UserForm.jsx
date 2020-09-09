import { Form, Input, Modal, Select, Switch } from 'antd';
import React, { useEffect } from 'react';

const FormItem = Form.Item;
const { Option } = Select;

const UserForm = props => {
  const { modalVisible, form, onSubmit: handleSave, onCancel, selectedUser } = props;
  const { getFieldDecorator, setFieldsValue } = form;
  const isEdit = selectedUser && selectedUser.id;

  useEffect(() => {
    if (isEdit) {
      setFieldsValue(selectedUser);
    }
  }, [modalVisible]);

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      handleSave(fieldsValue);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <Modal
      destroyOnClose
      title={isEdit ? 'Thay đổi thông tin thành viên' : 'Thêm mới thành viên'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem {...formItemLayout}>
        {getFieldDecorator('id', {})(<Input type="hidden" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Tên đăng nhập">
        {getFieldDecorator('userName', {
          rules: [{ required: true }],
        })(<Input placeholder="Nhập tên đăng nhập" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Email">
        {getFieldDecorator('email', {
          rules: [{ required: true }],
        })(<Input placeholder="Nhập địa chỉ email" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Số điện thoại">
        {getFieldDecorator('phone', {
          rules: [{ required: true }],
        })(<Input placeholder="Nhập số điện thoại" />)}
      </FormItem>

      {!isEdit && (
        <FormItem {...formItemLayout} label="Mật khẩu">
          {getFieldDecorator('password', {
            rules: [{ required: true }],
          })(<Input type="password" placeholder="Nhập mật khẩu" />)}
        </FormItem>
      )}

      <FormItem {...formItemLayout} label="Vai trò">
        {getFieldDecorator('roleCode', {
          initialValue: 'role.user',
          rules: [{ required: true }],
        })(
          <Select placeholder="Chọn vai trò" style={{ width: '100%' }}>
            <Option value="role.admin">Quản trị viên</Option>
            <Option value="role.user">Thành viên</Option>
          </Select>,
        )}
      </FormItem>

      <Form.Item {...formItemLayout} label="Trạng thái">
        {getFieldDecorator('active', {
          initialValue: true,
          valuePropName: 'checked',
        })(<Switch />)}
      </Form.Item>
    </Modal>
  );
};

export default Form.create()(UserForm);
