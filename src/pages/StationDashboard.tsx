
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useSensors } from '@/context/SensorContext';
import { useNotifications } from '@/context/NotificationContext';
import { users, API } from '@/data/mockData';
import { User } from '@/types/types';
import SensorDisplay from '@/components/SensorDisplay';

const StationDashboard: React.FC = () => {
  const { isFireStation } = useAuth();
  const { allSensors, activateWaterPump, triggerAlarm, refreshSensors } = useSensors();
  const { notifications, addNotification } = useNotifications();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  if (!isFireStation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Fire Station Dashboard</CardTitle>
            <CardDescription>
              Access restricted. Please login as a fire station to view this dashboard.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Sort alerts by priority and time
  const alerts = notifications
    .filter(n => n.type === 'alert' || n.type === 'warning')
    .sort((a, b) => {
      // First sort by type (alert > warning)
      if (a.type === 'alert' && b.type !== 'alert') return -1;
      if (a.type !== 'alert' && b.type === 'alert') return 1;
      
      // Then sort by timestamp (newest first)
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  // Get user sensors
  const getUserSensors = (userId: string) => {
    return allSensors.filter(sensor => sensor.userId === userId);
  };

  // Get user by ID
  const getUserById = (userId: string): User | undefined => {
    return users.find(user => user.id === userId);
  };

  // Send confirmation to user
  const handleSendConfirmation = () => {
    if (!selectedUser || !confirmationMessage.trim()) {
      toast({
        title: "Error",
        description: "Please provide a message to send",
        variant: "destructive",
      });
      return;
    }

    API.sendConfirmation(selectedUser.id, confirmationMessage).then(success => {
      if (success) {
        // Add notification for user
        addNotification({
          userId: selectedUser.id,
          type: 'info',
          title: 'Message from Fire Station',
          message: confirmationMessage,
        });

        toast({
          title: "Message Sent",
          description: `Confirmation sent to ${selectedUser.name}`,
        });

        setConfirmationMessage('');
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Fire Station Dashboard</h1>
        <p className="text-muted-foreground">Monitor and respond to fire alerts in your jurisdiction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Respond to emergency situations</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refreshSensors()}
                >
                  Refresh Data
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {alerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No active alerts at this time
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map(alert => {
                    const user = alert.userId ? getUserById(alert.userId) : undefined;
                    
                    return (
                      <Card key={alert.id} className={`border-l-4 ${
                        alert.type === 'alert' ? 'border-l-fire' : 'border-l-alert'
                      }`}>
                        <CardHeader className="py-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{alert.title}</CardTitle>
                                <Badge variant={alert.type === 'alert' ? 'destructive' : 'default'}>
                                  {alert.type.toUpperCase()}
                                </Badge>
                              </div>
                              <CardDescription className="mt-1">
                                {user ? `${user.name} - ${user.address}` : 'Unknown user'}
                              </CardDescription>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(alert.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="py-0">
                          <p className="text-sm mb-3">{alert.message}</p>
                          
                          {user && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              <Button 
                                size="sm" 
                                variant="default"
                                onClick={() => setSelectedUser(user)}
                              >
                                View Details
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-water border-water hover:bg-water/10"
                                onClick={() => activateWaterPump(user.id)}
                              >
                                Activate Water Pump
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-alert border-alert hover:bg-alert/10"
                                onClick={() => triggerAlarm(user.id)}
                              >
                                Sound Alarm
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    Send Confirmation
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Send Confirmation to {user.name}</DialogTitle>
                                    <DialogDescription>
                                      Send a confirmation message or instructions to the user.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="my-4">
                                    <Textarea
                                      placeholder="Type your message here..."
                                      value={confirmationMessage}
                                      onChange={(e) => setConfirmationMessage(e.target.value)}
                                      className="min-h-[100px]"
                                    />
                                  </div>
                                  <DialogFooter>
                                    <Button onClick={handleSendConfirmation}>
                                      Send Message
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Status of monitored systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Users:</span>
                  <span className="font-semibold">{users.filter(u => u.hasSystem).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Active Sensors:</span>
                  <span className="font-semibold">{allSensors.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sensors in Danger:</span>
                  <span className="font-semibold text-fire">{allSensors.filter(s => s.status === 'danger').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Sensors in Warning:</span>
                  <span className="font-semibold text-alert">{allSensors.filter(s => s.status === 'warning').length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Installation Requests</CardTitle>
              <CardDescription>Pending system installations</CardDescription>
            </CardHeader>
            <CardContent>
              {users.filter(u => !u.hasSystem).length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No pending installation requests
                </div>
              ) : (
                <div className="space-y-3">
                  {users.filter(u => !u.hasSystem).map(user => (
                    <div key={user.id} className="border rounded-lg p-3">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.address}</div>
                      <div className="text-sm text-muted-foreground">{user.phone}</div>
                      <Button size="sm" variant="outline" className="mt-2">
                        Schedule Installation
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Selected User Detail View */}
      {selectedUser && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedUser.name}'s System Details</CardTitle>
                <CardDescription>{selectedUser.address}</CardDescription>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sensors">
              <TabsList>
                <TabsTrigger value="sensors">Sensor Readings</TabsTrigger>
                <TabsTrigger value="actions">Remote Actions</TabsTrigger>
                <TabsTrigger value="info">User Info</TabsTrigger>
              </TabsList>

              <TabsContent value="sensors" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getUserSensors(selectedUser.id).map(sensor => (
                    <SensorDisplay key={sensor.id} sensor={sensor} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="actions" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Water System</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full bg-water hover:bg-water/90"
                          onClick={() => activateWaterPump(selectedUser.id)}
                        >
                          Activate Water Pump
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Alarm System</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          className="w-full bg-alert hover:bg-alert/90"
                          onClick={() => triggerAlarm(selectedUser.id)}
                        >
                          Sound Alarm
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Send Confirmation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Type confirmation or instructions here..."
                        value={confirmationMessage}
                        onChange={(e) => setConfirmationMessage(e.target.value)}
                        className="min-h-[100px] mb-4"
                      />
                      <Button onClick={handleSendConfirmation}>
                        Send Message
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="info" className="pt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Contact Information</div>
                      <div className="text-sm mt-1">{selectedUser.phone}</div>
                      <div className="text-sm mt-1">{selectedUser.email}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">System Information</div>
                      <div className="text-sm mt-1">Sensors: {selectedUser.sensorsInstalled}</div>
                      <div className="text-sm mt-1">Status: {selectedUser.systemStatus}</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StationDashboard;
