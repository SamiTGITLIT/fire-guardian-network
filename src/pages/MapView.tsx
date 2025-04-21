
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { users, fireStations } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import SensorDisplay from '@/components/SensorDisplay';
import { useSensors } from '@/context/SensorContext';

const MapView: React.FC = () => {
  const { isFireStation } = useAuth();
  const { allSensors } = useSensors();

  if (!isFireStation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Area Map View</CardTitle>
            <CardDescription>
              Access restricted. Please login as a fire station to view this map.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // For a real application, we'd use an actual map library
  // For this demo, we'll create a simulated grid view of users
  const getStatusColor = (userId: string) => {
    const userSensors = allSensors.filter(sensor => sensor.userId === userId);
    
    if (userSensors.some(s => s.status === 'danger')) {
      return 'bg-fire text-white';
    } else if (userSensors.some(s => s.status === 'warning')) {
      return 'bg-alert text-white';
    } else {
      return 'bg-safe text-white';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Area Map</h1>
        <p className="text-muted-foreground">View all monitored locations in your jurisdiction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Location of all monitored systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gray-100 p-4 h-[500px] relative">
                  {/* Simulate fire stations on map */}
                  {fireStations.map((station, index) => (
                    <div
                      key={station.id}
                      className="absolute w-12 h-12 water-gradient rounded-full flex items-center justify-center text-white font-bold transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        top: `${25 + (index * 15)}%`,
                        left: `${20 + (index * 20)}%`,
                        zIndex: 10,
                      }}
                      title={station.name}
                    >
                      FS
                    </div>
                  ))}
                  
                  {/* Simulate users on map */}
                  {users.filter(u => u.hasSystem).map((user, index) => (
                    <div
                      key={user.id}
                      className={`absolute w-10 h-10 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(user.id)}`}
                      style={{
                        top: `${30 + ((index * 7) % 40)}%`,
                        left: `${35 + ((index * 13) % 50)}%`,
                      }}
                      title={`${user.name} - ${user.address}`}
                    >
                      {user.name.charAt(0)}
                    </div>
                  ))}
                  
                  {/* Map background imagery */}
                  <div className="absolute inset-0 bg-gray-200 opacity-20 pointer-events-none">
                    <div className="w-full h-full grid grid-cols-8 grid-rows-8">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="border border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-end space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-safe rounded-full mr-1"></div>
                  <span>Normal</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-alert rounded-full mr-1"></div>
                  <span>Warning</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-fire rounded-full mr-1"></div>
                  <span>Danger</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 water-gradient rounded-full mr-1"></div>
                  <span>Fire Station</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Sensor Alerts</CardTitle>
              <CardDescription>Active warnings and danger alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allSensors
                  .filter(sensor => sensor.status !== 'normal')
                  .map(sensor => {
                    const user = users.find(u => u.id === sensor.userId);
                    return (
                      <div key={sensor.id} className="space-y-1">
                        <div className="text-sm font-medium">
                          {user?.name} - {sensor.location}
                        </div>
                        <SensorDisplay sensor={sensor} compact />
                      </div>
                    );
                  })}
                  
                {allSensors.filter(sensor => sensor.status !== 'normal').length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    No active sensor alerts
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Fire Stations</CardTitle>
              <CardDescription>Stations in your area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {fireStations.map(station => (
                  <div key={station.id} className="border rounded-lg p-3">
                    <div className="font-medium">{station.name}</div>
                    <div className="text-sm text-muted-foreground">{station.address}</div>
                    <div className="text-sm mt-1">
                      Staff: {station.staff} | Jurisdiction: {station.jurisdiction}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MapView;
