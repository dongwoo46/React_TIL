import React, { useEffect, useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  PaginationState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import axios from 'axios';
import _ from 'lodash';

interface User {
  id: string;
  username: string;
  password: string;
}

const UsersTable: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [filter, setFilter] = useState<string>(''); // 필터 상태
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          params: {
            page: pagination.pageIndex + 1, // 서버 페이지는 1부터 시작
            pageSize: pagination.pageSize,
          },
        });
        setData(response.data.data); // 서버에서 받은 데이터 설정
        setTotalPages(response.data.totalPages); // 총 페이지 수 설정
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  // 컬럼 정의
  const columnHelper = createColumnHelper<User>();

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('username', {
      header: 'Username',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('password', {
      header: 'Password',
      cell: (info) => info.getValue(),
    }),
  ];

  // 필터링된 데이터 생성
  const filteredData = useMemo(() => {
    return data.filter(
      (user) =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.password.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  // 테이블 설정
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true, // 수동 페이지네이션 활성화
    pageCount: totalPages, // 총 페이지 수를 지정
  });

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    table.setPageIndex(page);
  };

  // 필터 변경 핸들러
  const handleFilterChange = _.debounce((value: string) => {
    setFilter(value);
    // 페이지가 바뀔 때 필터 결과를 반영하기 위해 첫 페이지로 이동
    table.setPageIndex(0);
  }, 300);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => handleFilterChange(e.target.value)}
        placeholder="Filter by username or password"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="min-w-full bg-white">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-4 border-b">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4 border-b">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 border rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
        <span className="ml-4">
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {totalPages}
          </strong>
        </span>
        <span className="ml-4"> | Go to page:</span>
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            handlePageChange(page);
          }}
          className="ml-2 p-2 border rounded w-16"
        />
      </div>
      <div className="mt-4 flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 border rounded ${
              table.getState().pagination.pageIndex === i
                ? 'bg-blue-500 text-white'
                : 'bg-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersTable;
