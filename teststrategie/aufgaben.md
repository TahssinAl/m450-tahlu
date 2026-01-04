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
