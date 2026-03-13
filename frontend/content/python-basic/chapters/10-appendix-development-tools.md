---
title: "Development Tools Setup"
slug: "appendix-development-tools"
chapterNumber: 10
part: 6
partTitle: "Appendices"
readingTime: 10
difficulty: "beginner"
objectives:
  - Set up a professional Python development environment
  - Configure VS Code for Python
  - Use virtual environments
  - Learn essential command-line tools
  - Install and manage Python packages
tags:
  - tools
  - setup
  - vscode
  - pip
  - virtual-environment
locale: "en"
summary: "Complete guide to setting up professional Python development tools and environment."
---

# Development Tools Setup

Professional developers use professional tools. This guide helps you set up a complete Python development environment.

<LearningObjectives />

## Python Installation

### Windows

**Option 1: Official Python (Recommended)**

1. Visit: python.org/downloads
2. Download latest Python 3.11 or 3.12
3. **Important:** Check "Add Python to PATH"
4. Click "Install Now"
5. Verify installation:

```powershell
python --version
# Output: Python 3.12.0 (or your version)

pip --version
# Output: pip 23.x.x
```

**Option 2: Microsoft Store**

1. Open Microsoft Store
2. Search "Python 3.12"
3. Click "Get"
4. Automatically added to PATH

### macOS

**Option 1: Homebrew (Recommended)**

```bash
# Install Homebrew if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python@3.12

# Verify
python3 --version
pip3 --version
```

**Option 2: Official Installer**

1. Visit: python.org/downloads
2. Download macOS installer
3. Run .pkg file
4. Follow installation wizard

### Linux

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install python3.12 python3-pip python3-venv

# Verify
python3 --version
pip3 --version
```

**Fedora/RHEL:**

```bash
sudo dnf install python3 python3-pip

# Verify
python3 --version
```

## Visual Studio Code Setup

### Installation

1. **Download:** code.visualstudio.com
2. **Install:** Run installer (default settings are fine)
3. **Launch:** Open VS Code

### Essential Python Extensions

```text
# caption: Install these extensions
1. Python (Microsoft) - Python language support
2. Pylance - Fast IntelliSense
3. Python Debugger - Debugging support
4. autoDocstring - Generate docstrings
5. Better Comments - Highlight TODOs
6. Error Lens - Inline error messages
```

**How to install:**
1. Click Extensions icon (left sidebar)
2. Search for extension name
3. Click "Install"

### VS Code Configuration for Python

Create `.vscode/settings.json` in your project folder:

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/venv/bin/python",
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "python.formatting.provider": "black",
  "editor.formatOnSave": true,
  "editor.rulers": [88],
  "files.exclude": {
    "**/__pycache__": true,
    "**/*.pyc": true
  },
  "[python]": {
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.wordWrap": "on"
  }
}
```

### Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + ~` | Open terminal |
| `F5` | Start debugging |
| `Ctrl + Shift + P` | Command palette |
| `Ctrl + Space` | Trigger autocomplete |
| `Ctrl + /` | Toggle comment |
| `Shift + Alt + F` | Format document |
| `F12` | Go to definition |
| `Ctrl + D` | Select next occurrence |

## Virtual Environments

Virtual environments isolate project dependencies.

### Why Use Virtual Environments?

```text
Without venv:                  With venv:
  All packages shared            Each project isolated
  ├── Project A                  ├── Project A
  └── Project B                  │   └── venv (Django 4.0)
      Both use Django 3.2        └── Project B
                                     └── venv (Django 5.0)
                                     
  Risk of conflicts!             No conflicts!
```

### Creating Virtual Environment

```bash
# caption: Windows PowerShell
# Navigate to project folder
cd C:\\Users\\YourName\\my_project

# Create venv
python -m venv venv

# Activate
.\\venv\\Scripts\\Activate

# Your prompt should change:
# (venv) PS C:\\Users\\YourName\\my_project>
```

```bash
# caption: macOS/Linux
# Navigate to project
cd ~/my_project

# Create venv
python3 -m venv venv

# Activate
source venv/bin/activate

# Your prompt should change:
# (venv) username@computer:~/my_project$
```

### Using Virtual Environment

```bash
# Activate venv (do this every time you work on project)
# Windows:
.\\venv\\Scripts\\Activate
# Mac/Linux:
source venv/bin/activate

# Install packages (only in this venv)
pip install fastapi

# Verify it's isolated
pip list  # Shows only packages in this venv

# Deactivate when done
deactivate
```

### Requirements File

Track project dependencies:

```bash
# Save current packages
pip freeze > requirements.txt

# Install from requirements (on new machine)
pip install -r requirements.txt
```

Example `requirements.txt`:

```text
# caption: requirements.txt
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
pydantic==2.5.0
```

## Package Management with pip

### Basic pip Commands

```bash
# Install package
pip install requests

# Install specific version
pip install django==4.2

# Install from requirements.txt
pip install -r requirements.txt

# Upgrade package
pip install --upgrade requests

# Uninstall package
pip uninstall requests

# List installed packages
pip list

# Show package info
pip show requests

# Search for packages (deprecated, use pypi.org)
# pip search requests  # No longer works
```

### Common Packages to Know

