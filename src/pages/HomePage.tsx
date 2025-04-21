
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAutoLogin } from '@/context/AuthContext';
import { motion } from 'framer-motion';

import { 
  Home, 
  Bell, 
  Info, 
  Shield, 
  AlertTriangle, 
  User, 
  FireExtinguisher, 
  Thermometer,
  CloudRain
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { loginAsUser, loginAsFireStation } = useAutoLogin();

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
            <div className="flex-1 text-center md:text-left">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-fire to-alert"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Fire Guardian Network
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Advanced fire detection and alert system protecting homes and businesses with real-time monitoring and rapid response technology.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  size="lg" 
                  className="bg-fire hover:bg-fire/90"
                  onClick={loginAsUser}
                >
                  Home User Access
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-fire text-fire hover:bg-fire/10"
                  onClick={loginAsFireStation}
                >
                  Fire Station Portal
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl">
                    <div className="w-full aspect-video bg-black/10 rounded-lg mb-6 overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-safe/20 to-alert/20 flex items-center justify-center">
                        <FireExtinguisher className="w-20 h-20 text-fire" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-2.5 bg-white/20 rounded-full w-3/4"></div>
                      <div className="h-2.5 bg-white/20 rounded-full"></div>
                      <div className="h-2.5 bg-white/20 rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Fire Guardian Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A seamless integration of advanced sensors, real-time alerts, and rapid response systems
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-safe/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Thermometer className="w-8 h-8 text-safe" />
                  </div>
                  <CardTitle>1. Advanced Detection</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Smart sensors continuously monitor temperature, smoke, and gas levels in your home
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-alert/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Bell className="w-8 h-8 text-alert" />
                  </div>
                  <CardTitle>2. Instant Alerts</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    When a threat is detected, automatic alerts are sent to homeowners and fire stations simultaneously
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-fire/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <FireExtinguisher className="w-8 h-8 text-fire" />
                  </div>
                  <CardTitle>3. Rapid Response</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Fire stations can remotely activate water systems and coordinate emergency response
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Portal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fire Guardian Network serves both homeowners and fire stations with specialized interfaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-full p-3">
                      <User className="w-6 h-6" />
                    </div>
                    <CardTitle>Home User Portal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-safe shrink-0 mt-0.5" />
                      <span>Monitor your home's fire safety status</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Bell className="w-5 h-5 text-alert shrink-0 mt-0.5" />
                      <span>Receive instant alerts and notifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CloudRain className="w-5 h-5 text-safe shrink-0 mt-0.5" />
                      <span>Control emergency systems remotely</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-safe shrink-0 mt-0.5" />
                      <span>Access fire safety educational resources</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={loginAsUser}>
                    Enter Home Portal
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-none shadow-lg h-full hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="bg-muted rounded-full p-3">
                      <FireExtinguisher className="w-6 h-6" />
                    </div>
                    <CardTitle>Fire Station Portal</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-fire shrink-0 mt-0.5" />
                      <span>Monitor all connected homes in your jurisdiction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Bell className="w-5 h-5 text-alert shrink-0 mt-0.5" />
                      <span>Receive emergency alerts in real-time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CloudRain className="w-5 h-5 text-safe shrink-0 mt-0.5" />
                      <span>Remotely activate emergency systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Home className="w-5 h-5 text-safe shrink-0 mt-0.5" />
                      <span>View detailed map of monitored locations</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-fire hover:bg-fire/90"
                    onClick={loginAsFireStation}
                  >
                    Enter Station Portal
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Safety Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Fire Safety Facts</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Early detection and rapid response save lives and property
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item}>
              <Card className="text-center border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-fire">3-4</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Minutes to escape</p>
                  <p className="text-sm text-muted-foreground">Average time to escape a house fire safely</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="text-center border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-fire">60%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Fire reduction</p>
                  <p className="text-sm text-muted-foreground">With automated early detection systems</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="text-center border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-fire">90%</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Home fires</p>
                  <p className="text-sm text-muted-foreground">Can be prevented with proper safety measures</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="text-center border-none shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-4xl font-bold text-fire">2x</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">Faster response</p>
                  <p className="text-sm text-muted-foreground">With automated alert systems to fire stations</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-fire/5 to-alert/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Home?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with Fire Guardian Network today and experience peace of mind with advanced fire safety technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-fire hover:bg-fire/90" onClick={loginAsUser}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = '#how-it-works'}>
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
