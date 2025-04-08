
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, InfoIcon, ArrowLeft, Activity, Trophy, Clock, Keyboard, Loader2 } from 'lucide-react';
import { getStats } from '@/services/typingResultsService';
import { useToast } from '@/components/ui/use-toast';

interface TestResult {
  id: string;
  created_at: string;
  wpm: number;
  accuracy: number;
  correct_chars: number;
  error_chars: number;
  total_chars: number;
  test_duration: number;
}

const Stats = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [results, setResults] = useState<TestResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [stats, setStats] = useState({
    averageWpm: 0,
    averageAccuracy: 0,
    bestWpm: 0,
    totalTests: 0
  });
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const statsData = await getStats();
        setStats({
          averageWpm: statsData.averageWpm,
          averageAccuracy: statsData.averageAccuracy,
          bestWpm: statsData.bestWpm,
          totalTests: statsData.totalTests
        });
        
        if (statsData.results) {
          setResults(statsData.results as TestResult[]);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast({
          title: "Feil ved lasting av statistikk",
          description: "Kunne ikke hente statistikken din. Prøv igjen senere.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [toast]);
  
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
    <div className="min-h-screen flex flex-col bg-background">
      <header className="py-4 md:py-6 border-b border-border/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex justify-between items-center">
          <h1 
            className="text-xl md:text-2xl font-bold glow-text cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <span className="text-foreground">Raske</span>
            <span className="text-primary">Fingre</span>
          </h1>
          <div className="flex gap-2 md:gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex gap-2 items-center" 
              onClick={() => navigate('/about')}
            >
              <InfoIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Om</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex gap-2 items-center" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Tilbake til test</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-xs tracking-wider">
            DIN FREMGANG
          </div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight glow-text mb-2">
            Skrivestatistikk
          </h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Følg fremgangen din og se hvordan skriveferdighetene dine forbedres
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              <Card className="futuristic-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary" />
                      Gjennomsnitt
                    </CardTitle>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                      <Activity className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Gjennomsnittlig OPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary glow-text">{stats.averageWpm} OPM</div>
                </CardContent>
              </Card>
              
              <Card className="futuristic-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      Rekord
                    </CardTitle>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                      <Trophy className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Din beste OPM</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary glow-text">{stats.bestWpm} OPM</div>
                </CardContent>
              </Card>
              
              <Card className="futuristic-card md:col-span-2 lg:col-span-1">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Nøyaktighet
                    </CardTitle>
                    <div className="h-8 w-8 flex items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardDescription>Total nøyaktighetsrate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary glow-text mb-2">{stats.averageAccuracy}%</div>
                  <Progress value={stats.averageAccuracy} className="h-2" />
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="history" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-secondary/40 border border-border/30 p-1">
                <TabsTrigger 
                  value="history" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Testhistorikk
                </TabsTrigger>
                <TabsTrigger 
                  value="progress" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-white"
                >
                  Fremgangsgraf
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="history" className="mt-6">
                <Card className="futuristic-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Keyboard className="h-5 w-5 text-primary" />
                        Nylige tester
                      </CardTitle>
                    </div>
                    <CardDescription>
                      {results.length > 0 
                        ? `Dine siste ${results.length} skrivetester` 
                        : 'Ingen testresultater funnet. Ta en test for å se dine resultater her!'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {results.length > 0 ? (
                      <div className="rounded-lg border border-border/30 overflow-hidden">
                        <div className="grid grid-cols-4 bg-secondary/60 p-3 text-sm font-medium">
                          <div>Dato</div>
                          <div className="text-center">OPM</div>
                          <div className="text-center">Nøyaktighet</div>
                          <div className="text-center">Tegn</div>
                        </div>
                        <div className="divide-y divide-border/30">
                          {results.map((result) => (
                            <div 
                              key={result.id} 
                              className="grid grid-cols-4 p-3 text-sm hover:bg-secondary/40 transition-colors"
                            >
                              <div className="text-muted-foreground">
                                {formatDate(result.created_at)}
                              </div>
                              <div className="text-center font-medium text-primary">{result.wpm}</div>
                              <div className="text-center">{result.accuracy}%</div>
                              <div className="text-center">{result.total_chars}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground bg-secondary/20 rounded-lg border border-border/30">
                        <Keyboard className="h-12 w-12 text-primary/50 mb-4" />
                        <p className="mb-4">Du har ikke gjennomført noen tester ennå.</p>
                        <Button 
                          variant="outline" 
                          onClick={() => navigate('/')}
                          className="flex items-center gap-2"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          Ta en test
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="progress" className="mt-6">
                <Card className="futuristic-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        Din fremgang
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Forbedring av skrivehastighet over tid
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center text-muted-foreground bg-secondary/20 rounded-lg border border-border/30">
                    <div className="text-center space-y-3">
                      <BarChart3 className="h-12 w-12 text-primary/50 mx-auto animate-pulse-glow" />
                      <p>Fremgangsgraf-visualisering vil være tilgjengelig snart.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              >
                <Keyboard className="mr-2 h-4 w-4" />
                Ta en ny test
              </Button>
            </div>
          </>
        )}
      </main>
      
      <footer className="py-4 md:py-6 border-t border-border/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>RaskeFingre Skrivetest &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Stats;
