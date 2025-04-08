
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, InfoIcon, ArrowLeft, Keyboard, CheckCircle, Zap, Clock, Brain } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  
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
              onClick={() => navigate('/stats')}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Statistikk</span>
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
        <div className="max-w-2xl mx-auto">
          <Card className="futuristic-card overflow-hidden">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <InfoIcon className="h-10 w-10 text-primary animate-pulse-glow" />
              </div>
              <CardTitle className="text-2xl glow-text text-center">Om RaskeFingre Skrivetest</CardTitle>
              <CardDescription className="text-center">
                Lær mer om denne skrivehastighetstesten
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="neon-border p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 text-primary mb-3">
                  <Keyboard className="h-5 w-5" />
                  Hva er RaskeFingre?
                </h3>
                <p className="text-muted-foreground">
                  RaskeFingre er en nettapplikasjon designet for å hjelpe deg med å måle og forbedre skrivehastigheten og nøyaktigheten din.
                  Enten du er en profesjonell som skriver hele dagen eller bare ønsker å forbedre tastaturferdighetene dine, vil dette verktøyet hjelpe deg med å følge fremgangen din.
                </p>
              </div>
              
              <div className="neon-border p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 text-primary mb-3">
                  <Clock className="h-5 w-5" />
                  Hvordan det fungerer
                </h3>
                <p className="text-muted-foreground">
                  Skrivetesten vår presenterer tilfeldige sitater du skal skrive. Mens du skriver, måler applikasjonen hastigheten din i ord per minutt (OPM) og skrivenøyaktigheten din.
                  Standardformelen beregner ett ord som fem tegn, inkludert mellomrom og tegnsetting.
                </p>
              </div>
              
              <div className="neon-border p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 text-primary mb-3">
                  <Zap className="h-5 w-5" />
                  Tips for forbedring
                </h3>
                <ul className="text-muted-foreground space-y-3 list-none pl-0">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Fokuser på nøyaktighet først, så vil hastigheten følge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Øv regelmessig, selv bare i noen minutter hver dag</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Lær riktig fingerplassering (home row-teknikk)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Prøv å ikke se på tastaturet mens du skriver</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Ta pauser for å unngå tretthet under lange øvingsøkter</span>
                  </li>
                </ul>
              </div>
              
              <div className="neon-border p-4">
                <h3 className="text-lg font-medium flex items-center gap-2 text-primary mb-3">
                  <Brain className="h-5 w-5" />
                  Om dette prosjektet
                </h3>
                <p className="text-muted-foreground">
                  Dette prosjektet ble bygget med React, TypeScript og Tailwind CSS.
                  Applikasjonen kjører helt i nettleseren din og lagrer ikke personlige data.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              <Keyboard className="mr-2 h-4 w-4" />
              Start skrivetest
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="py-4 md:py-6 border-t border-border/30">
        <div className="container text-center text-sm text-muted-foreground">
          <p>RaskeFingre Skrivetest &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
