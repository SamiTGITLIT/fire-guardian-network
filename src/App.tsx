
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SensorProvider } from "./context/SensorContext";

import NavBar from "./components/NavBar";
import AppSidebar from "./components/AppSidebar";
import HomePage from "./pages/HomePage";
import UserDashboard from "./pages/UserDashboard";
import LoginPage from "./pages/LoginPage";
import RoleSelectPage from "./pages/RoleSelectPage";
import RegisterPage from "./pages/RegisterPage";
import Education from "./pages/Education";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";
import StationDashboard from "./pages/StationDashboard";
import MapView from "./pages/MapView";
import StationNotificationsPage from "./pages/StationNotificationsPage";
import CommandsPage from "./pages/CommandsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout component for authenticated routes
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isFireStation } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!currentUser && !isFireStation) {
    return <Navigate to="/login" />;
  }

  // Redirect fire station users to station dashboard if trying to access user dashboard
  if (isFireStation && location.pathname === '/dashboard') {
    return <Navigate to="/station" />;
  }

  // Redirect regular users to user dashboard if trying to access station dashboard
  if (!isFireStation && currentUser && location.pathname === '/station') {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex min-h-screen">
      {!isFireStation && (
        <AppSidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      )}
      <main className="flex-1 flex flex-col">
        {isFireStation && <NavBar />}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

// PrivateRoute component for auth protection
const PrivateRoute = ({ element }: { element: React.ReactNode }) => {
  return <AuthenticatedLayout>{element}</AuthenticatedLayout>;
};

// Public Layout for public pages with navbar
const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar isPublic={true} />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

// The main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationProvider>
          <SensorProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
              <Route path="/role-select" element={<PublicLayout><RoleSelectPage /></PublicLayout>} />
              <Route path="/login" element={<PublicLayout><LoginPage /></PublicLayout>} />
              <Route path="/register" element={<PublicLayout><RegisterPage /></PublicLayout>} />
              
              {/* Protected user routes */}
              <Route path="/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
              <Route path="/education" element={<PrivateRoute element={<Education />} />} />
              <Route path="/notifications" element={<PrivateRoute element={<NotificationsPage />} />} />
              <Route path="/settings" element={<PrivateRoute element={<SettingsPage />} />} />
              
              {/* Protected fire station routes */}
              <Route path="/station" element={<PrivateRoute element={<StationDashboard />} />} />
              <Route path="/map" element={<PrivateRoute element={<MapView />} />} />
              <Route path="/station-notifications" element={<PrivateRoute element={<StationNotificationsPage />} />} />
              <Route path="/commands" element={<PrivateRoute element={<CommandsPage />} />} />
              
              {/* Fallback route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SensorProvider>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
