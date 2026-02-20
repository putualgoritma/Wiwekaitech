# 🚀 Admin Dashboard - Quick Start & Testing Guide

## Status: ✅ LIVE AND RUNNING

Your admin dashboard is now fully operational! The FastAPI server is running on **http://localhost:8000**

---

## 🔓 Access the Admin Dashboard

### Login Page
**URL:** http://localhost:8000/admin/login

### Default Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`
- Role: Can manage everything (products, projects, tutorials, blog, users)

**Editor Account:**
- Username: `editor`
- Password: `editor123`
- Role: Can manage content (products, projects, tutorials, blog) but not users

---

## 📋 What to Test

### 1. **Authentication Flow**
- [ ] Navigate to http://localhost:8000/admin/login
- [ ] Try logging in with invalid credentials (should fail)
- [ ] Login with `admin` / `admin123`
- [ ] You should be redirected to the dashboard
- [ ] Check the navbar shows your username
- [ ] Click "Logout" to test logout
- [ ] You should be redirected back to login page

### 2. **Dashboard Access**
- [ ] Login again and verify you see the main dashboard
- [ ] Check that all menu items are visible:
  - Dashboard
  - Content > Products
  - Content > Projects
  - Content > Tutorials
  - Content > Blog Posts
  - Users (admin-only)

### 3. **Product Management**
- [ ] Click "Content" > "Products"
- [ ] View the list of 5 demo products (created during seeding)
- [ ] Click "Add Product" to create a new one
- [ ] Fill the form:
  - **Title (EN):** My Test Product
  - **Title (ID):** Produk Test Saya
  - **Slug:** my-test-product (should be unique)
  - **Description (EN):** A test description
  - **Description (ID):** Deskripsi test
  - **Active:** checked
- [ ] Click "Save" - should see success message and product appears in list
- [ ] Click "Edit" on the product you just created
- [ ] Modify title and save
- [ ] Click "Delete" and confirm - product should be removed

### 4. **Project Management**
- [ ] Click "Content" > "Projects"
- [ ] Repeat the same CRUD tests as products (create, read, update, delete)

### 5. **Tutorial Management**
- [ ] Click "Content" > "Tutorials"
- [ ] Test CRUD operations (create, read, update, delete)

### 6. **Blog Management**
- [ ] Click "Content" > "Blog Posts"
- [ ] Test CRUD operations (create, read, update, delete)

### 7. **User Management (Admin Only)**
- [ ] While logged in as admin, click "Users"
- [ ] View existing users (admin, editor)
- [ ] Try to create a new user:
  - Username: testuser
  - Email: testuser@example.com
  - Password: testpass123
  - Role: viewer
- [ ] Edit a user's role
- [ ] Try to delete a user (but NOT the admin account)

