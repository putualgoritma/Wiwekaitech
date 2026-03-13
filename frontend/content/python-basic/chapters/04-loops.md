---
title: "Loops and Iteration"
slug: "loops"
chapterNumber: 4
part: 1
partTitle: "Foundations of Programming"
readingTime: 19
difficulty: "beginner"
objectives:
  - Master for loops for definite iteration
  - Use while loops for indefinite iteration
  - Understand the range() function
  - Control loop flow with break and continue
  - Apply loops to business automation tasks
tags:
  - loops
  - for-loop
  - while-loop
  - iteration
  - range
locale: "en"
summary: "Learn how to automate repetitive tasks using for and while loops, the foundation of program automation."
---

# Loops and Iteration

Imagine manually sending 1,000 invoices, or checking inventory for 500 products one by one. Loops let computers do repetitive tasks in seconds. This is the power that makes programming valuable.

<LearningObjectives />

## Why Loops Matter

```python
# caption: Without loops vs with loops
# ❌ Without loops - repetitive and error-prone
print("Invoice #1")
print("Invoice #2")
print("Invoice #3")
# ... 997 more lines

# ✅ With loops - concise and scalable
for invoice_num in range(1, 1001):
    print(f"Invoice #{invoice_num}")
```

**Business applications:**
- Process all orders in a database
- Send emails to all customers
- Calculate payroll for all employees
- Validate all form inputs
- Generate reports for each month

## The for Loop

Use when you know **how many times** to repeat (or have a collection to iterate).

### Basic Syntax

```python
# caption: for loop syntax
for item in sequence:
    # This code repeats for each item
    do_something(item)
```

### Example 1: Simple Iteration

```python
for number in [1, 2, 3, 4, 5]:
    print(f"Number: {number}")
    
# Output:
# Number: 1
# Number: 2
# Number: 3
# Number: 4
# Number: 5
```

### Example 2: Iterating Over Strings

```python
company = "WiwekAI"

for letter in company:
    print(letter)
    
# Output:
# W
# i
# w
# e
# k
# A
# I
```

## The range() Function

Creates a sequence of numbers - essential for loops.

### range() Patterns

```python
# caption: Three ways to use range()
# 1. range(stop) - from 0 to stop-1
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# 2. range(start, stop) - from start to stop-1
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# 3. range(start, stop, step) - custom increment
for i in range(0, 11, 2):
    print(i)  # 0, 2, 4, 6, 8, 10

# Counting backwards
for i in range(10, 0, -1):
    print(i)  # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
```

### Practical Examples with range()

```python
# caption: Processing invoices
# Generate 12 monthly reports
for month in range(1, 13):
    print(f"Processing month {month}...")
    print(f"Report for {month}/2024 generated")
    print("---")
```

```python
# caption: Countdown timer
print("Product launch in...")
for seconds in range(10, 0, -1):
    print(f"{seconds} seconds")
print("🚀 Launched!")
```

## Nested Loops

Loops inside loops - useful for grids, tables, and combinations.

```python
# caption: Multiplication table
for i in range(1, 6):  # Outer loop
    for j in range(1, 6):  # Inner loop
        product = i * j
        print(f"{i} × {j} = {product:2}", end="  ")
    print()  # New line after each row
    
# Output:
# 1 × 1 =  1  1 × 2 =  2  1 × 3 =  3  1 × 4 =  4  1 × 5 =  5  
# 2 × 1 =  2  2 × 2 =  4  2 × 3 =  6  2 × 4 =  8  2 × 5 = 10  
# ...
```

```python
# caption: Product-Store combinations
products = ["Laptop", "Phone", "Tablet"]
stores = ["Jakarta", "Surabaya", "Bandung"]

for product in products:
    for store in stores:
        print(f"{product} available in {store}")
```

**Warning:** Nested loops can be slow with large datasets!

## The while Loop

Use when you **don't know** how many iterations you need - runs until condition becomes False.

### Basic Syntax

```python
# caption: while loop syntax
while condition:
    # Runs as long as condition is True
    do_something()
```

### Example 1: Countdown

```python
count = 5

while count > 0:
    print(f"{count}...")
    count -= 1  # Same as: count = count - 1
    
print("Blast off!")

# Output:
# 5...
# 4...
# 3...
# 2...
# 1...
# Blast off!
```

### Example 2: User Input Validation

```python
password = ""

while len(password) < 8:
    password = input("Enter password (min 8 chars): ")
    
    if len(password) < 8:
        print("Too short! Try again.")
        
print("✓ Password accepted")
```

### Example 3: Menu System

```python
choice = ""

while choice != "4":
    print("\\n=== MENU ===")
    print("1. View products")
    print("2. Add product")
    print("3. Delete product")
    print("4. Exit")
    
    choice = input("Choose option: ")
    
    if choice == "1":
        print("Viewing products...")
    elif choice == "2":
        print("Adding product...")
    elif choice == "3":
        print("Deleting product...")
    elif choice == "4":
        print("Goodbye!")
    else:
        print("Invalid option")
        
print("Program ended")
```

