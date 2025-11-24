public class PriceCalculatorTest {

    private static boolean approx(double a, double b) {
        return Math.abs(a - b) < 1e-6;
    }

    public static boolean test_calculate_price() {

        boolean testOk = true;
        double price;
        double expected;

        // Test Case 1: no extras, no discount
        // base=1000, special=200, extra=300, extras=0, discount=0
        // expected = 1000 + 200 + 300 = 1500
        price = PriceCalculator.calculatePrice(1000, 200, 300, 0, 0);
        expected = 1500;
        if (!approx(price, expected)) {
            System.out.println("TC1 failed: expected " + expected + ", got " + price);
            testOk = false;
        }

        // Test Case 2: 3 extras -> 10% discount on extras
        // expected = 1000 + 200 + 300 * 0.90 = 1470
        price = PriceCalculator.calculatePrice(1000, 200, 300, 3, 0);
        expected = 1470;
        if (!approx(price, expected)) {
            System.out.println("TC2 failed: expected " + expected + ", got " + price);
            testOk = false;
        }

        // Test Case 3: 5 extras -> 15% discount on extras
        // expected = 1000 + 200 + 300 * 0.85 = 1455
        price = PriceCalculator.calculatePrice(1000, 200, 300, 5, 0);
        expected = 1455;
        if (!approx(price, expected)) {
            System.out.println("TC3 failed: expected " + expected + ", got " + price);
            testOk = false;
        }

        // Test Case 4: general discount 20% is higher than addon discount
        // extras=2 -> addon=0, discount=20
        // expected = base(1000 * 0.80) + 200 + extra(300 * 0.80) = 800 + 200 + 240 = 1240
        price = PriceCalculator.calculatePrice(1000, 200, 300, 2, 20);
        expected = 1240;
        if (!approx(price, expected)) {
            System.out.println("TC4 failed: expected " + expected + ", got " + price);
            testOk = false;
        }

        // Test Case 5: border value extras=4 (still 10% discount on extras)
        // expected = 1000 + 200 + 300 * 0.90 = 1470
        price = PriceCalculator.calculatePrice(1000, 200, 300, 4, 0);
        expected = 1470;
        if (!approx(price, expected)) {
            System.out.println("TC5 failed: expected " + expected + ", got " + price);
            testOk = false;
        }

        return testOk;
    }

    // Optional main method to run the tests
    public static void main(String[] args) {
        boolean ok = test_calculate_price();
        if (ok) {
            System.out.println("All tests passed.");
        } else {
            System.out.println("Some tests FAILED.");
        }
    }
}

