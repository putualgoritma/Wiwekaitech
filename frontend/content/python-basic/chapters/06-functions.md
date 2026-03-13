---
title: "Functions: Organizing Your Code"
slug: "functions"
chapterNumber: 6
part: 3
partTitle: "Structured Programs"
readingTime: 20
difficulty: "intermediate"
objectives:
  - Define and call functions with parameters
  - Return values from functions
  - Understand variable scope
  - Use default arguments and keyword arguments
  - Apply functions to reduce code duplication
tags:
  - functions
  - parameters
  - return-values
  - scope
  - reusability
locale: "en"
summary: "Learn to organize code into reusable functions, the building blocks of professional software."
---

# Functions: Organizing Your Code

Imagine copying the same 50 lines of code every time you need to send an email. Functions let you write code once and reuse it everywhere. This chapter teaches you to build modular, maintainable programs.

<LearningObjectives />

## Why Functions?

### The Problem: Code Duplication

```python
# caption: Without functions - repetitive
# Calculate tax for order 1
order1_subtotal = 100
order1_tax = order1_subtotal * 0.15
order1_total = order1_subtotal + order1_tax
print(f"Order 1 total: ${order1_total}")

# Calculate tax for order 2 (same code!)
order2_subtotal = 250
order2_tax = order2_subtotal * 0.15
order2_total = order2_subtotal + order2_tax
print(f"Order 2 total: ${order2_total}")

# What if tax rate changes? Update in multiple places!
```

### The Solution: Functions

```python
# caption: With functions - reusable
def calculate_total(subtotal, tax_rate=0.15):
    """Calculate total with tax"""
    tax = subtotal * tax_rate
    total = subtotal + tax
    return total

# Reuse the function
order1_total = calculate_total(100)
order2_total = calculate_total(250)

print(f"Order 1 total: ${order1_total}")
print(f"Order 2 total: ${order2_total}")

# Tax rate change? Update once!
```

**Benefits:**
- **DRY Principle:** Don't Repeat Yourself
- **Maintainability:** Fix bugs in one place
- **Readability:** Code describes what it does
- **Testability:** Test functions independently

## Defining Functions

### Basic Syntax

```python
# caption: Function anatomy
def function_name(parameters):
    """Docstring: what the function does"""
    # Function body
    return result  # Optional
```

### Simple Function

```python
def greet():
    """Print a greeting message"""
    print("Hello, welcome!")
    
# Call the function
greet()  # Output: Hello, welcome!
greet()  # Output: Hello, welcome!
```

### Function with Parameters

```python
def greet(name):
    """Greet a person by name"""
    print(f"Hello, {name}!")

greet("Alice")    # Hello, Alice!
greet("Bob")      # Hello, Bob!
```

### Multiple Parameters

```python
def greet(name, time_of_day):
    """Greet with time context"""
    print(f"Good {time_of_day}, {name}!")

greet("Alice", "morning")    # Good morning, Alice!
greet("Bob", "evening")      # Good evening, Bob!
```

## Returning Values

Functions can send back results using `return`:

```python
def add(a, b):
    """Add two numbers"""
    result = a + b
    return result  # Send back the result

total = add(5, 3)
print(total)  # 8

# Use directly
print(add(10, 20))  # 30
```

### Return vs Print

**Key difference:**

```python
def add_print(a, b):
    """Prints the sum"""
    print(a + b)
    # Returns None implicitly

def add_return(a, b):
    """Returns the sum"""
    return a + b

# Compare:
result1 = add_print(5, 3)   # Prints: 8
print(result1)               # None (can't use the result!)

result2 = add_return(5, 3)  # Returns 8
print(result2)               # 8 (can use the result!)
double = result2 * 2        # Can calculate with it
```

