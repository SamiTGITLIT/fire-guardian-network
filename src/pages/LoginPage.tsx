
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { users } from '@/data/mockData';
import { FireExtinguisher, Shield } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (activeTab === 'login') {
        // Check if user exists
        const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase());
        
        if (user) {
          // Successful login
          login(user.id, false);
          navigate('/');
          toast({
            title: 'Login successful',
            description: `Welcome back, ${user.name}`,
          });
        } else {
          toast({
            title: 'Login failed',
            description: 'Email or password is incorrect',
            variant: 'destructive',
          });
        }
      } else {
        // Registration - in a real app this would add a new user
        toast({
          title: 'Registration successful',
          description: 'Your account has been created. You can now log in.',
        });
        setActiveTab('login');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
      <div className="flex items-center mb-8">
        <FireExtinguisher className="h-10 w-10 text-fire mr-3" />
        <h1 className="text-3xl font-bold">Fire Guardian Network</h1>
      </div>

      <Tabs 
        defaultValue="login" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full max-w-md"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <Card className="border-none shadow-lg">
          <TabsContent value="login">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>
                  Sign in to your Fire Guardian account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>For demo purposes, use:</p>
                  <p>Email: john@example.com</p>
                  <p>Password: password123</p>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Don't have an account?{' '}
                  </span>
                  <button
                    type="button"
                    className="underline text-primary font-medium"
                    onClick={() => setActiveTab('register')}
                  >
                    Register
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Register to start protecting your home
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-destructive text-sm">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register('password')}
                  />
                  {errors.password && (
                    <p className="text-destructive text-sm">{errors.password.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
                <div className="text-center text-sm">
                  <span className="text-muted-foreground">
                    Already have an account?{' '}
                  </span>
                  <button
                    type="button"
                    className="underline text-primary font-medium"
                    onClick={() => setActiveTab('login')}
                  >
                    Sign in
                  </button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Card>
      </Tabs>

      <div className="mt-12 flex items-center gap-8">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            login('1', false);
            navigate('/');
          }}
        >
          <User className="h-4 w-4" />
          <span>Demo User Login</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => {
            login('fs1', true);
            navigate('/station');
          }}
        >
          <FireExtinguisher className="h-4 w-4" />
          <span>Demo Station Login</span>
        </Button>
      </div>

      <footer className="mt-auto py-6 text-center text-sm text-muted-foreground">
        <p>© 2023 Fire Guardian Network. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
