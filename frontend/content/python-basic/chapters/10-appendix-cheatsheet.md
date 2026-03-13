---
title: "Python Quick Reference"
slug: "appendix-cheatsheet"
chapterNumber: 10
part: 6
partTitle: "Appendices"
readingTime: 8
difficulty: "beginner"
objectives:
  - Quick syntax reference for common Python operations
  - Cheat sheet for data types, loops, functions, and OOP
  - Handy reference while coding
tags:
  - reference
  - cheatsheet
  - syntax
locale: "en"
summary: "A quick reference guide for Python syntax — bookmark this page for quick lookups while coding."
---

# Python Quick Reference

Your go-to cheat sheet for Python syntax. Bookmark this page!

<LearningObjectives />

##Variables & Data Types

```python
# Variables
name = "Alice"
age = 25
price = 19.99
is_active = True

# Type checking
type(name)         # <class 'str'>
isinstance(age, int)  # True

# Type conversion
str(25)            # "25"
int("25")          # 25
float("19.99")     # 19.99
bool(1)            # True
```

## Strings

```python
# String operations
text = "Hello, World!"
text.lower()                # "hello, world!"
text.upper()                # "HELLO, WORLD!"
text.replace("World", "Python")  # "Hello, Python!"
text.split(", ")            # ['Hello', 'World!']
"Hello" + " " + "World"     # "Hello World"
"Python" * 3                # "PythonPythonPython"

# String formatting
name = "Alice"
age = 25
f"Name: {name}, Age: {age}"  # f-string (preferred)
"Name: {}, Age: {}".format(name, age)
"Name: %s, Age: %d" % (name, age)

# Common methods
text.startswith("Hello")   # True
text.endswith("!")         # True
text.find("World")         # 7 (index)
text.count("l")            # 3
len(text)                  # 13
text.strip()               # Remove whitespace
text.isdigit()             # Check if all digits
text.isalpha()             # Check if all letters
```

## Lists

```python
# Creating lists
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", 3.0, True]
empty = []

# Accessing
numbers[0]         # 1 (first)
numbers[-1]        # 5 (last)
numbers[1:3]       # [2, 3] (slice)

# Modifying
numbers.append(6)          # Add to end
numbers.insert(0, 0)       # Insert at index
numbers.remove(3)          # Remove by value
numbers.pop()              # Remove last
numbers.pop(0)             # Remove at index
del numbers[0]             # Delete by index

# Operations
len(numbers)               # Length
numbers.sort()             # Sort in place
numbers.reverse()          # Reverse in place
numbers.count(2)           # Count occurrences
numbers.index(3)           # Find index
2 in numbers               # Check membership

# List comprehension
squares = [x**2 for x in range(5)]        # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
```

## Dictionaries

```python
# Creating dictionaries
user = {"name": "Alice", "age": 25}
empty = {}

# Accessing
user["name"]               # "Alice"
user.get("name")           # "Alice"
user.get("email", "N/A")   # "N/A" (default)

# Modifying
user["email"] = "alice@example.com"  # Add/update
user.update({"age": 26})             # Update multiple
del user["age"]                       # Delete key
user.pop("email")                     # Remove and return

# Operations
len(user)                  # Number of keys
"name" in user             # Check key exists
user.keys()                # All keys
user.values()              # All values
user.items()               # Key-value pairs

# Iteration
for key in user:
    print(key, user[key])

for key, value in user.items():
    print(key, value)
```

## Conditionals

```python
# if statement
if condition:
    do_something()

# if-else
if condition:
    do_this()
else:
    do_that()

# if-elif-else
if condition1:
    option1()
elif condition2:
    option2()
else:
    option3()

# Comparison operators
x == y    # Equal
x != y    # Not equal
x > y     # Greater than
x < y     # Less than
x >= y    # Greater or equal
x <= y    # Less or equal

# Logical operators
x and y   # Both true
x or y    # At least one true
not x     # Opposite

# Membership
x in list          # Check if x in list
x not in list      # Check if x not in list

# Ternary operator
value = "yes" if condition else "no"
```

## Loops

```python
# for loop
for item in [1, 2, 3]:
    print(item)

for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(1, 6):     # 1, 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8
    print(i)

# Enumerate (index + value)
for i, item in enumerate(['a', 'b', 'c']):
    print(i, item)        # 0 a, 1 b, 2 c

# while loop
count = 0
while count < 5:
    print(count)
    count += 1

# Control flow
for i in range(10):
    if i == 3:
        continue  # Skip to next iteration
    if i == 7:
        break     # Exit loop
    print(i)
```

## Functions

```python
# Basic function
def greet(name):
    """Function docstring"""
    print(f"Hello, {name}")

greet("Alice")

# Return value
def add(a, b):
    return a + b

result = add(5, 3)

# Default arguments
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}")

greet("Alice")              # Hello, Alice
greet("Bob", "Hi")          # Hi, Bob

# Keyword arguments
def create_user(name, age, city):
    pass

create_user(age=25, name="Alice", city="Jakarta")

# Variable arguments
def sum_all(*numbers):
    return sum(numbers)

sum_all(1, 2, 3, 4, 5)      # 15

# Keyword variable arguments
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25)

# Lambda (anonymous function)
square = lambda x: x ** 2
square(5)                   # 25

# Map, filter, reduce
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x**2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
```

