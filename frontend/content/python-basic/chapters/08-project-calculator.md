---
title: "Project: Smart Calculator"
slug: "project-calculator"
chapterNumber: 8
part: 4
partTitle: "Hands-On Projects"
readingTime: 25
difficulty: "intermediate"
objectives:
  - Apply functions to organize calculator operations
  - Implement input validation and error handling
  - Build a menu-driven program
  - Handle division by zero gracefully
  - Create a complete user-friendly application
tags:
  - project
  - calculator
  - functions
  - error-handling
  - menu
locale: "en"
summary: "Build a fully functional calculator with scientific operations, history tracking, and robust error handling."
---

# Project: Smart Calculator

In this project, you'll build a professional-grade calculator that goes beyond basic arithmetic. You'll apply functions, error handling, and user input validation — skills essential for real applications.

<LearningObjectives />

## Project Overview

### What We're Building

```text
# caption: Calculator features
=== SMART CALCULATOR ===
1. Basic Operations (+, -, *, /)
2. Advanced Operations (power, square root, percentage)
3. Calculation History
4. Memory Storage
5. Error Handling
6. User-friendly Menu
```

### Skills You'll Practice

- ✅ Function organization
- ✅ Input validation
- ✅ Error handling (try/except)
- ✅ List manipulation (history)
- ✅ Menu-driven programs
- ✅ String formatting

## Step 1: Basic Calculator Functions

Let's start with fundamental operations:

```python
# caption: calculator_basic.py
def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract b from a"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide a by b with error handling"""
    if b == 0:
        return None  # Signal error
    return a / b

# Test the functions
print(add(10, 5))       # 15
print(subtract(10, 5))  # 5
print(multiply(10, 5))  # 50
print(divide(10, 5))    # 2.0
print(divide(10, 0))    # None (error)
```

## Step 2: Advanced Operations

Add scientific calculator features:

```python
# caption: Advanced operations
import math

def power(base, exponent):
    """Raise base to the power of exponent"""
    return base ** exponent

def square_root(number):
    """Calculate square root"""
    if number < 0:
        return None  # Can't sqrt negative
    return math.sqrt(number)

def percentage(number, percent):
    """Calculate percentage of a number"""
    return (number * percent) / 100

def modulo(a, b):
    """Find remainder of a divided by b"""
    if b == 0:
        return None
    return a % b

# Test
print(power(2, 8))           # 256
print(square_root(16))       # 4.0
print(percentage(200, 15))   # 30.0
print(modulo(17, 5))         # 2
```

## Step 3: Input Validation

Ensure user input is valid:

```python
# caption: Input validation
def get_number(prompt):
    """Get a valid number from user"""
    while True:
        try:
            value = input(prompt)
            return float(value)
        except ValueError:
            print("✗ Invalid input. Please enter a number.")

def get_operation_choice():
    """Get valid operation choice"""
    print("\\n=== OPERATIONS ===")
    print("1. Add (+)")
    print("2. Subtract (-)")
    print("3. Multiply (*)")
    print("4. Divide (/)")
    print("5. Power (^)")
    print("6. Square Root (√)")
    print("7. Percentage (%)")
    print("8. Modulo (mod)")
    print("9. View History")
    print("0. Exit")
    
    while True:
        choice = input("\\nChoose operation (0-9): ")
        if choice in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
            return choice
        print("✗ Invalid choice. Enter 0-9.")

# Test
num = get_number("Enter a number: ")
print(f"You entered: {num}")
```

## Step 4: History Tracking

Keep track of calculations:

```python
# caption: History system
calculation_history = []

def add_to_history(expression, result):
    """Add calculation to history"""
    calculation_history.append(f"{expression} = {result}")

def show_history():
    """Display calculation history"""
    if not calculation_history:
        print("\\nNo calculations yet.")
        return
    
    print("\\n=== CALCULATION HISTORY ===")
    for i, calc in enumerate(calculation_history, 1):
        print(f"{i}. {calc}")

def clear_history():
    """Clear all history"""
    global calculation_history
    calculation_history = []
    print("✓ History cleared")

# Usage
add_to_history("10 + 5", 15)
add_to_history("20 * 3", 60)
show_history()
```

## Step 5: Complete Calculator Program

Now let's combine everything:

