# QUICK START GUIDE

Get the Wiwekaitech website running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Python 3.10+ installed
- MySQL 8.0+ installed
- Git installed

---

## Step 1: Database Setup (2 minutes)

```bash
# Open MySQL
mysql -u root -p

# Create database
CREATE DATABASE wiwekaitech CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Exit MySQL
exit;
```

Copy and run the SQL schema from `DATABASE_SCHEMA.md` to create all tables.

---

## Step 2: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd backend

# Create virtual environment
py -3.11 -m venv venv

# Activate it
# Windows:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

# Install dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt

# Configure environment
cp .env.example .env

# Edit .env and update DATABASE_URL:
# DATABASE_URL=mysql+pymysql://root:YOUR_PASSWORD@localhost:3306/wiwekaitech

# Start server
uvicorn app.main:app --reload
```

Backend running at: **http://localhost:8000**  
API Docs at: **http://localhost:8000/docs**

---

## Step 3: Frontend Setup (1 minute)

Open a NEW terminal:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Start development server
npm run dev
```

Frontend running at: **http://localhost:3000**

---

## Step 4: Verify Installation

1. Open **http://localhost:3000** in your browser
2. You should see the home page (in English by default)
3. Click language switcher to change to Indonesian
4. Navigate through all pages

API is accessible at **http://localhost:8000/docs** for testing.

---

## Common Issues & Solutions

### Issue: "Cannot connect to MySQL"
**Solution:** Check MySQL is running and credentials in `.env` are correct

```bash
# Test MySQL connection
mysql -u root -p
```

### Issue: "Module not found" (Frontend)
**Solution:** Delete node_modules and reinstall

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "ModuleNotFoundError" (Backend)
**Solution:** Ensure virtual environment is activated

```bash
cd backend
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Reinstall if needed
pip install -r requirements.txt
```

### Issue: "Table doesn't exist"
**Solution:** Create database tables

```bash
# Option 1: Use schema from DATABASE_SCHEMA.md
# Copy SQL and run in MySQL

# Option 2: Create tables via Python
python -c "from app.database import engine, Base; from app.models import *; Base.metadata.create_all(bind=engine)"
```

---

## Production Build

### Frontend Production Build:

```bash
cd frontend
npm run build
npm run start
```

### Backend Production:

```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## Seed Sample Data (Optional)

For testing, you can insert sample data:

```sql
-- Sample category
INSERT INTO categories (name_en, name_id, slug, type) VALUES
('FastAPI Development', 'Pengembangan FastAPI', 'fastapi-development', 'tutorial');

-- Sample product
INSERT INTO products (title_en, title_id, slug, description_en, description_id, icon, features_en, features_id, display_order, is_active) VALUES
('Custom ERP System', 'Sistem ERP Custom', 'custom-erp', 'Complete ERP solution', 'Solusi ERP lengkap', '🏢', '["Feature 1", "Feature 2"]', '["Fitur 1", "Fitur 2"]', 1, 1);
```

See `DATABASE_SCHEMA.md` for more sample data examples.

---

## Clean Reinstall (Optional)

**PowerShell (Windows 11):**
```powershell
Remove-Item -Recurse -Force venv
python -m venv venv
venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

**Command Prompt (cmd):**
```bat
rmdir /s /q venv
python -m venv venv
venv\Scripts\activate.bat
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

## Next Steps

1. ✅ Add real content (products, projects, tutorials, blog posts)
2. ✅ Customize styling in `tailwind.config.ts`
3. ✅ Update company info in `lib/constants.ts`
4. ✅ Add images to `/public/images/`
5. ✅ Deploy frontend to Vercel
6. ✅ Deploy backend to VPS/Cloud
7. ✅ Configure domain and SSL

---

## Useful Commands

### Frontend:
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Run ESLint
```

### Backend:
```bash
uvicorn app.main:app --reload           # Development
uvicorn app.main:app --host 0.0.0.0    # Production
```

### Database:
```bash
mysql -u root -p wiwekaitech            # Access database
mysqldump -u root -p wiwekaitech > backup.sql  # Backup
```

---

## Need Help?

- Check `README.md` for detailed documentation
- Check `ARCHITECTURE.md` for architecture details
- Check `API_ROUTES.md` for API documentation
- Check `DATABASE_SCHEMA.md` for database info

---

**You're all set! Happy coding! 🚀**
