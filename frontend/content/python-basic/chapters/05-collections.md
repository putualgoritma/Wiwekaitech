---
title: "Collections: Lists and Dictionaries"
slug: "collections"
chapterNumber: 5
part: 2
partTitle: "Data Structures"
readingTime: 22
difficulty: "intermediate"
objectives:
  - Master Python lists for ordered collections
  - Use dictionaries for key-value data storage
  - Understand when to use lists vs dictionaries
  - Apply collection methods to real business scenarios
  - Combine collections for complex data structures
tags:
  - lists
  - dictionaries
  - data-structures
  - collections
locale: "en"
summary: "Learn to organize and manipulate data using lists and dictionaries, the fundamental data structures in Python."
---

# Collections: Lists and Dictionaries

Individual variables are like sticky notes. Collections are like filing cabinets — they let you organize hundreds or thousands of pieces of data. In this chapter, you'll learn the two most essential Python collections.

<LearningObjectives />

## Why Collections Matter

```python
# caption: Without collections vs with collections
# ❌ Without collections - doesn't scale
product1 = "Laptop"
product2 = "Mouse"
product3 = "Keyboard"
# ... what if you have 1000 products?

# ✅ With collections - scalable
products = ["Laptop", "Mouse", "Keyboard"]  # Can hold any number!
```

**Real-world uses:**
- Store all customer names
- Track product inventory
- Manage employee records
- Process transaction histories
- Organize configuration settings

## Lists: Ordered Collections

A **list** is an ordered collection that can hold multiple values.

### Creating Lists

```python
# Empty list
products = []

# List with initial values
products = ["Laptop", "Mouse", "Keyboard"]

# Mixed types (but usually avoid this)
mixed = [1, "Hello", 3.14, True]

# Numbers
prices = [999, 25, 45, 150]

# List of lists (nested)
inventory = [
    ["Laptop", 10],
    ["Mouse", 50],
    ["Keyboard", 30]
]
```

### Accessing List Elements

Lists use **zero-based indexing**:

```python
products = ["Laptop", "Mouse", "Keyboard", "Monitor"]

#  Index:     0         1          2           3
# List:    ["Laptop", "Mouse", "Keyboard", "Monitor"]

print(products[0])   # Laptop (first item)
print(products[1])   # Mouse
print(products[3])   # Monitor (last item)

# Negative indexing (count from end)
print(products[-1])  # Monitor (last)
print(products[-2])  # Keyboard (second from end)
```

```python
# caption: Index out of range error
products = ["Laptop", "Mouse", "Keyboard"]

print(products[5])  # ❌ IndexError: list index out of range

# ✅ Safe access
if len(products) > 5:
    print(products[5])
else:
    print("Index doesn't exist")
```

###Modifying Lists

Lists are **mutable** — you can change them:

```python
products = ["Laptop", "Mouse", "Keyboard"]

# Change an element
products[1] = "Gaming Mouse"
print(products)  # ['Laptop', 'Gaming Mouse', 'Keyboard']

# Add to the end
products.append("Monitor")
print(products)  # ['Laptop', 'Gaming Mouse', 'Keyboard', 'Monitor']

# Insert at specific position
products.insert(1, "Tablet")
print(products)  # ['Laptop', 'Tablet', 'Gaming Mouse', 'Keyboard', 'Monitor']

# Remove by value
products.remove("Keyboard")
print(products)  # ['Laptop', 'Tablet', 'Gaming Mouse', 'Monitor']

# Remove by index
del products[0]
print(products)  # ['Tablet', 'Gaming Mouse', 'Monitor']

# Remove last item (returns it)
last_item = products.pop()
print(last_item)  # Monitor
print(products)   # ['Tablet', 'Gaming Mouse']
```

### Essential List Methods

```python
# caption: List methods reference
numbers = [3, 1, 4, 1, 5, 9, 2]

# Sort (modifies original)
numbers.sort()
print(numbers)  # [1, 1, 2, 3, 4, 5, 9]

# Reverse
numbers.reverse()
print(numbers)  # [9, 5, 4, 3, 2, 1, 1]

# Count occurrences
count = numbers.count(1)
print(count)  # 2

# Find index
index = numbers.index(5)
print(index)  # 1 (first occurrence)

# Length
size = len(numbers)
print(size)  # 7

# Clear all
numbers.clear()
print(numbers)  # []
```

