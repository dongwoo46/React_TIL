import React from 'react';

interface TableProps {
  columns: { header: string; accessor: string; Cell?: React.FC<any> }[];
  data: { [key: string]: any }[];
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void; // 페이지 변경 시 호출될 콜백
  onSearchClick: (id: number) => void; // 돋보기 버튼 클릭 시 호출될 콜백 추가
}

export const PageTables: React.FC<TableProps> = ({
  columns,
  data,
  totalPage,
  currentPage,
  onPageChange,
}) => {
  if (totalPage === 0) {
    return <p>No data available.</p>; // 데이터가 없을 때 메시지 표시
  }

  const renderPagination = () => {
    const pageButtons = [];
    const siblingCount = 1; // 현재 페이지의 앞뒤로 몇 개의 페이지를 표시할지

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPage - 1, currentPage + siblingCount);

    // 첫 번째 페이지
    pageButtons.push(
      <button
        key={1}
        className={`join-item btn ${currentPage === 1 ? 'btn-active' : ''}`}
        onClick={() => onPageChange(1)} // 페이지 변경 콜백 호출
      >
        1
      </button>
    );

    // 첫 번째 페이지와 표시되는 첫 번째 페이지 사이의 '...'
    if (startPage > 2) {
      pageButtons.push(
        <button key="start-ellipsis" className="join-item btn btn-disabled">
          ...
        </button>
      );
    }

    // 현재 페이지 기준으로 앞뒤 페이지 생성
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn ${currentPage === i ? 'btn-active' : ''}`}
          onClick={() => onPageChange(i)} // 페이지 변경 콜백 호출
        >
          {i}
        </button>
      );
    }

    // 마지막 페이지와 표시되는 마지막 페이지 사이의 '...'
    if (endPage < totalPage - 1) {
      pageButtons.push(
        <button key="end-ellipsis" className="join-item btn btn-disabled">
          ...
        </button>
      );
    }

    // 마지막 페이지
    pageButtons.push(
      <button
        key={totalPage}
        className={`join-item btn ${
          currentPage === totalPage ? 'btn-active' : ''
        }`}
        onClick={() => onPageChange(totalPage)} // 페이지 변경 콜백 호출
      >
        {totalPage}
      </button>
    );

    return pageButtons;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* 테이블 헤더 */}
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.Cell ? (
                      <column.Cell row={row} />
                    ) : (
                      row[column.accessor]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center">
                No data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="join">{renderPagination()}</div>
    </div>
  );
};
