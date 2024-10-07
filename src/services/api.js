import axios from 'axios';

// 设置后端 API 的基础 URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://your-backend-api.com/api';

// 部署窗口相关 API
export const getDeploymentWindows = () => axios.get(`${API_BASE_URL}/deployment-windows`);

export const addDeploymentWindow = (windowData) => axios.post(`${API_BASE_URL}/deployment-windows`, windowData);

export const deleteDeploymentWindow = (id) => axios.delete(`${API_BASE_URL}/deployment-windows/${id}`);

// 服务相关 API
export const getServices = (windowId) => axios.get(`${API_BASE_URL}/deployment-windows/${windowId}/services`);

export const addService = (windowId, serviceData) => axios.post(`${API_BASE_URL}/deployment-windows/${windowId}/services`, serviceData);

export const deleteService = (windowId, serviceId) => axios.delete(`${API_BASE_URL}/deployment-windows/${windowId}/services/${serviceId}`);

export const updateService = (windowId, serviceId, serviceData) => axios.put(`${API_BASE_URL}/deployment-windows/${windowId}/services/${serviceId}`, serviceData);

export const getDeploymentWindow = (id) => axios.get(`${API_BASE_URL}/deployment-windows/${id}`);