### 8. **Role-Based Access Control**
- [ ] Logout from admin account
- [ ] Login with `editor` / `editor123`
- [ ] Verify "Users" menu is NOT visible (editor can't see it)
- [ ] Try to manually navigate to http://localhost:8000/admin/users
- [ ] You should see a 403 Forbidden error (expected!)
- [ ] Verify you can still manage content (products, projects, etc.)

### 9. **API Testing**
Test the APIs directly using curl or Postman:

**Login:**
```bash
curl -X POST http://localhost:8000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}" \
  -c cookies.txt
```

**Get Current User:**
```bash
curl -X GET http://localhost:8000/api/v1/admin/me \
  -b cookies.txt
```

**List Products:**
```bash
curl -X GET http://localhost:8000/api/v1/admin/products \
  -b cookies.txt
```

**Create Product:**
```bash
curl -X POST http://localhost:8000/api/v1/admin/products \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title_en": "API Test Product",
    "title_id": "Produk Test API",
    "slug": "api-test-product",
    "description_en": "Created via API",
    "description_id": "Dibuat via API",
    "is_active": true
  }'
```

**Get Product by ID:**
```bash
curl -X GET http://localhost:8000/api/v1/admin/products/1 \
  -b cookies.txt
```

**Update Product:**
```bash
curl -X PUT http://localhost:8000/api/v1/admin/products/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title_en": "Updated Title",
    "title_id": "Judul Diperbarui",
    "description_en": "Updated description"
  }'
```

**Delete Product:**
```bash
curl -X DELETE http://localhost:8000/api/v1/admin/products/1 \
  -b cookies.txt
```

---

## 📚 Useful URLs

| Endpoint | Description |
|----------|-------------|
| http://localhost:8000 | API Root |
| http://localhost:8000/docs | Interactive API Docs (Swagger UI) |
| http://localhost:8000/redoc | ReDoc API Documentation |
| http://localhost:8000/admin/login | Admin Login Page |
| http://localhost:8000/admin/dashboard | Admin Dashboard (protected) |
| http://localhost:8000/admin/products | Product Management |
| http://localhost:8000/admin/projects | Project Management |
| http://localhost:8000/admin/tutorials | Tutorial Management |
| http://localhost:8000/admin/blog | Blog Management |
| http://localhost:8000/admin/users | User Management (admin only) |

---

## 🔍 Database Status

The MySQL database has been initialized with:

**Tables Created:**
- ✅ users (with admin & editor demo accounts)
- ✅ categories
- ✅ products (5 demo items)
- ✅ projects (5 demo items)
- ✅ tutorials (5 demo items)
- ✅ blog_posts (5 demo items)
- ✅ contact_messages

**Sample Users:**
- Admin: username=`admin`, password=`admin123`
- Editor: username=`editor`, password=`editor123`

---

## 🛠️ Server Status

**Backend Server:**
- ✅ Running on http://localhost:8000
- ✅ Uvicorn with auto-reload enabled
- ✅ All routers loaded (11 total)
- ✅ Database connection verified
- ✅ Static files mounted (CSS, JS)
- ✅ Jinja2 templates rendering

**Port:** 8000 (configurable in uvicorn command)

---

## 📁 Key Files Located At

**Backend Code:**
- `backend/app/main.py` - FastAPI application
- `backend/app/models/__init__.py` - Database models including User
- `backend/app/routers/` - All API endpoints
- `backend/app/services/` - Business logic (auth, products, etc.)
- `backend/app/templates/` - Jinja2 HTML templates
- `backend/app/static/` - CSS and JavaScript

**Configuration:**
- `backend/app/config.py` - Settings (JWT, database URL, etc.)
- `backend/.env` - Environment variables
- `backend/requirements.txt` - Python dependencies

**Documentation:**
- `ADMIN_TESTING_GUIDE.md` - Comprehensive testing checklist
- `ADMIN_DASHBOARD_IMPLEMENTATION.md` - Implementation details
- `ARCHITECTURE.md` - System architecture overview

---

## 🐛 Troubleshooting

### Issue: Cannot access http://localhost:8000/admin/login
**Solution:** 
- Ensure server is still running: Check terminal for "Uvicorn running on"
- Restart server: `python -m uvicorn app.main:app --reload`

### Issue: Login fails
**Solution:**
- Check credentials: admin/admin123 or editor/editor123
- Clear browser cookies and try again
- Check MySQL is running

### Issue: CSS/JS not loading
**Solution:**
- Check browser console for 404 errors on /static/
- Ensure `app/static/admin.css` and `app/static/admin.js` exist

### Issue: Database connection error
**Solution:**
- Verify MySQL is running: `mysql -u root -p`
- Check DATABASE_URL in `app/config.py` matches your MySQL setup
- Re-run: `python seed_data.py` to reinitialize

### Issue: "Module not found" error
**Solution:**
- Ensure all dependencies installed: `pip install -r requirements.txt`
- Verify you're in the backend directory: `cd backend`

---

## 🔐 Security Notes

**Current Configuration:**
- JWT Secret: "your-secret-key-change-in-production" (⚠️ Not secure!)
- Token Expiration: 24 hours
- Password Hashing: Bcrypt with 10 rounds

**For Production:**
1. Change JWT_SECRET_KEY to a random string:
   ```bash
   python -c "import secrets; print(secrets.token_urlsafe(32))"
   ```
   Then update `app/config.py` or `.env` file

2. Enable HTTPS/SSL (required for secure cookies)

3. Set ENVIRONMENT=production in `.env`

4. Change DATABASE_URL to use strong password

5. Add rate limiting on login endpoint

---

## 📞 Support

For detailed implementation information, see:
- `ADMIN_DASHBOARD_IMPLEMENTATION.md` - Complete technical documentation
- `ADMIN_TESTING_GUIDE.md` - Full testing checklist
- Code comments in `/backend/app/services/auth_service.py` - Authentication details

---

## Next Steps

After testing:
1. ✅ Verify all CRUD operations work
2. ✅ Test role-based access control
3. ✅ Create some demo content
4. ✅ Check database has your content
5. 📋 Consider features from ADMIN_DASHBOARD_IMPLEMENTATION.md Phase 2
6. 🚀 Deploy to production (update JWT secret, use HTTPS, etc.)

**Happy Testing! 🎉**
