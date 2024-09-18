import React, { useState } from 'react';
import {
  ColumnDef,
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalPages: number;
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
}

export const TanstackTable = <T extends object>({
  data,
  columns,
  totalPages,
  pagination,
  setPagination,
}: TableProps<T>) => {
  const [columnVisibility, setColumnVisibility] = useState({}); // 컬럼 가시성 상태
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false); // 컬럼 선택 메뉴 열림 여부

  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages, // 서버로부터 받은 총 페이지 수
    state: { pagination, columnVisibility }, // 현재 페이지네이션 상태와 컬럼 가시성 상태
    onPaginationChange: setPagination, // 페이지네이션 변경 핸들러
    onColumnVisibilityChange: setColumnVisibility, // 컬럼 가시성 변경 핸들러
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // 서버에서 페이지네이션 처리
  });

  const renderPageButtons = () => {
    const currentPage = table.getState().pagination.pageIndex;
    const totalPages = table.getPageCount();
    const pageButtons = [];

    // 현재 페이지 그룹을 계산
    const pagesPerGroup = 5;
    const currentGroup = Math.floor(currentPage / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages - 1);

    // 맨 처음으로 이동 버튼
    pageButtons.push(
      <button
        key="first"
        className="btn btn-sm"
        onClick={() => table.setPageIndex(0)}
        disabled={currentPage === 0}
      >
        {'<<'}
      </button>
    );

    // 이전 그룹으로 이동 버튼
    if (currentGroup > 0) {
      pageButtons.push(
        <button
          key="previousGroup"
          className="btn btn-sm"
          onClick={() => table.setPageIndex(startPage - pagesPerGroup)}
        >
          {'<'}
        </button>
      );
    }

    // 중간 페이지 버튼들
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`btn btn-sm ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => table.setPageIndex(i)}
        >
          {i + 1}
        </button>
      );
    }

    // 다음 그룹으로 이동 버튼
    if (endPage < totalPages - 1) {
      pageButtons.push(
        <button
          key="nextGroup"
          className="btn btn-sm"
          onClick={() => table.setPageIndex(endPage + 1)}
        >
          {'>'}
        </button>
      );
    }

    // 맨 마지막으로 이동 버튼
    pageButtons.push(
      <button
        key="last"
        className="btn btn-sm"
        onClick={() => table.setPageIndex(totalPages - 1)}
        disabled={currentPage === totalPages - 1}
      >
        {'>>'}
      </button>
    );

    return pageButtons;
  };

  const toggleColumnSelector = () => {
    setIsColumnSelectorOpen(!isColumnSelectorOpen);
  };

  return (
    <div>
      {/* 테이블 */}
      <div className="overflow-x-auto mb-4">
        <table className="table w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
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
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 및 Show 10, 컬럼 선택 */}
      <div className="flex items-center justify-between mt-4">
        {/* 왼쪽: 페이지네이션 */}
        <div className="btn-group">{renderPageButtons()}</div>

        {/* 오른쪽: Show 10 드롭다운 및 컬럼 선택 */}
        <div className="flex items-center space-x-4">
          <select
            value={pagination.pageSize}
            onChange={(e) => {
              const newPageSize = Number(e.target.value);
              table.setPageSize(newPageSize);
              setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
            }}
            className="select select-bordered max-w-xs"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          {/* 컬럼 선택 버튼 */}
          <div className="relative">
            <button onClick={toggleColumnSelector} className="btn btn-primary">
              컬럼 선택{' '}
              <FontAwesomeIcon icon={faChevronDown} className="ml-2" />
            </button>
            {isColumnSelectorOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    <input
                      type="checkbox"
                      className="mr-2 leading-tight"
                      checked={table.getIsAllColumnsVisible()}
                      onChange={table.getToggleAllColumnsVisibilityHandler()}
                    />
                    모두 선택
                  </label>
                  {table.getAllLeafColumns().map((column) => (
                    <label
                      key={column.id}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <input
                        type="checkbox"
                        className="mr-2 leading-tight"
                        checked={column.getIsVisible()}
                        onChange={column.getToggleVisibilityHandler()}
                      />
                      {column.id}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
