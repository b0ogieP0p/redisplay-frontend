import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { addService } from '../services/api';

const AddServiceForm = ({ visible, onClose, onSuccess, windowId }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await addService(windowId, values);
      form.resetFields();
      onSuccess();
      onClose();
      message.success('添加服务成功');
    } catch (error) {
      message.error('添加服务失败');
    }
  };

  return (
    <Modal
      visible={visible}
      title="添加新服务"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          添加
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="add_service_form">
        <Form.Item
          name="name"
          label="服务名称"
          rules={[{ required: true, message: '请输入服务名称' }]}
        >
          <Input placeholder="例如: 用户服务" />
        </Form.Item>
        <Form.Item
          name="description"
          label="服务描述"
          rules={[{ required: true, message: '请输入服务描述' }]}
        >
          <Input.TextArea placeholder="请输入服务描述" />
        </Form.Item>
        {/* 根据需要添加更多表单项 */}
      </Form>
    </Modal>
  );
};

export default AddServiceForm;
