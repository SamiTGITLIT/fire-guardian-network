
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { SensorProvider } from "./context/SensorContext";

import NavBar from "./components/NavBar";
import AppSidebar from "./components/AppSidebar";
import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Education from "./pages/Education";
import StationDashboard from "./pages/StationDashboard";
import MapView from "./pages/MapView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Layout component for authenticated routes
const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, isFireStation } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!currentUser && !isFireStation) {
    return <Navigate to="/login" />;
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

// The main App component
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationProvider>
          <SensorProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                
                {/* Protected routes */}
                <Route path="/" element={<PrivateRoute element={<Index />} />} />
                <Route path="/education" element={<PrivateRoute element={<Education />} />} />
                <Route path="/station" element={<PrivateRoute element={<StationDashboard />} />} />
                <Route path="/map" element={<PrivateRoute element={<MapView />} />} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SensorProvider>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