### List Slicing

Extract portions of a list:

```python
products = ["Laptop", "Mouse", "Keyboard", "Monitor", "Webcam"]

#  Index:      0         1         2          3          4

# Slice syntax: list[start:end]  (end is exclusive)
print(products[1:4])    # ['Mouse', 'Keyboard', 'Monitor']
print(products[:3])     # ['Laptop', 'Mouse', 'Keyboard'] (from start)
print(products[2:])     # ['Keyboard', 'Monitor', 'Webcam'] (to end)
print(products[-3:])    # ['Keyboard', 'Monitor', 'Webcam'] (last 3)

# Step slicing: list[start:end:step]
print(products[::2])    # ['Laptop', 'Keyboard', 'Webcam'] (every 2nd)
print(products[::-1])   # Reverse the list!
```

### Iterating Over Lists

```python
# Method 1: Direct iteration (most common)
products = ["Laptop", "Mouse", "Keyboard"]

for product in products:
    print(f"Product: {product}")

# Method 2: With index
for i in range(len(products)):
    print(f"{i+1}. {products[i]}")

# Method 3: With enumerate (best of both)
for index, product in enumerate(products, start=1):
    print(f"{index}. {product}")
```

### List Comprehensions

Create new lists with concise syntax:

```python
# caption: List comprehension examples
# Traditional way
squares = []
for x in range(1, 6):
    squares.append(x ** 2)
# squares = [1, 4, 9, 16, 25]

# List comprehension (same result, one line)
squares = [x ** 2 for x in range(1, 6)]

# With condition
prices = [100, 250, 75, 500, 30]
expensive = [p for p in prices if p >= 100]
# expensive = [100, 250, 500]

# Transform strings
names = ["alice", "bob", "charlie"]
capitalized = [name.capitalize() for name in names]
# capitalized = ['Alice', 'Bob', 'Charlie']
```

## Dictionaries: Key-Value Storage

A **dictionary** stores data as key-value pairs — like a real dictionary where words (keys) have definitions (values).

### Creating Dictionaries

```python
# Empty dictionary
user = {}

# Dictionary with data
user = {
    "name": "Alice",
    "age": 28,
    "city": "Jakarta",
    "is_active": True
}

# Keys must be unique, values can be anything
product = {
    "id": 101,
    "name": "Laptop",
    "price": 999.99,
    "tags": ["electronics", "computers"],
    "specs": {
        "ram": "16GB",
        "storage": "512GB SSD"
    }
}
```

### Accessing Dictionary Values

```python
user = {
    "name": "Alice",
    "email": "alice@example.com",
    "age": 28
}

# Access with brackets
print(user["name"])   # Alice
print(user["age"])    # 28

# ❌ KeyError if key doesn't exist
print(user["phone"])  # KeyError: 'phone'

# ✅ Safe access with .get()
print(user.get("phone"))           # None (no error)
print(user.get("phone", "N/A"))   # N/A (custom default)
```

### Modifying Dictionaries

```python
user = {"name": "Alice", "age": 28}

# Add new key-value pair
user["email"] = "alice@example.com"
print(user)  # {'name': 'Alice', 'age': 28, 'email': 'alice@example.com'}

# Update existing value
user["age"] = 29
print(user)  # {'name': 'Alice', 'age': 29, 'email': 'alice@example.com'}

# Remove a key
del user["email"]
print(user)  # {'name': 'Alice', 'age': 29}

# Remove and return value
email = user.pop("email", None)  # Safe removal

# Update multiple values
user.update({"age": 30, "city": "Jakarta"})
print(user)  # {'name': 'Alice', 'age': 30, 'city': 'Jakarta'}
```

### Essential Dictionary Methods

```python
product = {
    "id": 101,
    "name": "Laptop",
    "price": 999,
    "stock": 15
}

# Get all keys
keys = product.keys()
print(keys)  # dict_keys(['id', 'name', 'price', 'stock'])

# Get all values
values = product.values()
print(values)  # dict_values([101, 'Laptop', 999, 15])

# Get all key-value pairs
items = product.items()
print(items)  # dict_items([('id', 101), ('name', 'Laptop'), ...])

# Check if key exists
if "price" in product:
    print(f"Price: ${product['price']}")

# Number of key-value pairs
count = len(product)
print(count)  # 4
```

### Iterating Over Dictionaries

