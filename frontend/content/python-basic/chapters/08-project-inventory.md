---
title: "Project: Inventory Management System (ERP Foundation)"
slug: "project-inventory"
chapterNumber: 8
part: 4
partTitle: "Project-Based Implementation"
readingTime: 30
difficulty: "intermediate"
objectives:
  - Build a complete inventory management system from scratch
  - Apply OOP principles to real business logic
  - Understand how ERP systems manage stock and transactions
  - Learn data persistence patterns for business applications
  - Practice separation of concerns in application architecture
tags:
  - project
  - inventory
  - erp
  - business-logic
  - oop
locale: "en"
summary: "Build a real-world inventory management system that demonstrates foundational concepts used in ERP development."
---

# Project: Inventory Management System (ERP Foundation)

Welcome to the most important project in this book — an **Inventory Management System** that mirrors how real ERP systems manage stock, products, and transactions.

This isn't a toy project. You'll build something that demonstrates **actual business logic** used in production systems.

<LearningObjectives />

## Why This Project Matters

Inventory management is at the **core of every ERP system**. Whether you're building:

- **E-commerce platforms** (Amazon, Shopify)
- **Manufacturing systems** (production tracking)
- **Retail POS** (point-of-sale systems)
- **Warehouse management** (logistics companies)

...they all need to track products, quantities, and movements.

By building this, you'll understand:

- How ERP systems model business entities
- How to prevent negative stock (business rules)
- How to track transaction history (audit trails)
- How to separate data logic from display logic

## System Requirements

Our inventory system will support:

### Core Features

1. **Product Management**
   - Add products with name, SKU, description, price
   - Update product information
   - View product details and current stock

2. **Stock Management**
   - Record incoming stock (purchases)
   - Record outgoing stock (sales)
   - Prevent negative inventory
   - Display current stock levels

3. **Transaction History**
   - Track all stock movements
   - Record timestamps
   - Store remarks/notes
   - Generate transaction reports

4. **Reporting**
   - Show low stock alerts
   - Display most active products
   - Generate stock value report

## Architecture Design

Before writing code, let's design our system architecture — this is how professional developers work.

### Entity Model

We need three main classes:

**Product** — Represents items in inventory
- Attributes: `sku`, `name`, `description`, `price`, `current_stock`
- Methods: `display_info()`, `update_price()`

**Transaction** — Records stock movements
- Attributes: `product_sku`, `quantity`, `type` (in/out), `timestamp`, `remarks`
- Methods: `display()`, `get_value()`

**InventorySystem** — Manages everything
- Attributes: `products` (dictionary), `transactions` (list)
- Methods: `add_product()`, `stock_in()`, `stock_out()`, `get_report()`

### Data Flow

```
User → InventorySystem → Product & Transaction
                ↓
          Validation & Business Rules
                ↓
          Update Stock & Record Transaction
```

## Implementation

Let's build this step by step.

### Step 1: The Product Class

```python
# caption: Product entity class
from datetime import datetime

class Product:
    """Represents a product in the inventory."""
    
    def __init__(self, sku, name, description, price):
        """
        Initialize a product.
        
        Args:
            sku (str): Stock Keeping Unit (unique identifier)
            name (str): Product name
            description (str): Product description
            price (float): Unit price
        """
        self.sku = sku
        self.name = name
        self.description = description
        self.price = price
        self.current_stock = 0  # Start with zero stock
        self.created_at = datetime.now()
    
    def display_info(self):
        """Display product information."""
        print(f"\\n{'='*50}")
        print(f"SKU: {self.sku}")
        print(f"Name: {self.name}")
        print(f"Description: {self.description}")
        print(f"Price: ${self.price:.2f}")
        print(f"Current Stock: {self.current_stock} units")
        print(f"Stock Value: ${self.get_stock_value():.2f}")
        print(f"{'='*50}")
    
    def get_stock_value(self):
        """Calculate total value of current stock."""
        return self.current_stock * self.price
    
    def update_price(self, new_price):
        """Update product price."""
        if new_price <= 0:
            raise ValueError("Price must be positive")
        self.price = new_price
        print(f"✓ Price updated to ${new_price:.2f}")
```

**Key Design Decisions:**

1. **SKU as unique identifier** — Like real systems (barcodes)
2. **Separate stock from product definition** — Stock is dynamic
3. **Calculated properties** — `get_stock_value()` computes on demand
4. **Data validation** — Price must be positive

### Step 2: The Transaction Class

