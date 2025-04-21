
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { users } from '@/data/mockData';
import { useSensors } from '@/context/SensorContext';
import { useNotifications } from '@/context/NotificationContext';
import { motion } from 'framer-motion';
import { Droplet, Bell, Lightbulb, User, AlertTriangle, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CommandsPage: React.FC = () => {
  const { activateWaterPump, triggerAlarm } = useSensors();
  const { addNotification } = useNotifications();
  
  const [selectedUserId, setSelectedUserId] = useState(users[0].id);
  const [commands, setCommands] = useState({
    pump: false,
    alarm: false,
    lights: false
  });

  const handleCommandToggle = (command: keyof typeof commands) => {
    setCommands(prev => {
      const newState = { ...prev, [command]: !prev[command] };
      
      // Perform associated actions
      if (command === 'pump' && newState.pump) {
        activateWaterPump(selectedUserId);
        addNotification({
          userId: selectedUserId,
          type: 'info',
          title: 'Water Pump Activated',
          message: 'Fire station has remotely activated your water pump system.'
        });
      }
      
      if (command === 'alarm' && newState.alarm) {
        triggerAlarm(selectedUserId);
        addNotification({
          userId: selectedUserId,
          type: 'alert',
          title: 'Alarm Activated',
          message: 'Fire station has remotely triggered your alarm system.'
        });
      }
      
      if (command === 'lights' && newState.lights) {
        addNotification({
          userId: selectedUserId,
          type: 'info',
          title: 'Emergency Lights Activated',
          message: 'Fire station has remotely activated your emergency lights.'
        });
      }
      
      // Show toast
      toast({
        title: `${command.charAt(0).toUpperCase() + command.slice(1)} ${newState[command] ? 'Activated' : 'Deactivated'}`,
        description: `Command sent to ${users.find(u => u.id === selectedUserId)?.name || 'user'}'s system`
      });
      
      return newState;
    });
  };

  // Reset all commands
  const handleReset = () => {
    setCommands({
      pump: false,
      alarm: false,
      lights: false
    });
    
    toast({
      title: "All Systems Reset",
      description: "All emergency systems have been reset"
    });
    
    addNotification({
      userId: selectedUserId,
      type: 'info',
      title: 'Systems Reset',
      message: 'Fire station has reset all your emergency systems.'
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Remote Commands</h1>
        <p className="text-muted-foreground">Control emergency systems in connected homes</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Select Home</CardTitle>
              <CardDescription>
                Choose a home to send commands to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-select">Select Residence</Label>
                    <Select 
                      value={selectedUserId} 
                      onValueChange={setSelectedUserId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map(user => (
                          <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              <span>{user.name} - {user.address}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Controls</CardTitle>
              <CardDescription>
                Activate or deactivate emergency systems
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-water/10 flex items-center justify-center">
                    <Droplet className="h-5 w-5 text-water" />
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="pump-switch">Water Pump</Label>
                    <p className="text-sm text-muted-foreground">
                      Activate water pump to suppress fire
                    </p>
                  </div>
                </div>
                <Switch 
                  id="pump-switch"
                  checked={commands.pump}
                  onCheckedChange={() => handleCommandToggle('pump')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-alert/10 flex items-center justify-center">
                    <Bell className="h-5 w-5 text-alert" />
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="alarm-switch">Alarm System</Label>
                    <p className="text-sm text-muted-foreground">
                      Sound the emergency alarm
                    </p>
                  </div>
                </div>
                <Switch 
                  id="alarm-switch"
                  checked={commands.alarm}
                  onCheckedChange={() => handleCommandToggle('alarm')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-safe/10 flex items-center justify-center">
                    <Lightbulb className="h-5 w-5 text-safe" />
                  </div>
                  <div className="space-y-0.5">
                    <Label htmlFor="lights-switch">Emergency Lights</Label>
                    <p className="text-sm text-muted-foreground">
                      Activate emergency lighting system
                    </p>
                  </div>
                </div>
                <Switch 
                  id="lights-switch"
                  checked={commands.lights}
                  onCheckedChange={() => handleCommandToggle('lights')}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="outline" onClick={handleReset}>
                  Reset All Systems
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>
                Send a custom notification to the selected home
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="flex items-center gap-2 bg-alert hover:bg-alert/90"
                    onClick={() => {
                      addNotification({
                        userId: selectedUserId,
                        type: 'alert',
                        title: 'Emergency Alert',
                        message: 'Fire station has issued an emergency alert. Please follow evacuation protocols immediately.'
                      });
                      toast({
                        title: "Emergency Alert Sent",
                        description: `Alert sent to ${users.find(u => u.id === selectedUserId)?.name || 'user'}`
                      });
                    }}
                  >
                    <AlertTriangle className="h-4 w-4" />
                    Emergency Alert
                  </Button>
                  
                  <Button 
                    className="flex items-center gap-2 bg-safe hover:bg-safe/90"
                    onClick={() => {
                      addNotification({
                        userId: selectedUserId,
                        type: 'info',
                        title: 'All Clear',
                        message: 'Fire station has issued an all-clear notification. The emergency situation has been resolved.'
                      });
                      toast({
                        title: "All Clear Sent",
                        description: `Notification sent to ${users.find(u => u.id === selectedUserId)?.name || 'user'}`
                      });
                    }}
                  >
                    <Info className="h-4 w-4" />
                    All Clear
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CommandsPage;
