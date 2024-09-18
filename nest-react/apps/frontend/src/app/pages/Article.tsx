import React, { useState } from 'react';
import { PageTables } from '../widgets/PageTables';
import { useArticle, useArticleId } from '../entities/articles/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Article: React.FC = () => {
  const [search, setSearch] = useState(''); // 검색어 상태
  const [page, setPage] = useState(1); // 페이지 상태
  const [selectedId, setSelectedId] = useState<number | null>(null); // 선택한 id 상태

  const articleColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Context', accessor: 'context' },
    {
      header: 'Actions', // 새로운 열 추가
      accessor: 'actions', // 아무 데이터에 접근하지 않음
      Cell: ({ row }: any) => (
        <button
          className="btn btn-primary"
          onClick={() => handleSearchClick(row.id)}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      ), // 각 행에 대해 돋보기 버튼 생성
    },
  ];

  // 페이지네이션을 위한 기사 목록
  const { data, isLoading, isError } = useArticle(search, page); // useArticle 훅에 페이지 값 전달
  const { data: articleDetails } = useArticleId(selectedId); // 선택한 ID에 대한 세부 정보 가져오기

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value); // 검색어 상태 업데이트
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // 페이지 변경 시 새로운 페이지로 설정
  };

  // 각 행의 돋보기 버튼 클릭 시 호출되는 함수
  const handleSearchClick = (id: number) => {
    setSelectedId(id); // 선택한 ID를 설정
    const modal = document.getElementById('article-modal') as HTMLDialogElement; // HTMLDialogElement로 캐스팅
    if (modal) {
      modal.showModal(); // 모달 열기
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById('article-modal') as HTMLDialogElement; // HTMLDialogElement로 캐스팅
    if (modal) {
      modal.close(); // 모달 닫기
    }
  };

  if (isError) {
    return <p>Error loading articles.</p>;
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        placeholder="Type here"
        className="input input-bordered input-accent w-full max-w-xs"
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PageTables
          columns={articleColumns}
          data={data?.articles || []}
          totalPage={data?.totalPages || 0} // totalPages 전달
          currentPage={page} // 현재 페이지 전달
          onPageChange={handlePageChange} // 페이지 변경 핸들러
          onSearchClick={handleSearchClick} // 돋보기 버튼 클릭 핸들러 전달
        />
      )}

      {/* 모달 */}
      <dialog id="article-modal" className="modal">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Article Details</h3>
          {articleDetails ? (
            <div>
              {/* articleDetails 객체의 모든 키-값 쌍을 출력 */}
              {Object.entries(articleDetails).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {String(value)}
                </p>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="modal-action">
            <button className="btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};