```python
product = {
    "name": "Laptop",
    "price": 999,
    "stock": 15
}

# Iterate over keys (default)
for key in product:
    print(f"{key}: {product[key]}")

# Iterate over values
for value in product.values():
    print(value)

# Iterate over both (most common)
for key, value in product.items():
    print(f"{key}: {value}")
```

## Combining Lists and Dictionaries

Real applications often combine both:

### List of Dictionaries (Most Common Pattern)

```python
# caption: Product catalog
products = [
    {
        "id": 101,
        "name": "Laptop",
        "price": 999,
        "category": "Electronics"
    },
    {
        "id": 102,
        "name": "Mouse",
        "price": 25,
        "category": "Electronics"
    },
    {
        "id": 103,
        "name": "Desk",
        "price": 350,
        "category": "Furniture"
    }
]

# Access specific product
print(products[0]["name"])  # Laptop

# Iterate and process
for product in products:
    print(f"{product['name']}: ${product['price']}")
```

### Dictionary of Lists

```python
# caption: Students by grade
students_by_grade = {
    "A": ["Alice", "Bob", "Charlie"],
    "B": ["Diana", "Eve"],
    "C": ["Frank", "Grace", "Henry"]
}

# Access
a_students = students_by_grade["A"]
print(a_students)  # ['Alice', 'Bob', 'Charlie']

# Iterate
for grade, students in students_by_grade.items():
    print(f"Grade {grade}: {len(students)} students")
```

## Practical Examples

### Example 1: Customer Database

```python
customers = [
    {"id": 1, "name": "Alice", "email": "alice@example.com", "total_spent": 1500},
    {"id": 2, "name": "Bob", "email": "bob@example.com", "total_spent": 3200},
    {"id": 3, "name": "Charlie", "email": "charlie@example.com", "total_spent": 750},
]

# Find VIP customers (spent > $2000)
vip_customers = []

for customer in customers:
    if customer["total_spent"] > 2000:
        vip_customers.append(customer["name"])

print("VIP Customers:", vip_customers)

# Calculate total revenue
total_revenue = sum(c["total_spent"] for c in customers)
print(f"Total Revenue: ${total_revenue}")
```

### Example 2: Inventory Management System

```python
inventory = {
    "LAP001": {"name": "Laptop", "stock": 15, "price": 999, "reorder": 10},
    "MOU001": {"name": "Mouse", "stock": 5, "price": 25, "reorder": 20},
    "KEY001": {"name": "Keyboard", "stock": 25, "price": 45, "reorder": 15},
}

print("=== INVENTORY STATUS ===\\n")

total_value = 0

for code, item in inventory.items():
    value = item["stock"] * item["price"]
    total_value += value
    
    status = "✓ OK" if item["stock"] > item["reorder"] else "⚠️ LOW STOCK"
    
    print(f"Code: {code}")
    print(f"Product: {item['name']}")
    print(f"Stock: {item['stock']} units")
    print(f"Value: ${value:,.2f}")
    print(f"Status: {status}")
    print()

print(f"Total Inventory Value: ${total_value:,.2f}")
```

### Example 3: Student Grade Book

```python
students = [
    {"name": "Alice", "scores": [85, 92, 78, 90]},
    {"name": "Bob", "scores": [78, 85, 80, 88]},
    {"name": "Charlie", "scores": [92, 95, 89, 94]},
]

print("=== GRADE REPORT ===\\n")

for student in students:
    name = student["name"]
    scores = student["scores"]
    
    average = sum(scores) / len(scores)
    highest = max(scores)
    lowest = min(scores)
    
    # Determine grade
    if average >= 90:
        grade = "A"
    elif average >= 80:
        grade = "B"
    elif average >= 70:
        grade = "C"
    else:
        grade = "F"
    
    print(f"{name}:")
    print(f"  Scores: {scores}")
    print(f"  Average: {average:.1f}")
    print(f"  Range: {lowest}-{highest}")
    print(f"  Grade: {grade}")
    print()
```

### Example 4: Shopping Cart

