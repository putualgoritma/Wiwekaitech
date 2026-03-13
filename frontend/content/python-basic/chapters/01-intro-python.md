---
title: "Introduction to Python"
slug: "intro-python"
chapterNumber: 1
part: 1
partTitle: "Foundations of Programming"
readingTime: 15
difficulty: "beginner"
objectives:
  - Understand what Python is and its role in backend development
  - Install Python on your computer
  - Write and run your first Python program
  - Understand the Python REPL and how to use it
  - Learn basic syntax and code structure
tags:
  - python
  - introduction
  - installation
  - setup
locale: "en"
summary: "Learn what Python is, how to install it, and write your first program. Start your programming journey with hands-on practice."
---

# Introduction to Python

Welcome to your first real chapter! In this chapter, we'll go from "What is Python?" to running your own Python programs. By the end, you'll have Python installed and working code running on your machine.

<LearningObjectives />

## What is Python?

Python is a **high-level, interpreted programming language** created by Guido van Rossum in 1991. But what does that actually mean?

### High-Level Language

"High-level" means Python code looks closer to human language than machine language:

```python
# caption: Python - Reads like English
# Calculate employee salary
if hours_worked > 40:
    overtime_pay = (hours_worked - 40) * hourly_rate * 1.5
    total_pay = (40 * hourly_rate) + overtime_pay
else:
    total_pay = hours_worked * hourly_rate
```