### ⚠️ Infinite Loops

While loops can run forever if condition never becomes False:

```python
# caption: Infinite loop example (DON'T RUN THIS)
# ❌ DANGER: This never stops!
while True:
    print("This will print forever!")
    
# ❌ DANGER: Condition never changes
count = 5
while count > 0:
    print(count)
    # Forgot to decrease count!
```

**How to stop an infinite loop:**
- Press `Ctrl + C` in terminal
- Close the program

**Prevention:**
- Always ensure the condition can become False
- Include a counter or update mechanism

## Loop Control: break and continue

### The break Statement

Exits the loop immediately:

```python
# caption: Search with break
products = ["Laptop", "Phone", "Tablet", "Monitor", "Keyboard"]
search = "Tablet"
found = False

for product in products:
    print(f"Checking: {product}")
    
    if product == search:
        print(f"✓ Found {search}!")
        found = True
        break  # Stop searching
        
if not found:
    print(f"✗ {search} not found")
    
# Output:
# Checking: Laptop
# Checking: Phone
# Checking: Tablet
# ✓ Found Tablet!
```

```python
# caption: Input validation with break
while True:  # Infinite loop
    age = input("Enter your age: ")
    
    if age.isdigit():
        age = int(age)
        if age > 0 and age < 120:
            print(f"Age {age} recorded")
            break  # Exit loop
        else:
            print("Age must be between 1-120")
    else:
        print("Please enter a number")
```

### The continue Statement

Skips the rest of the current iteration and goes to the next:

```python
# caption: Skip certain values
for number in range(1, 11):
    if number % 2 == 0:  # If even
        continue  # Skip to next iteration
        
    print(number)  # Only prints odd numbers
    
# Output: 1, 3, 5, 7, 9
```

```python
# caption: Process valid orders only
orders = [
    {"id": 101, "amount": 50},
    {"id": 102, "amount": 0},      # Invalid
    {"id": 103, "amount": -10},    # Invalid
    {"id": 104, "amount": 200},
]

total_revenue = 0

for order in orders:
    # Skip invalid orders
    if order["amount"] <= 0:
        print(f"⚠️ Skipping invalid order {order['id']}")
        continue
        
    # Process valid order
    total_revenue += order["amount"]
    print(f"✓ Processed order {order['id']}")

print(f"\\nTotal revenue: ${total_revenue}")
```

## Loop Patterns for Business

### Pattern 1: Accumulation (Totals)

```python
# caption: Calculate total sales
sales = [120, 340, 210, 450, 180]
total = 0

for sale in sales:
    total += sale  # Same as: total = total + sale
    
average = total / len(sales)

print(f"Total sales: ${total}")
print(f"Average sale: ${average:.2f}")
```

### Pattern 2: Counting

```python
# caption: Count passing students
scores = [85, 92, 55, 78, 43, 91, 67]
passing_count = 0

for score in scores:
    if score >= 60:
        passing_count += 1

print(f"{passing_count} out of {len(scores)} students passed")
```

### Pattern 3: Finding Maximum/Minimum

```python
# caption: Find best selling product
products = [
    {"name": "Laptop", "sold": 45},
    {"name": "Phone", "sold": 120},
    {"name": "Tablet", "sold": 67},
]

best_product = products[0]

for product in products:
    if product["sold"] > best_product["sold"]:
        best_product = product

print(f"Best seller: {best_product['name']} ({best_product['sold']} units)")
```

### Pattern 4: Filtering

```python
# caption: Filter high-value customers
customers = [
    {"name": "Alice", "total_spent": 5000},
    {"name": "Bob", "total_spent": 1200},
    {"name": "Charlie", "total_spent": 8500},
    {"name": "Diana", "total_spent": 600},
]

vip_customers = []

for customer in customers:
    if customer["total_spent"] >= 5000:
        vip_customers.append(customer["name"])

print("VIP Customers:", ", ".join(vip_customers))
```

### Pattern 5: Transformation

```python
# caption: Apply discount to all products
prices = [100, 250, 75, 500]
discount_percent = 20

print("Original prices:", prices)

for i in range(len(prices)):
    discount = prices[i] * (discount_percent / 100)
    prices[i] = prices[i] - discount

print("Discounted prices:", prices)
```

## Practical Examples

### Example 1: Employee Payroll System

```python
employees = [
    {"name": "Alice", "hours": 40, "rate": 25},
    {"name": "Bob", "hours": 35, "rate": 20},
    {"name": "Charlie", "hours": 45, "rate": 30},
]

total_payroll = 0

print("=== PAYROLL REPORT ===\\n")

for emp in employees:
    # Calculate regular pay
    regular_hours = min(emp["hours"], 40)
    overtime_hours = max(emp["hours"] - 40, 0)
    
    # Overtime is 1.5x rate
    pay = (regular_hours * emp["rate"]) + (overtime_hours * emp["rate"] * 1.5)
    
    total_payroll += pay
    
    print(f"{emp['name']}:")
    print(f"  Hours: {emp['hours']} ({overtime_hours} overtime)")
    print(f"  Pay: ${pay:.2f}")
    print()

print(f"Total Payroll: ${total_payroll:.2f}")
```

