---
title: "Object-Oriented Programming Basics"
slug: "oop-basics"
chapterNumber: 7
part: 3
partTitle: "Structured Programs"
readingTime: 25
difficulty: "intermediate"
objectives:
  - Understand classes and objects
  - Create classes with attributes and methods
  - Use __init__ for initialization
  - Apply OOP to model real business entities
  - Understand basic inheritance concepts
tags:
  - oop
  - classes
  - objects
  - methods
  - inheritance
locale: "en"
summary: "Learn object-oriented programming to model real-world business entities like products, customers, and orders."
---

# Object-Oriented Programming Basics

You've been using variables and functions. Now it's time to combine them into powerful **objects** that mirror real-world entities. This is how professional applications — from e-commerce to ERP systems — are built.

<LearningObjectives />

## Why Object-Oriented Programming?

### The Problem: Disconnected Data

```python
# caption: Without OOP - data is scattered
# Product 1
product1_name = "Laptop"
product1_price = 999
product1_stock = 15

# Product 2
product2_name = "Mouse"
product2_price = 25
product2_stock = 50

# Functions operate on separate variables
def sell_product1(quantity):
    global product1_stock
    product1_stock -= quantity

# This doesn't scale to 1000 products!
```

### The Solution: Objects Bundle Data + Behavior

```python
# caption: With OOP - data and behavior together
class Product:
    def __init__(self, name, price, stock):
        self.name = name
        self.price = price
        self.stock = stock
    
    def sell(self, quantity):
        self.stock -= quantity

# Create objects
laptop = Product("Laptop", 999, 15)
mouse = Product("Mouse", 25, 50)

# Each object manages its own data
laptop.sell(2)
mouse.sell(5)

print(f"{laptop.name}: {laptop.stock} left")
print(f"{mouse.name}: {mouse.stock} left")
```

**Benefits:**
- **Organization**: Related data stays together
- **Reusability**: Create many objects from one class
- **Maintainability**: Change behavior in one place
- **Real-world modeling**: Code mirrors business entities

## Classes and Objects

### What's the Difference?

```python
# caption: Class = Blueprint, Object = Instance
# Class: The blueprint (recipe)
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

# Objects: Specific instances (actual cars)
car1 = Car("Toyota", "Camry")
car2 = Car("Honda", "Civic")
car3 = Car("Tesla", "Model 3")

# Same blueprint, different data
print(car1.brand)  # Toyota
print(car2.brand)  # Honda
```

**Think of it like:**
- **Class** = Cookie cutter
- **Object** = Individual cookies

## Creating Your First Class

### Basic Syntax

```python
# caption: Class structure
class ClassName:
    """Class docstring"""
    
    def __init__(self, parameters):
        """Initialize object attributes"""
        self.attribute = value
    
    def method(self):
        """Method that acts on the object"""
        pass
```

### Simple Example

```python
class Dog:
    """Represents a dog"""
    
    def __init__(self, name, age):
        """Initialize dog with name and age"""
        self.name = name  # Attribute
        self.age = age    # Attribute
    
    def bark(self):
        """Make the dog bark"""
        print(f"{self.name} says Woof!")

# Create dog objects
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

# Access attributes
print(f"{dog1.name} is {dog1.age} years old")

# Call methods
dog1.bark()  # Buddy says Woof!
dog2.bark()  # Max says Woof!
```

### Understanding `self`

`self` refers to the **current object instance**:

```python
class Person:
    def __init__(self, name):
        self.name = name  # Store name in THIS object
    
    def greet(self):
        # Access THIS object's name
        print(f"Hello, I'm {self.name}")

alice = Person("Alice")
bob = Person("Bob")

alice.greet()  # Hello, I'm Alice (self = alice)
bob.greet()    # Hello, I'm Bob (self = bob)
```

**Rule:** `self` is always the first parameter in methods, but you don't pass it when calling:

