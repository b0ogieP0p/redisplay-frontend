import React from 'react';
import { Layout, Menu } from 'antd';
import DeploymentWindowList from './components/DeploymentWindowList';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" style={{ color: 'white', fontSize: '20px' }}>Redisplay</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">上线窗口管理</Menu.Item>
          {/* 可以在此处添加更多菜单项 */}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div className="site-layout-content">
          <DeploymentWindowList />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2024 Redisplay</Footer>
    </Layout>
  );
};

export default App;