**Rule of thumb:** Functions should `return` values, not `print` them (unless they're specifically for display).

### Returning Multiple Values

```python
def calculate_stats(numbers):
    """Calculate min, max, and average"""
    minimum = min(numbers)
    maximum = max(numbers)
    average = sum(numbers) / len(numbers)
    
    return minimum, maximum, average  # Return tuple

scores = [85, 92, 78, 90, 88]
min_score, max_score, avg_score = calculate_stats(scores)

print(f"Min: {min_score}")
print(f"Max: {max_score}")
print(f"Avg: {avg_score:.1f}")
```

### Early Return

```python
def divide(a, b):
    """Safely divide two numbers"""
    if b == 0:
        return None  # Early return to avoid error
    
    return a / b

result = divide(10, 2)
print(result)  # 5.0

result = divide(10, 0)
if result is None:
    print("Cannot divide by zero")
else:
    print(result)
```

## Default Arguments

Provide default values for parameters:

```python
def greet(name, greeting="Hello"):
    """Greet with customizable greeting"""
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Good morning")  # Good morning, Bob!
greet("Charlie", greeting="Hey")  # Hey, Charlie!
```

```python
# caption: Practical example: tax calculator
def calculate_price(base_price, tax_rate=0.15, discount=0):
    """Calculate final price with tax and discount"""
    discounted = base_price * (1 - discount)
    total = discounted * (1 + tax_rate)
    return total

# Various uses
print(calculate_price(100))                    # $115.00
print(calculate_price(100, tax_rate=0.10))    # $110.00
print(calculate_price(100, discount=0.20))    # $92.00
print(calculate_price(100, 0.10, 0.20))       # $88.00
```

**Important:** Default parameters must come **after** required parameters:

```python
# ❌ Wrong - default before required
def greet(greeting="Hello", name):  # SyntaxError!
    print(f"{greeting}, {name}")

# ✅ Correct - required before default
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}")
```

## Keyword Arguments

Call functions using parameter names:

```python
def create_user(username, email, age, country="Indonesia"):
    """Create a user profile"""
    print(f"Username: {username}")
    print(f"Email: {email}")
    print(f"Age: {age}")
    print(f"Country: {country}")

# Positional arguments (order matters)
create_user("alice", "alice@example.com", 25)

# Keyword arguments (order doesn't matter)
create_user(
    age=30,
    username="bob",
    email="bob@example.com",
    country="Singapore"
)

# Mix both (positional first)
create_user("charlie", email="charlie@example.com", age=28)
```

## Variable Scope

Where variables are accessible:

### Local Scope

```python
def calculate():
    x = 10  # Local variable
    y = 20  # Local variable
    return x + y

result = calculate()
print(result)  # 30

print(x)  # ❌ NameError: x is not defined (x is local to calculate)
```

### Global Scope

```python
TAX_RATE = 0.15  # Global variable (constant convention: UPPERCASE)

def calculate_tax(amount):
    """Use global TAX_RATE"""
    return amount * TAX_RATE

print(calculate_tax(100))  # 15.0

# Global accessible everywhere
print(TAX_RATE)  # 0.15
```

### Modifying Global Variables (Avoid This!)

```python
counter = 0

def increment():
    global counter  # Declare we're using global counter
    counter += 1

increment()
print(counter)  # 1

increment()
print(counter)  # 2

# ⚠️ Better approach: return new value
def increment_better(value):
    return value + 1

counter = 0
counter = increment_better(counter)  # More explicit
```

## Practical Examples

### Example 1: Input Validation

```python
def validate_email(email):
    """Check if email is valid format"""
    if "@" not in email:
        return False
    if "." not in email:
        return False
    if len(email) < 5:
        return False
    return True

# Use it
user_email = input("Enter email: ")

if validate_email(user_email):
    print("✓ Email is valid")
else:
    print("✗ Invalid email format")
```

### Example 2: Price Calculator

```python
def calculate_final_price(base_price, quantity, is_member=False):
    """Calculate final price with quantity and member discount"""
    subtotal = base_price * quantity
    
    # Member discount: 10%
    if is_member:
        discount = subtotal * 0.10
        subtotal -= discount
    
    # Bulk discount: 5% for 10+ items
    if quantity >= 10:
        bulk_discount = subtotal * 0.05
        subtotal -= bulk_discount
    
    # Tax: 15%
    tax = subtotal * 0.15
    total = subtotal + tax
    
    return total

# Examples
print(f"Regular: ${calculate_final_price(10, 5):.2f}")
print(f"Member: ${calculate_final_price(10, 5, is_member=True):.2f}")
print(f"Bulk: ${calculate_final_price(10, 15):.2f}")
```

### Example 3: Data Formatting

```python
def format_currency(amount, currency="USD"):
    """Format number as currency"""
    symbol = {
        "USD": "$",
        "EUR": "€",
        "GBP": "£",
        "IDR": "Rp"
    }
    
    curr_symbol = symbol.get(currency, "$")
    
    if currency == "IDR":
        # No decimals for IDR
        return f"{curr_symbol}{amount:,.0f}"
    else:
        return f"{curr_symbol}{amount:,.2f}"

print(format_currency(1500))            # $1,500.00
print(format_currency(1500, "EUR"))     # €1,500.00
print(format_currency(25000, "IDR"))    # Rp25,000
```

### Example 4: Grade Calculator

```python
def calculate_grade(scores):
    """Calculate letter grade from list of scores"""
    if not scores:  # Empty list
        return "N/A"
    
    average = sum(scores) / len(scores)
    
    if average >= 90:
        return "A"
    elif average >= 80:
        return "B"
    elif average >= 70:
        return "C"
    elif average >= 60:
        return "D"
    else:
        return "F"

def generate_report(student_name, scores):
    """Generate complete student report"""
    avg = sum(scores) / len(scores)
    grade = calculate_grade(scores)
    
    print(f"\\n=== Report for {student_name} ===")
    print(f"Scores: {scores}")
    print(f"Average: {avg:.1f}")
    print(f"Grade: {grade}")
    print(f"Status: {'PASS' if avg >= 60 else 'FAIL'}")

# Use the functions
student_scores = [85, 92, 78, 90]
generate_report("Alice", student_scores)
```

### Example 5: Authentication System

```python
# Simulated database
users_db = {
    "alice": {"password": "secret123", "role": "admin"},
    "bob": {"password": "pass456", "role": "user"},
}

def authenticate(username, password):
    """Check if username and password match"""
    if username not in users_db:
        return None  # User doesn't exist
    
    if users_db[username]["password"] == password:
        return users_db[username]["role"]  # Return role
    else:
        return None  # Wrong password

def login():
    """Handle login process"""
    print("=== LOGIN ===")
    username = input("Username: ")
    password = input("Password: ")
    
    role = authenticate(username, password)
    
    if role:
        print(f"✓ Login successful! Role: {role}")
        return username, role
    else:
        print("✗ Invalid credentials")
        return None, None

# Try it
user, role = login()

if role == "admin":
    print("Welcome to admin panel")
elif role == "user":
    print("Welcome to user dashboard")
```

## Function Documentation

Always document your functions:

```python
# caption: Good documentation practice
def calculate_shipping(weight, distance, express=False):
    """
    Calculate shipping cost based on weight and distance.
    
    Args:
        weight (float): Package weight in kg
        distance (float): Delivery distance in km
        express (bool): Whether to use express shipping
    
    Returns:
        float: Total shipping cost in dollars
        
    Examples:
        >>> calculate_shipping(2.5, 100)
        15.0
        >>> calculate_shipping(2.5, 100, express=True)
        25.0
    """
    base_cost = weight * 2
    distance_cost = distance * 0.1
    total = base_cost + distance_cost
    
    if express:
        total *= 2  # Double for express
    
    return total

# View documentation
help(calculate_shipping)
```

## Exercises

### Exercise 1: Temperature Converter

Create two functions:
1. `celsius_to_fahrenheit(celsius)` - converts C to F
2. `fahrenheit_to_celsius(fahrenheit)` - converts F to C

Formulas:
- F = C × 9/5 + 32
- C = (F - 32) × 5/9

### Exercise 2: Password Strength Checker

Create a function `check_password_strength(password)` that returns:
- "Weak" if < 8 characters
- "Medium" if 8-12 characters AND has numbers
- "Strong" if > 12 characters AND has numbers AND has uppercase

Hints:
- `len(password)`
- `any(c.isdigit() for c in password)`
- `any(c.isupper() for c in password)`

### Exercise 3: Invoice Generator

Create a function `generate_invoice(items, tax_rate=0.15, discount=0)`:
- `items` is a list of dicts: `[{"name": "...", "price": ..., "qty": ...}]`
- Returns a dictionary with:
  - `subtotal`
  - `discount_amount`
  - `tax_amount`
  - `total`

### Exercise 4: Prime Number Checker

Create `is_prime(number)` that returns True if prime, False otherwise.

Prime numbers are only divisible by 1 and themselves: 2, 3, 5, 7, 11, 13...

Logic:
- Numbers < 2 are not prime
- Check if number is divisible by any number from 2 to number-1
- If found divisor, not prime

## Common Function Patterns

### Pattern 1: Validation

```python
def validate_age(age):
    """Validate age is reasonable"""
    if not isinstance(age, int):
        return False
    if age < 0 or age > 120:
        return False
    return True
```

### Pattern 2: Transformation

```python
def normalize_name(name):
    """Clean and standardize name"""
    # Remove whitespace, capitalize each word
    return name.strip().title()
```

### Pattern 3: Calculation

```python
def calculate_discount(price, discount_percent):
    """Calculate discounted price"""
    discount = price * (discount_percent / 100)
    return price - discount
```

### Pattern 4: Query

```python
def find_user(users, username):
    """Find user by username"""
    for user in users:
        if user["username"] == username:
            return user
    return None  # Not found
```

## Summary

In this chapter, you learned:

✅ **Defining functions** - def, parameters, docstrings  
✅ **Return values** - Send back results  
✅ **Default arguments** - Optional parameters  
✅ **Keyword arguments** - Named parameters  
✅ **Variable scope** - Local vs global  
✅ **Documentation** - Docstrings for clarity  

**Key Takeaway:** Functions are the foundation of code organization. Good functions are small, focused, and reusable. Master them, and your code becomes professional-grade.

---

**Next Chapter:** Object-Oriented Programming — Build complete systems with classes and objects.
