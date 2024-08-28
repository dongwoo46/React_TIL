import React, { useState } from 'react';
import UsersTable from './UsersTable';
import ArticlesTable from './ArticlesTable';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'articles'>('users');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 my-4">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-semibold text-white rounded ${
            activeTab === 'users' ? 'bg-green-600' : 'bg-gray-400'
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 font-semibold text-white rounded ${
            activeTab === 'articles' ? 'bg-green-600' : 'bg-gray-400'
          }`}
        >
          Articles
        </button>
      </div>
      <div>
        {activeTab === 'users' && <UsersTable />}
        {activeTab === 'articles' && <ArticlesTable />}
      </div>
    </div>
  );
};

export default Tabs;