```python
class Example:
    def method(self, param):
        pass

obj = Example()
obj.method("value")  # Python automatically passes obj as self
```

## Attributes vs Methods

### Attributes: Object Data

```python
class Product:
    def __init__(self, name, price):
        self.name = name      # Attribute: stores data
        self.price = price    # Attribute: stores data
        self.sold = 0         # Attribute: default value

laptop = Product("Laptop", 999)

# Access attributes
print(laptop.name)    # Laptop
print(laptop.price)   # 999

# Modify attributes (usually via methods, not directly)
laptop.price = 899
print(laptop.price)   # 899
```

###Methods: Object Behavior

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.stock = 100
    
    def sell(self, quantity):
        """Method: action the object can perform"""
        if quantity <= self.stock:
            self.stock -= quantity
            return True
        else:
            return False
    
    def restock(self, quantity):
        """Method: another action"""
        self.stock += quantity

laptop = Product("Laptop", 999)

# Call methods
laptop.sell(5)
print(laptop.stock)  # 95

laptop.restock(10)
print(laptop.stock)  # 105
```

## Practical Example: Bank Account

```python
# caption: Complete class example
class BankAccount:
    """Represents a bank account"""
    
    def __init__(self, account_number, owner, balance=0):
        """Initialize account"""
        self.account_number = account_number
        self.owner = owner
        self.balance = balance
        self.transaction_history = []
    
    def deposit(self, amount):
        """Add money to account"""
        if amount > 0:
            self.balance += amount
            self.transaction_history.append(f"Deposit: +${amount}")
            print(f"✓ Deposited ${amount}")
            return True
        else:
            print("✗ Invalid amount")
            return False
    
    def withdraw(self, amount):
        """Remove money from account"""
        if amount > self.balance:
            print("✗ Insufficient funds")
            return False
        elif amount <= 0:
            print("✗ Invalid amount")
            return False
        else:
            self.balance -= amount
            self.transaction_history.append(f"Withdrawal: -${amount}")
            print(f"✓ Withdrew ${amount}")
            return True
    
    def get_balance(self):
        """Check current balance"""
        return self.balance
    
    def print_statement(self):
        """Print account statement"""
        print(f"\\n=== Statement for {self.owner} ===")
        print(f"Account: {self.account_number}")
        print(f"Current Balance: ${self.balance:.2f}")
        print("\\nTransactions:")
        for transaction in self.transaction_history:
            print(f"  {transaction}")

# Use it
account = BankAccount("ACC001", "Alice", 1000)

account.deposit(500)
account.withdraw(200)
account.withdraw(2000)  # Fails
account.deposit(100)

account.print_statement()
```

**Output:**
```
✓ Deposited $500
✓ Withdrew $200
✗ Insufficient funds
✓ Deposited $100

=== Statement for Alice ===
Account: ACC001
Current Balance: $1400.00

Transactions:
  Deposit: +$500
  Withdrawal: -$200
  Deposit: +$100
```

## Practical Example: E-commerce Product

```python
class Product:
    """E-commerce product"""
    
    def __init__(self, id, name, price, stock, category):
        self.id = id
        self.name = name
        self.price = price
        self.stock = stock
        self.category = category
        self.reviews = []
    
    def update_stock(self, quantity):
        """Adjust stock level"""
        self.stock += quantity
        if self.stock < 0:
            self.stock = 0
    
    def add_review(self, rating, comment):
        """Add customer review"""
        if 1 <= rating <= 5:
            self.reviews.append({"rating": rating, "comment": comment})
            return True
        return False
    
    def get_average_rating(self):
        """Calculate average rating"""
        if not self.reviews:
            return 0
        total = sum(r["rating"] for r in self.reviews)
        return total / len(self.reviews)
    
    def is_in_stock(self):
        """Check if available"""
        return self.stock > 0
    
    def get_display_price(self):
        """Format price for display"""
        return f"${self.price:,.2f}"
    
    def __str__(self):
        """String representation"""
        return f"{self.name} - {self.get_display_price()} ({self.stock} in stock)"

