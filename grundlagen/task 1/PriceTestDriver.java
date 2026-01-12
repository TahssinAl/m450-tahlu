public class PriceTestDriver {

    public static void main(String[] args) {
        System.out.println("Test 1: " + test1());
        System.out.println("Test 2: " + test2());
    }

    static boolean test1() {
        double price = calculatePrice(20000, 0, 0, 0, 0);
        return price == 20000;
    }
 
    static boolean test2() {
        double price = calculatePrice(30000, 0, 0, 0, 10);
        return Math.abs(price - 27000) < 0.01;
    }

    static double calculatePrice(double base, double special, double extra, int extras, double discount) {
        double addon_discount;
        if (extras >= 3) addon_discount = 10;
        else if (extras >= 5) addon_discount = 15;
        else addon_discount = 0;

        if (discount > addon_discount) addon_discount = discount;

        return base * (100 - discount) / 100.0
             + special
             + extra * (100 - addon_discount) / 100.0;
    }
}
