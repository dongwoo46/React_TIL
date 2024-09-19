import React, { useState } from 'react';
import { useCommonDownload } from '../entities/download/api';

export const Download: React.FC = () => {
  const [aes, setAes] = useState<string>(''); // AES 입력값을 관리하는 상태
  const downloadCommonClosed = useCommonDownload(aes); // useCommonDownload 훅 사용
  const downloadHelpClosed = useHelpDownload(aes); // useCommonDownload 훅 사용
  const downloadSnortClosed = useSnortDownload(aes); // useCommonDownload 훅 사용
  const downloadAttackerIpClosed = useAttacerIpDownload(aes); // useCommonDownload 훅 사용
  const downloadCncIpClosed = useCncIpDownload(aes); // useCommonDownload 훅 사용
  const downloadMalwareClosed = useMalwareDownload(aes); // useCommonDownload 훅 사용
  const downloadDomainClosed = useDomainDownload(aes); // useCommonDownload 훅 사용
  const downloadDynamicSnort = useDynamicSnortDownload(aes); // useCommonDownload 훅 사용
  const downloadDynamicScore = useDynamicScoreDownload(aes); // useCommonDownload 훅 사용

  const buttons = [
    { label: 'Common Download', onClick: handleDownloadCommon },
    { label: 'Help Download', onClick: handleDownloadHelp },
    { label: 'Snort Download', onClick: handleDownloadSnort },
    { label: 'AttackerIp Download', onClick: handleDownloadAttackerIp },
    { label: 'CncIp Download', onClick: handleDownloadCncIp },
    { label: 'Domain Download', onClick: handleDownloadDomain },
    { label: 'Malware Download', onClick: handleDownloadMalware },
    { label: 'Dynamic Snort Download', onClick: handleDownloadDynamicSnort },
    { label: 'Dynamic Score Download', onClick: handleDownloadDynamicScore },
  ];

  // 다운로드 버튼 클 릭 시 API 요청을 트리거하는 함수
  const handleDownloadCommon = async () => {
    if (!aes) {
      alert('AES 값을 입력하세요');
      return;
    }

    // refetch 함수 호출로 쿼리 트리거
    const result = await downloadCommonClosed.refetch(); // refetch 결과값

    if (result?.data) {
      const { data: fileData, headers } = result.data; // 파일 데이터와 헤더 추출

      // Content-Disposition 헤더에서 파일 이름 추출
      const contentDisposition = headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '') +
          '.net_common'
        : 'downloaded_file.net_common'; // 기본 파일 이름 설정

      // Blob으로 파일 처리 및 다운로드
      const blob = new Blob([fileData]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // 다운로드할 파일 이름 설정
      document.body.appendChild(link);
      link.click(); // 링크 클릭으로 다운로드 트리거
      document.body.removeChild(link); // 다운로드 후 링크 제거
    }
  };

  const handleDownloadHelp = async () => {
    if (!aes) {
      alert('AES 값을 입력하세요');
      return;
    }

    // refetch 함수 호출로 쿼리 트리거
    const result = await downloadHelpClosed.refetch(); // refetch 결과값

    if (result?.data) {
      const { data: fileData, headers } = result.data; // 파일 데이터와 헤더 추출

      // Content-Disposition 헤더에서 파일 이름 추출
      const contentDisposition = headers['content-disposition'];
      const fileName = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/['"]/g, '') +
          '.net_help'
        : 'downloaded_file.net_help'; // 기본 파일 이름 설정

      // Blob으로 파일 처리 및 다운로드
      const blob = new Blob([fileData]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName); // 다운로드할 파일 이름 설정
      document.body.appendChild(link);
      link.click(); // 링크 클릭으로 다운로드 트리거
      document.body.removeChild(link); // 다운로드 후 링크 제거
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">정책 다운로드</h2>
      <h3>모든 version 다운로드</h3>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mt-10"
        placeholder="암호화할 비밀번호를 입력하세요"
        value={aes}
        onChange={(e) => setAes(e.target.value)} // AES 값 업데이트
      />
      {/* 버튼 섹션 */}
      {/* 버튼 섹션 */}
      {buttons.map(({ label, onClick }) => (
        <div className="mt-4" key={label}>
          <button
            className="w-48 h-12 border-2 border-primary bg-transparent text-primary hover:bg-gray-100"
            onClick={onClick}
            disabled={downloadCommonClosed.isLoading}
          >
            {downloadCommonClosed.isLoading ? '다운로드 중...' : label}
          </button>
        </div>
      ))}

      {/* 에러 처리 */}
      {downloadCommonClosed.isError && (
        <p className="text-red-500 mt-4">
          데이터를 가져오는 중 오류가 발생했습니다.
        </p>
      )}
    </div>
  );
};
