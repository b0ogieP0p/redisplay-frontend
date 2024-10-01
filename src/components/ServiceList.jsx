import React from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { deleteService } from '../services/api';

const ServiceList = ({ services, loading, windowId, onEdit, refreshTrigger }) => {
  const handleDelete = async (serviceId) => {
    try {
      await deleteService(windowId, serviceId);
      message.success('删除服务成功');
      // 触发父组件刷新
      if (refreshTrigger !== undefined) {
        // 此处无需处理，父组件通过refreshTrigger状态管理
      }
    } catch (error) {
      message.error('删除服务失败');
    }
  };

  const columns = [
    {
      title: '服务名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '服务描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => onEdit(record)}>编辑</Button>
          <Popconfirm
            title="确定删除此服务吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={services}
      columns={columns}
      rowKey="id"
      loading={loading}
    />
  );
};

export default ServiceList;