### Example 2: Password Generator

```python
import random

# Character sets
lowercase = "abcdefghijklmnopqrstuvwxyz"
uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
numbers = "0123456789"
symbols = "!@#$%^&*"

all_chars = lowercase + uppercase + numbers + symbols

password = ""
password_length = 12

for i in range(password_length):
    random_char = random.choice(all_chars)
    password += random_char

print(f"Generated password: {password}")
```

### Example 3: Inventory Low Stock Alert

```python
inventory = [
    {"product": "Laptop", "stock": 5, "reorder_level": 10},
    {"product": "Mouse", "stock": 50, "reorder_level": 20},
    {"product": "Keyboard", "stock": 3, "reorder_level": 15},
    {"product": "Monitor", "stock": 12, "reorder_level": 8},
]

print("=== LOW STOCK ALERT ===\\n")

alerts_count = 0

for item in inventory:
    if item["stock"] <= item["reorder_level"]:
        alerts_count += 1
        shortage = item["reorder_level"] - item["stock"] + 10
        
        print(f"🔔 {item['product']}")
        print(f"   Current stock: {item['stock']}")
        print(f"   Reorder level: {item['reorder_level']}")
        print(f"   Suggested order: {shortage} units")
        print()

if alerts_count == 0:
    print("✓ All stock levels are sufficient")
else:
    print(f"Total alerts: {alerts_count}")
```

### Example 4: Sales Report Generator

```python
# Monthly sales data
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
sales = [12000, 15000, 11000, 18000, 22000, 19000]

print("=== SALES REPORT 2024 ===\\n")
print(f"{'Month':<8} {'Sales':>10} {'Growth':>10}")
print("-" * 30)

for i in range(len(months)):
    # Calculate growth
    if i == 0:
        growth = "N/A"
    else:
        growth_percent = ((sales[i] - sales[i-1]) / sales[i-1]) * 100
        growth = f"{growth_percent:+.1f}%"
    
    print(f"{months[i]:<8} ${sales[i]:>9,} {growth:>10}")

# Calculate totals
total_sales = sum(sales)
average_sales = total_sales / len(sales)

print("-" * 30)
print(f"Total:   ${total_sales:>9,}")
print(f"Average: ${average_sales:>9,.0f}")
```

## Exercises

### Exercise 1: Sum Calculator

Write a program that:
1. Asks the user how many numbers they want to add
2. Uses a loop to get each number
3. Calculates and displays the sum

### Exercise 2: Multiplication Table

Create a program that:
1. Asks for a number
2. Displays its multiplication table from 1 to 10

Example output for 7:
```
7 × 1 = 7
7 × 2 = 14
...
7 × 10 = 70
```

### Exercise 3: Number Guessing Game

Create a game where:
1. Computer picks a random number between 1-100
2. User has 10 attempts to guess
3. After each guess, show "Too high", "Too low", or "Correct!"
4. Count how many attempts were used

Use `import random` and `random.randint(1, 100)`

### Exercise 4: Grade Statistics

Given this list of scores:
```python
scores = [85, 92, 78, 90, 88, 76, 95, 89, 84, 91]
```

Calculate and display:
- Total number of scores
- Average score
- Highest score
- Lowest score
- Number of scores >= 90 (A grades)

## Common Loop Mistakes

### Mistake 1: Off-by-one Error

```python
# ❌ Misses the 10th item
for i in range(10):
    print(f"Item {i}")  # Prints 0-9, not 1-10

# ✅ Correct
for i in range(1, 11):
    print(f"Item {i}")  # Prints 1-10
```

### Mistake 2: Modifying List While Iterating

```python
# ❌ Dangerous - skips elements
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)  # BAD!

# ✅ Correct - create new list
numbers = [1, 2, 3, 4, 5]
odd_numbers = []
for num in numbers:
    if num % 2 != 0:
        odd_numbers.append(num)
```

### Mistake 3: Forgetting to Update Condition

```python
# ❌ Infinite loop
count = 0
while count < 5:
    print(count)
    # Forgot: count += 1

# ✅ Correct
count = 0
while count < 5:
    print(count)
    count += 1
```

## Summary

In this chapter, you learned:

✅ **for loops** - Iterate over sequences (lists, strings, range)  
✅ **range()** - Generate number sequences  
✅ **while loops** - Repeat until condition is False  
✅ **break** - Exit loop early  
✅ **continue** - Skip to next iteration  
✅ **Nested loops** - Loops within loops  
✅ **Loop patterns** - Accumulation, counting, filtering, finding max/min  

**Key Takeaway:** Loops are the foundation of automation. Master them, and you can process thousands of records as easily as one.

---

**Next Chapter:** Collections (Lists, Dictionaries) — Store and organize data efficiently.
