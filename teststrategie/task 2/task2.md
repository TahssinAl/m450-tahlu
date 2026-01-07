# Solution – Software Testing Exercises

---

## Exercise 1 – Test Cases for the Sales Software (Discount Rules)

### Abstract Test Cases

| ID | Purchase Price (CHF) | Condition                         | Expected Discount |
|----|----------------------|-----------------------------------|------------------|
| A1 | price < 15’000       | price < 15’000                    | 0 %              |
| A2 | 15’000 ≤ price ≤ 20’000 | price ≥ 15’000 AND price ≤ 20’000 | 5 %              |
| A3 | 20’000 < price < 25’000 | price > 20’000 AND price < 25’000 | 7 %              |
| A4 | price ≥ 25’000       | price ≥ 25’000                    | 8.5 %            |

---

### Concrete Test Cases

| ID | Purchase Price (CHF) | Expected Discount |
|----|----------------------|------------------|
| C1 | 10’000               | 0 %              |
| C2 | 15’000               | 5 %              |
| C3 | 18’500               | 5 %              |
| C4 | 22’000               | 7 %              |
| C5 | 25’000               | 8.5 %            |
| C6 | 30’000               | 8.5 %            |

---

## Exercise 2 – Functional Black-Box Tests (Car Rental Website)

Example platform: **Online Car Rental Website**

### Functional Black-Box Test Cases

| ID | Description                     | Expected Result                                   | Effective Result | Status | Possible Cause                     |
|----|---------------------------------|--------------------------------------------------|------------------|--------|------------------------------------|
| 1  | Search available cars            | List of available cars is displayed               | Not tested       | Open   | Backend search service unavailable |
| 2  | Select rental dates              | Invalid dates are rejected                        | Not tested       | Open   | Missing input validation           |
| 3  | Book a car                       | Booking confirmation is shown                     | Not tested       | Open   | Payment or booking logic error     |
| 4  | User login                       | User is logged in successfully                    | Not tested       | Open   | Authentication service error       |
| 5  | Price calculation                | Correct total rental price is displayed           | Not tested       | Open   | Wrong pricing rules applied        |

---

## Exercise 3 – Bank Software Test Analysis

### Possible Black-Box Test Cases (User Perspective)

| ID | Description                         | Expected Result                          |
|----|-------------------------------------|------------------------------------------|
| BB1 | Create a new bank account            | Account is created successfully          |
| BB2 | Deposit money                        | Balance increases correctly              |
| BB3 | Withdraw money                       | Balance decreases correctly              |
| BB4 | Transfer money between accounts      | Amount is transferred correctly          |
| BB5 | Fetch exchange rate                  | Correct exchange rate is displayed       |

---

### Possible White-Box Test Cases (Code Level)

| Class / Method              | White-Box Test Idea                                   |
|----------------------------|-------------------------------------------------------|
| `Account.deposit()`        | Test correct balance update and edge cases            |
| `Account.withdraw()`       | Test insufficient balance handling                    |
| `Bank.transfer()`          | Test correct debit/credit logic                       |
| `ExchangeRateOkhttp.getExchangeRate()` | Test API response parsing and error handling          |
| `Counter.increment()`      | Test counter increase logic                           |

---

### General Code Improvements / Best Practices

- Add unit tests using JUnit for core business logic  
- Add input validation and meaningful error messages 
- Fix Typo: AccountExeption -> AccountException
- Remove Apikey in the code --> store in external file or as Environment variable
- (Remove commented code)