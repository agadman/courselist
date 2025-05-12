# Moment 4, Angular II
Detta är en Angular-applikation skapad inom kursen “Programmering i TypeScript”, Moment 4.

Syftet med uppgiften var att träna på:
	•	Att hämta data via HTTP-anrop med HttpClient
	•	Använda services
	•	Presentera data i gränssnittet med databindning
	•	Filtrera och sortera data utan att ladda om sidan

## Funktionalitet
Applikationen hämtar kursdata från:
https://webbutveckling.miun.se/files/ramschema.json

Därefter visas kurserna i en tabell där användaren kan:
	•	Söka/filtera kurser med en sökfras (kod eller namn)
	•	Sortera kurser efter kurskod, namn eller progression (ej fallande/stigande)
	•	Visa länk till varje kurs kursplan

All uppdatering sker direkt i gränssnittet med Angulars databindning.

## Publicering
Applikationen är publicerad via Netlify: 