import React, { useEffect, useState } from 'react';
import { Table } from '../widgets/Tables';
import { useArticle } from '../entities/articles/api';

export const Article: React.FC = () => {
  const { search, setSearch } = useState();
  const articleQuery = useArticle(search);

  useEffect(() => {});

  return (
    <div>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-accent w-full max-w-xs"
      />
      <Table columns={articleColumns} data={artilces} />
    </div>
  );
};
