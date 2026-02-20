#!/usr/bin/env python3
"""
Setup Verification Script
Checks if all dependencies and configurations are ready
"""

import sys
import os
from pathlib import Path

def check_package(package_name, import_name=None):
    """Check if a Python package is installed"""
    if import_name is None:
        import_name = package_name
    
    try:
        __import__(import_name)
        print(f"✅ {package_name} - Installed")
        return True
    except ImportError:
        print(f"❌ {package_name} - NOT installed")
        return False

def check_file_exists(file_path):
    """Check if a file exists"""
    if Path(file_path).exists():
        print(f"✅ {file_path} - Found")
        return True
    else:
        print(f"❌ {file_path} - NOT found")
        return False

def check_directory_exists(dir_path):
    """Check if a directory exists"""
    if Path(dir_path).exists():
        print(f"✅ {dir_path}/ - Exists")
        return True
    else:
        print(f"❌ {dir_path}/ - NOT found")
        return False

def main():
    print("=" * 60)
    print("WIWEKAITECH ADMIN DASHBOARD - SETUP VERIFICATION")
    print("=" * 60)
    print()
    
    all_ok = True
    
    # Check Python version
    print("📌 Python Environment")
    print(f"   Python version: {sys.version.split()[0]}")
    if sys.version_info >= (3, 8):
        print("   ✅ Python 3.8+ required")
    else:
        print("   ❌ Python 3.8+ required - Please upgrade!")
        all_ok = False
    print()
    
    # Check core dependencies
    print("📌 Core Dependencies")
    packages = [
        ("fastapi", "fastapi"),
        ("uvicorn", "uvicorn"),
        ("sqlalchemy", "sqlalchemy"),
        ("pymysql", "pymysql"),
        ("passlib", "passlib"),
        ("python-jose", "jose"),
        ("jinja2", "jinja2"),
        ("pydantic", "pydantic"),
        ("python-multipart", "multipart"),
    ]
    
    for pkg_name, import_name in packages:
        if not check_package(pkg_name, import_name):
            all_ok = False
    print()
    
    # Check directories
    print("📌 Required Directories")
    dirs = [
        "app",
        "app/models",
        "app/routers",
        "app/services",
        "app/schemas",
        "app/utils",
        "app/templates",
        "app/static",
    ]
    
    for dir_path in dirs:
        if not check_directory_exists(dir_path):
            all_ok = False
    print()
    
    # Check configuration files
    print("📌 Configuration Files")
    files = [
        "app/config.py",
        "app/main.py",
        "app/database.py",
        "seed_data.py",
        "requirements.txt",
    ]
    
    for file_path in files:
        if not check_file_exists(file_path):
            all_ok = False
    print()
    
    # Check key routes
    print("📌 Core Route Files")
    routes = [
        "app/routers/auth.py",
        "app/routers/admin_products.py",
        "app/routers/admin_projects.py",
        "app/routers/admin_tutorials.py",
        "app/routers/admin_blog.py",
        "app/routers/admin_users.py",
        "app/routers/admin_templates.py",
    ]
    
    for route_file in routes:
        if not check_file_exists(route_file):
            all_ok = False
    print()
    
    # Check templates
    print("📌 Required Templates")
    templates = [
        "app/templates/base.html",
        "app/templates/login.html",
        "app/templates/dashboard.html",
        "app/templates/products/list.html",
        "app/templates/projects/list.html",
    ]
    
    for template_file in templates:
        if not check_file_exists(template_file):
            all_ok = False
    print()
    
    # Check static files
    print("📌 Static Assets")
    statics = [
        "app/static/admin.css",
        "app/static/admin.js",
    ]
    
    for static_file in statics:
        if not check_file_exists(static_file):
            all_ok = False
    print()
    
    # Check and import config
    print("📌 Configuration Check")
    try:
        from app.config import settings
        print(f"✅ Config loaded")
        print(f"   - API Prefix: {settings.API_PREFIX}")
        print(f"   - JWT Algorithm: {settings.JWT_ALGORITHM}")
        print(f"   - JWT Expiration: {settings.JWT_EXPIRATION_HOURS} hours")
        print(f"   - Database URL: {settings.DATABASE_URL[:30]}...")
    except Exception as e:
        print(f"❌ Config loading failed: {e}")
        all_ok = False
    print()
    
    # Check database connection
    print("📌 Database Connection")
    try:
        from app.database import engine
        with engine.connect() as conn:
            print("✅ Database connection successful")
    except Exception as e:
        print(f"⚠️  Database connection failed: {e}")
        print("   This is OK if MySQL isn't running yet")
        print("   Run: mysql -u root -p")
        print("   Then: python seed_data.py")
    print()
    
    # Summary
    print("=" * 60)
    if all_ok:
        print("✅ All checks passed! Ready to start the server.")
        print()
        print("Next steps:")
        print("1. Ensure MySQL is running")
        print("2. Run: python seed_data.py")
        print("3. Run: python -m uvicorn app.main:app --reload")
        print("4. Visit: http://localhost:8000/admin/login")
        return 0
    else:
        print("❌ Some checks failed. See above for details.")
        print()
        print("To fix:")
        print("1. Install missing packages: pip install -r requirements.txt")
        print("2. Ensure MySQL is installed and running")
        print("3. Check that all required files exist")
        return 1

if __name__ == "__main__":
    sys.exit(main())
