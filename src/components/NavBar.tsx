
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NotificationCenter from './NotificationCenter';
import { useAuth, useAutoLogin } from '@/context/AuthContext';
import { Logo } from './Logo';

interface NavBarProps {
  isPublic?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isPublic = false }) => {
  const { currentUser, isFireStation, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLoginClick = () => {
    navigate('/role-select');
  };

  return (
    <header className="bg-card border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Logo />
              <h1 className="text-xl font-bold hidden sm:block">Fire Guardian Network</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {isPublic ? (
              // Public navigation
              <nav className="flex items-center space-x-1">
                <Button
                  variant={isActive('/') ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link to="/">Home</Link>
                </Button>
                <Button
                  variant={isActive('/about') ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link to="/about">About</Link>
                </Button>
                <Button
                  variant={isActive('/contact') ? 'default' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link to="/contact">Contact</Link>
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  className="ml-2 bg-fire hover:bg-fire/90"
                  onClick={handleLoginClick}
                >
                  Login / Register
                </Button>
              </nav>
            ) : (
              // Authenticated navigation
              <>
                {currentUser || isFireStation ? (
                  <>
                    <div className="flex items-center space-x-4">
                      <nav className="hidden md:flex items-center space-x-1">
                        {isFireStation ? (
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
                        ) : null}
                      </nav>
                      <NotificationCenter />
                      <Button variant="outline" size="sm" onClick={() => {
                        logout();
                        navigate('/');
                      }}>
                        Logout
                      </Button>
                    </div>
                  </>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