```python
# Shopping cart system
cart = []

def add_to_cart(product_name, price, quantity):
    """Add item to cart"""
    cart.append({
        "product": product_name,
        "price": price,
        "quantity": quantity
    })
    print(f"✓ Added {quantity}x {product_name}")

def show_cart():
    """Display cart contents"""
    if not cart:
        print("Cart is empty")
        return
    
    print("\\n=== SHOPPING CART ===")
    total = 0
    
    for item in cart:
        subtotal = item["price"] * item["quantity"]
        total += subtotal
        print(f"{item['product']}: {item['quantity']}x ${item['price']} = ${subtotal}")
    
    print(f"\\nTotal: ${total:.2f}")

# Demo
add_to_cart("Laptop", 999, 1)
add_to_cart("Mouse", 25, 2)
add_to_cart("Keyboard", 45, 1)
show_cart()
```

### Example 5: Sales Report by Category

```python
transactions = [
    {"product": "Laptop", "category": "Electronics", "amount": 999},
    {"product": "Mouse", "category": "Electronics", "amount": 25},
    {"product": "Desk", "category": "Furniture", "amount": 350},
    {"product": "Chair", "category": "Furniture", "amount": 200},
    {"product": "Monitor", "category": "Electronics", "amount": 450},
]

# Group sales by category
sales_by_category = {}

for transaction in transactions:
    category = transaction["category"]
    amount = transaction["amount"]
    
    if category in sales_by_category:
        sales_by_category[category] += amount
    else:
        sales_by_category[category] = amount

# Display report
print("=== SALES BY CATEGORY ===\\n")

for category, total in sales_by_category.items():
    print(f"{category}: ${total:,.2f}")

# Find best category
best_category = max(sales_by_category, key=sales_by_category.get)
print(f"\\nTop Category: {best_category}")
```

## Choosing the Right Collection

### Use a List when:
- ✅ Order matters
- ✅ You need to access by position (index)
- ✅ You have a sequence of similar items
- ✅ Examples: transaction history, queue of tasks, list of names

### Use a Dictionary when:
- ✅ You need to look up by a meaningful key
- ✅ You're storing attributes of an object
- ✅ Order doesn't matter (before Python 3.7)
- ✅ Examples: user profile, configuration settings, product details

### Example Comparision

```python
# ❌ List - hard to remember what index means
user = ["Alice", 28, "alice@example.com", "Jakarta"]
print(user[2])  # What does index 2 represent?

# ✅ Dictionary - self-documenting
user = {
    "name": "Alice",
    "age": 28,
    "email": "alice@example.com",
    "city": "Jakarta"
}
print(user["email"])  # Clear!
```

## Exercises

### Exercise 1: Todo List Manager

Create a todo list application that:
1. Starts with an empty list
2. Shows a menu: Add task, View tasks, Mark complete, Exit
3. Tasks are dictionaries: `{"task": "...", "done": False}`
4. Mark complete changes `done` to `True`
5. Display tasks with ✓ or ☐ prefix

### Exercise 2: Contact Book

Create a contact book using a dictionary:
1. Key = person's name
2. Value = dictionary with email and phone
3. Functions: add contact, search contact, list all, delete contact

### Exercise 3: Product Analyzer

Given this product list:
```python
products = [
    {"name": "Laptop", "price": 999, "category": "Electronics"},
    {"name": "Mouse", "price": 25, "category": "Electronics"},
    {"name": "Desk", "price": 350, "category": "Furniture"},
    {"name": "Chair", "price": 200, "category": "Furniture"},
    {"name": "Monitor", "price": 450, "category": "Electronics"},
]
```

Calculate:
- Average price of all products
- Most expensive product
- Number of products per category
- Total value if you bought one of each

### Exercise 4: Student Performance

Create a program that stores student data:
```python
{"name": "Alice", "subjects": {"Math": 85, "Science": 92, "English": 78}}
```

For each student, calculate:
- Average score across all subjects
- Best subject
- Worst subject
- Pass/Fail (>= 60 average)

## Summary

In this chapter, you learned:

✅ **Lists** - Ordered, indexed collections  
✅ **List methods** - append, remove, sort, pop, etc.  
✅ **List slicing** - Extract portions  
✅ **Dictionaries** - Key-value storage  
✅ **Dictionary methods** - keys, values, items, get  
✅ **Nested structures** - Lists of dicts, dicts of lists  
✅ **When to use which** - Order vs lookup optimization  

**Key Takeaway:** Lists and dictionaries are the workhorses of Python. Almost every real application uses them extensively. Master these, and you can model any business data.

---

**Next Chapter:** Functions — Organize and reuse your code.
