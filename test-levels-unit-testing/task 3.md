## Task 1 



## Task 2 

@Test → marks a unit test
Example: test deposit() increases balance.

Assertions (assertEquals, assertTrue, assertThrows, assertAll) → verify expected behavior
Example: assertThrows(IllegalArgumentException.class, () -> calc.div(1,0))

Lifecycle: @BeforeEach, @AfterEach, @BeforeAll, @AfterAll → setup/cleanup
Example: create a fresh Bank before each test.

@DisplayName → readable test names
Example: “Withdraw should fail if balance is too low”.

Parameterized tests: @ParameterizedTest + @ValueSource / @CsvSource / @MethodSource
Example: test multiple deposit amounts in one test.

@Disabled → temporarily skip tests
Example: skip a flaky I/O test (should be rare).

@Tag → categorize tests (fast/slow)
Example: tag “integration” vs “unit”.

Reference (choose one)
https://junit.org/junit5/docs/current/user-guide/


Task 3 – Bank Simulation (Markdown bullets, based on your files)

- Main creates a Bank and starts the interactive menu (Counter).

- Counter is the CLI controller: it shows menus, reads user input, and calls Bank / Account methods (create, deposit, withdraw, transfer, print).

- Bank stores all accounts in an ArrayList<Account>.

 - createAccount(...) creates an Account, adds it to the list, and returns it.

 - getAccount(id) searches the list and returns the matching account or null.

 - deleteAccount(account) removes it from the list (prints a message).

 - Print methods only output information (no business logic).

- Account represents one bank account with id, userLastName, currency, balance.

 - deposit(amount) increases balance.

 - withdraw(amount) decreases balance only if enough money exists, else returns false.

 - printBalance() prints formatted balance.

 - pseudoDeleteAccount() clears fields (not used by Bank.deleteAccount()).

 - IDs are auto-incremented via static counter.

- ExchangeRateOkhttp calls an external API (OkHttp) and parses JSON (Gson).

 - Returns the result rate, or 0.0 if an exception happens.