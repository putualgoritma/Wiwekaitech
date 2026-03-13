---
title: "Variables and Data Types"
slug: "variables-datatypes"
chapterNumber: 2
part: 1
partTitle: "Foundations of Programming"
readingTime: 18
difficulty: "beginner"
objectives:
  - Understand what variables are and how to use them
  - Learn Python's basic data types (int, float, str, bool)
  - Master variable naming conventions
  - Perform type conversion between data types
  - Use Python's built-in type() function
tags:
  - variables
  - data-types
  - strings
  - numbers
  - type-conversion
locale: "en"
summary: "Learn how Python stores and manipulates data using variables and different data types. Master the foundation of all programming."
---

# Variables and Data Types

Every program needs to store and manipulate information. In this chapter, you'll learn how Python handles data — the foundation of all programming.

<LearningObjectives />

## What Are Variables?

Think of a variable as a **labeled box** that stores a value.

```python
# caption: Creating a variable
name = "Alice"
age = 25
is_student = True
```

In this code:
- `name` is a variable holding the text "Alice"
- `age` is a variable holding the number 25
- `is_student` is a variable holding the boolean True

### Why Variables Matter

Without variables:

```python
# caption: Hard to read and maintain
print("Hello, Alice")
print("Alice is 25 years old")
print("Alice's email: alice@email.com")
```

With variables:

```python
# caption: Much better!
name = "Alice"
age = 25
email = "alice@email.com"

print(f"Hello, {name}")
print(f"{name} is {age} years old")
print(f"{name}'s email: {email}")
```

Now if you need to change the name, you only change it in **one place**.

## Creating Variables

Python uses the **assignment operator** `=` to create variables:

```python
# caption: Variable assignment syntax
variable_name = value
```

### Important Rules

**1. Names are case-sensitive**

```python
name = "Alice"
Name = "Bob"     # Different variable!
NAME = "Charlie" # Yet another variable!

print(name)  # Alice
print(Name)  # Bob
print(NAME)  # Charlie
```

**2. Must start with letter or underscore**

```python
# ✅ Valid variable names
user_name = "Alice"
_private = 42
name2 = "Bob"

# ❌ Invalid variable names
2name = "Invalid"     # Can't start with number
user-name = "Invalid" # Hyphens not allowed
user name = "Invalid" # Spaces not allowed
```

**3. Can't use Python keywords**

```python
# ❌ These are reserved words
if = 5        # Error!
for = 10      # Error!
class = "ABC" # Error!

# ✅ Add prefix/suffix to avoid
if_value = 5
for_loop = 10
class_name = "ABC"
```

### Naming Conventions

Python developers follow **snake_case** for variable names:

```python
# ✅ Good (snake_case)
user_name = "Alice"
total_price = 99.99
is_logged_in = True
max_retry_count = 3

# ❌ Avoid (other styles)
userName = "Alice"     # camelCase (used in JavaScript)
UserName = "Alice"     # PascalCase (used for classes)
TOTAL_PRICE = 99.99    # UPPER_CASE (used for constants)
```

**Be descriptive:**

```python
# ❌ Unclear
x = 25
a = "John"
n = 100

# ✅ Clear
user_age = 25
customer_name = "John"
max_attempts = 100
```

## Python's Basic Data Types

### 1. Integers (int)

Whole numbers without decimal points:

```python
age = 25
quantity = 100
year = 2026
negative = -50
big_number = 1_000_000  # Underscores for readability

print(age)          # 25
print(big_number)   # 1000000
```

**Common operations:**

```python
x = 10
y = 3

print(x + y)   # 13 (addition)
print(x - y)   # 7  (subtraction)
print(x * y)   # 30 (multiplication)
print(x / y)   # 3.333... (division - returns float)
print(x // y)  # 3  (floor division - returns int)
print(x % y)   # 1  (modulo - remainder)
print(x ** y)  # 1000 (exponentiation)
```

### 2. Floating-Point Numbers (float)

Numbers with decimal points:

```python
price = 19.99
temperature = -3.5
pi = 3.14159
scientific = 1.5e3  # 1500.0 (scientific notation)

print(price)       # 19.99
print(scientific)  # 1500.0
```

