---
title: "Python Glossary"
slug: "appendix-glossary"
chapterNumber: 10
part: 6
partTitle: "Appendices"
readingTime: 8
difficulty: "beginner"
objectives:
  - Understand Python terminology
  - Quick reference for programming concepts
  - Learn the vocabulary of Python development
tags:
  - glossary
  - terminology
  - definitions
locale: "en"
summary: "A comprehensive glossary of Python and programming terms used throughout this book."
---

# Python Glossary

Quick reference for Python and programming terms.

<LearningObjectives />

## A

**Argument**  
A value passed to a function when calling it. See also: Parameter.
```python
greet("Alice")  # "Alice" is an argument
```

**Assignment**  
Storing a value in a variable using the `=` operator.
```python
name = "Alice"  # Assigns "Alice" to variable name
```

**Attribute**  
A value associated with an object, accessed with dot notation.
```python
student.name  # name is an attribute
```

## B

**Boolean**  
A data type with two values: `True` or `False`.
```python
is_active = True
```

**Break**  
A statement that exits a loop early.
```python
for i in range(10):
    if i == 5:
        break  # Exit loop
```

**Bug**  
An error or flaw in code that causes incorrect behavior.

## C

**Class**  
A blueprint for creating objects. Defines attributes and methods.
```python
class Person:
    def __init__(self, name):
        self.name = name
```

**Comment**  
Text in code that Python ignores, used for documentation.
```python
# This is a comment
x = 5  # Inline comment
```

**Conditional**  
A statement that executes code only if a condition is true. See: if, elif, else.
```python
if age >= 18:
    print("Adult")
```

**Constructor**  
The `__init__` method that initializes a new object.
```python
def __init__(self, name):
    self.name = name
```

**Continue**  
A statement that skips the rest of the current loop iteration.
```python
for i in range(5):
    if i == 2:
        continue  # Skip 2
    print(i)
```

**CRUD**  
Create, Read, Update, Delete — basic database operations.

## D

**Data Type**  
The kind of value a variable holds (int, str, bool, etc.).

**Debugging**  
The process of finding and fixing bugs in code.

**Dictionary (dict)**  
A collection of key-value pairs.
```python
user = {"name": "Alice", "age": 25}
```

**Docstring**  
A string literal that appears as the first statement in a function, class, or module, used for documentation.
```python
def greet(name):
    """Greet a person by name."""
    print(f"Hello, {name}")
```

**DRY (Don't Repeat Yourself)**  
Principle of reducing code repetition by using functions and classes.

## E

**Element**  
An individual item in a list or other collection.
```python
items = [1, 2, 3]  # 1, 2, and 3 are elements
```

**Exception**  
An error that occurs during program execution.
```python
raise ValueError("Invalid input")
```

**Expression**  
Code that evaluates to a value.
```python
2 + 3  # Expression evaluating to 5
```

## F

**Float**  
A number with a decimal point.
```python
price = 19.99
```

**Function**  
A reusable block of code that performs a specific task.
```python
def add(a, b):
    return a + b
```

**f-string**  
Formatted string literal (Python 3.6+).
```python
name = "Alice"
message = f"Hello, {name}"
```

## G

**Global Variable**  
A variable defined outside any function, accessible everywhere.
```python
TAX_RATE = 0.15  # Global
```

**Generator**  
A function that yields values one at a time, saving memory.
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1
```

## I

**Immutable**  
Cannot be changed after creation. Examples: strings, tuples, integers.
```python
text = "Hello"
text[0] = "h"  # Error! Strings are immutable
```

**Import**  
Loading a module or package to use its code.
```python
import math
from datetime import datetime
```

**Index**  
The position of an element in a sequence (starting from 0).
```python
items = ['a', 'b', 'c']
items[0]  # 'a' (index 0)
items[1]  # 'b' (index 1)
```

**Instance**  
A specific object created from a class.
```python
person = Person("Alice")  # person is an instance
```

**Integer (int)**  
A whole number without decimals.
```python
age = 25
```

**Iterable**  
An object that can be looped over (lists, strings, dictionaries).
```python
for item in [1, 2, 3]:  # List is iterable
    print(item)
```

**Iteration**  
One cycle through a loop.

## K

**Key**  
The identifier in a key-value pair (dictionary).
```python
user = {"name": "Alice"}  # "name" is the key
```

**Keyword Argument**  
An argument passed by parameter name.
```python
greet(name="Alice", greeting="Hi")
```

## L

**Lambda**  
An anonymous (unnamed) function.
```python
square = lambda x: x ** 2
```

**Library**  
A collection of modules and packages. See also: Package, Module.

**List**  
An ordered, mutable collection.
```python
numbers = [1, 2, 3, 4, 5]
```

**List Comprehension**  
Concise syntax for creating lists.
```python
squares = [x**2 for x in range(5)]
```

**Local Variable**  
A variable defined inside a function, only accessible within it.
```python
def calculate():
    result = 10  # Local to calculate()
```

**Loop**  
Code that repeats multiple times (for, while).

## M

**Method**  
A function defined inside a class.
```python
class Person:
    def greet(self):  # greet is a method
        print("Hello")
```

**Module**  
A Python file containing code that can be imported.
```python
# In mymodule.py
def greet():
    print("Hello")

# In another file
import mymodule
mymodule.greet()
```

**Mutable**  
Can be changed after creation. Examples: lists, dictionaries.
```python
items = [1, 2, 3]
items[0] = 10  # Allowed! Lists are mutable
```

## N

**None**  
Python's null value, representing "no value".
```python
result = None
```

**Nested**  
Placed inside another structure.
```python
# Nested loop
for i in range(3):
    for j in range(3):
        print(i, j)

# Nested list
matrix = [[1, 2], [3, 4]]
```

## O

**Object**  
An instance of a class containing data (attributes) and behavior (methods).

**OOP (Object-Oriented Programming)**  
Programming paradigm using classes and objects.

**Operator**  
A symbol that performs an operation (+, -, *, /, ==, etc.).

## P

**Package**  
A directory containing Python modules and an `__init__.py` file.

**Parameter**  
A variable in a function definition. See also: Argument.
```python
def greet(name):  # name is a parameter
    print(f"Hello, {name}")
```

**PEP 8**  
Python's style guide for writing readable code.

**pip**  
Python's package installer.
```bash
pip install requests
```

**Print**  
Output text to the console.
```python
print("Hello, World!")
```

## R

**Recursion**  
A function calling itself.
```python
def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)
```

**REPL (Read-Eval-Print Loop)**  
Interactive Python shell for running code.
```bash
python  # Start REPL
>>> 2 + 2
4
```

**Return**  
Send a value back from a function.
```python
def add(a, b):
    return a + b
