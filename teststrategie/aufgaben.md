### Exercise 1 – Logical Test Cases (Abstract)

| ID | Condition on purchase price P (CHF)            | Expected discount | Type                     |
|----|-----------------------------------------------|-------------------|--------------------------|
| A1 | P < 15_000                                    | 0%                | Equivalence class (no discount) |
| A2 | P = 15_000                                    | 5%                | Boundary (lower bound 5%)      |
| A3 | 15_000 < P < 20_000                           | 5%                | Equivalence class (5%)         |
| A4 | P = 20_000                                    | 5%                | Boundary (upper bound 5%)      |
| A5 | 20_000 < P < 25_000                           | 7%                | Equivalence class (7%)         |
| A6 | P = 24_999 (or P → 25_000⁻)                   | 7%                | Boundary (upper bound 7%)      |
| A7 | P = 25_000                                    | 8.5%              | Boundary (lower bound 8.5%)    |
| A8 | P > 25_000                                    | 8.5%              | Equivalence class (8.5%)       |

### Exercise 1 – Concrete Test Cases

| ID | Purchase price P (CHF) | Expected discount | Expected discounted price (if needed) | Comment                                |
|----|------------------------|-------------------|---------------------------------------|----------------------------------------|
| C1 | 14_999                 | 0%                | 14_999.00                             | Just below 15,000 → no discount        |
| C2 | 15_000                 | 5%                | 14_250.00                             | Lower boundary for 5%                  |
| C3 | 18_000                 | 5%                | 17_100.00                             | Typical value in 5% range              |
| C4 | 20_000                 | 5%                | 19_000.00                             | Upper boundary for 5%                  |
| C5 | 22_000                 | 7%                | 20_460.00                             | Typical value in 7% range              |
| C6 | 24_999                 | 7%                | 23_249.07                             | Just below 25,000 → still 7%           |
| C7 | 25_000                 | 8.5%              | 22_875.00                             | Lower boundary for 8.5%                |
| C8 | 30_000                 | 8.5%              | 27_450.00                             | Typical value above 25,000             |

### Exercise 2 – Functional Black-Box Test Cases for a Car Rental Platform

| ID | Description                            | Precondition / Input                                                                                 | Test Steps                                                                                                               | Expected Result                                                                                   |
|----|----------------------------------------|-------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| T1 | Search returns available cars          | Dates: 2025-07-10 to 2025-07-15; Pickup location: Zurich; User not logged in                         | 1. Open start page. 2. Enter location + dates. 3. Click “Search”.                                                       | A list of available cars for Zurich and the given dates is displayed; no error message.          |
| T2 | Booking a car as registered user       | Existing user account; at least one car available for chosen dates                                   | 1. Log in with valid credentials. 2. Search for available cars. 3. Select a car. 4. Click “Book now”.                   | Booking confirmation page is shown with reservation number; booking appears in “My bookings”.    |
| T3 | Validation of invalid date range       | Pickup date later than return date (Pickup: 2025-07-20, Return: 2025-07-15)                          | 1. Open search form. 2. Enter pickup date after return date. 3. Click “Search”.                                         | No search is executed; an error message is displayed (“Return date must be after pickup date”).   |
| T4 | Credit card payment success            | Selected car in booking; valid credit card data                                                      | 1. Start booking checkout. 2. Enter valid credit card number, expiry date, CVV. 3. Confirm payment.                     | Payment is accepted; booking status becomes “Confirmed”; confirmation email is sent to the user. |
| T5 | Prevent booking if car is already taken| Two users simultaneously attempt to book the last available car for the same time period             | 1. User A and User B both search and select the same car. 2. User A finishes booking first. 3. User B tries to confirm. | User A’s booking succeeds. User B receives an error that the car is no longer available.         |



### Exercise 3 – Black-Box Test Cases (Console Application)

| ID | Description                                   | Preconditions                                                                 | Input / Steps                                                                                                                                                     | Expected Result                                                                                                                                                                                    |
|----|-----------------------------------------------|-------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| BB1| Create new account (valid data)               | Bank has 0 or more accounts                                                  | 1. Start app, Counter is created. 2. In main menu enter `e` to create account. 3. Enter last name `Miller`. 4. Enter currency `CHF`.                             | New account is created with currency CHF, balance 0. `printAccountDetails` shows a new account number, last name “Miller”, balance `0.00 CHF`.                                                    |
| BB2| Create account with invalid currency format   | Bank running                                                                  | 1. Main menu → `e`. 2. Last name `Smith`. 3. Currency input: `ch` (only 2 chars).                                                                               | Currency is rejected with “Ungültige Eingabe !” and user is asked again until they enter a valid 3-letter code. No account is created before valid input.                                        |
| BB3| Deposit money (valid amount)                  | At least one account exists with balance 100 CHF                              | 1. Main menu: enter that account’s number. 2. In account menu choose `e` (deposit). 3. Enter amount `50`.                                                        | Method `deposit` is executed; account balance becomes `150.00 CHF`; `printBalance` prints “Aktueller Kontostand: 150.00 CHF”.                                                                     |
| BB4| Withdraw money with sufficient funds          | Account balance is 200 CHF                                                    | 1. Select the account. 2. Account menu: `a` (withdraw). 3. Enter amount `50`.                                                                                    | Withdrawal succeeds, `withdraw` returns `true`; account balance is `150.00 CHF`; new balance is printed; no error message is shown.                                                               |
| BB5| Withdraw money with insufficient funds        | Account balance is 50 CHF                                                     | 1. Select the account. 2. Account menu: `a`. 3. Enter amount `100`.                                                                                               | `withdraw` returns `false`; `AccountExeption` is thrown and caught; message “Kontostand zu niedrig...” is printed; balance remains `50.00 CHF`.                                                   |
| BB6| Transfer between two accounts, same currency  | Account A: 300 CHF; Account B: 100 CHF; both in CHF                           | 1. Select account A. 2. Account menu: `ü` (transfer). 3. Enter B’s account number. 4. Enter amount `80`.                                                         | Amount 80 is withdrawn from A and deposited into B. New balances: A = 220 CHF, B = 180 CHF. `printBalance` of A shows the new balance; no error messages.                                         |

### 2. Methods used for White-Box Testing

We would test the following methods with JUnit:

- `Account.deposit(double amount)`
- `Account.withdraw(double amount)`
- `Account.getBalance()`
- `Bank.createAccount(String, Currency, double)`
- `Bank.getAccount(int nr)`
- `Bank.getNumberOfAccounts()`


### 3. Possible Improvements / Best Practices

- Separate user interface (class `Counter`) from business logic (`Bank`, `Account`), so that we can test logic without console input.
- Validate input also in business methods (e.g. amount must be positive).
