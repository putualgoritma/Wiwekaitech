# Admin Dashboard Testing Guide

## Prerequisites Checklist

### 1. **Database Setup**
- [ ] MySQL Server is running (port 3306)
- [ ] Database `wiwekaitech` exists or will be auto-created
- [ ] MySQLUser credentials match `.env` file

### 2. **Environment Configuration**
- [ ] `.env` file exists in `/backend` directory
- [ ] Database URL is correct: `mysql+pymysql://user:password@localhost:3306/wiwekaitech`
- [ ] JWT_SECRET_KEY is set to a strong random string

### 3. **Dependencies Installed**
```bash
cd backend
pip install -r requirements.txt
```

### 4. **Database Initialization**
```bash
cd backend
python seed_data.py
```

This will:
- Create all database tables
- Create default admin user: `admin` / `admin123`
- Create demo editor user: `editor` / `editor123`

---

## Testing Procedure

### Step 1: Start the Backend Server
```bash
cd backend
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

### Step 2: Access Admin Login
Navigate to: **http://localhost:8000/admin/login**

### Step 3: Login Tests

#### Test 3a: Login with Admin User
- **Username:** `admin`
- **Password:** `admin123`
- **Expected:** Redirects to `/admin/dashboard`

#### Test 3b: Admin Dashboard
Should see all menu items:
- Dashboard (current)
- Content → Products, Projects, Tutorials, Blog Posts
- Users (admin-only)
- Logout button with username displayed

---

## Test Cases

### 1. **Authentication Flow**
- [ ] Invalid credentials show error message
- [ ] Valid login sets JWT cookie
- [ ] Accessing protected pages without login redirects to login
- [ ] Logout clears cookie and redirects to login

### 2. **Product Management (Editor+ Role)**
**List Products:**
- [ ] `/admin/products` shows all products (active & inactive)
- [ ] Create button visible for editor & admin

**Create Product:**
- [ ] Form loads at `/admin/products/create`
- [ ] Required fields: title_en, title_id, slug, description_en, description_id
- [ ] Submit POST to `/api/v1/admin/products`
- [ ] Success: redirects to products list

**Edit Product:**
- [ ] Form pre-fills with existing data
- [ ] Submit PUT to `/api/v1/admin/products/{id}`
- [ ] Shows success message

**Delete Product:**
- [ ] Confirm dialog appears
- [ ] Submit DELETE to `/api/v1/admin/products/{id}`
- [ ] Removed from list

### 3. **Project Management** (Same tests as Products)
- [ ] List: `/admin/projects`
- [ ] Create: `/admin/projects/create`
- [ ] Edit: `/admin/projects/{id}/edit`
- [ ] Delete with confirmation

### 4. **Tutorial Management** (Same tests as Products)
- [ ] List: `/admin/tutorials`
- [ ] Create: `/admin/tutorials/create`
- [ ] Edit: `/admin/tutorials/{id}/edit`

### 5. **Blog Management** (Same tests as Products)
- [ ] List: `/admin/blog`
- [ ] Create: `/admin/blog/create`
- [ ] Edit: `/admin/blog/{id}/edit`

### 6. **User Management (Admin Only)**
- [ ] Non-admin users cannot access `/admin/users` (403 error)
- [ ] Admin can list all users at `/admin/users`
- [ ] Admin can create new users
- [ ] Admin can edit user roles (admin/editor/viewer)
- [ ] Admin cannot delete their own account

### 7. **Role-Based Access Control**

**Viewer Role:**
- [ ] Can view dashboards and content lists
- [ ] Cannot see create/edit/delete buttons
- [ ] API calls return 403 Forbidden

**Editor Role:**
- [ ] Can create/edit/delete content
- [ ] Cannot access user management
- [ ] Cannot see User menu item

**Admin Role:**
- [ ] Full access to all features
- [ ] Can manage users
- [ ] Can manage all content

### 8. **API Endpoints**

#### Authentication
- [ ] `POST /api/v1/admin/login` - Returns JWT in cookie
- [ ] `POST /api/v1/admin/logout` - Clears JWT cookie
- [ ] `GET /api/v1/admin/me` - Returns current user info

#### Products
- [ ] `GET /api/v1/admin/products` - List all
- [ ] `GET /api/v1/admin/products/{id}` - Get one
- [ ] `POST /api/v1/admin/products` - Create
- [ ] `PUT /api/v1/admin/products/{id}` - Update
- [ ] `DELETE /api/v1/admin/products/{id}` - Delete

#### Projects, Tutorials, Blog (Same pattern)
- [ ] All CRUD endpoints return 200/201/404/400 as appropriate

#### Users (Admin Only)
- [ ] `GET /api/v1/admin/users` - List all
- [ ] `GET /api/v1/admin/users/{id}` - Get one
- [ ] `POST /api/v1/admin/users` - Create
- [ ] `PUT /api/v1/admin/users/{id}` - Update
- [ ] `DELETE /api/v1/admin/users/{id}` - Delete (except self)

---

## Curl Test Examples

### 1. Login
```bash
curl -X POST http://localhost:8000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt
```

### 2. Create Product
```bash
curl -X POST http://localhost:8000/api/v1/admin/products \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title_en": "API Development",
    "title_id": "Pengembangan API",
    "slug": "api-dev",
    "description_en": "Build powerful APIs",
    "description_id": "Bangun API yang kuat",
    "is_active": true
  }'
```

### 3. Get Current User
```bash
curl -X GET http://localhost:8000/api/v1/admin/me \
  -b cookies.txt
```

### 4. List Products
```bash
curl -X GET http://localhost:8000/api/v1/admin/products \
  -b cookies.txt
```

---

## Troubleshooting

### Issue: "No module named 'sqlalchemy'"
**Solution:**
```bash
pip install -r requirements.txt
```

### Issue: "Connection refused" (MySQL)
**Solution:**
1. Start MySQL server
2. Check DATABASE_URL in config.py
3. Ensure database exists or use root credentials in .env

### Issue: JWT token not working
**Solution:**
1. Check JWT_SECRET_KEY in config.py
2. Verify cookies are enabled in browser
3. Clear browser cookies and login again

### Issue: 403 Forbidden on protected routes
**Solution:**
This confirms role-based access is working correctly!
- Use admin account to test admin-only features
- Use editor account to test editor features

---

## Expected Database State After Seeding

### Users Table
| ID | Username | Role     | Email                   |
|----|----------|----------|-------------------------|
| 1  | admin    | admin    | admin@wiwekaitech.com   |
| 2  | editor   | editor   | editor@wiwekaitech.com  |

### Other Tables
- Empty (ready for content creation)

---

## Performance Considerations

- JWT expiration: 24 hours (configurable in config.py)
- Database queries are optimized with proper indexing
- Pagination not yet implemented in admin list views (can be added)
- All responses follow standard JSON format

---

## Demo Usage

After seeding and login:

1. **Create a product:**
   - Go to `/admin/products`
   - Click "Add Product"
   - Fill form and submit
   - Product appears in list

2. **Edit a project:**
   - Go to `/admin/projects`
   - Click "Edit" on any project
   - Modify fields and submit
   - Changes saved to database

3. **Manage users (Admin only):**
   - Go to `/admin/users`
   - Create new editor user
   - Edit roles and permissions
   - Delete users (except self)

---

## Next Steps

- [ ] Implement pagination in list views
- [ ] Add search/filter to content lists
- [ ] Add file upload for images/icons
- [ ] Add audit logging for admin actions
- [ ] Implement password change endpoint
- [ ] Add rate limiting to login endpoint
- [ ] Add email notifications for admin actions
