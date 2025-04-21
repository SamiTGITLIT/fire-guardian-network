
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { educationalContent } from '@/data/mockData';
import { Educational } from '@/types/types';
import { useAuth } from '@/context/AuthContext';

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

  const renderContentList = (category: Educational['category']) => {
    const filteredContent = educationalContent.filter(
      content => content.category === category
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredContent.map(content => (
          <Card 
            key={content.id} 
            className="cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => setSelectedContent(content)}
          >
            <div className="aspect-video overflow-hidden rounded-t-lg">
              <img 
                src={content.imageUrl} 
                alt={content.title} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{content.title}</CardTitle>
              <CardDescription>{content.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
        <p className="text-muted-foreground">Learn about fire safety, prevention, and emergency response</p>
      </div>

      {selectedContent ? (
        <div className="mb-6">
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
            <CardContent>
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedContent.content }} />
              
              {selectedContent.videoUrl && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Educational Video</h3>
                  <div className="aspect-video rounded-lg overflow-hidden">
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
              Category: {selectedContent.category.charAt(0).toUpperCase() + selectedContent.category.slice(1)}
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Tabs defaultValue="physics" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="physics">Physics of Fire</TabsTrigger>
            <TabsTrigger value="technology">Detection Technology</TabsTrigger>
            <TabsTrigger value="safety">Safety Planning</TabsTrigger>
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
      )}
    </div>
  );
};

export default EducationPage;
