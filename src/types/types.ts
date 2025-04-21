
// User type
export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  hasSystem: boolean;
  sensorsInstalled: number;
  systemStatus: 'active' | 'inactive' | 'maintenance';
}

// Sensor type
export interface Sensor {
  id: string;
  userId: string;
  location: string;
  status: 'normal' | 'warning' | 'danger';
  batteryLevel: number;
  temperature: number;
  smokeLevel: number;
  lastUpdated: string;
}

// Notification type
export interface Notification {
  id: string;
  userId?: string;
  stationId?: string;
  type: 'info' | 'warning' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

// Fire Station type
export interface FireStation {
  id: string;
  name: string;
  address: string;
  phone: string;
  jurisdiction: string;
  staff: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Educational Content type
export interface Educational {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  videoUrl: string;
  category: 'physics' | 'safety' | 'technology' | 'general';
}

// Auth Context type
export interface AuthContextType {
  currentUser: User | null;
  isFireStation: boolean;
  login: (userId: string, isStation: boolean) => void;
  logout: () => void;
}
