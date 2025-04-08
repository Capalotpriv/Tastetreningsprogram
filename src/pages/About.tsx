
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-primary cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className="text-foreground">Quick</span>Fingers
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/stats')}>
              Stats
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Back to Test
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About QuickFingers Typing Test</CardTitle>
              <CardDescription>
                Learn more about this typing speed test application
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">What is QuickFingers?</h3>
                <p className="mt-2 text-muted-foreground">
                  QuickFingers is a web application designed to help you measure and improve your typing speed and accuracy.
                  Whether you're a professional who types all day or just looking to improve your keyboard skills, this tool will help you track your progress.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">How It Works</h3>
                <p className="mt-2 text-muted-foreground">
                  Our typing test presents you with random quotes to type. As you type, the application measures your speed in Words Per Minute (WPM) and your typing accuracy.
                  The standard formula calculates one word as five characters, including spaces and punctuation.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Tips for Improving</h3>
                <ul className="mt-2 text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Focus on accuracy first, then speed will follow</li>
                  <li>Practice regularly, even just for a few minutes each day</li>
                  <li>Learn proper finger positioning (home row technique)</li>
                  <li>Try not to look at the keyboard while typing</li>
                  <li>Take breaks to avoid fatigue during long practice sessions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">About This Project</h3>
                <p className="mt-2 text-muted-foreground">
                  This project was built using React, TypeScript, and Tailwind CSS.
                  The application runs entirely in your browser and doesn't store any personal data.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => navigate('/')}>
              Start Typing Test
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>QuickFingers Typing Test &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