```bash
# caption: Recommended packages by use case
# Web Development
pip install fastapi uvicorn          # Modern API
pip install django                   # Full-stack web
pip install flask                    # Lightweight web

# Data Analysis
pip install pandas numpy matplotlib  # Data manipulation
pip install jupyter                  # Interactive notebooks

# Databases
pip install sqlalchemy               # ORM
pip install psycopg2-binary          # PostgreSQL
pip install pymongo                  # MongoDB

# Testing
pip install pytest pytest-cov        # Testing framework

# Utilities
pip install requests                 # HTTP requests
pip install python-dotenv            # Environment variables
pip install black flake8             # Code formatting/linting
```

## Git Version Control

### Installing Git

**Windows:**
- Download: git-scm.com
- Install with default settings

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt install git  # Ubuntu/Debian
sudo dnf install git  # Fedora
```

### Basic Git Workflow

```bash
# Initialize repository
git init

# Configure user (first time)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check status
git status

# Add files
git add filename.py      # Specific file
git add .                # All files

# Commit changes
git commit -m "Add user authentication"

# View history
git log

# Create branch
git branch feature-name
git checkout feature-name
# Or create and switch:
git checkout -b feature-name

# Merge branch
git checkout main
git merge feature-name

# Connect to GitHub
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

### .gitignore File

Prevent committing unnecessary files:

```text
# caption: .gitignore
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/

# IDE
.vscode/
.idea/
*.swp
*.swo

# Environment variables
.env
.env.local

# Database
*.db
*.sqlite3

# OS
.DS_Store
Thumbs.db

# Project specific
uploads/
logs/
*.log
```

## Terminal/Command Line Basics

### Essential Commands

**Windows PowerShell:**

```powershell
# Navigate
cd folder_name          # Change directory
cd ..                   # Go up one level
cd ~                    # Go to home directory

# List files
ls                      # List files
ls -Force               # Include hidden files

# File operations
mkdir new_folder        # Create folder
New-Item file.txt       # Create file
Remove-Item file.txt    # Delete file
Copy-Item src dest      # Copy file
Move-Item src dest      # Move file

# View file
cat file.txt           # Display file contents

# Clear screen
clear
```

**macOS/Linux (Bash):**

```bash
# Navigate
cd folder_name          # Change directory
cd ..                   # Go up one level
cd ~                    # Go to home directory
pwd                     # Show current directory

# List files
ls                      # List files
ls -la                  # Detailed list with hidden files

# File operations
mkdir new_folder        # Create folder
touch file.txt          # Create file
rm file.txt             # Delete file
cp src dest             # Copy file
mv src dest             # Move file

# View file
cat file.txt           # Display contents
head file.txt          # First 10 lines
tail file.txt          # Last 10 lines

# Clear screen
clear
```

## Python REPL (Interactive Shell)

### Starting REPL

```bash
# Start Python REPL
python      # Windows
python3     # macOS/Linux

# Enhanced REPL (install first)
pip install ipython
ipython
```

### Using REPL

```python
>>> 2 + 2
4

>>> name = "Alice"
>>> print(f"Hello, {name}")
Hello, Alice

>>> import math
>>> math.sqrt(16)
4.0

>>> # Multi-line
>>> def greet(name):
...     return f"Hello, {name}"
...
>>> greet("Bob")
'Hello, Bob'

>>> # Help
>>> help(len)

>>> # Exit
>>> exit()  # or Ctrl+D (Mac/Linux) / Ctrl+Z (Windows)
```

## Project Structure Template

Recommended Python project structure:

```text
my_project/
├── .venv/                 # Virtual environment
├── .gitignore            # Git ignore file
├── README.md             # Project description
├── requirements.txt      # Dependencies
├── .env                  # Environment variables (don't commit!)
├── main.py               # Entry point
├── config.py             # Configuration
├── src/                  # Source code
│   ├── __init__.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── user.py
│   ├── services/
│   │   ├── __init__.py
│   │   └── auth_service.py
│   └── utils/
│       ├── __init__.py
│       └── validators.py
├── tests/                # Test files
│   ├── __init__.py
│   ├── test_models.py
│   └── test_services.py
└── docs/                 # Documentation
    └── API.md
```

## Debugging Tools

### Built-in Debugger (pdb)

```python
import pdb

def calculate_total(items):
    total = 0
    pdb.set_trace()  # Debugger starts here
    for item in items:
        total += item["price"]
    return total

# Commands in pdb:
# n - next line
# s - step into function
# c - continue execution
# p variable - print variable
# l - list code
# q - quit debugger
```

### VS Code Debugger

1. Set breakpoint (click left of line number)
2. Press `F5` to start debugging
3. Use debug toolbar:
   - Continue (F5)
   - Step Over (F10)
   - Step Into (F11)
   - Step Out (Shift+F11)

## Code Quality Tools

### Linting (Flake8)

```bash
# Install
pip install flake8

# Run
flake8 myfile.py
flake8 src/  # Check directory

# Configure in setup.cfg or .flake8
[flake8]
max-line-length = 88
exclude = .git,__pycache__,venv
```

### Formatting (Black)

```bash
# Install
pip install black

# Format file
black myfile.py

# Format directory
black src/

# Check without modifying
black --check myfile.py
```

### Type Checking (mypy)

```bash
# Install
pip install mypy

# Check types
mypy myfile.py
```

## Quick Start Checklist

When starting a new project:

- [ ] Create project folder
- [ ] Create virtual environment
- [ ] Activate venv
- [ ] Create `.gitignore`
- [ ] `git init`
- [ ] Create `README.md`
- [ ] Install dependencies
- [ ] Create `requirements.txt`
- [ ] Open in VS Code
- [ ] Configure VS Code settings
- [ ] Write code!

---

**You're now set up like a professional Python developer!** These tools will serve you throughout your career.