```python
# caption: Transaction record class
class Transaction:
    """Records a stock movement (in or out)."""
    
    def __init__(self, product_sku, quantity, transaction_type, remarks=""):
        """
        Initialize a transaction.
        
        Args:
            product_sku (str): SKU of affected product
            quantity (int): Number of units moved
            transaction_type (str): 'in' or 'out'
            remarks (str): Optional notes
        """
        self.product_sku = product_sku
        self.quantity = quantity
        self.transaction_type = transaction_type
        self.remarks = remarks
        self.timestamp = datetime.now()
    
    def display(self):
        """Display transaction details."""
        direction = "→ IN" if self.transaction_type == "in" else "← OUT"
        timestamp = self.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        
        print(f"{timestamp} | {self.product_sku:15} | {direction} | "
              f"{self.quantity:5} units | {self.remarks}")
    
    def get_signed_quantity(self):
        """Return quantity with sign (+ for in, - for out)."""
        return self.quantity if self.transaction_type == "in" else -self.quantity
```

**Why Track Transactions?**

In real ERP systems, you need **audit trails**:
- When was stock added?
- Who removed it?
- Why was it adjusted?

Transactions provide this history.

### Step 3: The Inventory System

```python
# caption: Main inventory management system
class InventorySystem:
    """Manages products and stock transactions."""
    
    def __init__(self):
        """Initialize empty inventory."""
        self.products = {}  # SKU → Product object
        self.transactions = []  # List of all transactions
    
    def add_product(self, sku, name, description, price):
        """Add a new product to inventory."""
        if sku in self.products:
            raise ValueError(f"Product {sku} already exists")
        
        product = Product(sku, name, description, price)
        self.products[sku] = product
        print(f"✓ Added product: {name} (SKU: {sku})")
        return product
    
    def stock_in(self, sku, quantity, remarks=""):
        """Record incoming stock (purchases, returns, etc.)."""
        if sku not in self.products:
            raise ValueError(f"Product {sku} not found")
        
        if quantity <= 0:
            raise ValueError("Quantity must be positive")
        
        # Update product stock
        product = self.products[sku]
        product.current_stock += quantity
        
        # Record transaction
        transaction = Transaction(sku, quantity, "in", remarks)
        self.transactions.append(transaction)
        
        print(f"✓ Stock IN: {quantity} units of {product.name}")
        print(f"  New stock level: {product.current_stock}")
    
    def stock_out(self, sku, quantity, remarks=""):
        """Record outgoing stock (sales, damages, etc.)."""
        if sku not in self.products:
            raise ValueError(f"Product {sku} not found")
        
        if quantity <= 0:
            raise ValueError("Quantity must be positive")
        
        product = self.products[sku]
        
        # Business rule: Prevent negative stock
        if product.current_stock < quantity:
            raise ValueError(
                f"Insufficient stock! Available: {product.current_stock}, "
                f"Requested: {quantity}"
            )
        
        # Update product stock
        product.current_stock -= quantity
        
        # Record transaction
        transaction = Transaction(sku, quantity, "out", remarks)
        self.transactions.append(transaction)
        
        print(f"✓ Stock OUT: {quantity} units of {product.name}")
        print(f"  Remaining stock: {product.current_stock}")
    
    def get_product(self, sku):
        """Retrieve a product by SKU."""
        if sku not in self.products:
            raise ValueError(f"Product {sku} not found")
        return self.products[sku]
    
    def display_all_products(self):
        """Display all products and their stock levels."""
        print("\\n" + "="*70)
        print("                     INVENTORY SUMMARY")
        print("="*70)
        print(f"{'SKU':<15} {'Name':<25} {'Stock':>10} {'Value':>15}")
        print("-"*70)
        
        total_value = 0
        for product in self.products.values():
            stock_value = product.get_stock_value()
            total_value += stock_value
            
            print(f"{product.sku:<15} {product.name:<25} "
                  f"{product.current_stock:>10} ${stock_value:>14.2f}")
        
        print("-"*70)
        print(f"{'TOTAL INVENTORY VALUE:':>55} ${total_value:>14.2f}")
        print("="*70)
    
    def display_transaction_history(self, sku=None, limit=20):
        """Display transaction history."""
        print("\\n" + "="*80)
        print("                        TRANSACTION HISTORY")
        print("="*80)
        
        # Filter transactions if SKU provided
        transactions = self.transactions if sku is None else [
            t for t in self.transactions if t.product_sku == sku
        ]
        
        # Show most recent first
        recent_transactions = list(reversed(transactions[-limit:]))
        
        if not recent_transactions:
            print("No transactions found.")
            return
        
        for transaction in recent_transactions:
            transaction.display()
        
        print("="*80)
    
    def get_low_stock_alert(self, threshold=10):
        """Get products with stock below threshold."""
        low_stock = [
            product for product in self.products.values()
            if product.current_stock < threshold
        ]
        
        if not low_stock:
            print(f"\\n✓ All products have sufficient stock (>= {threshold})")
            return
        
        print(f"\\n⚠ WARNING: {len(low_stock)} products below {threshold} units:")
        for product in low_stock:
            print(f"  - {product.name} (SKU: {product.sku}): "
                  f"{product.current_stock} units")
    
    def get_most_active_products(self, top_n=5):
        """Get products with most transactions."""
        product_activity = {}
        
        for transaction in self.transactions:
            sku = transaction.product_sku
            product_activity[sku] = product_activity.get(sku, 0) + 1
        
        sorted_products = sorted(
            product_activity.items(),
            key=lambda x: x[1],
            reverse=True
        )[:top_n]
        
        print(f"\\nMost Active Products (Top {top_n}):")
        for sku, count in sorted_products:
            product = self.products[sku]
            print(f"  {count:3} transactions - {product.name}")
```

