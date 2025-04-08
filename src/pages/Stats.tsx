
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TestResult {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  characters: number;
}

const mockResults: TestResult[] = [
  { id: '1', date: '2023-09-15T10:30:00', wpm: 65, accuracy: 94, characters: 320 },
  { id: '2', date: '2023-09-14T16:45:00', wpm: 58, accuracy: 91, characters: 287 },
  { id: '3', date: '2023-09-12T14:20:00', wpm: 72, accuracy: 88, characters: 350 },
  { id: '4', date: '2023-09-10T09:15:00', wpm: 61, accuracy: 92, characters: 305 },
  { id: '5', date: '2023-09-08T19:50:00', wpm: 67, accuracy: 95, characters: 330 },
];

const Stats = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  
  useEffect(() => {
    // In a real app, we'd fetch data from localStorage or a backend
    // For now, we'll use mock data
    setResults(mockResults);
  }, []);
  
  const averageWpm = results.length > 0
    ? Math.round(results.reduce((sum, result) => sum + result.wpm, 0) / results.length)
    : 0;
    
  const averageAccuracy = results.length > 0
    ? Math.round(results.reduce((sum, result) => sum + result.accuracy, 0) / results.length)
    : 0;
    
  const bestWpm = results.length > 0
    ? Math.max(...results.map(result => result.wpm))
    : 0;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nb-NO', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 border-b">
        <div className="container flex justify-between items-center">
          <h1 
            className="text-2xl font-bold text-primary cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className="text-foreground">Raske</span>Fingre
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/about')}>
              Om
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Tilbake til test
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Din Skrivestatistikk</h2>
          <p className="text-muted-foreground mt-2">
            Følg fremgangen din og se hvordan skriveferdighetene dine forbedres
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gjennomsnittlig hastighet</CardTitle>
              <CardDescription>Gjennomsnittlig OPM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{averageWpm} OPM</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Beste hastighet</CardTitle>
              <CardDescription>Din rekord OPM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{bestWpm} OPM</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Gjennomsnittlig nøyaktighet</CardTitle>
              <CardDescription>Total nøyaktighetsrate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{averageAccuracy}%</div>
              <Progress value={averageAccuracy} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="history">Testhistorikk</TabsTrigger>
            <TabsTrigger value="progress">Fremgangsgraf</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Nylige tester</CardTitle>
                <CardDescription>
                  Dine siste {results.length} skrivetester
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-4 bg-muted p-3 text-sm font-medium">
                    <div>Dato</div>
                    <div className="text-center">OPM</div>
                    <div className="text-center">Nøyaktighet</div>
                    <div className="text-center">Tegn</div>
                  </div>
                  {results.map((result) => (
                    <div 
                      key={result.id} 
                      className="grid grid-cols-4 p-3 text-sm border-t"
                    >
                      <div className="text-muted-foreground">
                        {formatDate(result.date)}
                      </div>
                      <div className="text-center font-medium">{result.wpm}</div>
                      <div className="text-center">{result.accuracy}%</div>
                      <div className="text-center">{result.characters}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Din fremgang</CardTitle>
                <CardDescription>
                  Forbedring av skrivehastighet over tid
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center text-muted-foreground">
                Fremgangsgraf-visualisering vil være tilgjengelig snart.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-8 text-center">
          <Button size="lg" onClick={() => navigate('/')}>
            Ta en ny test
          </Button>
        </div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container text-center text-sm text-muted-foreground">
          <p>RaskeFingre Skrivetest &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Stats;
