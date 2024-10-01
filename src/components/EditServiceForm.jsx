import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { updateService } from '../services/api';

const EditServiceForm = ({ visible, onClose, onSuccess, windowId, service }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (service) {
      form.setFieldsValue({
        name: service.name,
        description: service.description,
        status: service.status,
        // 根据需要设置更多字段
      });
    }
  }, [service, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateService(windowId, service.id, values);
      form.resetFields();
      onSuccess();
      onClose();
      message.success('更新服务成功');
    } catch (error) {
      message.error('更新服务失败');
    }
  };

  return (
    <Modal
      visible={visible}
      title="编辑服务"
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          保存
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="edit_service_form">
        <Form.Item
          name="name"
          label="服务名称"
          rules={[{ required: true, message: '请输入服务名称' }]}
        >
          <Input placeholder="请输入服务名称" />
        </Form.Item>
        <Form.Item
          name="description"
          label="服务描述"
          rules={[{ required: true, message: '请输入服务描述' }]}
        >
          <Input.TextArea placeholder="请输入服务描述" />
        </Form.Item>
        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, message: '请输入状态' }]}
        >
          <Input placeholder="例如: 进行中" />
        </Form.Item>
        {/* 根据需要添加更多表单项 */}
      </Form>
    </Modal>
  );
};

export default EditServiceForm;
