"""
Seed script to populate database with sample data
Run with: python seed_data.py
"""

from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta
from app.database import Base
from app.models import Product, Project, Tutorial, BlogPost, Category, User
from app.config import settings
from app.services.auth_service import AuthService

# Create engine and tables
engine = create_engine(settings.DATABASE_URL)

# Drop all existing tables and recreate them
print("🔄 Dropping existing tables...")
Base.metadata.drop_all(bind=engine)
print("✅ Tables dropped")

print("🔄 Creating new tables...")
Base.metadata.create_all(bind=engine)
print("✅ Tables created")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

db = SessionLocal()

try:
    # Clear existing data
    db.query(BlogPost).delete()
    db.query(Tutorial).delete()
    db.query(Project).delete()
    db.query(Product).delete()
    db.query(Category).delete()
    db.query(User).delete()
    db.commit()
    
    # Create default admin user
    print("🔄 Creating default admin user...")
    admin_success, admin_msg, admin_user = AuthService.create_user(
        db,
        username="admin",
        email="admin@wiwekaitech.com",
        password="admin123",
        role="admin"
    )
    
    if admin_success:
        print(f"✅ Admin user created: username=admin, password=admin123")
    else:
        print(f"❌ Failed to create admin user: {admin_msg}")
    
    # Create a demo editor user
    print("🔄 Creating demo editor user...")
    editor_success, editor_msg, editor_user = AuthService.create_user(
        db,
        username="editor",
        email="editor@wiwekaitech.com",
        password="editor123",
        role="editor"
    )
    
    if editor_success:
        print(f"✅ Editor user created: username=editor, password=editor123")
    else:
        print(f"❌ Failed to create editor user: {editor_msg}")
    
    # Create categories for tutorials
    tutorial_cat = Category(
        name_en="FastAPI Development",
        name_id="Pengembangan FastAPI",
        slug="fastapi-development",
        type="tutorial"
    )
    blog_cat = Category(
        name_en="Technology",
        name_id="Teknologi",
        slug="technology",
        type="blog"
    )
    db.add(tutorial_cat)
    db.add(blog_cat)
    db.commit()
    
    # Add Products
    products = [
        Product(
            title_en="Custom ERP System Development",
            title_id="Pengembangan Sistem ERP Kustom",
            slug="erp-system",
            description_en="End-to-end ERP solutions tailored to your business",
            description_id="Solusi ERP end-to-end yang disesuaikan dengan bisnis Anda",
            icon="🏢",
            features_en=["Custom workflow design", "Multi-module integration", "Role-based access"],
            features_id=["Desain workflow kustom", "Integrasi multi-modul", "Akses berbasis peran"],
            product_url="/products/erp",
            display_order=1,
            is_active=True
        ),
        Product(
            title_en="Web-Based Accounting Systems",
            title_id="Sistem Akuntansi Berbasis Web",
            slug="accounting-system",
            description_en="Complete accounting software with general ledger and reporting",
            description_id="Perangkat lunak akuntansi lengkap dengan buku besar umum dan pelaporan",
            icon="💰",
            features_en=["General ledger", "Accounts payable/receivable", "Financial statements"],
            features_id=["Buku besar umum", "Hutang/piutang", "Laporan keuangan"],
            product_url="/products/accounting",
            display_order=2,
            is_active=True
        ),
        Product(
            title_en="Sales & Inventory Systems",
            title_id="Sistem Penjualan & Inventori",
            slug="sales-inventory",
            description_en="Streamline your sales and inventory management with real-time tracking",
            description_id="Sederhanakan penjualan dan manajemen inventori dengan pelacakan real-time",
            icon="📦",
            features_en=["Sales order management", "Inventory tracking", "Multi-warehouse support"],
            features_id=["Manajemen pesanan penjualan", "Pelacakan inventori", "Dukungan multi-gudang"],
            product_url="/products/sales-inventory",
            display_order=3,
            is_active=True
        ),
        Product(
            title_en="Manufacturing Platforms",
            title_id="Platform Manufaktur",
            slug="manufacturing",
            description_en="Production and quality control systems for manufacturing operations",
            description_id="Sistem produksi dan kontrol kualitas untuk operasi manufaktur",
            icon="🏭",
            features_en=["Production planning", "Quality control", "Material management"],
            features_id=["Perencanaan produksi", "Kontrol kualitas", "Manajemen material"],
            product_url="/products/manufacturing",
            display_order=4,
            is_active=True
        ),
        Product(
            title_en="Billing Systems",
            title_id="Sistem Penagihan",
            slug="billing-system",
            description_en="Automated billing and invoice management with payment processing",
            description_id="Penagihan otomatis dan manajemen faktur dengan pemrosesan pembayaran",
            icon="📄",
            features_en=["Invoice generation", "Payment tracking", "Recurring billing"],
            features_id=["Pembuatan faktur", "Pelacakan pembayaran", "Penagihan berulang"],
            product_url="/products/billing",
            display_order=5,
            is_active=True
        ),
    ]
    db.add_all(products)
    db.commit()
    
    # Add Projects
    projects = [
        Project(
            title_en="Government ERP & Billing System",
            title_id="Sistem ERP Pemerintah & Penagihan",
            slug="govt-erp",
            summary_en="Integrated ERP and billing platform for regional government",
            summary_id="Platform ERP dan penagihan terintegrasi untuk pemerintah daerah",
            description_en="Complete ERP system managing budget, procurement, and revenue",
            description_id="Sistem ERP lengkap mengelola anggaran, pengadaan, dan pendapatan",
            client_name="Regional Government",
            industry="Government",
            technologies=["FastAPI", "React", "PostgreSQL", "Redis"],
            metrics_en=["500+ active users", "99.9% uptime", "30% faster processing"],
            metrics_id=["500+ pengguna aktif", "99.9% uptime", "30% pemrosesan lebih cepat"],
            is_active=True,
            is_featured=True,
            completed_date=(datetime.now() - timedelta(days=180)).date()
        ),
        Project(
            title_en="Manufacturing ERP System",
            title_id="Sistem ERP Manufaktur",
            slug="manufacturing-erp",
            summary_en="Complete production and inventory management system",
            summary_id="Sistem manajemen produksi dan inventori yang lengkap",
            description_en="Production planning, quality control, and material management",
            description_id="Perencanaan produksi, kontrol kualitas, dan manajemen material",
            client_name="Industrial Manufacturing Co.",
            industry="Manufacturing",
            technologies=["Laravel", "Vue.js", "MySQL", "Redis"],
            metrics_en=["200+ users", "50% cost reduction", "99.5% uptime"],
            metrics_id=["200+ pengguna", "50% pengurangan biaya", "99.5% uptime"],
            is_active=True,
            is_featured=False,
            completed_date=(datetime.now() - timedelta(days=150)).date()
        ),
        Project(
            title_en="Sales & Accounting Platform",
            title_id="Platform Penjualan & Akuntansi",
            slug="sales-accounting",
            summary_en="Integrated sales, inventory, and accounting system",
            summary_id="Sistem penjualan, inventori, dan akuntansi terintegrasi",
            description_en="Complete business management solution for retail operations",
            description_id="Solusi manajemen bisnis lengkap untuk operasi ritel",
            client_name="Retail Chain",
            industry="Retail",
            technologies=["FastAPI", "Next.js", "MySQL", "Docker"],
            metrics_en=["10k+ transactions/day", "99.5% uptime", "40% efficiency gain"],
            metrics_id=["10k+ transaksi/hari", "99.5% uptime", "40% peningkatan efisiensi"],
            is_active=True,
            is_featured=True,
            completed_date=(datetime.now() - timedelta(days=120)).date()
        ),
        Project(
            title_en="Healthcare Management System",
            title_id="Sistem Manajemen Kesehatan",
            slug="healthcare-system",
            summary_en="Patient records, appointments, and billing system",
            summary_id="Sistem rekam medis pasien, janji temu, dan penagihan",
            description_en="Comprehensive healthcare provider management platform",
            description_id="Platform manajemen penyedia layanan kesehatan yang komprehensif",
            client_name="Hospital Network",
            industry="Healthcare",
            technologies=["Laravel", "React", "PostgreSQL"],
            metrics_en=["5000+ patients", "99.9% uptime", "60% faster processing"],
            metrics_id=["5000+ pasien", "99.9% uptime", "60% pemrosesan lebih cepat"],
            is_active=True,
            is_featured=False,
            completed_date=(datetime.now() - timedelta(days=90)).date()
        ),
        Project(
            title_en="E-commerce Platform",
            title_id="Platform E-commerce",
            slug="ecommerce-platform",
            summary_en="Full-featured e-commerce solution with multi-vendor support",
            summary_id="Solusi e-commerce lengkap dengan dukungan multi-vendor",
            description_en="Scalable marketplace connecting sellers and buyers globally",
            description_id="Marketplace yang dapat diskalakan menghubungkan penjual dan pembeli secara global",
            client_name="Digital Marketplace Inc.",
            industry="E-commerce",
            technologies=["Next.js", "FastAPI", "PostgreSQL", "Redis"],
            metrics_en=["50k+ products", "1M+ monthly visits", "99.8% uptime"],
            metrics_id=["50k+ produk", "1M+ kunjungan bulanan", "99.8% uptime"],
            is_active=True,
            is_featured=True,
            completed_date=(datetime.now() - timedelta(days=60)).date()
        ),
    ]
    db.add_all(projects)
    db.commit()
    
    # Add Tutorials
    tutorials = [
        Tutorial(
            category_id=tutorial_cat.id,
            title_en="Building a RESTful API with FastAPI",
            title_id="Membangun API RESTful dengan FastAPI",
            slug="fastapi-rest-api",
            excerpt_en="Learn how to build production-ready REST APIs with FastAPI and SQLAlchemy",
            excerpt_id="Pelajari cara membangun API REST siap produksi dengan FastAPI dan SQLAlchemy",
            content_en="Complete tutorial covering API design, database integration, and deployment",
            content_id="Tutorial lengkap mencakup desain API, integrasi database, dan deployment",
            difficulty_level="intermediate",
            reading_time=15,
            image_url="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
            tags=["fastapi", "python", "api", "backend"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=15)).replace(hour=10, minute=0, second=0)
        ),
        Tutorial(
            category_id=tutorial_cat.id,
            title_en="Designing Scalable Database Schemas for ERP",
            title_id="Merancang Skema Database yang Dapat Diskalakan untuk ERP",
            slug="scalable-database",
            excerpt_en="Best practices for designing database schemas that scale with your business",
            excerpt_id="Praktik terbaik merancang skema database yang berkembang dengan bisnis Anda",
            content_en="Learn normalization, indexing strategies, and performance optimization",
            content_id="Pelajari normalisasi, strategi pengindeksan, dan optimasi kinerja",
            difficulty_level="advanced",
            reading_time=20,
            image_url="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
            tags=["database", "design", "sql", "performance"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=10)).replace(hour=14, minute=0, second=0)
        ),
        Tutorial(
            category_id=tutorial_cat.id,
            title_en="Laravel Best Practices for Enterprise Applications",
            title_id="Praktik Terbaik Laravel untuk Aplikasi Perusahaan",
            slug="laravel-enterprise",
            excerpt_en="Enterprise-grade Laravel development patterns and best practices",
            excerpt_id="Pola pengembangan Laravel tingkat enterprise dan praktik terbaik",
            content_en="Coverage of SOLID principles, testing, security, and deployment",
            content_id="Cakupan prinsip SOLID, pengujian, keamanan, dan deployment",
            difficulty_level="intermediate",
            reading_time=18,
            image_url="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
            tags=["laravel", "php", "enterprise", "patterns"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=8)).replace(hour=9, minute=0, second=0)
        ),
        Tutorial(
            category_id=tutorial_cat.id,
            title_en="Introduction to ERP Architecture",
            title_id="Pengenalan Arsitektur ERP",
            slug="erp-architecture",
            excerpt_en="Understanding the core concepts and architecture of ERP systems",
            excerpt_id="Memahami konsep inti dan arsitektur sistem ERP",
            content_en="Learn modules, workflows, data models, and integration patterns",
            content_id="Pelajari modul, alur kerja, model data, dan pola integrasi",
            difficulty_level="beginner",
            reading_time=12,
            image_url="https://images.unsplash.com/photo-1518611505867-48e555cc338d?auto=format&fit=crop&w=1400&q=80",
            tags=["erp", "architecture", "enterprise", "systems"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=5)).replace(hour=11, minute=0, second=0)
        ),
        Tutorial(
            category_id=tutorial_cat.id,
            title_en="Using AI Tools in Software Development",
            title_id="Menggunakan Alat AI dalam Pengembangan Perangkat Lunak",
            slug="ai-development",
            excerpt_en="How to leverage ChatGPT and GitHub Copilot for faster development",
            excerpt_id="Cara memanfaatkan ChatGPT dan GitHub Copilot untuk pengembangan yang lebih cepat",
            content_en="Practical techniques for code generation, testing, and documentation",
            content_id="Teknik praktis untuk pembuatan kode, pengujian, dan dokumentasi",
            difficulty_level="beginner",
            reading_time=10,
            image_url="https://images.unsplash.com/photo-1677442d019cecf8d1b3c0a857e9e4a59eaa82d0?auto=format&fit=crop&w=1400&q=80",
            tags=["ai", "development", "productivity", "tools"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=3)).replace(hour=15, minute=0, second=0)
        ),
    ]
    db.add_all(tutorials)
    db.commit()
    
    # Add Blog Posts
    blog_posts = [
        BlogPost(
            category_id=blog_cat.id,
            title_en="How AI is Transforming Software Development",
            title_id="Bagaimana AI Mengubah Pengembangan Perangkat Lunak",
            slug="ai-software-dev",
            excerpt_en="Exploring how tools like ChatGPT and GitHub Copilot are accelerating development",
            excerpt_id="Menjelajahi bagaimana alat seperti ChatGPT dan GitHub Copilot mempercepat pengembangan",
            content_en="Deep dive into AI-assisted coding, benefits, and ethical considerations",
            content_id="Penyelaman mendalam ke dalam pengkodean berbantuan AI, manfaat, dan pertimbangan etis",
            author_name="Wiwekaitech Team",
            reading_time=8,
            image_url="https://images.unsplash.com/photo-1677442d019cecf8d1b3c0a857e9e4a59eaa82d0?auto=format&fit=crop&w=1400&q=80",
            tags=["ai", "development", "productivity"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=20)).replace(hour=10, minute=0, second=0)
        ),
        BlogPost(
            category_id=blog_cat.id,
            title_en="Best Practices for Building Scalable ERP Systems",
            title_id="Praktik Terbaik Membangun Sistem ERP yang Dapat Diskalakan",
            slug="scalable-erp",
            excerpt_en="Key architectural patterns and design principles for enterprise systems",
            excerpt_id="Pola arsitektur kunci dan prinsip desain untuk sistem enterprise",
            content_en="Learn microservices, caching strategies, and load balancing for ERP",
            content_id="Pelajari microservices, strategi caching, dan load balancing untuk ERP",
            author_name="Wiwekaitech Team",
            reading_time=12,
            image_url="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1400&q=80",
            tags=["erp", "architecture", "scalability"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=15)).replace(hour=14, minute=0, second=0)
        ),
        BlogPost(
            category_id=blog_cat.id,
            title_en="Why Your Business Needs a Custom ERP Solution",
            title_id="Mengapa Bisnis Anda Membutuhkan Solusi ERP Kustom",
            slug="custom-vs-off-shelf",
            excerpt_en="Understanding the benefits of custom-built ERP versus off-the-shelf solutions",
            excerpt_id="Memahami manfaat ERP yang dibuat khusus versus solusi siap pakai",
            content_en="Cost analysis, flexibility, and long-term value propositions",
            content_id="Analisis biaya, fleksibilitas, dan proposisi nilai jangka panjang",
            author_name="Wiwekaitech CEO",
            reading_time=7,
            image_url="https://images.unsplash.com/photo-1460925895917-afd651c3c2d0?auto=format&fit=crop&w=1400&q=80",
            tags=["business", "erp", "strategy"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=10)).replace(hour=9, minute=0, second=0)
        ),
        BlogPost(
            category_id=blog_cat.id,
            title_en="Database Optimization for High-Performance Applications",
            title_id="Optimasi Database untuk Aplikasi Berkinerja Tinggi",
            slug="database-optimization",
            excerpt_en="Techniques for optimizing queries and schema design for enterprise apps",
            excerpt_id="Teknik pengoptimalan kueri dan desain skema untuk aplikasi enterprise",
            content_en="Indexing, query optimization, denormalization, and caching strategies",
            content_id="Pengindeksan, optimasi kueri, denormalisasi, dan strategi caching",
            author_name="Database Expert",
            reading_time=10,
            image_url="https://images.unsplash.com/photo-1516321318423-f06f70d504d0?auto=format&fit=crop&w=1400&q=80",
            tags=["database", "performance", "optimization"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=5)).replace(hour=11, minute=0, second=0)
        ),
        BlogPost(
            category_id=blog_cat.id,
            title_en="The Future of Enterprise Software: Trends to Watch",
            title_id="Masa Depan Perangkat Lunak Enterprise: Tren untuk Diperhatikan",
            slug="enterprise-trends",
            excerpt_en="Upcoming technologies and trends shaping the future of enterprise software",
            excerpt_id="Teknologi mendatang dan tren yang membentuk masa depan perangkat lunak enterprise",
            content_en="Cloud-native, AI integration, low-code platforms, and security trends",
            content_id="Cloud-native, integrasi AI, platform low-code, dan tren keamanan",
            author_name="Industry Analyst",
            reading_time=9,
            image_url="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80",
            tags=["trends", "technology", "enterprise"],
            is_published=True,
            published_at=(datetime.now() - timedelta(days=2)).replace(hour=16, minute=0, second=0)
        ),
    ]
    db.add_all(blog_posts)
    db.commit()
    
    print("✅ Database seeded successfully!")
    print(f"  - {len(products)} products")
    print(f"  - {len(projects)} projects")
    print(f"  - {len(tutorials)} tutorials")
    print(f"  - {len(blog_posts)} blog posts")
    
except Exception as e:
    print(f"❌ Error seeding database: {e}")
    db.rollback()
finally:
    db.close()
