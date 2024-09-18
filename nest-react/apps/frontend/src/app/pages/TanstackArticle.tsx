import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ColumnDef } from '@tanstack/react-table';
import { useArticle, useArticleId } from '../entities/articles/api';
import { Modal } from '../widgets/Modal';
import { TanstackTable } from '../widgets/TanStackTables';

export const TanstackArticle: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const searchInputRef = useRef<HTMLInputElement>(null); // Ref to the search input

  const { data, isLoading, isError, refetch } = useArticle(
    search,
    pagination.pageIndex + 1,
    pagination.pageSize
  );

  const { data: articleDetails } = useArticleId(selectedId);

  useEffect(() => {
    refetch();
  }, [pagination.pageIndex, pagination.pageSize, search, refetch]);

  // Ctrl + K for focusing the search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus(); // Focus the input field
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const columns: ColumnDef<any>[] = [
    { header: 'ID', accessorKey: 'id' },
    { header: 'Title', accessorKey: 'title' },
    { header: 'Context', accessorKey: 'context' },
    {
      header: 'Actions',
      accessorKey: 'actions',
      cell: ({ row }: any) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleSearchClick(row.original.id)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      ),
    },
  ];

  const handleSearchClick = (id: number) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  if (isError) return <p>Error loading articles.</p>;

  return (
    <div className="p-4">
      <div className="relative w-full max-w-xs">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          ref={searchInputRef}
          value={search}
          onChange={handleSearchChange}
          placeholder="검색어를 입력하세요"
          className="input input-bordered w-full pl-10 input-primary"
        />
      </div>

      <TanstackTable
        data={data?.articles || []}
        columns={columns}
        // onRowClick={handleSearchClick}
        totalPages={data?.totalPages || 0}
        pagination={pagination}
        setPagination={setPagination}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Article Details"
      >
        {articleDetails ? (
          <div>
            {Object.entries(articleDetails).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {String(value)}
              </p>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Modal>
    </div>
  );
};
