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

- **@DisplayName**  
  Gives a readable name for a test in reports/IDE.

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
