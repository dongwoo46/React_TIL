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
        <li>
          <Link to="/about" className="text-blue-500 hover:underline">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};
