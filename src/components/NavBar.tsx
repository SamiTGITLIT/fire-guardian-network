
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationCenter from './NotificationCenter';
import { useAuth, useAutoLogin } from '@/context/AuthContext';
import { Logo } from './Logo';

const NavBar: React.FC = () => {
  const { currentUser, isFireStation, logout } = useAuth();
  const { loginAsUser, loginAsFireStation } = useAutoLogin();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Logo />
            <h1 className="text-xl font-bold hidden sm:block">Fire Guardian Network</h1>
          </div>

          <div className="flex items-center space-x-2">
            {currentUser || isFireStation ? (
              <>
                <div className="flex items-center space-x-4">
                  <nav className="hidden md:flex items-center space-x-1">
                    {!isFireStation ? (
                      <>
                        <Button
                          variant={isActive('/') ? 'default' : 'ghost'}
                          size="sm"
                          asChild
                        >
                          <Link to="/">Dashboard</Link>
                        </Button>
                        <Button
                          variant={isActive('/education') ? 'default' : 'ghost'}
                          size="sm"
                          asChild
                        >
                          <Link to="/education">Education</Link>
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant={isActive('/station') ? 'default' : 'ghost'}
                          size="sm"
                          asChild
                        >
                          <Link to="/station">Station Dashboard</Link>
                        </Button>
                        <Button
                          variant={isActive('/map') ? 'default' : 'ghost'}
                          size="sm"
                          asChild
                        >
                          <Link to="/map">Map View</Link>
                        </Button>
                      </>
                    )}
                  </nav>
                  <NotificationCenter />
                  <Button variant="outline" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button size="sm" onClick={loginAsUser}>
                  Demo: User Login
                </Button>
                <Button variant="outline" size="sm" onClick={loginAsFireStation}>
                  Demo: Station Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
