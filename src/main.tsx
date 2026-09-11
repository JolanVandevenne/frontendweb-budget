import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import TransactionList from './pages/transactions/TransactionList.tsx';
import PlacesList from './pages/places/PlacesList';
import About, { History, Location, Services } from './pages/about/AboutTabs.tsx';
import NotFound from './pages/NotFound';
import PlaceDetail from './pages/places/PlaceDetail.tsx';
import Layout from './components/Layout.tsx';
import AddOrEditTransaction from './pages/transactions/AddOrEditTransaction.tsx';
import { ThemeProvider } from './contexts/theme/Theme.context.tsx';
import { AuthProvider } from './contexts/auth/Auth.context.tsx';
import Login from './pages/Login.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/transactions' />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/transactions',
        children: [
          {
            index: true,
            element: <TransactionList />,
          },
          {
            path: 'add',
            element: <AddOrEditTransaction />,
          },
          {
            path: 'edit/:id',
            element: <AddOrEditTransaction />,
          },
        ],
      },
      {
        path: '/places',
        children: [
          {
            index: true,
            element: <PlacesList />,
          },
          {
            path: ':id',
            element: <PlaceDetail />,
          },
        ],
      },
      {
        path: '/about',
        element: <About />,
        children: [
          {
            index: true,
            element: <Navigate to='/about/services' replace />,
          },
          {
            path: 'services',
            element: <Services />,
          },
          {
            path: 'history',
            element: <History />,
          },
          {
            path: 'location',
            element: <Location />,
          },
        ],
      },
      {
        path: '/services',
        element: <Navigate to='/about/services' replace />,
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