**Precision warning:**

```python
result = 0.1 + 0.2
print(result)  # 0.30000000000000004 (floating-point precision issue)

# For money, use Decimal or round to 2 places
rounded = round(result, 2)
print(rounded)  # 0.3
```

### 3. Strings (str)

Text data enclosed in quotes:

```python
# Single or double quotes work
name = "Alice"
city = 'Jakarta'
message = "Hello, World!"

# Triple quotes for multi-line
description = """
This is a longer text
that spans multiple
lines.
"""

print(name)        # Alice
print(description) # (multi-line output)
```

**String operations:**

```python
first_name = "John"
last_name = "Doe"

# Concatenation (combining)
full_name = first_name + " " + last_name
print(full_name)  # John Doe

# Repetition
laugh = "Ha" * 3
print(laugh)  # HaHaHa

# Length
name_length = len(full_name)
print(name_length)  # 8
```

**String formatting (f-strings):**

```python
# caption: Modern Python string formatting
name = "Alice"
age = 25
salary = 50000.50

# Old way
message = "Name: " + name + ", Age: " + str(age)

# ✅ Modern way (f-strings)
message = f"Name: {name}, Age: {age}"
report = f"{name} earns ${salary:,.2f} per year"

print(message)  # Name: Alice, Age: 25
print(report)   # Alice earns $50,000.50 per year
```

### 4. Booleans (bool)

True or False values:

```python
is_active = True
is_admin = False
has_permission = True

print(is_active)  # True
print(is_admin)   # False
```

**Boolean from comparisons:**

```python
age = 25

is_adult = age >= 18
can_vote = age >= 17
is_senior = age >= 60

print(is_adult)   # True
print(can_vote)   # True
print(is_senior)  # False
```

## Checking Data Types

Use the `type()` function:

```python
name = "Alice"
age = 25
price = 19.99
is_active = True

print(type(name))      # <class 'str'>
print(type(age))       # <class 'int'>
print(type(price))     # <class 'float'>
print(type(is_active)) # <class 'bool'>
```

## Type Conversion

Converting between data types:

### String to Number

```python
age_str = "25"
print(type(age_str))  # <class 'str'>

age_int = int(age_str)
print(type(age_int))  # <class 'int'>
print(age_int + 5)    # 30

price_str = "19.99"
price_float = float(price_str)
print(price_float)    # 19.99
```

### Number to String

```python
age = 25
age_str = str(age)

# Now you can use it in string operations
message = "I am " + age_str + " years old"
print(message)  # I am 25 years old

# Or use f-string (automatically converts)
message = f"I am {age} years old"
print(message)  # I am 25 years old
```

### Integer and Float Conversion

```python
# Float to int (truncates decimal)
price = 19.99
price_int = int(price)
print(price_int)  # 19 (decimal removed, not rounded)

# Int to float
quantity = 5
quantity_float = float(quantity)
print(quantity_float)  # 5.0
```

### Handling Conversion Errors

```python
# This will crash
invalid = "abc"
number = int(invalid)  # ValueError: invalid literal for int()

# Check before converting
value = "123"
if value.isdigit():
    number = int(value)
    print(number)  # 123
else:
    print("Not a valid number")
```

## User Input

Getting data from users:

```python
# caption: input() function returns strings
name = input("Enter your name: ")
print(f"Hello, {name}!")

# input() always returns a string!
age_str = input("Enter your age: ")
age = int(age_str)  # Convert to integer

print(f"Next year you'll be {age + 1}")
```

**Better version with conversion:**

```python
name = input("Enter your name: ")
age = int(input("Enter your age: "))
height = float(input("Enter your height in meters: "))

print(f"Name: {name}")
print(f"Age: {age}")
print(f"Height: {height}m")
```

## Multiple Assignment

Python allows assigning multiple variables at once:

```python
# Assign same value to multiple variables
x = y = z = 0
print(x, y, z)  # 0 0 0

# Assign different values
name, age, city = "Alice", 25, "Jakarta"
print(name)  # Alice
print(age)   # 25
print(city)  # Jakarta

# Swapping values (elegant!)
a = 10
b = 20
a, b = b, a
print(a, b)  # 20 10
```

