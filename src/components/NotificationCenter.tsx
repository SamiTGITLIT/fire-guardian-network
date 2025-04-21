
import React from 'react';
import { Bell, CheckCircle } from 'lucide-react';
import { Notification } from '@/types/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/context/NotificationContext';
import { cn } from '@/lib/utils';

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { markAsRead } = useNotifications();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className={cn(
      'border-b last:border-0 p-3 transition-colors',
      notification.isRead ? 'bg-background' : 'bg-muted/30'
    )}>
      <div className="flex justify-between items-start mb-1">
        <Badge variant={
          notification.type === 'alert' ? 'destructive' : 
          notification.type === 'warning' ? 'default' : 'secondary'
        }>
          {notification.type}
        </Badge>
        <span className="text-xs text-muted-foreground">
          {formatDate(notification.timestamp)}
        </span>
      </div>
      
      <h4 className="font-medium text-sm">{notification.title}</h4>
      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
      
      {!notification.isRead && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs" 
          onClick={() => markAsRead(notification.id)}
        >
          <CheckCircle className="h-3 w-3 mr-1" /> Mark as read
        </Button>
      )}
    </div>
  );
};

const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Card className="border-0">
          <CardHeader className="py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={markAllAsRead}
                >
                  Mark all read
                </Button>
              )}
            </div>
            <CardDescription>
              {notifications.length === 0 
                ? 'No notifications' 
                : `You have ${unreadCount} unread notifications`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  Your notifications will appear here
                </div>
              ) : (
                notifications.map(notification => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))
              )}
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t py-2 px-4 text-xs text-muted-foreground">
            Notification center
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationCenter;
