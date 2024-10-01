import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { addDeploymentWindow } from '../services/api';

const AddDeploymentWindowForm = ({ visible, onClose, onSuccess }) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await addDeploymentWindow(values);
      form.resetFields();
      onSuccess();
      onClose();
      message.success('创建上线窗口成功');
    } catch (error) {
      message.error('创建上线窗口失败');
    }
  };

  return (
    <Modal
      visible={visible}
      title="新建上线窗口"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          创建
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="add_deployment_window_form">
        <Form.Item
          name="name"
          label="上线窗口名称"
          rules={[{ required: true, message: '请输入上线窗口名称' }]}
        >
          <Input placeholder="例如: 0926" />
        </Form.Item>
        {/* 根据需要添加更多表单项 */}
      </Form>
    </Modal>
  );
};

export default AddDeploymentWindowForm;
