import { createBrowserRouter } from 'react-router-dom';
import Home from './Components/LandingPage/Home';
import { RouterProvider } from 'react-router';
import Login from './Components/Auth/Login';
import SignUp from './Components/auth/SignUp.jsx';
import DeshBord from './Components/Dashboard/DeshBord';
import { ThemeProvider } from './Components/DarkLiteMood/ThemeProvider';
import  {AddIncome}  from './Components/Dashboard/AddIncome';
import { AddExpance } from './Components/Dashboard/AddExpance';
import Expense from './Components/Dashboard/Expense';
import IncomeManagement from './Components/Dashboard/IncomeManagement';
import ExpenseManagement from './Components/Dashboard/ExpenseManagement';
import AccountingManagement from './Components/Dashboard/AccountingManagement';
import Reports from './Components/Dashboard/Reports';
import Categories from './Components/Dashboard/Categories';
import Analytics from './Components/Dashboard/Analytics';
import Settings from './Components/Dashboard/Settings';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/login',
    element: <Login />
  }, {
    path: '/register',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: <DeshBord />
  },
  {
    path: '/dashboard/income',
    element: <IncomeManagement/>
  },
  {
    path: '/dashboard/expense',
    element: <ExpenseManagement/>
  },
  {
    path: '/dashboard/expense/get',
    element: <Expense/>
  },
  {
    path: '/dashboard/accounting',
    element: <AccountingManagement/>
  },
  {
    path: '/dashboard/reports',
    element: <Reports/>
  },
  {
    path: '/dashboard/categories',
    element: <Categories/>
  },
  {
    path: '/dashboard/analytics',
    element: <Analytics/>
  },
  {
    path: '/dashboard/settings',
    element: <Settings/>
  }
]);

function App() {
  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
