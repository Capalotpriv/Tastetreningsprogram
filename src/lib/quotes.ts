
// Collection of quotes for the typing test in Norwegian
const quotes = [
  "Den raske brune reven hopper over den late hunden.",
  "Livet er som å sykle. For å holde balansen må du fortsette å bevege deg.",
  "Suksess er ikke endelig, fiasko er ikke fatal: Det er motet til å fortsette som teller.",
  "Den eneste begrensningen for vår realisering av morgendagen vil være våre tvil i dag.",
  "I midten av vanskeligheter ligger muligheter.",
  "Tro at du kan, og du er halvveis der.",
  "Det virker alltid umulig inntil det er gjort.",
  "Du mister 100% av skuddene du ikke tar.",
  "Fremtiden tilhører dem som tror på skjønnheten i sine drømmer.",
  "Det spiller ingen rolle hvor sakte du går så lenge du ikke stopper.",
  "Den beste måten å forutsi fremtiden på er å skape den.",
  "Sinnet er alt. Det du tenker, blir du.",
  "Den eneste måten å gjøre godt arbeid på er å elske det du gjør.",
  "Hvis du vil oppnå storhet, slutt å be om tillatelse.",
  "Alle våre drømmer kan gå i oppfyllelse hvis vi har motet til å forfølge dem.",
  "Suksess er å gå fra fiasko til fiasko uten tap av entusiasme.",
  "Hvis du ikke er villig til å risikere det vanlige, må du nøye deg med det ordinære.",
  "Den vellykkede krigeren er den gjennomsnittlige mannen, med laserlignende fokus.",
  "Ikke se på klokken; gjør det den gjør. Fortsett.",
  "Forskjellen mellom ordinær og ekstraordinær er det lille ekstra.",
  "Jo hardere jeg jobber, jo heldigere blir jeg.",
  "Muligheter skjer ikke. Du skaper dem.",
  "Kvalitet er ikke en handling, det er en vane.",
  "Hemmeligheten ved å komme frem er å komme i gang.",
  "Det eneste stedet hvor suksess kommer før arbeid er i ordboken.",
  "Å skrive raskt er en ferdighet som kan utvikles med øvelse og tålmodighet.",
  "Hastigheten og nøyaktigheten din vil forbedres over tid med konsekvent øvelse.",
  "Fokuser på nøyaktighet først, deretter gradvis øk skrivehastigheten din.",
  "God holdning og riktig fingerplassering er avgjørende for effektiv skriving.",
  "Å lære å blindskrive uten å se på tastaturet vil betydelig forbedre hastigheten din.",
];

/**
 * Get a random quote from the collection
 */
export const getRandomQuote = (): string => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

/**
 * Calculate words per minute from characters typed and time elapsed
 */
export const calculateWPM = (charactersTyped: number, timeElapsedInSeconds: number): number => {
  // Using the standard 5 characters = 1 word
  const words = charactersTyped / 5;
  const minutes = timeElapsedInSeconds / 60;
  
  return Math.round(words / minutes);
};

/**
 * Calculate accuracy percentage
 */
export const calculateAccuracy = (correctChars: number, totalChars: number): number => {
  if (totalChars === 0) return 100;
  return Math.round((correctChars / totalChars) * 100);
};
