
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, FireExtinguisher } from 'lucide-react';

const RoleSelectPage: React.FC = () => {
  const navigate = useNavigate();

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
        className="w-full max-w-4xl"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="text-center mb-10">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold mb-3"
            variants={item}
          >
            Select Your Account Type
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            variants={item}
          >
            Choose your role to access the appropriate dashboard
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full cursor-pointer hover:border-primary border-2" onClick={() => navigate('/login', { state: { role: 'user' } })}>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Individual User</CardTitle>
                <CardDescription>For homeowners and residents</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor your fire detection system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Receive alerts and notifications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Control emergency systems remotely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Access educational resources</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full">Continue as User</Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div 
            variants={item}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="h-full cursor-pointer hover:border-fire border-2" onClick={() => navigate('/login', { state: { role: 'station' } })}>
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 bg-fire/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FireExtinguisher className="w-8 h-8 text-fire" />
                </div>
                <CardTitle className="text-xl">Fire Station</CardTitle>
                <CardDescription>For fire departments and emergency services</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Monitor connected homes in your jurisdiction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Receive real-time emergency alerts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Activate emergency systems remotely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>View detailed map of monitored locations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-0">
                <Button className="w-full bg-fire hover:bg-fire/90">Continue as Fire Station</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelectPage;
