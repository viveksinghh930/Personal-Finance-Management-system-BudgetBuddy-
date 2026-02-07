# PFM System (Personal Finance Management)

A full-stack personal finance management application built with React, Node.js, Express, and MongoDB.

## 📁 Project Structure

```
PFM-System/
├── Backend/                 # Node.js + Express API
│   ├── controller/         # Business logic
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middlewares/       # Auth & validation
│   ├── utils/             # Helper functions
│   └── index.js           # Entry point
│
├── Frontend/               # React + Vite
│   ├── public/
│   │   └── images/        # Static images
│   ├── src/
│   │   ├── Components/
│   │   │   ├── auth/      # Login, SignUp
│   │   │   ├── Dashboard/ # Main dashboard
│   │   │   ├── LandingPage/
│   │   │   ├── Shared/    # Navbar, Footer, Sidebar
│   │   │   ├── ui/        # Reusable UI components
│   │   │   └── DarkLiteMood/
│   │   ├── redux/         # State management
│   │   ├── utils/         # Constants & helpers
│   │   └── lib/           # Utility functions
│   └── .env               # Environment variables
│
└── .gitignore             # Git ignore rules
```

## 🚀 Features

- ✅ User Authentication (Email & Google OAuth)
- ✅ Dashboard with Financial Statistics
- ✅ Income & Expense Tracking
- ✅ Borrow/Debt Management
- ✅ Interactive Charts (Bar, Line, Area, Pie)
- ✅ Credit Card Management
- ✅ Transaction History
- ✅ Dark Mode Support
- ✅ Fully Responsive Design

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit
- React Router DOM
- Recharts (Charts)
- Tailwind CSS
- Shadcn UI Components
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google OAuth 2.0
- Bcrypt

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- npm or yarn

### Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file in Backend folder:
```env
NODE_ENV=development
MONGO_URL=your_mongodb_connection_string
PORT=8080
SECRET_KEY=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
```

Start backend:
```bash
npm start
```

### Frontend Setup
```bash
cd Frontend
npm install
```

Create `.env` file in Frontend folder:
```env
VITE_USER_API_END_POINT=http://localhost:8080/api/user
VITE_INCOME_API_END_POINT=http://localhost:8080/api/income
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

Start frontend:
```bash
npm run dev
```

## 📝 API Endpoints

### User Routes
- POST `/api/user/register` - Register new user
- POST `/api/user/login` - Login user
- GET `/api/user/profile` - Get user profile

### Income Routes
- POST `/api/income/add` - Add income
- GET `/api/income/all` - Get all income
- DELETE `/api/income/:id` - Delete income

### Expense Routes
- POST `/api/expense/add` - Add expense
- GET `/api/expense/all` - Get all expenses
- DELETE `/api/expense/:id` - Delete expense

### Borrow Routes
- POST `/api/borrow/add` - Add borrow/debt
- GET `/api/borrow/all` - Get all borrows
- DELETE `/api/borrow/:id` - Delete borrow

## 🎨 Component Structure

### Dashboard Components
- `DeshBord.jsx` - Main dashboard with charts
- `AddIncome.jsx` - Add income form
- `AddExpense.jsx` - Add expense form
- `AddDebt.jsx` - Add debt form
- `Borrow.jsx` - Borrow management
- `Expense.jsx` - Expense list

### Shared Components
- `Navbar.jsx` - Top navigation
- `Sidebar.jsx` - Side navigation
- `Footer.jsx` - Footer section

### UI Components (Shadcn)
- Button, Card, Input, Label
- Dropdown, Tabs, Sheet
- Avatar, Checkbox, Accordion

## 🔒 Environment Variables

### Backend (.env)
```
NODE_ENV=development
MONGO_URL=mongodb_connection_string
PORT=8080
SECRET_KEY=jwt_secret_key
GOOGLE_CLIENT_ID=google_oauth_client_id
```

### Frontend (.env)
```
VITE_USER_API_END_POINT=http://localhost:8080/api/user
VITE_INCOME_API_END_POINT=http://localhost:8080/api/income
VITE_GOOGLE_CLIENT_ID=google_oauth_client_id
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1280px

## 🎯 File Naming Conventions

| Type | Format | Example |
|------|--------|---------|
| React Components | PascalCase.jsx | `Dashboard.jsx` |
| Controllers | name.controller.js | `user.controller.js` |
| Models | name.model.js | `user.model.js` |
| Routes | name.routes.js | `user.routes.js` |
| Utils | camelCase.js | `apiHelper.js` |
| Config | lowercase.config.js | `tailwind.config.js` |

## 🚫 .gitignore

The following are excluded from Git:
- `node_modules/`
- `.env` files
- `dist/` & `build/`
- Log files
- Editor configs
- OS files

## 👨‍💻 Development

### Start Development Servers
```bash
# Terminal 1 - Backend
cd Backend
npm start

# Terminal 2 - Frontend
cd Frontend
npm run dev
```

### Build for Production
```bash
cd Frontend
npm run build
```

## 📄 License

This project is private and not licensed for public use.

## 🤝 Contributing

This is a private project. Contact the owner for contribution guidelines.

---

**Made with ❤️ by Vivek Singh Tomar**
# Personal-Finance-Management-system-BudgetBuddy-