### Step 4: Running the System

```python
# caption: Example usage (main program)
def main():
    """Demonstration of inventory system."""
    
    # Initialize system
    inventory = InventorySystem()
    
    print("="*70)
    print("         INVENTORY MANAGEMENT SYSTEM - Demo")
    print("="*70)
    
    # Add products
    print("\\n[1] Adding products...")
    inventory.add_product(
        "LAP001", "Dell XPS 13 Laptop", 
        "13-inch ultrabook, 16GB RAM", 1299.99
    )
    inventory.add_product(
        "MOU001", "Logitech MX Master 3", 
        "Wireless ergonomic mouse", 99.99
    )
    inventory.add_product(
        "KEY001", "Keychron K2 Keyboard", 
        "Mechanical wireless keyboard", 79.99
    )
    
    # Receive stock (purchase from supplier)
    print("\\n[2] Receiving stock from supplier...")
    inventory.stock_in("LAP001", 50, "Initial purchase from supplier")
    inventory.stock_in("MOU001", 100, "Bulk order")
    inventory.stock_in("KEY001", 75, "New product launch")
    
    # Make sales
    print("\\n[3] Processing sales...")
    inventory.stock_out("LAP001", 5, "Customer order #1001")
    inventory.stock_out("MOU001", 12, "Bulk sale to company")
    inventory.stock_out("KEY001", 3, "Individual sales")
    
    # Check stock levels
    print("\\n[4] Current inventory:")
    inventory.display_all_products()
    
    # View a specific product
    print("\\n[5] Product detail:")
    laptop = inventory.get_product("LAP001")
    laptop.display_info()
    
    # Transaction history
    print("\\n[6] Recent transactions:")
    inventory.display_transaction_history(limit=10)
    
    # Low stock alert
    print("\\n[7] Checking stock levels...")
    inventory.get_low_stock_alert(threshold=20)
    
    # Most active products
    print("\\n[8] Activity report:")
    inventory.get_most_active_products(top_n=3)
    
    print("\\n" + "="*70)
    print("                  Demo Complete")
    print("="*70)

if __name__ == "__main__":
    main()
```

## Running the Project

Save all the code in a file called `inventory_system.py` and run:

```bash
python inventory_system.py
```

You'll see a complete demonstration of the system in action!

## Understanding ERP Concepts

This project demonstrates several ERP principles:

### 1. Entity Modeling

We modeled **business entities** (Products, Transactions) as classes — this is how ERP systems structure data.

### 2. Business Rules

We implemented **validation logic**:
- Prices must be positive
- Stock can't go negative
- SKUs must be unique

In real ERP, these are called **business constraints**.

### 3. Audit Trails

Every stock movement is **recorded** with:
- Timestamp
- Type (in/out)
- Quantity
- Remarks

This creates an **immutable history** — crucial for compliance.

### 4. Separation of Concerns

- **Product** class → Data structure
- **Transaction** class → Event record
- **InventorySystem** class → Business logic coordinator

This separation makes the system **maintainable and testable**.

## Extending the Project

Challenge yourself to add these features:

### Extension 1: Categories

Add product categories (Electronics, Office Supplies, etc.) and filter by category.

### Extension 2: Suppliers

Track which supplier each product comes from.

### Extension 3: Users & Permissions

Add a `User` class and track who performed each transaction.

### Extension 4: Data Persistence

Save inventory to a JSON file and load it when the program starts.

Hint:
```python
import json

def save_inventory(self, filename="inventory.json"):
    """Save inventory to JSON file."""
    # Your implementation here
    pass
```

### Extension 5: REST API Interface

Use **FastAPI** to turn this into a web API (this is your next learning step!).

## Reflection

Think about these questions:

- **How is this different** from simpler practice projects?
- **What real-world businesses** could use this system?
- **What's missing** that a production system would need?
- **How would you scale** this for 100,000 products?

## Summary

In this project, you:

✅ Built a complete inventory management system from scratch  
✅ Applied OOP principles to real business logic  
✅ Implemented business rules (validation, constraints)  
✅ Created audit trails with transaction history  
✅ Practiced separation of concerns in architecture  
✅ Saw how ERP systems model business entities

This is **real backend development**. You're not just learning Python — you're learning to build business systems.

---

**Congratulations!** You've completed the most significant project in this book. The skills you used here — modeling entities, enforcing rules, managing state — are the **foundation of all backend development**.

**Next Steps:** The final chapter will guide you on where to go from here to become a professional backend developer.
