import React from 'react';
import { Link } from '@tanstack/react-router';

export const Sidebar: React.FC = () => {
  return (
    <nav className="w-64 bg-gray-100 p-4">
      <ul>
        <li className="mb-2">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/user" className="text-blue-500 hover:underline">
            User
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/article" className="text-blue-500 hover:underline">
            Article
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/tanstack-article"
            className="text-blue-500 hover:underline"
          >
            TanstackArticle
          </Link>
        </li>
      </ul>
    </nav>
  );
};
