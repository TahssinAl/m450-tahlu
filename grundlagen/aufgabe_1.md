# Excercise 1


## A
System tests / End-to-end tests

What:
They test the complete system against the functional requirements.

How: E2E scripts (e.g., Cypress/Playwright/Selenium) interact with the GUI like a real user or call APIs directly. Test cases are derived from use cases.

## B
Unit Tests

What: Test a single small unit of code (e.g. one method or one class) in isolation.

How in practice: Written by developers using frameworks like JUnit in Java.

Each test creates the needed inputs, calls the method, and checks the result with assertions (e.g. assertEquals).

Run automatically on every build in a CI system (GitHub Actions).

## C
Regression Tests

What: Ensure that new changes do not break existing functionality.

How: Re-run existing automated test suites (unit, integration, system tests) after every change or before every release.

Compare results with previous runs; failures indicate regressions.

# Excercise 2

## Example of a software error (bug)

public boolean isAdult(int age) {
    return age > 18; // BUG
}

### Example of a software deficiency (requirement/quality deficiency)

A deficiency means the software does not meet the specified or expected requirements, even if the code is technically correct.

Example: A banking application shows balances only in full euros (no cents).
The implementation works exactly as programmed, but the requirement from the customer is to display amounts with two decimal places and to use precise rounding rules.
The behavior does not meet the requirement → software deficiency.

# Excercise 3

