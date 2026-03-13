---
title: "Conditional Statements"
slug: "conditionals"
chapterNumber: 3
part: 1
partTitle: "Foundations of Programming"
readingTime: 16
difficulty: "beginner"
objectives:
  - Understand how programs make decisions
  - Master if, elif, and else statements
  - Use comparison and logical operators
  - Write nested conditional logic
  - Apply conditionals to real business rules
tags:
  - conditionals
  - if-statements
  - comparison-operators
  - logic
locale: "en"
summary: "Learn how to make your programs intelligent by adding decision-making capabilities with conditional statements."
---

# Conditional Statements

Programs need to make decisions. Should we process this order? Is the user old enough? Is the password correct? In this chapter, you'll learn how to give your programs the power to choose.

<LearningObjectives />

## The Need for Decisions

Every business application makes decisions:

```python
# caption: Business logic requires conditionals
# E-commerce example
if stock_quantity > 0:
    process_order()
else:
    notify_out_of_stock()
    
# Access control
if user.is_admin:
    show_admin_panel()
else:
    show_user_dashboard()
```

This is **conditional execution** — code that runs only when certain conditions are met.

## The Basic if Statement

```python
# caption: if statement syntax
if condition:
    # Code runs only if condition is True
    do_something()
```

**Simple example:**

```python
age = 20

if age >= 18:
    print("You are an adult")
    print("You can vote")
    
print("Program continues...")
```

**Output:**
```
You are an adult
You can vote
Program continues...
```

**Key points:**
- Condition must be followed by a colon `:`
- Indented block runs if condition is `True`
- Non-indented code always runs

## The if-else Statement

What if you want different behavior for False conditions?

```python
# caption: if-else syntax
if condition:
    # Runs if True
    do_this()
else:
    # Runs if False
    do_that()
```

**Example:**

```python
age = 15

if age >= 18:
    print("You can vote")
else:
    print("You're too young to vote")
    years_left = 18 - age
    print(f"Wait {years_left} more years")
```

**Output:**
```
You're too young to vote
Wait 3 more years
```

## The if-elif-else Statement

For multiple conditions:

```python
# caption: if-elif-else syntax
if condition1:
    # Runs if condition1 is True
elif condition2:
    # Runs if condition1 is False AND condition2 is True
elif condition3:
    # Runs if previous conditions are False AND condition3 is True
else:
    # Runs if all conditions are False
```

**Example: Grading system**

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is: {grade}")
```

**Important:** Only the **first True** condition executes!

```python
score = 95

if score >= 60:
    print("Pass")  # This runs
elif score >= 90:
    print("Excellence")  # This WON'T run (even though true)
    
# Output: Pass
```

## Comparison Operators

Used to create conditions:

| Operator | Meaning | Example |
|----------|---------|---------|
| `==` | Equal to | `x == 5` |
| `!=` | Not equal to | `x != 5` |
| `>` | Greater than | `x > 5` |
| `&lt;` | Less than | `x &lt; 5` |
| `>=` | Greater than or equal | `x >= 5` |
| `&lt;=` | Less than or equal | `x &lt;= 5` |

```python
age = 25

print(age == 25)   # True
print(age != 30)   # True
print(age > 20)    # True
print(age < 18)    # False
print(age >= 25)   # True
print(age <= 24)   # False
```

**Common mistake:**

```python
# ❌ Wrong - assignment, not comparison
if age = 25:  # SyntaxError!
    print("25")
    
# ✅ Correct - comparison
if age == 25:
    print("25")
```

## Logical Operators

Combine multiple conditions:

### The `and` Operator

Both conditions must be True:

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
else:
    print("You cannot drive")
```

**Truth table:**
```
True and True    → True
True and False   → False
False and True   → False
False and False  → False
```

### The `or` Operator

At least one condition must be True:

```python
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("You can rest!")
else:
    print("Time to work")
```

**Truth table:**
```
True or True    → True
True or False   → True
False or True   → True
False or False  → False
```

### The `not` Operator

Inverts the condition:

```python
is_raining = False

if not is_raining:
    print("You don't need an umbrella")
else:
    print("Take an umbrella")
```

**Truth table:**
```
not True   → False
not False  → True
```

### Combining Operators

```python
age = 25
is_student = False
has_id = True

# Complex condition
if (age >= 18 and has_id) or is_student:
    print("Entry granted")
else:
    print("Entry denied")
```

Use parentheses `()` for clarity!

## Nested Conditionals

Conditionals inside conditionals:

```python
age = 25
income = 35000

if age >= 18:
    print("Adult")
    
    if income >= 30000:
        print("Eligible for premium account")
    else:
        print("Standard account")
else:
    print("Minor - parental consent required")
```

**Tip:** Avoid deep nesting (maximum 2-3 levels). Refactor if too deep.

## The `in` Operator

Check if value exists in a sequence:

```python
# String containment
email = "user@example.com"

if "@" in email:
    print("Valid email format")
else:
    print("Invalid email")

# Checking multiple values
role = "admin"

if role in ["admin", "superuser", "moderator"]:
    print("Access granted")
else:
    print("Access denied")
```

## Truthy and Falsy Values

Python treats some values as True or False in conditions:

**Falsy values:**
- `False`
- `0`, `0.0`
- `""` (empty string)
- `[]`, `{}`, `()` (empty collections)
- `None`

**Everything else is Truthy.**

