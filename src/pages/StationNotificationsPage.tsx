
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/context/NotificationContext';
import { useSensors } from '@/context/SensorContext';
import { AlertTriangle, Info, Bell, Check, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Notification } from '@/types/types';
import { users } from '@/data/mockData';

const StationNotificationsPage: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { activateWaterPump, triggerAlarm } = useSensors();
  
  // State to track which notification's details are shown
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Format date from ISO string
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Recently';
    }
  };

  const getUserById = (userId: string | undefined) => {
    if (!userId) return null;
    return users.find(user => user.id === userId);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-6 w-6 text-fire" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-alert" />;
      case 'info':
      default:
        return <Info className="h-6 w-6 text-primary" />;
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!notifications.find(n => n.id === id)?.isRead) {
        markAsRead(id);
      }
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  // Section for emergency actions on a notification
  const NotificationActions = ({ notification }: { notification: Notification }) => {
    const user = getUserById(notification.userId);
    
    if (!user) return null;

    const handleActivatePump = () => {
      activateWaterPump(notification.userId || '');
    };

    const handleSoundAlarm = () => {
      triggerAlarm(notification.userId || '');
    };

    return (
      <div className="mt-3 pt-3 border-t border-border/60 grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-water/5 text-water hover:text-water hover:bg-water/10"
          onClick={handleActivatePump}
        >
          Activate Water Pump
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-alert/5 text-alert hover:text-alert hover:bg-alert/10" 
          onClick={handleSoundAlarm}
        >
          Sound Alarm
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Fire Alerts & Notifications</h1>
          <p className="text-muted-foreground">Monitor and respond to emergency alerts from connected homes</p>
        </div>
        
        {notifications.length > 0 && (
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-4 md:mt-0"
            onClick={markAllAsRead}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length > 0 ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Alert Center</CardTitle>
                {unreadCount > 0 && (
                  <Badge variant="secondary">{unreadCount} unread</Badge>
                )}
              </div>
              <CardDescription>
                Respond to fire alerts and requests from connected homes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-250px)] pr-4">
                <div className="space-y-4">
                  {notifications.map((notification) => {
                    const user = getUserById(notification.userId);
                    const isExpanded = expandedId === notification.id;
                    
                    return (
                      <motion.div 
                        key={notification.id} 
                        variants={item}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          !notification.isRead ? 'bg-muted/30 border-primary/20' : 'bg-card border-border'
                        } ${isExpanded ? 'shadow-md' : ''}`}
                        onClick={() => toggleExpand(notification.id)}
                      >
                        <div className="flex gap-4">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-medium ${
                                !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                              }`}>
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 inline-block w-2 h-2 bg-primary rounded-full"></span>
                                )}
                              </h3>
                              <span className="text-xs text-muted-foreground">
                                {formatDate(notification.timestamp)}
                              </span>
                            </div>
                            <p className={`text-sm ${
                              !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {notification.message}
                            </p>
                            
                            {user && (
                              <div className="flex flex-wrap gap-3 mt-2">
                                {user && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <User className="mr-1 h-3 w-3" />
                                    {user.name}
                                  </div>
                                )}
                                {user && user.address && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {user.address}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {notification.type === 'alert' && user && (
                                  <NotificationActions notification={notification} />
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <Card className="w-full py-10">
          <CardContent className="flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No active alerts</h3>
            <p className="text-muted-foreground">
              When you receive emergency alerts or requests, they will appear here.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StationNotificationsPage;
