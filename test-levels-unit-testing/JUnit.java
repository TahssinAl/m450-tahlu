// Calculator and its JUnit 5 tests in one snippet.
// Put Calculator into src/main/java and CalculatorTest into src/test/java.

public class Calculator {

    public double add(double a, double b) {
        return a + b;
    }

    public double subtract(double a, double b) {
        return a - b;
    }

    public double multiply(double a, double b) {
        return a * b;
    }

    public double divide(double a, double b) {
        if (b == 0.0) {
            throw new IllegalArgumentException("Division by zero");
        }
        return a / b;
    }
}

// --------- JUnit 5 test class ----------

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

    private final Calculator calc = new Calculator();

    @Test
    void add_twoPositiveNumbers() {
        assertEquals(5.0, calc.add(2.0, 3.0));
    }

    @Test
    void add_withNegativeNumber() {
        assertEquals(-1.0, calc.add(2.0, -3.0));
    }

    @Test
    void subtract_simple() {
        assertEquals(1.0, calc.subtract(4.0, 3.0));
    }

    @Test
    void multiply_simple() {
        assertEquals(12.0, calc.multiply(3.0, 4.0));
    }

    @Test
    void multiply_withZero() {
        assertEquals(0.0, calc.multiply(5.0, 0.0));
    }

    @Test
    void divide_simple() {
        assertEquals(2.5, calc.divide(5.0, 2.0));
    }

    @Test
    void divide_byZero_throwsException() {
        assertThrows(IllegalArgumentException.class,
                () -> calc.divide(5.0, 0.0));
    }
}
