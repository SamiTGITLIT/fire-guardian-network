
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { 
  Home, 
  BookOpen, 
  Map, 
  Bell, 
  LogOut, 
  User, 
  Settings, 
  FireExtinguisher, 
  Info,
  AlertTriangle 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  active = false,
  badge
}) => {
  return (
    <Link 
      to={to} 
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm group transition-colors",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </Link>
  );
};

interface AppSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ 
  collapsed = false,
  onToggle 
}) => {
  const location = useLocation();
  const { currentUser, isFireStation, logout } = useAuth();
  const { unreadCount } = useNotifications();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Determine which items to show based on user type
  const userItems = [
    { icon: Home, label: 'Dashboard', to: '/' },
    { icon: BookOpen, label: 'Education', to: '/education' },
    { icon: Map, label: 'Area Map', to: '/map' }
  ];
  
  const stationItems = [
    { icon: Home, label: 'Station Dashboard', to: '/station' },
    { icon: Map, label: 'Area Map', to: '/map' }
  ];
  
  const navigationItems = isFireStation ? stationItems : userItems;

  return (
    <div className={cn(
      "h-screen flex flex-col border-r bg-card transition-all duration-300",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <FireExtinguisher className="h-6 w-6 text-fire" />
            <span className="font-bold text-lg">Fire Guardian</span>
          </div>
        )}
        
        {collapsed && (
          <div className="w-full flex justify-center">
            <FireExtinguisher className="h-6 w-6 text-fire" />
          </div>
        )}
        
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={onToggle}
          >
            <AlertTriangle className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* User info */}
      <div className={cn(
        "p-4 border-b flex",
        collapsed ? "justify-center" : "items-center gap-3"
      )}>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="h-4 w-4" />
        </div>
        
        {!collapsed && currentUser && (
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4 px-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <SidebarItem
              key={item.to}
              icon={item.icon}
              label={item.label}
              to={item.to}
              active={isActive(item.to)}
            />
          ))}
          
          <SidebarItem
            icon={Bell}
            label="Notifications"
            to="#notifications"
            badge={unreadCount}
          />
        </nav>
        
        <div className="mt-6 pt-6 border-t px-1">
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            to="#settings" 
          />
          
          <SidebarItem 
            icon={Info} 
            label="Help & Support" 
            to="#help" 
          />
          
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            <span>{collapsed ? '' : 'Logout'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
