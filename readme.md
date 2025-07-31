# POS Billing System

A comprehensive Point of Sale (POS) billing system built with React frontend, Node.js/Express backend, and PostgreSQL database. The system features user authentication, product management, transaction processing, and real-time analytics dashboard.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login with JWT tokens and role-based access control
- **Product Management**: Search, add, and manage product inventory
- **Transaction Processing**: Complete checkout process with automatic stock updates
- **Real-time Analytics**: Comprehensive dashboard with sales metrics and charts
- **Inventory Tracking**: Stock management with low-stock alerts
- **Multi-role Support**: Admin and cashier user roles with different permissions

### Dashboard Analytics
- Revenue tracking (daily, weekly, monthly)
- Transaction analytics and trends
- Payment method distribution
- Top-selling products analysis
- Recent transaction history
- Interactive charts and visualizations

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **Material-UI (MUI) 7.0.2** - Component library and design system
- **React Router 7.5.1** - Client-side routing
- **Recharts 2.15.3** - Chart visualization library
- **Axios 1.8.4** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.21.2** - Web application framework
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Desktop App
- **Electron 34.0.2** - Desktop application wrapper

## 📁 Project Structure

```
POS-Billing-System/
├── main.js                    # Electron main process
├── preload.js                 # Electron preload script
├── package.json               # Root package configuration
├── .gitignore                 # Git ignore rules
├── backend/                   # Backend server
│   ├── app.js                # Express server configuration
│   ├── db.js                 # Database connection
│   ├── package.json          # Backend dependencies
│   ├── .env                  # Environment variables
│   ├── controllers/          # Business logic
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── productController.js
│   │   └── transactionController.js
│   ├── middlewares/          # Custom middlewares
│   │   └── authMiddleware.js
│   └── routes/              # API routes
│       ├── authRoutes.js
│       ├── dashboardRoutes.js
│       ├── productRoutes.js
│       └── transactionRoutes.js
└── frontend/                 # React frontend
    ├── package.json          # Frontend dependencies
    ├── public/              # Static assets
    │   ├── index.html
    │   ├── manifest.json
    │   └── POS_service.png
    └── src/                 # Source code
        ├── App.js           # Main app component
        ├── index.js         # App entry point
        ├── components/      # React components
        │   ├── Dashboard/   # Dashboard components
        │   ├── Login/       # Authentication
        │   ├── POS/         # Point of sale interface
        │   ├── shared/      # Shared components
        │   └── styles/      # CSS modules
        └── services/        # API service layer
            └── api.js
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/AnasSAV/POS-Billing-System.git
cd POS-Billing-System
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=pos_billing_db
DB_PORT=5432
JWT_SECRET=your_jwt_secret_key
PORT=5050
```

### 4. Database Setup
Create a PostgreSQL database and set up the required tables:

```sql
-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'cashier',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    barcode VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transactions table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_type VARCHAR(20) DEFAULT 'cash',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Transaction items table
CREATE TABLE transaction_items (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Discounts table (optional)
CREATE TABLE discounts (
    id SERIAL PRIMARY KEY,
    transaction_id INTEGER REFERENCES transactions(id),
    discount_type VARCHAR(20),
    discount_value DECIMAL(10,2)
);
```

### 5. Frontend Setup
```bash
cd frontend
npm install
```

### 6. Create Sample Data
Insert sample users and products:
```sql
-- Insert admin user (password will be hashed)
INSERT INTO users (username, password, role) VALUES 
('admin', 'admin123', 'admin'),
('cashier', 'cashier123', 'cashier');

-- Insert sample products
INSERT INTO products (name, barcode, price, stock_quantity) VALUES 
('Coffee', '1001', 4.50, 100),
('Sandwich', '1002', 8.99, 50),
('Pastry', '1003', 3.25, 75),
('Juice', '1004', 2.99, 200),
('Salad', '1005', 7.50, 30);
```

### 7. Hash Passwords
Run the password hashing script:
```bash
cd backend
node hash_admin_passwords.js
```

## 🚀 Running the Application

### Development Mode

1. **Start the Backend Server:**
```bash
cd backend
npm start
# Server runs on http://localhost:5050
```

2. **Start the Frontend Development Server:**
```bash
cd frontend
npm start
# Frontend runs on http://localhost:3000
```

3. **Run as Electron Desktop App:**
```bash
# From root directory
npm start
```

### Production Build

1. **Build Frontend:**
```bash
cd frontend
npm run build
```

2. **Start Backend:**
```bash
cd backend
npm start
```

## 🔐 User Roles & Permissions

### Admin Users
- Access to analytics dashboard
- View sales reports and metrics
- Manage inventory and products
- Process transactions
- View all system data

### Cashier Users
- Process transactions
- Search and add products to cart
- Handle checkout process
- Limited access (no dashboard)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Products
- `GET /api/products-get` - Get all products (with search)
- `POST /api/products-create` - Create new product

### Transactions
- `POST /api/transactions-create` - Create new transaction

### Dashboard (Admin only)
- `GET /api/stats/weekly-customers` - Weekly customer count
- `GET /api/stats/daily-traffic` - Daily traffic data
- `GET /api/stats/sales-distribution` - Sales distribution
- `GET /api/stats/inventory` - Inventory status

## 🎨 UI Components

### Main Components
- **Login**: User authentication interface
- **POS**: Point of sale transaction interface
- **Dashboard**: Analytics and reporting dashboard
- **TopBar**: Navigation and user controls
- **ProductTable**: Shopping cart and item management
- **Sidebar**: Product search and selection

### Dashboard Components
- **LiveStats**: Real-time metrics cards
- **SalesChart**: Interactive sales visualizations
- **PaymentMethod**: Payment distribution charts
- **TopProducts**: Best-selling products list
- **TransactionTable**: Recent transactions display

## 🔧 Configuration

### Backend Configuration
The backend uses environment variables defined in `.env`:
- Database connection settings
- JWT secret key
- Server port configuration

### Frontend Configuration
- API base URL configured in `src/services/api.js`
- Material-UI theme and styling
- Electron window settings in `main.js`

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Ensure passwords are properly hashed

3. **CORS Errors**
   - Verify frontend URL in backend CORS configuration
   - Check API base URL in frontend

4. **Port Conflicts**
   - Default backend port: 5050
   - Default frontend port: 3000
   - Change ports in configuration if needed

## 📝 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- [ ] Receipt printing functionality
- [ ] Barcode scanning integration
- [ ] Multi-store support
- [ ] Customer management system
- [ ] Inventory reorder alerts
- [ ] Advanced reporting features
- [ ] Mobile app support
- [ ] Cloud deployment options

