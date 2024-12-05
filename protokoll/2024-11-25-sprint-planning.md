# Sprint planning 2024-11-25

## Närvarande

- Magnus
- Kim
- Johan

## Planering

- Vi borde implementera så kunder kan lägga en beställning.
- Ska de kunna skapa konto? Ja, det ska inte vara något problem. Möjlighet att editera profil kan kanske lösas denna vecka också.
- Vi skapar en issue för valideringen. (till databasen, så man inte kan skicka en tom order eller liknande), kan man använda JOI ihop med mongoose?
- "Make it work, then make it better".
- Bra att skriva upp de buggar man hittar, eller de småpunkter som kanske inte är så lätt att lösa på en gång men kan tas itu med senare.
- Order sidan, när man trycker på kundkorgen, behöver fixas och stylas upp.
- About-sidan behöver kolals över, specifikt placeholder bilden.
- Adresserna för "Client" och "Business" har kommit upp live, roligt att se det igång.

## Summering för vecka 48

Vår plan är att, i fontenden, ha färdigställt

- Som kund ska du kunna lägga en beställning
- Med Socket.io ska man kunna hålla koll på beställningen, både för kund och personal.
- Som personal ska man kunna se lagersaldo och kunna korrigera inventarie för varje ingrediens.

När det gäller backend, så är planen att färdigställa

- Validering av order, så den sker på rätt sätt.
- Implementera inventarie i databasen.
