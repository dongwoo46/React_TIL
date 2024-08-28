import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 h-full p-6">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        </li>
        <li>
          <Link to="/signup" className="hover:underline">
            Signup
          </Link>
        </li>
        <li>
          <Link to="/table" className="hover:underline">
            Table
          </Link>{' '}
          {/* Table 페이지로 이동 */}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