```python
# caption: calculator_complete.py
#!/usr/bin/env python3
"""
Smart Calculator - Complete Version
Features: Basic & advanced operations, history, error handling
"""

import math

# ========== CALCULATION FUNCTIONS ==========

def add(a, b):
    """Add two numbers"""
    return a + b

def subtract(a, b):
    """Subtract b from a"""
    return a - b

def multiply(a, b):
    """Multiply two numbers"""
    return a * b

def divide(a, b):
    """Divide a by b"""
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(base, exponent):
    """Raise base to power of exponent"""
    return base ** exponent

def square_root(number):
    """Calculate square root"""
    if number < 0:
        raise ValueError("Cannot calculate square root of negative number")
    return math.sqrt(number)

def percentage(number, percent):
    """Calculate percentage of number"""
    return (number * percent) / 100

def modulo(a, b):
    """Calculate remainder"""
    if b == 0:
        raise ValueError("Cannot modulo by zero")
    return a % b

# ========== HISTORY MANAGEMENT ==========

calculation_history = []

def add_to_history(expression, result):
    """Add calculation to history"""
    calculation_history.append(f"{expression} = {result}")

def show_history():
    """Display calculation history"""
    if not calculation_history:
        print("\\n📝 No calculations yet.")
        return
    
    print("\\n" + "="*40)
    print("📋 CALCULATION HISTORY")
    print("="*40)
    for i, calc in enumerate(calculation_history, 1):
        print(f"{i:2}. {calc}")
    print("="*40)

# ========== INPUT FUNCTIONS ==========

def get_number(prompt):
    """Get valid number from user"""
    while True:
        try:
            value = input(prompt)
            return float(value)
        except ValueError:
            print("✗ Invalid input. Please enter a number.")
        except KeyboardInterrupt:
            print("\\n✗ Operation cancelled")
            return None

def display_menu():
    """Show calculator menu"""
    print("\\n" + "="*40)
    print("🧮 SMART CALCULATOR")
    print("="*40)
    print("BASIC OPERATIONS:")
    print("  1. ➕  Add")
    print("  2. ➖  Subtract")
    print("  3. ✖️   Multiply")
    print("  4. ➗  Divide")
    print("\\nADVANCED OPERATIONS:")
    print("  5. 🔺  Power (x^y)")
    print("  6. √  Square Root")
    print("  7. %  Percentage")
    print("  8. ÷  Modulo (Remainder)")
    print("\\nOTHER:")
    print("  9. 📋  View History")
    print("  0. 🚪  Exit")
    print("="*40)

def get_choice():
    """Get valid menu choice"""
    while True:
        choice = input("\\nChoose operation (0-9): ").strip()
        if choice in ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']:
            return choice
        print("✗ Invalid choice. Please enter 0-9.")

# ========== CALCULATION HANDLERS ==========

def handle_basic_operation(operation_func, symbol):
    """Handle operations requiring two numbers"""
    num1 = get_number("Enter first number: ")
    if num1 is None:
        return
    
    num2 = get_number("Enter second number: ")
    if num2 is None:
        return
    
    try:
        result = operation_func(num1, num2)
        expression = f"{num1} {symbol} {num2}"
        
        print(f"\\n✅ Result: {result}")
        add_to_history(expression, result)
        
    except ValueError as e:
        print(f"\\n✗ Error: {e}")
    except Exception as e:
        print(f"\\n✗ Unexpected error: {e}")

def handle_square_root():
    """Handle square root calculation"""
    num = get_number("Enter number: ")
    if num is None:
        return
    
    try:
        result = square_root(num)
        expression = f"√{num}"
        
        print(f"\\n✅ Result: {result}")
        add_to_history(expression, result)
        
    except ValueError as e:
        print(f"\\n✗ Error: {e}")

def handle_percentage():
    """Handle percentage calculation"""
    num = get_number("Enter number: ")
    if num is None:
        return
    
    percent = get_number("Enter percentage: ")
    if percent is None:
        return
    
    result = percentage(num, percent)
    expression = f"{percent}% of {num}"
    
    print(f"\\n✅ Result: {result}")
    add_to_history(expression, result)

# ========== MAIN PROGRAM ==========

def main():
    """Main calculator loop"""
    print("\\n🎉 Welcome to Smart Calculator!")
    
    while True:
        display_menu()
        choice = get_choice()
        
        if choice == '0':
            print("\\n👋 Thank you for using Smart Calculator!")
            break
        
        elif choice == '1':
            handle_basic_operation(add, '+')
        
        elif choice == '2':
            handle_basic_operation(subtract, '-')
        
        elif choice == '3':
            handle_basic_operation(multiply, '*')
        
        elif choice == '4':
            handle_basic_operation(divide, '/')
        
        elif choice == '5':
            handle_basic_operation(power, '^')
        
        elif choice == '6':
            handle_square_root()
        
        elif choice == '7':
            handle_percentage()
        
        elif choice == '8':
            handle_basic_operation(modulo, 'mod')
        
        elif choice == '9':
            show_history()

if __name__ == "__main__":
    main()
```

