
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Sensor } from '@/types/types';
import { sensors, API } from '@/data/mockData';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

interface SensorContextType {
  userSensors: Sensor[];
  allSensors: Sensor[];
  refreshSensors: () => Promise<void>;
  activateWaterPump: (userId: string) => Promise<boolean>;
  triggerAlarm: (userId: string) => Promise<boolean>;
}

const SensorContext = createContext<SensorContextType>({
  userSensors: [],
  allSensors: [],
  refreshSensors: async () => {},
  activateWaterPump: async () => false,
  triggerAlarm: async () => false,
});

export const SensorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, isFireStation } = useAuth();
  const { addNotification } = useNotifications();
  const [userSensors, setUserSensors] = useState<Sensor[]>([]);
  const [allSensors, setAllSensors] = useState<Sensor[]>(sensors);

  // Load sensors based on current user
  useEffect(() => {
    if (currentUser && !isFireStation) {
      // Load only this user's sensors
      const userSensorData = sensors.filter(sensor => sensor.userId === currentUser.id);
      setUserSensors(userSensorData);
    } else if (isFireStation) {
      // Load all sensors for fire stations
      setAllSensors(sensors);
    } else {
      setUserSensors([]);
    }

    // Set up regular sensor updates
    const intervalId = setInterval(refreshSensors, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [currentUser, isFireStation]);

  // Refresh sensor data
  const refreshSensors = async () => {
    try {
      const updatedSensors = await API.getSensorUpdates();
      setAllSensors(updatedSensors);
      
      if (currentUser && !isFireStation) {
        const userSensorData = updatedSensors.filter(
          sensor => sensor.userId === currentUser.id
        );
        setUserSensors(userSensorData);
        
        // Check for alerts
        userSensorData.forEach(sensor => {
          if (sensor.status === 'danger' && sensor.smokeLevel > 7) {
            addNotification({
              userId: currentUser.id,
              type: 'alert',
              title: 'DANGER: High Smoke Level',
              message: `High smoke level detected in ${sensor.location}. Take action immediately!`,
            });
          } else if (sensor.status === 'warning') {
            addNotification({
              userId: currentUser.id,
              type: 'warning',
              title: 'Warning: Unusual Readings',
              message: `Unusual readings detected in ${sensor.location}. Please check.`,
            });
          }
        });
      }
    } catch (error) {
      console.error('Error refreshing sensor data:', error);
    }
  };

  // Activate water pump
  const activateWaterPump = async (userId: string) => {
    try {
      const success = await API.activateWaterPump(userId);
      
      if (success) {
        addNotification({
          userId,
          type: 'info',
          title: 'Water Pump Activated',
          message: 'Water pump has been activated remotely.',
        });
        
        // Also add notification for fire station
        if (!isFireStation) {
          addNotification({
            stationId: 'fs1', // Assuming first fire station
            type: 'info',
            title: 'User Activated Water Pump',
            message: `User ${currentUser?.name} has activated their water pump system.`,
          });
        }
      }
      
      return success;
    } catch (error) {
      console.error('Error activating water pump:', error);
      return false;
    }
  };

  // Trigger alarm
  const triggerAlarm = async (userId: string) => {
    try {
      const success = await API.soundAlarm(userId);
      
      if (success) {
        addNotification({
          userId,
          type: 'alert',
          title: 'Alarm Triggered',
          message: 'Alarm has been activated remotely.',
        });
        
        // Also add notification for fire station if triggered by user
        if (!isFireStation) {
          addNotification({
            stationId: 'fs1', // Assuming first fire station
            type: 'alert',
            title: 'User Triggered Alarm',
            message: `User ${currentUser?.name} has triggered their alarm system.`,
          });
        }
      }
      
      return success;
    } catch (error) {
      console.error('Error triggering alarm:', error);
      return false;
    }
  };

  return (
    <SensorContext.Provider
      value={{
        userSensors,
        allSensors,
        refreshSensors,
        activateWaterPump,
        triggerAlarm,
      }}
    >
      {children}
    </SensorContext.Provider>
  );
};

export const useSensors = () => useContext(SensorContext);