```python
name = input("Enter your name: ")

if name:  # True if name is not empty
    print(f"Hello, {name}")
else:
    print("You didn't enter a name")

quantity = 0

if quantity:  # False because 0 is falsy
    print("Items in stock")
else:
    print("Out of stock")
```

## Practical Examples

### Example 1: User Login Authentication

```python
CORRECT_USERNAME = "admin"
CORRECT_PASSWORD = "secret123"

username = input("Username: ")
password = input("Password: ")

if username == CORRECT_USERNAME and password == CORRECT_PASSWORD:
    print("✓ Login successful!")
    print("Welcome to the admin panel")
elif username == CORRECT_USERNAME:
    print("✗ Incorrect password")
else:
    print("✗ User not found")
```

### Example 2: E-commerce Stock Check

```python
product_name = "Laptop"
stock_quantity = 5
order_quantity = int(input("How many do you want to order? "))

if order_quantity <= 0:
    print("Invalid quantity")
elif order_quantity > stock_quantity:
    print(f"Sorry, only {stock_quantity} units available")
elif stock_quantity - order_quantity < 3:
    print("Order accepted - Low stock warning!")
else:
    print("Order confirmed!")
```

### Example 3: Tax Calculator

```python
income = float(input("Enter annual income: $"))

if income <= 10000:
    tax_rate = 0  # No tax
    bracket = "No tax"
elif income <= 40000:
    tax_rate = 0.10  # 10% tax
    bracket = "Low income"
elif income <= 85000:
    tax_rate = 0.22  # 22% tax
    bracket = "Middle income"
else:
    tax_rate = 0.35  # 35% tax
    bracket = "High income"

tax_amount = income * tax_rate
net_income = income - tax_amount

print(f"\\nBracket: {bracket}")
print(f"Tax rate: {tax_rate * 100}%")
print(f"Tax amount: ${tax_amount:,.2f}")
print(f"Net income: ${net_income:,.2f}")
```

### Example 4: Restaurant Discount System

```python
total_bill = float(input("Enter bill amount: $"))
is_member = input("Are you a member? (yes/no): ").lower() == "yes"
item_count = int(input("Number of items ordered: "))

discount = 0

# Member discount
if is_member:
    discount += 10
    
# Bulk order discount
if item_count >= 5:
    discount += 5
    
# Large bill discount
if total_bill >= 100:
    discount += 10

if discount > 0:
    discount_amount = total_bill * (discount / 100)
    final_bill = total_bill - discount_amount
    print(f"\\nDiscount: {discount}%")
    print(f"You saved: ${discount_amount:.2f}")
    print(f"Final bill: ${final_bill:.2f}")
else:
    print(f"\\nNo discount applied")
    print(f"Total: ${total_bill:.2f}")
```

## Exercises

### Exercise 1: Age Classifier

Write a program that asks for age and classifies the person:
- 0-12: Child
- 13-19: Teenager
- 20-59: Adult
- 60+: Senior

### Exercise 2: Grade Calculator

Create a program that:
1. Asks for 3 exam scores
2. Calculates the average
3. Determines the grade (A: 90+, B: 80-89, C: 70-79, D: 60-69, F: Below 60)
4. Shows if the student passed (>= 60)

### Exercise 3: Password Validator

Create a password strength checker:
- Ask user for a password
- Check:
  - At least 8 characters
  - Contains uppercase letter
  - Contains number
- Display: "Strong", "Medium", or "Weak"

Hints:
- `len(password)` for length
- `password.isupper()` checks for uppercase
- `password.isdigit()` checks for numbers
- `any(c.isupper() for c in password)` checks if any character is uppercase

### Exercise 4: Shipping Cost Calculator

Create a shipping calculator:
- Ask for package weight (kg)
- Ask for delivery distance (km)

Rules:
- Weight &lt;= 1kg: $5
- Weight 1-5kg: $10
- Weight > 5kg: $15
- Add $2 per 100km of distance
- Free shipping if total > $50

Calculate and display the shipping cost.

## Common Patterns in Business Logic

### Pattern 1: Validation

```python
email = input("Email: ")

if "@" not in email or "." not in email:
    print("Invalid email format")
elif len(email) < 5:
    print("Email too short")
else:
    print("Email accepted")
```

### Pattern 2: Access Control

```python
user_role = "editor"

if user_role == "admin":
    allowed_actions = ["create", "read", "update", "delete"]
elif user_role == "editor":
    allowed_actions = ["create", "read", "update"]
elif user_role == "viewer":
    allowed_actions = ["read"]
else:
    allowed_actions = []

print(f"You can: {', '.join(allowed_actions)}")
```

### Pattern 3: Business Rules

```python
# Inventory management rule
current_stock = 5
reorder_level = 10

if current_stock <= reorder_level:
    quantity_to_order = 50 - current_stock
    print(f"🔔 Low stock alert!")
    print(f"Order {quantity_to_order} units")
else:
    print("✓ Stock level sufficient")
```

## Summary

In this chapter, you learned:

✅ **if statements** - Execute code conditionally  
✅ **if-elif-else** - Handle multiple conditions  
✅ **Comparison operators** - ==, !=, &lt;, >, &lt;=, >=  
✅ **Logical operators** - and, or, not  
✅ **Nested conditions** - Conditionals inside conditionals  
✅ **Truthy/Falsy values** - Python's implicit boolean conversion  

**Key Takeaway:** Conditionals give programs intelligence. Every business rule, validation, and decision-making process uses conditionals.

---

**Next Chapter:** Loops — Make your programs repeat tasks efficiently.
