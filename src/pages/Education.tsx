
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { educationalContent } from '@/data/mockData';
import { Educational } from '@/types/types';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import { BookOpen, ThermometerSnowflake, AlertTriangle, Shield } from 'lucide-react';

const EducationPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [selectedContent, setSelectedContent] = useState<Educational | null>(null);

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Fire Safety Education</CardTitle>
            <CardDescription>
              Please login to access educational resources
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // Animation variants
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physics':
        return <ThermometerSnowflake className="w-6 h-6 text-primary" />;
      case 'technology':
        return <Shield className="w-6 h-6 text-safe" />;
      case 'safety':
        return <AlertTriangle className="w-6 h-6 text-alert" />;
      default:
        return <BookOpen className="w-6 h-6 text-primary" />;
    }
  };

  const renderContentList = (category: Educational['category']) => {
    const filteredContent = educationalContent.filter(
      content => content.category === category
    );

    return (
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredContent.map(content => (
          <motion.div key={content.id} variants={item}>
            <Card 
              className="cursor-pointer hover:border-primary/50 transition-colors h-full"
              onClick={() => setSelectedContent(content)}
            >
              <div className="aspect-video overflow-hidden rounded-t-lg relative">
                <img 
                  src={content.imageUrl} 
                  alt={content.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                  {getCategoryIcon(content.category)}
                  <span className="capitalize">{content.category}</span>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <CardDescription>{content.description}</CardDescription>
              </CardHeader>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  <span>Read article</span>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
        <p className="text-muted-foreground">Learn about fire safety, prevention, and emergency response</p>
      </div>

      {selectedContent ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <Card>
            <div className="aspect-video w-full md:max-h-[400px] overflow-hidden">
              <img 
                src={selectedContent.imageUrl} 
                alt={selectedContent.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(selectedContent.category)}
                    <span className="text-sm text-muted-foreground capitalize">
                      {selectedContent.category}
                    </span>
                  </div>
                  <CardTitle className="text-2xl">{selectedContent.title}</CardTitle>
                  <CardDescription>{selectedContent.description}</CardDescription>
                </div>
                <button 
                  onClick={() => setSelectedContent(null)}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Back to List
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
              
              {selectedContent.videoUrl && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Educational Video</h3>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted/30">
                    <iframe
                      width="100%"
                      height="100%"
                      src={selectedContent.videoUrl}
                      title={selectedContent.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground border-t">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Category: {selectedContent.category.charAt(0).toUpperCase() + selectedContent.category.slice(1)}
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-8">
          <Tabs defaultValue="physics" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="physics" className="flex items-center gap-2">
                <ThermometerSnowflake className="h-4 w-4" />
                <span className="hidden sm:inline">Physics of Fire</span>
                <span className="sm:hidden">Physics</span>
              </TabsTrigger>
              <TabsTrigger value="technology" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Detection Technology</span>
                <span className="sm:hidden">Technology</span>
              </TabsTrigger>
              <TabsTrigger value="safety" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="hidden sm:inline">Safety Planning</span>
                <span className="sm:hidden">Safety</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="physics">
              {renderContentList('physics')}
            </TabsContent>
            <TabsContent value="technology">
              {renderContentList('technology')}
            </TabsContent>
            <TabsContent value="safety">
              {renderContentList('safety')}
            </TabsContent>
          </Tabs>

          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle>How Our Fire Detection System Works</CardTitle>
              <CardDescription>
                Learn about the technology powering your home's fire safety
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This system detects fire using an IR flame sensor and responds using a pump, buzzer, and emergency lights.
                Our sensors continuously monitor for heat signatures and smoke particles, providing early detection of 
                potential fire hazards.
              </p>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted/30">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Fire Detection System Overview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EducationPage;
