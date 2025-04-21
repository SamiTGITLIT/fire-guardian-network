
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { User, FireExtinguisher } from 'lucide-react';
import { users } from '@/data/mockData';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const role = location.state?.role || 'user';
  const isStation = role === 'station';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    homeId: isStation ? '' : 'HOME-' + Math.floor(1000 + Math.random() * 9000),
    stationId: isStation ? 'STATION-' + Math.floor(1000 + Math.random() * 9000) : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    // Simulating registration success
    toast({
      title: "Registration successful",
      description: `You've been registered as a ${isStation ? 'fire station' : 'user'}`,
    });
    
    // Login the user after successful registration
    if (isStation) {
      login('fs1', true);
      navigate('/station');
    } else {
      login('1', false);
      navigate('/dashboard');
    }
  };

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
    <div className="container mx-auto flex items-center justify-center min-h-[80vh] px-4">
      <motion.div 
        className="w-full max-w-md"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="border-2">
          <CardHeader className="space-y-1 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-2">
              {isStation ? (
                <FireExtinguisher className="w-8 h-8 text-fire" />
              ) : (
                <User className="w-8 h-8" />
              )}
            </div>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your information to register as a {isStation ? 'fire station' : 'user'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder={isStation ? "Fire Station Name" : "Your Full Name"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="email@example.com"
                  />
                </div>
                
                {!isStation && (
                  <div className="space-y-2">
                    <Label htmlFor="homeId">Home ID (Generated)</Label>
                    <Input 
                      id="homeId"
                      value={formData.homeId}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Your unique home identifier</p>
                  </div>
                )}
                
                {isStation && (
                  <div className="space-y-2">
                    <Label htmlFor="stationId">Station ID (Generated)</Label>
                    <Input 
                      id="stationId"
                      value={formData.stationId}
                      disabled
                    />
                    <p className="text-xs text-muted-foreground">Your unique station identifier</p>
                  </div>
                )}

                <Button type="submit" className="w-full">Register</Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" state={{ role }} className="underline text-primary hover:text-primary/80">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
