import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 引入 useParams 和 useNavigate
import { Button, message } from 'antd';
import { getDeploymentWindow } from '../services/api'; // 需要在 api.js 中实现该函数
import DeploymentWindowDetails from './DeploymentWindowDetails';

const DeploymentWindowDetailPage = () => {
  const { id } = useParams(); // 获取 URL 参数中的 id
  const navigate = useNavigate();
  const [deploymentWindow, setDeploymentWindow] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDeploymentWindow = async () => {
    setLoading(true);
    try {
      const response = await getDeploymentWindow(id);
      setDeploymentWindow(response.data);
    } catch (error) {
      message.error('获取上线窗口信息失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeploymentWindow();
  }, [id]);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!deploymentWindow) {
    return <div>未找到上线窗口信息</div>;
  }

  return (
    <div>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>
        返回
      </Button>
      <h2>上线窗口详情: {deploymentWindow.name}</h2>
      <DeploymentWindowDetails window={deploymentWindow} />
    </div>
  );
};

export default DeploymentWindowDetailPage;