## How to Run the Calculator

1. **Save the code** as `calculator.py`

2. **Run it:**
   ```bash
   python calculator.py
   ```

3. **Try different operations:**
   - Basic math: Addition, subtraction, etc.
   - Advanced: Power, square root
   - View your calculation history
   - Test error handling (divide by zero, negative square root)

## Sample Session

```text
# caption: Example usage
🎉 Welcome to Smart Calculator!

========================================
🧮 SMART CALCULATOR
========================================
BASIC OPERATIONS:
  1. ➕  Add
  2. ➖  Subtract
  3. ✖️   Multiply
  4. ➗  Divide

ADVANCED OPERATIONS:
  5. 🔺  Power (x^y)
  6. √  Square Root
  7. %  Percentage
  8. ÷  Modulo (Remainder)

OTHER:
  9. 📋  View History
  0. 🚪  Exit
========================================

Choose operation (0-9): 1
Enter first number: 25
Enter second number: 17

✅ Result: 42.0

Choose operation (0-9): 6
Enter number: 144

✅ Result: 12.0

Choose operation (0-9): 9

========================================
📋 CALCULATION HISTORY
========================================
 1. 25.0 + 17.0 = 42.0
 2. √144.0 = 12.0
========================================
```

## Enhancements (Try Yourself!)

### Enhancement 1: Memory Functions

```python
# caption: Add memory feature
memory = 0

def memory_add(value):
    """Add to memory"""
    global memory
    memory += value
    print(f"✓ Memory: {memory}")

def memory_recall():
    """Show current memory"""
    print(f"Memory: {memory}")
    return memory

def memory_clear():
    """Clear memory"""
    global memory
    memory = 0
    print("✓ Memory cleared")
```

### Enhancement 2: Save History to File

```python
# caption: Save history
def save_history_to_file():
    """Save history to text file"""
    if not calculation_history:
        print("No history to save")
        return
    
    with open("calculator_history.txt", "w") as file:
        file.write("CALCULATION HISTORY\\n")
        file.write("=" * 40 + "\\n")
        for calc in calculation_history:
            file.write(calc + "\\n")
    
    print("✓ History saved to calculator_history.txt")
```

### Enhancement 3: Scientific Functions

```python
# caption: More operations
import math

def sine(angle_degrees):
    """Calculate sine"""
    angle_radians = math.radians(angle_degrees)
    return math.sin(angle_radians)

def cosine(angle_degrees):
    """Calculate cosine"""
    angle_radians = math.radians(angle_degrees)
    return math.cos(angle_radians)

def logarithm(number, base=10):
    """Calculate logarithm"""
    if number <= 0:
        raise ValueError("Logarithm undefined for non-positive numbers")
    return math.log(number, base)

def factorial(n):
    """Calculate factorial"""
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    if n > 170:
        raise ValueError("Factorial too large")
    return math.factorial(int(n))
```

## Exercises

### Exercise 1: Add Currency Converter

Add a menu option to convert between currencies:
- USD to IDR
- EUR to USD
- GBP to EUR

Use current exchange rates or dummy values.

### Exercise 2: Unit Converter

Add conversions for:
- Kilometers ↔ Miles
- Celsius ↔ Fahrenheit
- Kilograms ↔ Pounds

### Exercise 3: BMI Calculator

Add a BMI (Body Mass Index) calculator:
- Input: weight (kg), height (m)
- Output: BMI value and category (underweight/normal/overweight/obese)
- Formula: BMI = weight / (height²)

### Exercise 4: Loan Calculator

Calculate monthly loan payments:
- Input: loan amount, annual interest rate, loan term (years)
- Output: monthly payment
- Formula: M = P × [r(1+r)^n] / [(1+r)^n - 1]
  - M = monthly payment
  - P = principal
  - r = monthly interest rate
  - n = number of payments

## What You Learned

In this project, you applied:

✅ **Functions** - Organized code into reusable pieces  
✅ **Error handling** - try/except for robust programs  
✅ **Input validation** - Ensured valid user input  
✅ **Data structures** - Lists for history tracking  
✅ **Menu systems** - User-friendly interfaces  
✅ **String formatting** - Professional output display  

**Key Takeaway:** Real applications need more than just calculations — they need validation, error handling, user-friendly interfaces, and organization. This project taught you to build production-ready software.

---

**Next Project:** Student Management System — Apply OOP to build a complete database application.
