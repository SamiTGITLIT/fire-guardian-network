
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import StatusCard from '@/components/StatusCard';
import SensorDisplay from '@/components/SensorDisplay';
import { useAuth } from '@/context/AuthContext';
import { useSensors } from '@/context/SensorContext';
import { useNotifications } from '@/context/NotificationContext';
import { API } from '@/data/mockData';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';

const UserDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { userSensors, refreshSensors, activateWaterPump, triggerAlarm } = useSensors();
  const { addNotification } = useNotifications();
  const [alertReason, setAlertReason] = useState('');
  const [installationDetails, setInstallationDetails] = useState({
    address: currentUser?.address || '',
    phone: currentUser?.phone || '',
    message: '',
  });

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to Fire Guardian Network</CardTitle>
            <CardDescription>
              Please login to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This application provides comprehensive fire detection and monitoring services. 
              Please login to access your personalized dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Status Summary
  const systemStatus = currentUser.hasSystem ? 'Active' : 'Not Installed';
  const sensorStatus = userSensors.length > 0 
    ? userSensors.some(s => s.status === 'danger') 
      ? 'DANGER' 
      : userSensors.some(s => s.status === 'warning') 
        ? 'WARNING' 
        : 'Normal'
    : 'No Data';

  const getStatusColor = () => {
    if (!currentUser.hasSystem) return 'warning';
    if (sensorStatus === 'DANGER') return 'danger';
    if (sensorStatus === 'WARNING') return 'warning';
    return 'normal';
  };

  // Send alert
  const handleSendAlert = () => {
    if (!alertReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for the alert",
        variant: "destructive",
      });
      return;
    }

    API.sendAlert(currentUser.id, alertReason).then(success => {
      if (success) {
        // Add notification for fire station
        addNotification({
          stationId: 'fs1',
          type: 'alert',
          title: 'Manual Alert',
          message: `Alert from ${currentUser.name}: ${alertReason}`,
          userId: currentUser.id,
        });

        // Add confirmation for user
        addNotification({
          userId: currentUser.id,
          type: 'info',
          title: 'Alert Sent',
          message: 'Your alert has been sent to the nearest fire station.',
        });

        toast({
          title: "Alert Sent",
          description: "Fire station has been notified of your alert",
        });

        setAlertReason('');
      }
    });
  };

  // Request installation
  const handleRequestInstallation = () => {
    if (!installationDetails.message.trim()) {
      toast({
        title: "Error",
        description: "Please provide details for your installation request",
        variant: "destructive",
      });
      return;
    }

    API.requestInstallation(currentUser.id, installationDetails.address).then(success => {
      if (success) {
        // Add notification for fire station
        addNotification({
          stationId: 'fs1',
          type: 'info',
          title: 'Installation Request',
          message: `New installation request from ${currentUser.name} at ${installationDetails.address}`,
          userId: currentUser.id,
        });

        // Add confirmation for user
        addNotification({
          userId: currentUser.id,
          type: 'info',
          title: 'Request Submitted',
          message: 'Your installation request has been submitted.',
        });

        toast({
          title: "Request Submitted",
          description: "We'll contact you soon to arrange your installation",
        });

        setInstallationDetails({
          ...installationDetails,
          message: '',
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.name}</h1>
        <p className="text-muted-foreground">Monitor your fire detection system and manage alerts</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatusCard
          title="System Status"
          value={systemStatus}
          description="Your fire detection system"
          status={currentUser.hasSystem ? 'normal' : 'warning'}
        />
        <StatusCard
          title="Sensors"
          value={`${currentUser.sensorsInstalled} Installed`}
          description="Active monitoring devices"
          status={currentUser.sensorsInstalled > 0 ? 'normal' : 'warning'}
        />
        <StatusCard
          title="Current Alert Level"
          value={sensorStatus}
          description="Overall system status"
          status={getStatusColor()}
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Emergency Actions</CardTitle>
            <CardDescription>
              Quickly respond to fire emergencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentUser.hasSystem ? (
              <>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full mb-2">
                      Send Emergency Alert
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Send Emergency Alert</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will notify the nearest fire station immediately. Please provide details about the emergency:
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="my-4">
                      <Textarea
                        placeholder="Describe the emergency situation..."
                        value={alertReason}
                        onChange={(e) => setAlertReason(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSendAlert}>
                        Send Alert
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="secondary" 
                    className="w-full" 
                    onClick={() => activateWaterPump(currentUser.id)}
                  >
                    Activate Water Pump
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full text-alert border-alert hover:bg-alert/10"
                    onClick={() => triggerAlarm(currentUser.id)}
                  >
                    Sound Alarm
                  </Button>
                </div>
              </>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Request Installation</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request System Installation</DialogTitle>
                    <DialogDescription>
                      Fill out this form to request a fire detection system installation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 my-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={installationDetails.address}
                        onChange={(e) => setInstallationDetails({...installationDetails, address: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={installationDetails.phone}
                        onChange={(e) => setInstallationDetails({...installationDetails, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Additional Details</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your needs..."
                        value={installationDetails.message}
                        onChange={(e) => setInstallationDetails({...installationDetails, message: e.target.value})}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleRequestInstallation}>Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Management</CardTitle>
            <CardDescription>
              Monitor and manage your fire detection system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full mb-2"
              onClick={() => refreshSensors()}
            >
              Refresh Sensor Data
            </Button>
            
            {currentUser.hasSystem ? (
              <>
                <div className="text-sm text-muted-foreground mb-2">
                  Your system was last checked on {new Date().toLocaleDateString()}.
                </div>
                <Button variant="link" className="text-sm p-0 h-auto text-muted-foreground">
                  View system history
                </Button>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">
                Install a fire detection system to access management features.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sensors */}
      {currentUser.hasSystem && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Sensor Readings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userSensors.map(sensor => (
              <SensorDisplay key={sensor.id} sensor={sensor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
