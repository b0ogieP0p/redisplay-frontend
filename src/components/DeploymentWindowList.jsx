import React, { useEffect, useState } from 'react';
import { List, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom'; // 引入 useNavigate
import { getDeploymentWindows, deleteDeploymentWindow } from '../services/api';
import AddDeploymentWindowForm from './AddDeploymentWindowForm';

const DeploymentWindowList = () => {
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const navigate = useNavigate(); // 使用 useNavigate 进行导航

  const fetchDeploymentWindows = async () => {
    setLoading(true);
    try {
      const response = await getDeploymentWindows();
      setWindows(response.data);
    } catch (error) {
      message.error('获取上线窗口列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeploymentWindows();
  }, []);

  const handleAdd = () => {
    setIsAddModalVisible(true);
  };

  const handleAddSuccess = () => {
    fetchDeploymentWindows();
  };

  const handleDelete = async (id) => {
    try {
      await deleteDeploymentWindow(id);
      message.success('删除上线窗口成功');
      fetchDeploymentWindows();
    } catch (error) {
      message.error('删除上线窗口失败');
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/windows/${id}`); // 跳转到详情页面
  };

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ margin: '20px auto'}}>
        create window
      </Button>
      <List
        bordered
        loading={loading}
        dataSource={windows}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => handleViewDetails(item.id)}>查看详情</Button>,
              <Popconfirm
                title="确定删除此上线窗口吗？"
                onConfirm={() => handleDelete(item.id)}
                okText="是"
                cancelText="否"
              >
                <Button type="link" danger>删除</Button>
              </Popconfirm>,
            ]}
          >
            {item.name} (创建时间: {new Date(item.createdAt).toLocaleString()})
          </List.Item>
        )}
      />
      <AddDeploymentWindowForm
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onSuccess={handleAddSuccess}
      />
    </div>
  );
};

export default DeploymentWindowList;