## Classes & Objects

```python
# Basic class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        print(f"Hello, I'm {self.name}")

# Create instance
person = Person("Alice", 25)
person.greet()

# Inheritance
class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
    
    def study(self):
        print(f"{self.name} is studying")

student = Student("Bob", 20, "A")
student.greet()   # Inherited method
student.study()   # Own method

# Class variables
class Dog:
    species = "Canis familiaris"  # Shared by all instances
    
    def __init__(self, name):
        self.name = name  # Instance variable

# Special methods
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __str__(self):
        return f"{self.name} - ${self.price}"
    
    def __len__(self):
        return len(self.name)

product = Product("Laptop", 999)
print(product)    # Calls __str__
len(product)      # Calls __len__
```

## File Operations

```python
# Read file
with open("file.txt", "r") as file:
    content = file.read()

# Read lines
with open("file.txt", "r") as file:
    lines = file.readlines()

# Write file
with open("file.txt", "w") as file:
    file.write("Hello, World!")

# Append to file
with open("file.txt", "a") as file:
    file.write("\\nNew line")

# JSON
import json

# Write JSON
data = {"name": "Alice", "age": 25}
with open("data.json", "w") as file:
    json.dump(data, file, indent=2)

# Read JSON
with open("data.json", "r") as file:
    data = json.load(file)
```

## Error Handling

```python
# Basic try-except
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")

# Multiple exceptions
try:
    risky_operation()
except ValueError:
    print("Invalid value")
except TypeError:
    print("Invalid type")
except Exception as e:
    print(f"Error: {e}")

# try-except-else-finally
try:
    f = open("file.txt", "r")
    content = f.read()
except FileNotFoundError:
    print("File not found")
else:
    print("File read successfully")
finally:
    f.close()  # Always runs

# Raise exceptions
if age < 0:
    raise ValueError("Age cannot be negative")
```

## Common Built-in Functions

```python
# Type conversion
int(), float(), str(), bool(), list(), dict(), tuple()

# Math
abs(-5)              # 5
round(3.7)           # 4
min([1, 2, 3])       # 1
max([1, 2, 3])       # 3
sum([1, 2, 3])       # 6
pow(2, 3)            # 8

# Iteration
len([1, 2, 3])       # 3
range(5)             # 0, 1, 2, 3, 4
enumerate([])        # Add index
zip([1, 2], ['a', 'b'])  # [(1, 'a'), (2, 'b')]
sorted([3, 1, 2])    # [1, 2, 3]
reversed([1, 2, 3])  # [3, 2, 1]

# Type checking
type(x)              # Get type
isinstance(x, int)   # Check type

# Input/Output
print("Hello")       # Output
input("Name: ")      # Input (returns string)

# Helpful
help(function)       # Show documentation
dir(object)          # List attributes/methods
```

## Useful Modules

```python
# Math
import math
math.sqrt(16)        # 4.0
math.pi              # 3.14159...
math.floor(3.7)      # 3
math.ceil(3.2)       # 4

# Random
import random
random.randint(1, 10)         # Random int 1-10
random.choice(['a', 'b', 'c']) # Random item
random.shuffle(list)          # Shuffle list in place

# Datetime
from datetime import datetime, date
now = datetime.now()
today = date.today()
now.strftime("%Y-%m-%d")      # Format date

# OS
import os
os.getcwd()          # Current directory
os.listdir('.')      # List files
os.path.exists("file.txt")    # Check file exists

# JSON
import json
json.dumps(dict)     # Dict to JSON string
json.loads(string)   # JSON string to dict

# Regular expressions
import re
re.search(r"\\d+", "abc123")   # Search pattern
re.findall(r"\\d+", "a1b2c3")  # Find all matches
```

## List Comprehensions & Generators

```python
# List comprehension
squares = [x**2 for x in range(10)]
evens = [x for x in range(10) if x % 2 == 0]
matrix = [[i+j for j in range(3)] for i in range(3)]

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Set comprehension
unique = {x for x in [1, 2, 2, 3, 3, 3]}

# Generator expression (memory efficient)
squares_gen = (x**2 for x in range(1000000))

# Generator function
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(5):
    print(i)  # 5, 4, 3, 2, 1
```

## Common Patterns

```python
# Swap variables
a, b = b, a

# Multiple assignment
x, y, z = 1, 2, 3

# Unpack list
first, *rest, last = [1, 2, 3, 4, 5]
# first=1, rest=[2,3,4], last=5

# Check empty
if not my_list:  # Empty list is falsy
    print("Empty")

# Default dictionary value
counts = {}
counts.setdefault("key", 0)
counts["key"] += 1

# Get multiple items
items = ["a", "b", "c", "d"]
a, b = items[0], items[1]
# Or:
a, b, *rest = items

# Conditional expression
result = "positive" if x > 0 else "non-positive"

# Chain comparisons
if 0 <= x <= 100:
    print("Valid percentage")
```

---

**Pro Tip:** Print this page or bookmark it. Reference it while coding — nobody memorizes everything!
