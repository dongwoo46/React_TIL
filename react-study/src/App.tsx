import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TablePage from './pages/TablePage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <div className="flex flex-grow">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'table', element: <TablePage /> }, // 테이블 페이지 추가
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