# Create products
laptop = Product(101, "Laptop", 999.99, 15, "Electronics")
laptop.add_review(5, "Excellent!")
laptop.add_review(4, "Good value")

print(laptop)
print(f"Average rating: {laptop.get_average_rating():.1f}/5")
```

## Class Variables vs Instance Variables

### Instance Variables (Most Common)

Each object has its own copy:

```python
class Dog:
    def __init__(self, name):
        self.name = name  # Instance variable (unique to each dog)

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.name)  # Buddy
print(dog2.name)  # Max (different values)
```

### Class Variables (Shared)

All objects share the same value:

```python
class Dog:
    species = "Canis familiaris"  # Class variable (same for all dogs)
    
    def __init__(self, name):
        self.name = name  # Instance variable

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.species)  # Canis familiaris
print(dog2.species)  # Canis familiaris (same value)
print(Dog.species)   # Canis familiaris (access via class)
```

### Practical Use: Counting Instances

```python
class Product:
    total_products = 0  # Class variable: track all products
    
    def __init__(self, name, price):
        self.name = name
        self.price = price
        Product.total_products += 1  # Increment counter
    
    @classmethod
    def get_total_products(cls):
        """Class method: operates on class, not instance"""
        return cls.total_products

# Create products
product1 = Product("Laptop", 999)
product2 = Product("Mouse", 25)
product3 = Product("Keyboard", 45)

print(f"Total products created: {Product.get_total_products()}")  # 3
```

## Special Methods (Magic Methods)

Methods with double underscores have special meanings:

### `__init__`: Constructor

```python
class Person:
    def __init__(self, name):
        """Called when object is created"""
        print(f"Creating person: {name}")
        self.name = name

person = Person("Alice")  # Triggers __init__
```

### `__str__`: String Representation

```python
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    
    def __str__(self):
        """String representation for print()"""
        return f"{self.name} (${self.price})"

product = Product("Laptop", 999)
print(product)  # Laptop ($999) - calls __str__
```

### `__len__`: Length

```python
class Playlist:
    def __init__(self, name):
        self.name = name
        self.songs = []
    
    def add_song(self, song):
        self.songs.append(song)
    
    def __len__(self):
        """Support len(playlist)"""
        return len(self.songs)

playlist = Playlist("My Favorites")
playlist.add_song("Song 1")
playlist.add_song("Song 2")

print(len(playlist))  # 2 - calls __len__
```

## Inheritance Basics

Create specialized classes from general ones:

```python
# caption: Basic inheritance
class Employee:
    """Base class: general employee"""
    
    def __init__(self, name, employee_id, salary):
        self.name = name
        self.employee_id = employee_id
        self.salary = salary
    
    def get_info(self):
        return f"{self.name} (ID: {self.employee_id})"
    
    def calculate_pay(self):
        return self.salary

class Manager(Employee):
    """Derived class: specialized employee"""
    
    def __init__(self, name, employee_id, salary, department):
        super().__init__(name, employee_id, salary)  # Call parent __init__
        self.department = department  # Add new attribute
    
    def calculate_pay(self):
        """Override: managers get 20% bonus"""
        base_pay = super().calculate_pay()
        return base_pay * 1.20

# Use them
employee = Employee("Bob", "E001", 5000)
manager = Manager("Alice", "M001", 8000, "Sales")

print(employee.get_info())
print(f"Pay: ${employee.calculate_pay()}")

print(manager.get_info())
print(f"Department: {manager.department}")
print(f"Pay: ${manager.calculate_pay()}")
```

## Practical Example: Shopping Cart System

```python
# caption: Complete OOP example
class Product:
    """Product in the store"""
    
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price
    
    def __str__(self):
        return f"{self.name} - ${self.price:.2f}"

