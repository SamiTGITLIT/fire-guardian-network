
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FireExtinguisher, Shield, Bell, Clock, Users, ThumbsUp } from 'lucide-react';

const AboutPage: React.FC = () => {
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
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div 
        className="space-y-12"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="text-center">
          <h1 className="text-4xl font-bold mb-4">About Fire Guardian Network</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Protecting homes and lives with cutting-edge fire detection and alert technology
          </p>
        </motion.div>

        <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground">
                Fire Guardian Network is dedicated to revolutionizing home fire safety 
                through advanced technology and real-time monitoring systems. We aim to 
                minimize property damage and save lives by providing immediate alerts 
                and response capabilities.
              </p>
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-2xl font-bold">Our Vision</h2>
              <p className="text-muted-foreground">
                We envision a world where fire-related tragedies are dramatically reduced
                through smart technology, education, and coordinated emergency response.
                Our goal is to make advanced fire safety accessible to every home and
                business.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={item} className="space-y-6">
          <h2 className="text-3xl font-bold text-center">How Our System Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-fire/10 rounded-full flex items-center justify-center">
                <Bell className="w-8 h-8 text-fire" />
              </div>
              <h3 className="text-xl font-semibold">Detection</h3>
              <p className="text-muted-foreground">
                Advanced sensors continuously monitor for smoke, heat, and unusual
                temperature patterns in your home.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-alert/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-alert" />
              </div>
              <h3 className="text-xl font-semibold">Real-Time Alerts</h3>
              <p className="text-muted-foreground">
                When a threat is detected, instant alerts are sent to both the homeowner
                and the nearest fire station simultaneously.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-safe/10 rounded-full flex items-center justify-center">
                <FireExtinguisher className="w-8 h-8 text-safe" />
              </div>
              <h3 className="text-xl font-semibold">Rapid Response</h3>
              <p className="text-muted-foreground">
                Fire stations can remotely activate safety systems while dispatching
                emergency response teams to your location.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="bg-muted/30 p-8 rounded-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Why Choose Fire Guardian</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex space-x-4">
              <div className="mt-1">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Advanced Technology</h3>
                <p className="text-muted-foreground">
                  Our system uses the latest sensor technology and machine learning
                  algorithms to detect fires at their earliest stages.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="mt-1">
                <Bell className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
                <p className="text-muted-foreground">
                  Receive alerts on your mobile device no matter where you are,
                  ensuring you're always informed about your home's safety.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="mt-1">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Professional Support</h3>
                <p className="text-muted-foreground">
                  Our team of safety experts provides ongoing support and system
                  maintenance to ensure optimal performance.
                </p>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <div className="mt-1">
                <ThumbsUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Peace of Mind</h3>
                <p className="text-muted-foreground">
                  Sleep better knowing that your home is protected 24/7 with
                  reliable fire detection and emergency response systems.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
