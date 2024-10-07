import React, { useEffect, useState } from 'react';
import { Button, message } from 'antd';
import { getServices } from '../services/api';
import ServiceList from './ServiceList';
import AddServiceForm from './AddServiceForm';
import EditServiceForm from './EditServiceForm';

const DeploymentWindowDetails = ({ window }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddServiceVisible, setIsAddServiceVisible] = useState(false);
  const [isEditServiceVisible, setIsEditServiceVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getServices(window.id);
      setServices(response.data);
    } catch (error) {
      message.error('获取服务列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [window.id, refreshTrigger]);

  const handleAddService = () => {
    setIsAddServiceVisible(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setIsEditServiceVisible(true);
  };

  const handleAddSuccess = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  const handleEditSuccess = () => {
    setRefreshTrigger(!refreshTrigger);
  };

  return (
    <div>
      <Button type="primary" onClick={handleAddService} style={{ marginBottom: 16 }}>
        添加服务
      </Button>
      <ServiceList
        services={services}
        loading={loading}
        windowId={window.id}
        onEdit={handleEditService}
        refreshTrigger={refreshTrigger}
      />
      <AddServiceForm
        visible={isAddServiceVisible}
        onClose={() => setIsAddServiceVisible(false)}
        onSuccess={handleAddSuccess}
        windowId={window.id}
      />
      <EditServiceForm
        visible={isEditServiceVisible}
        onClose={() => setIsEditServiceVisible(false)}
        onSuccess={handleEditSuccess}
        windowId={window.id}
        service={selectedService}
      />
    </div>
  );
};

export default DeploymentWindowDetails;