class CartItem:
    """Item in shopping cart"""
    
    def __init__(self, product, quantity):
        self.product = product
        self.quantity = quantity
    
    def get_subtotal(self):
        return self.product.price * self.quantity
    
    def __str__(self):
        return f"{self.product.name} x{self.quantity} = ${self.get_subtotal():.2f}"

class ShoppingCart:
    """Shopping cart"""
    
    def __init__(self):
        self.items = []
    
    def add_item(self, product, quantity=1):
        """Add product to cart"""
        # Check if product already in cart
        for item in self.items:
            if item.product.id == product.id:
                item.quantity += quantity
                print(f"✓ Updated {product.name} quantity")
                return
        
        # Add new item
        cart_item = CartItem(product, quantity)
        self.items.append(cart_item)
        print(f"✓ Added {product.name} to cart")
    
    def remove_item(self, product_id):
        """Remove product from cart"""
        for item in self.items:
            if item.product.id == product_id:
                self.items.remove(item)
                print(f"✓ Removed {item.product.name}")
                return True
        print("✗ Product not in cart")
        return False
    
    def get_total(self):
        """Calculate total"""
        return sum(item.get_subtotal() for item in self.items)
    
    def get_item_count(self):
        """Total number of items"""
        return sum(item.quantity for item in self.items)
    
    def display(self):
        """Show cart contents"""
        if not self.items:
            print("Cart is empty")
            return
        
        print("\\n=== SHOPPING CART ===")
        for item in self.items:
            print(f"  {item}")
        print(f"\\nTotal Items: {self.get_item_count()}")
        print(f"Total Price: ${self.get_total():.2f}")

# Demo
laptop = Product(101, "Laptop", 999)
mouse = Product(102, "Mouse", 25)
keyboard = Product(103, "Keyboard", 45)

cart = ShoppingCart()
cart.add_item(laptop, 1)
cart.add_item(mouse, 2)
cart.add_item(keyboard, 1)
cart.add_item(mouse, 1)  # Add more mice

cart.display()

cart.remove_item(103)  # Remove keyboard
cart.display()
```

## Exercises

### Exercise 1: Student Class

Create a `Student` class with:
- Attributes: `name`, `student_id`, `grades` (list)
- Methods:
  - `add_grade(grade)` - add a grade
  - `get_average()` - calculate average
  - `get_letter_grade()` - return A/B/C/D/F
  - `__str__()` - return "Name (ID: ...)"

### Exercise 2: Rectangle Class

Create a `Rectangle` class with:
- Attributes: `width`, `height`
- Methods:
  - `get_area()` - return width × height
  - `get_perimeter()` - return 2 × (width + height)
  - `is_square()` - return True if width == height
  - `__str__()` - return "Rectangle: WxH"

### Exercise 3: Library System

Create these classes:
- `Book`: attributes (title, author, isbn, available)
- `Member`: attributes (name, member_id, borrowed_books list)
- `Library`: attributes (books list, members list)
  - Methods: add_book, register_member, lend_book, return_book

### Exercise 4: Inventory System

Expand the Product class to create an inventory system:
- `Product`: id, name, price, stock, category
- `Inventory`: list of products
  - Methods: add_product, remove_product, update_stock, search_product, low_stock_alert (stock < 10)

## Summary

In this chapter, you learned:

✅ **Classes and objects** - Blueprints and instances  
✅ **Attributes** - Object data storage  
✅ **Methods** - Object behavior  
✅ **`__init__`** - Object initialization  
✅ **`self`** - Referring to current instance  
✅ **Special methods** - `__str__`, `__len__`, etc.  
✅ **Inheritance** - Creating specialized classes  

**Key Takeaway:** OOP lets you model real business entities. Products, customers, orders, employees — all become objects with data and behavior bundled together. This is the foundation of enterprise software.

---

**Next Chapter:** Building complete projects using everything you've learned.
