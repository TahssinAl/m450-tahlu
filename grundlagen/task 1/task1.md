## Task 1 – Types of Tests (3 examples)
1. Unit Tests

What: Test single methods/classes in isolation.

Example: Testing a login() method with JUnit.

How: Run automatically in the IDE or CI (GitLab, Jenkins); external systems are mocked.

2. Integration Tests

What: Test if multiple components work together.

Example: API → Service → Database flow for a login.

How: Run against a test environment using HTTP calls or automated scripts.

3. System / End-to-End Tests

What: Test the entire system like a real user.

Example: Full webshop order process.

How: Manual clicking or automated tools (Selenium, Playwright).

---

## Software Error (in the code)

Example: Wrong conditional logic:
```
if (amount > 1000) rate = 0.1; 
else rate = 0.2;
```
(meant to be the opposite)

Software Defect (visible to the user)
Example: Webshop shows the wrong final price in the shopping cart.

High Damage Example

- Banking bug causing double transactions
- Medical dosage software error causing overdoses
- Navigation software error causing vehicle or rocket crash
