import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

// Class to manage the bank system operations
class BankManagementSystem {
    private Map<String, BankAccount> accounts = new HashMap<>();
    private Scanner scanner = new Scanner(System.in);

    // Method to open a new account
    public void openAccount() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine();
        System.out.print("Enter account holder name: ");
        String accountHolder = scanner.nextLine();
        System.out.print("Enter initial balance: ");
        double initialBalance = scanner.nextDouble();
        scanner.nextLine();  // Consume newline

        if (accounts.containsKey(accountNumber)) {
            System.out.println("Account already exists.");
        } else {
            BankAccount account = new BankAccount(accountNumber, accountHolder, initialBalance);
            accounts.put(accountNumber, account);
            System.out.println("Account created successfully.");
        }
    }

    // Method to deposit money into an account
    public void depositMoney() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine();
        if (accounts.containsKey(accountNumber)) {
            System.out.print("Enter amount to deposit: ");
            double amount = scanner.nextDouble();
            scanner.nextLine();  // Consume newline
            accounts.get(accountNumber).deposit(amount);
        } else {
            System.out.println("Account not found.");
        }
    }

    // Method to withdraw money from an account
    public void withdrawMoney() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine();
        if (accounts.containsKey(accountNumber)) {
            System.out.print("Enter amount to withdraw: ");
            double amount = scanner.nextDouble();
            scanner.nextLine();  // Consume newline
            accounts.get(accountNumber).withdraw(amount);
        } else {
            System.out.println("Account not found.");
        }
    }

    // Method to display account details
    public void displayAccount() {
        System.out.print("Enter account number: ");
        String accountNumber = scanner.nextLine();
        if (accounts.containsKey(accountNumber)) {
            accounts.get(accountNumber).displayAccount();
        } else {
            System.out.println("Account not found.");
        }
    }

    // Method to display the menu and handle user inputs
    public void menu() {
        while (true) {
            System.out.println("\nBank Management System");
            System.out.println("a) Open account");
            System.out.println("b) Deposit Money");
            System.out.println("c) Withdraw Money");
            System.out.println("d) Display Account");
            System.out.println("e) Exit");
            System.out.print("Choose an option: ");
            String choice = scanner.nextLine().toLowerCase();

            switch (choice) {
                case "a":
                    openAccount();
                    break;
                case "b":
                    depositMoney();
                    break;
                case "c":
                    withdrawMoney();
                    break;
                case "d":
                    displayAccount();
                    break;
                case "e":
                    System.out.println("Exiting...");
                    return;
                default:
                    System.out.println("Invalid option. Please try again.");
            }
        }
    }
}