import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import DeploymentWindowList from './components/DeploymentWindowList';
import DeploymentPage from './components/DeploymentPage';
import UnisvcPage from './components/UnisvcPage';
import 'antd/dist/antd.css';
import './App.css'; // 确保引入您的样式文件

const { Header, Content, Footer } = Layout;

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

const MainLayout = () => {
  const location = useLocation();

  return (
<Layout className="layout" style={{ minHeight: '100vh' }}>
  <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: 0, height: '64px' }}>
    <div className="logo" style={{ color: 'white', fontSize: '20px', paddingLeft: '20px' }}>Redisplay</div>
    <Menu
      className="custom-menu"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      theme="light" // 设置为 light
    >
      <Menu.Item key="/">
        <NavLink to="/">window</NavLink>
      </Menu.Item>
      <Menu.Item key="/deployment">
        <NavLink to="/deployment">deployment</NavLink>
      </Menu.Item>
      <Menu.Item key="/unisvc">
        <NavLink to="/unisvc">unisvc</NavLink>
      </Menu.Item>
    </Menu>
  </Header>
  <Content style={{ padding: '0 50px', marginTop: 80 }}>
    <div className="site-layout-content">
      <Routes>
        <Route path="/" element={<DeploymentWindowList />} />
        <Route path="/deployment" element={<DeploymentPage />} />
        <Route path="/unisvc" element={<UnisvcPage />} />
      </Routes>
    </div>
  </Content>
  <Footer style={{ textAlign: 'center' }}>©2024 Redisplay</Footer>
</Layout>
  );
};

export default App;
