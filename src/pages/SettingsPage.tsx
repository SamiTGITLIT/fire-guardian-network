
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  
  const [profileForm, setProfileForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    appNotifications: true,
    soundAlerts: true,
  });
  
  const [systemSettings, setSystemSettings] = useState({
    automaticUpdates: true,
    dataSharing: false,
    darkMode: false,
    alarmSensitivity: 'medium',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Settings Updated",
      description: `Notification setting updated successfully.`
    });
  };

  const handleSystemToggle = (setting: keyof typeof systemSettings) => {
    if (typeof systemSettings[setting] === 'boolean') {
      setSystemSettings(prev => ({
        ...prev,
        [setting]: !prev[setting as keyof typeof systemSettings]
      }));
      
      toast({
        title: "Settings Updated",
        description: `System setting updated successfully.`
      });
    }
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
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={profileForm.address}
                          onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                        />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleProfileSubmit}>Save Changes</Button>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Configure how you receive alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-alerts">Email Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive important alerts via email
                      </p>
                    </div>
                    <Switch 
                      id="email-alerts"
                      checked={notificationSettings.emailAlerts}
                      onCheckedChange={() => handleNotificationToggle('emailAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-alerts">SMS Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive emergency alerts via text message
                      </p>
                    </div>
                    <Switch 
                      id="sms-alerts"
                      checked={notificationSettings.smsAlerts}
                      onCheckedChange={() => handleNotificationToggle('smsAlerts')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-notifications">App Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications in the app
                      </p>
                    </div>
                    <Switch 
                      id="app-notifications"
                      checked={notificationSettings.appNotifications}
                      onCheckedChange={() => handleNotificationToggle('appNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound-alerts">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Play sound for important notifications
                      </p>
                    </div>
                    <Switch 
                      id="sound-alerts"
                      checked={notificationSettings.soundAlerts}
                      onCheckedChange={() => handleNotificationToggle('soundAlerts')}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="system">
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Manage your system and application settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="automatic-updates">Automatic Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow the system to update automatically
                      </p>
                    </div>
                    <Switch 
                      id="automatic-updates"
                      checked={systemSettings.automaticUpdates as boolean}
                      onCheckedChange={() => handleSystemToggle('automaticUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-sharing">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Share anonymous usage data to improve our service
                      </p>
                    </div>
                    <Switch 
                      id="data-sharing"
                      checked={systemSettings.dataSharing as boolean}
                      onCheckedChange={() => handleSystemToggle('dataSharing')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme for the application
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode"
                      checked={systemSettings.darkMode as boolean}
                      onCheckedChange={() => handleSystemToggle('darkMode')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="alarm-sensitivity">Alarm Sensitivity</Label>
                    <div className="grid grid-cols-3 gap-2">
                      <Button 
                        variant={systemSettings.alarmSensitivity === 'low' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSystemSettings({...systemSettings, alarmSensitivity: 'low'})}
                      >
                        Low
                      </Button>
                      <Button 
                        variant={systemSettings.alarmSensitivity === 'medium' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSystemSettings({...systemSettings, alarmSensitivity: 'medium'})}
                      >
                        Medium
                      </Button>
                      <Button 
                        variant={systemSettings.alarmSensitivity === 'high' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSystemSettings({...systemSettings, alarmSensitivity: 'high'})}
                      >
                        High
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Adjust how sensitive your system is to potential fires
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
