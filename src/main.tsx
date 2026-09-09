import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router';
import TransactionList from './pages/transactions/TransactionList.tsx';
import PlacesList from './pages/places/PlacesList';
import About, { History, Location, Services } from './pages/about/About.tsx';
import NotFound from './pages/NotFound';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  { path: '/transactions', element: <TransactionList /> },
  { path: '/places', element: <PlacesList /> },
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
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