## Constants

Variables that shouldn't change (convention: UPPER_CASE):

```python
# These values won't change during program execution
MAX_USERS = 100
PI = 3.14159
TAX_RATE = 0.15
COMPANY_NAME = "Wiwekaitech"

# Use them like regular variables
total = 50
tax = total * TAX_RATE
print(f"Tax: ${tax}")
```

Note: Python doesn't enforce constants, but UPPER_CASE tells other developers "don't change this."

## Practical Examples

### Example 1: Simple Calculator

```python
# Get two numbers from user
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

# Perform calculations
addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
division = num1 / num2

# Display results
print(f"{num1} + {num2} = {addition}")
print(f"{num1} - {num2} = {subtraction}")
print(f"{num1} × {num2} = {multiplication}")
print(f"{num1} ÷ {num2} = {division:.2f}")
```

### Example 2: Temperature Converter

```python
celsius = float(input("Enter temperature in Celsius: "))

fahrenheit = (celsius * 9/5) + 32
kelvin = celsius + 273.15

print(f"{celsius}°C = {fahrenheit}°F")
print(f"{celsius}°C = {kelvin}K")
```

### Example 3: Shopping Cart Total

```python
# Product information
product_name = "Laptop"
price = 799.99
quantity = 2
tax_rate = 0.10

# Calculations
subtotal = price * quantity
tax = subtotal * tax_rate
total = subtotal + tax

# Receipt
print("="*30)
print("      RECEIPT")
print("="*30)
print(f"Product: {product_name}")
print(f"Price: ${price}")
print(f"Quantity: {quantity}")
print("-"*30)
print(f"Subtotal: ${subtotal:.2f}")
print(f"Tax (10%): ${tax:.2f}")
print(f"Total: ${total:.2f}")
print("="*30)
```

## Exercises

### Exercise 1: Personal Info Card

Create a program that asks for:
- Full name
- Age
- City
- Favorite programming language

Then display them in a formatted "card" format.

**Expected output:**
```
=========================
     PERSONAL CARD
=========================
Name: John Doe
Age: 28 years old
City: Jakarta
Language: Python
=========================
```

### Exercise 2: BMI Calculator

Create a BMI (Body Mass Index) calculator.

Formula: BMI = weight (kg) / (height (m))²

Ask the user for:
- Weight in kg
- Height in meters

Calculate and display the BMI rounded to 2 decimal places.

### Exercise 3: Salary Calculator

Create a program that calculates net salary:

Input:
- Gross salary
- Tax rate (as percentage, e.g., 15 for 15%)

Calculate:
- Tax amount
- Net salary (gross - tax)

Display all values formatted with 2 decimal places.

### Exercise 4: Time Converter

Convert seconds to hours, minutes, and seconds.

Input: Total seconds (e.g., 3665)  
Output: 1 hours, 1 minutes, 5 seconds

**Hints:**
- Use integer division `//` for whole parts
- Use modulo `%` for remainders

## Common Mistakes to Avoid

**1. Forgetting to convert input()**

```python
# ❌ Wrong
age = input("Age: ")
next_year = age + 1  # Error! Can't add string and int

# ✅ Correct
age = int(input("Age: "))
next_year = age + 1
```

**2. Using reserved words**

```python
# ❌ Don't do this
list = [1, 2, 3]  # 'list' is a built-in function!
sum = 10 + 20     # 'sum' is a built-in function!

# ✅ Use different names
my_list = [1, 2, 3]
total = 10 + 20
```

**3. Mixing up = and ==**

```python
# = is assignment
age = 25  # Set age to 25

# == is comparison
is_adult = (age == 18)  # Check if age equals 18
```

## Summary

In this chapter, you learned:

✅ **Variables** store data with descriptive names  
✅ **Data types**: int, float, str, bool  
✅ **Naming conventions**: snake_case, descriptive names  
✅ **Type conversion**: int(), float(), str()  
✅ **User input**: input() always returns strings  
✅ **F-strings**: Modern string formatting  

**Key Takeaway:** Variables are the building blocks of all programs. Master them now, use them forever.

---

**Next Chapter:** Conditional Statements — Making your programs make decisions.