```

## S

**Scope**  
The region where a variable is accessible (global vs local).

**self**  
Reference to the current instance in a class method.
```python
class Person:
    def __init__(self, name):
        self.name = name  # self refers to this instance
```

**Slice**  
Extract a portion of a sequence.
```python
items = [1, 2, 3, 4, 5]
items[1:4]  # [2, 3, 4]
```

**Statement**  
A complete line of code that performs an action.
```python
x = 5  # Assignment statement
print(x)  # Print statement
```

**String (str)**  
Text data enclosed in quotes.
```python
name = "Alice"
message = 'Hello'
```

**Syntax**  
The rules for writing valid Python code.

## T

**Traceback**  
Error message showing where an error occurred.
```
Traceback (most recent call last):
  File "main.py", line 5, in <module>
    result = 10 / 0
ZeroDivisionError: division by zero
```

**Tuple**  
An ordered, immutable collection.
```python
coordinates = (10, 20)
```

**Type**  
The kind of data (int, str, float, bool, list, dict, etc.).
```python
type(5)        # <class 'int'>
type("Hello")  # <class 'str'>
```

## V

**Variable**  
A named storage location for data.
```python
age = 25
name = "Alice"
```

**Virtual Environment (venv)**  
Isolated Python environment for a project.
```bash
python -m venv venv
```

## W

**While Loop**  
Repeats code while a condition is true.
```python
count = 0
while count < 5:
    print(count)
    count += 1
```

## Programming Acronyms

**API** — Application Programming Interface  
Interface for software communication.

**CSV** — Comma-Separated Values  
Simple data file format.

**HTTP** — HyperText Transfer Protocol  
Protocol for web communication.

**IDE** — Integrated Development Environment  
Software for writing code (VS Code, PyCharm).

**JSON** — JavaScript Object Notation  
Data interchange format.
```python
{"name": "Alice", "age": 25}
```

**ORM** — Object-Relational Mapping  
Map database tables to Python classes (SQLAlchemy).

**REPL** — Read-Eval-Print Loop  
Interactive programming environment.

**REST** — Representational State Transfer  
API architectural style.

**SQL** — Structured Query Language  
Database query language.

**URL** — Uniform Resource Locator  
Web address.

**UTF-8** — Unicode Transformation Format  
Character encoding standard.

**UUID** — Universally Unique Identifier  
Unique identifier format.

## Common File Extensions

**.py** — Python source file  
**.pyc** — Compiled Python bytecode  
**.pyw** — Python script (Windows, no console)  
**.pyi** — Python stub file (type hints)  
**.ipynb** — Jupyter notebook  
**.txt** — Text file  
**.json** — JSON data file  
**.csv** — CSV data file  
**.md** — Markdown documentation  
**.yml/.yaml** — YAML configuration file  

## Python-Specific Terms

**Dunder Method**  
"Double underscore" method (also called "magic method").
```python
__init__, __str__, __len__, __add__
```

**Generator Expression**  
Like list comprehension but creates generator.
```python
squares = (x**2 for x in range(1000))
```

**Pythonic**  
Code that follows Python idioms and best practices.
```python
# Pythonic
for item in items:
    process(item)

# Not Pythonic
for i in range(len(items)):
    process(items[i])
```

**Unpacking**  
Extracting values from a sequence.
```python
a, b, c = [1, 2, 3]
first, *rest = [1, 2, 3, 4, 5]
```

**Walrus Operator** (`:=`)  
Assignment expression (Python 3.8+).
```python
if (n := len(items)) > 10:
    print(f"Large list: {n} items")
```

**Zero-Based Indexing**  
First element is at index 0, not 1.
```python
items = ['a', 'b', 'c']
items[0]  # 'a' (first element)
```

---

**Tip:** Bookmark this page and refer back whenever you encounter unfamiliar terms!
