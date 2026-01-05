## Übung 3 – Load Test mit Postman

### Tool
Wir haben Postman Collection Runner verwendet, um Lasttests auf das Backend zu machen.

### Vorgehen
- GET Request auf `/students`
- 1000 Iterationen ohne Delay


### Beobachtungen
- Alle Requests lieferten HTTP 200
- Antwortzeiten zwischen 5–20 ms
- Server blieb stabil
