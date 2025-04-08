
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
            <span className="text-foreground">Raske</span>Fingre
          </h1>
          <div className="flex gap-4">
            <Button variant="ghost" onClick={() => navigate('/stats')}>
              Statistikk
            </Button>
            <Button variant="outline" onClick={() => navigate('/')}>
              Tilbake til test
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Om RaskeFingre Skrivetest</CardTitle>
              <CardDescription>
                Lær mer om denne skrivehastighetstesten
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Hva er RaskeFingre?</h3>
                <p className="mt-2 text-muted-foreground">
                  RaskeFingre er en nettapplikasjon designet for å hjelpe deg med å måle og forbedre skrivehastigheten og nøyaktigheten din.
                  Enten du er en profesjonell som skriver hele dagen eller bare ønsker å forbedre tastaturferdighetene dine, vil dette verktøyet hjelpe deg med å følge fremgangen din.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Hvordan det fungerer</h3>
                <p className="mt-2 text-muted-foreground">
                  Skrivetesten vår presenterer tilfeldige sitater du skal skrive. Mens du skriver, måler applikasjonen hastigheten din i ord per minutt (OPM) og skrivenøyaktigheten din.
                  Standardformelen beregner ett ord som fem tegn, inkludert mellomrom og tegnsetting.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Tips for forbedring</h3>
                <ul className="mt-2 text-muted-foreground space-y-2 list-disc pl-5">
                  <li>Fokuser på nøyaktighet først, så vil hastigheten følge</li>
                  <li>Øv regelmessig, selv bare i noen minutter hver dag</li>
                  <li>Lær riktig fingerplassering (home row-teknikk)</li>
                  <li>Prøv å ikke se på tastaturet mens du skriver</li>
                  <li>Ta pauser for å unngå tretthet under lange øvingsøkter</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Om dette prosjektet</h3>
                <p className="mt-2 text-muted-foreground">
                  Dette prosjektet ble bygget med React, TypeScript og Tailwind CSS.
                  Applikasjonen kjører helt i nettleseren din og lagrer ikke personlige data.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Button size="lg" onClick={() => navigate('/')}>
              Start skrivetest
            </Button>
          </div>
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

export default About;
