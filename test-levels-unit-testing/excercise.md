### JUnit 5 – Important Features

- **@Test**  
  Marks a method as a test. Example: `@Test void addsNumbers() { ... }`.

- **Assertions (Assertions class)**  
  - `assertEquals(expected, actual)` – values equal  
  - `assertTrue(condition)` / `assertFalse(condition)`  
  - `assertThrows(Exception.class, () -> code)` – expect an exception

- **Lifecycle: @BeforeEach / @AfterEach**  
  - `@BeforeEach` – runs before every test (e.g. create fresh Calculator)  
  - `@AfterEach` – cleanup after each test (close resources)

- **@BeforeAll / @AfterAll**  
  - Run once per test class (e.g. start/stop database or server). Methods must be `static`.

- **@Nested**  
  Group related tests inside an inner class for better structure.

- **Parameterized tests (@ParameterizedTest)**  
  Same test logic with different inputs, e.g. many numbers for the add method.

### Example use cases

- Small methods (like Calculator) → `@Test` + assertions.  
- Complex setup (database, web server) → `@BeforeAll`, `@AfterAll`.  
- Repeated patterns with many values → parameterized tests.

### Reference

- Official JUnit 5 User Guide:  
  https://junit.org/junit5/docs/current/user-guide/


# Banken Simulation – Kurzinfo

## Bank
- verwaltet Konten (TreeMap<String, Account>)
- erstellt Konten: Savings, PromoYouthSavings, Salary
- Methoden: create..., deposit(), withdraw(), getBalance(), print(), Top/Bottom5

## Account (abstract)
- Felder: id, balance, bookings
- Methoden: getId(), getBalance(), deposit(), withdraw(), print()
- Transaktionen nur in zeitlich richtiger Reihenfolge (canTransact)

## Booking
- speichert Betrag + Datum
- wird bei jeder Transaktion angelegt
- print() gibt Buchungszeile aus

## SalaryAccount
- erweitert Account
- hat creditLimit (Überzugslimite)
- withdraw() erlaubt Minus bis Grenze

## Savings / PromoYouthSavings
- Spezialkonten mit angepasstem Verhalten

## BankUtils
- Formatierung von Betrag & Datum

## Ablauf
1. Konto erstellen
2. Geld einzahlen / abheben
3. Auszüge drucken oder Top/Bottom anzeigen