Compare this to **low-level** assembly language (you don't need to understand this):

```asm
# caption: Assembly - Machine-focused
MOV AX, [hours_worked]
CMP AX, 40
JLE skip_overtime
SUB AX, 40
MUL [hourly_rate]
...
```

Python lets you **think about the problem**, not the machine.

### Interpreted Language

When you write Python code, you don't need to "compile" it into machine code first. Instead:

1. You write Python code (`.py` file)
2. Python interpreter reads it line by line
3. Python executes it directly

This makes development **faster** — you can test changes immediately.

## Why Python for Backend Development?

Backend development means building the **server-side logic** that powers websites and applications. Python dominates this space because:

### 1. Framework Ecosystem

Python has world-class web frameworks:

- **FastAPI** — Modern, fast, async-capable API framework
- **Django** — Full-featured framework with built-in admin panel
- **Flask** — Lightweight microframework for custom solutions

### 2. Real-World Adoption

Companies using Python for backend:

- **Instagram** — 500M+ users on Django
- **Spotify** — Recommendation engines
- **Netflix** — Content delivery and recommendation
- **Uber** — Backend microservices
- **Dropbox** — Desktop client and backend

### 3. ERP & Business Software

Python powers enterprise systems:

- **Odoo** — Complete ERP framework (accounting, inventory, CRM)
- **ERPNext** — Open-source ERP system
- **Tryton** — Modular business software platform

This is why we're learning Python — it's the **language of backend and ERP**.

## Installing Python

Let's get Python running on your machine. Follow the instructions for your operating system.

### Windows Installation

**Step 1:** Download Python

1. Visit [python.org/downloads](https://python.org/downloads)
2. Download **Python 3.11** or newer (avoid Python 2.x)
3. Run the installer

**Step 2:** Important Checkbox!

⚠️ **Check "Add Python to PATH"** during installation!

This allows you to run Python from any folder in your terminal.

**Step 3:** Verify Installation

Open Command Prompt (search "cmd") and type:

```bash
python --version
```

You should see: `Python 3.11.x`

### macOS Installation

**Option 1: Official Installer**

1. Visit [python.org/downloads](https://python.org/downloads)
2. Download **Python 3.11** for macOS
3. Run the `.pkg` installer
4. Follow default installation steps

**Option 2: Using Homebrew** (recommended)

If you have Homebrew installed:

```bash
brew install python@3.11
```

**Verify:**

```bash
python3 --version
```

### Linux Installation

Most Linux distributions include Python, but it might be outdated.

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install python3.11 python3.11-venv python3-pip
```

**Fedora:**

```bash
sudo dnf install python3.11
```

**Verify:**

```bash
python3 --version
```

## Your First Python Program

Tradition demands that every programmer's first program prints "Hello, World!" Let's honor that tradition.

### Using the Python REPL

REPL stands for **Read-Eval-Print Loop** — an interactive Python environment.

Open your terminal and type:

```bash
python
```

You'll see something like:

```python
Python 3.11.0 (main, Oct 24 2022, 18:26:48)
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

The `>>>` is your **Python prompt**. Type this:

```python
>>> print("Hello, World!")
Hello, World!
```

🎉 **Congratulations!** You just wrote and executed your first Python code!

The REPL is perfect for testing small pieces of code. To exit, type:

```python
>>> exit()
```

### Creating a Python File

For real programs, we write code in files.

**Step 1:** Create a file called `hello.py`

You can use any text editor (Notepad, VS Code, Sublime Text, etc.).

**Step 2:** Write this code:

```python
# caption: hello.py
# My first Python program
print("Hello, World!")
print("I am learning Python!")
print("This is exciting!")
```

**Step 3:** Run it from your terminal:

```bash
python hello.py
```

**Output:**

```
Hello, World!
I am learning Python!
This is exciting!
```

### Understanding the Code

Let's break down what we wrote:

```python
# My first Python program
```

Lines starting with `#` are **comments** — notes for humans, ignored by Python.

```python
print("Hello, World!")
```

`print()` is a **function** that displays text on the screen.  
The text inside quotes `"..."` is a **string** (text data).

## Basic Python Syntax Rules

Before we go further, understand these fundamental rules:

### 1. Indentation Matters

Python uses **indentation** (spaces/tabs) to define code blocks:

```python
# caption: Correct
if True:
    print("This is indented")
    print("This is part of the if block")
```

```python
# caption: Incorrect
if True:
print("This will cause an error!")
```

**Use 4 spaces** for each indentation level (most editors do this automatically).

### 2. Case Sensitivity

Python distinguishes between uppercase and lowercase:

```python
name = "Alice"   # Different from
Name = "Bob"      # this variable
NAME = "Charlie"  # and this one
```

These are **three separate variables**.

### 3. Statements End with Newlines

You don't need semicolons `;` like other languages:

```python
# caption: Python
print("First line")
print("Second line")
```

```javascript
# caption: JavaScript (different)
console.log("First line");
console.log("Second line");
```

## Exercises

Time to practice! Try these exercises:

### Exercise 1: Personal Greeting

Create a file `greeting.py` that prints:
- Your name
- Your city
- Why you're learning Python

Example output:
```
My name is Alex
I live in Jakarta
I'm learning Python to become a backend developer
```

### Exercise 2: Calculator Display

Create `calculator.py` that prints a simple calculator interface:

```
===================
   CALCULATOR
===================
1. Addition
2. Subtraction
3. Multiplication
4. Division
===================
```

Hint: Use multiple `print()` statements.

### Exercise 3: ASCII Art

Create `art.py` that prints your initials using ASCII art. Example for "JD":

```
     J     DDD
     J     D  D
 J   J     D  D
  JJJ      DDD
```

Get creative!

## Reflection

Before moving to the next chapter, reflect on these questions:

- **What surprised you** about Python syntax?
- **How is Python different** from what you expected programming to be?
- **What questions do you have** about how Python works?

Write your thoughts in a notebook or document. Reflection solidifies learning.

---

## Summary

In this chapter, you:

✅ Learned what Python is and why it's used for backend development  
✅ Installed Python on your computer  
✅ Wrote and ran your first Python program  
✅ Learned about the REPL and Python files  
✅ Understood basic syntax rules (indentation, case sensitivity)

**Next Chapter:** We'll dive into variables and data types — how Python stores and manipulates information.

---

**Pro Tip:** Don't just read — **type every code example yourself**. Muscle memory is crucial for programming. Make mistakes, fix them, and learn from errors.
