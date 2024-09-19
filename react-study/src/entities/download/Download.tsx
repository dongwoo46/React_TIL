import React, { useState } from 'react';
// 필요한 커스텀 훅들을 임포트
import {
  useCommonDownload,
  useHelpDownload,
  useSnortDownload,
  useAttackerIpDownload,
  useCncIpDownload,
  useMalwareDownload,
  useDomainDownload,
  useDynamicSnortDownload,
  useDynamicScoreDownload,
} from './yourCustomHooks';

const DownloadPolicy = () => {
  const [aes, setAes] = useState('');

  // 커스텀 훅들 사용
  const downloadCommonClosed = useCommonDownload(aes);
  const downloadHelpClosed = useHelpDownload(aes);
  const downloadSnortClosed = useSnortDownload(aes);
  const downloadAttackerIpClosed = useAttackerIpDownload(aes);
  const downloadCncIpClosed = useCncIpDownload(aes);
  const downloadMalwareClosed = useMalwareDownload(aes);
  const downloadDomainClosed = useDomainDownload(aes);
  const downloadDynamicSnort = useDynamicSnortDownload(aes);
  const downloadDynamicScore = useDynamicScoreDownload(aes);

  // 일반화된 다운로드 함수
  const handleDownload = async (
    downloadQuery,
    fileExtension,
    defaultFileName
  ) => {
    if (!aes) {
      alert('AES 값을 입력하세요');
      return;
    }

    try {
      // refetch 함수 호출로 쿼리 트리거
      const result = await downloadQuery.refetch(); // refetch 결과값

      if (result?.data) {
        const { data: fileData, headers } = result.data; // 파일 데이터와 헤더 추출

        // Content-Disposition 헤더에서 파일 이름 추출
        const contentDisposition = headers['content-disposition'];
        const fileName = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/['"]/g, '') +
            fileExtension
          : `downloaded_file${fileExtension}`; // 기본 파일 이름 설정

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
    } catch (error) {
      console.error(`Error downloading ${defaultFileName}:`, error);
      // 필요에 따라 추가적인 에러 처리를 할 수 있습니다.
    }
  };

  // 버튼 정보 배열
  const buttons = [
    {
      label: 'Common Download',
      downloadQuery: downloadCommonClosed,
      fileExtension: '.net_common',
      defaultFileName: 'common',
    },
    {
      label: 'Help Download',
      downloadQuery: downloadHelpClosed,
      fileExtension: '.net_help',
      defaultFileName: 'help',
    },
    {
      label: 'Snort Download',
      downloadQuery: downloadSnortClosed,
      fileExtension: '.net_snort',
      defaultFileName: 'snort',
    },
    {
      label: 'AttackerIp Download',
      downloadQuery: downloadAttackerIpClosed,
      fileExtension: '.net_attackerip',
      defaultFileName: 'attackerip',
    },
    {
      label: 'CncIp Download',
      downloadQuery: downloadCncIpClosed,
      fileExtension: '.net_cncip',
      defaultFileName: 'cncip',
    },
    {
      label: 'Domain Download',
      downloadQuery: downloadDomainClosed,
      fileExtension: '.net_domain',
      defaultFileName: 'domain',
    },
    {
      label: 'Malware Download',
      downloadQuery: downloadMalwareClosed,
      fileExtension: '.net_malware',
      defaultFileName: 'malware',
    },
    {
      label: 'Dynamic Snort Download',
      downloadQuery: downloadDynamicSnort,
      fileExtension: '.net_dynamic_snort',
      defaultFileName: 'dynamic_snort',
    },
    {
      label: 'Dynamic Score Download',
      downloadQuery: downloadDynamicScore,
      fileExtension: '.net_dynamic_score',
      defaultFileName: 'dynamic_score',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">정책 다운로드</h2>
      <h3>모든 버전 다운로드</h3>
      <input
        type="text"
        className="input input-bordered w-full max-w-xs mt-10"
        placeholder="암호화할 비밀번호를 입력하세요"
        value={aes}
        onChange={(e) => setAes(e.target.value)}
      />
      {/* 버튼 섹션 */}
      {buttons.map(
        ({ label, downloadQuery, fileExtension, defaultFileName }) => (
          <div className="mt-4" key={label}>
            <button
              className="w-48 h-12 border-2 border-primary bg-transparent text-primary hover:bg-gray-100"
              onClick={() =>
                handleDownload(downloadQuery, fileExtension, defaultFileName)
              }
              disabled={downloadQuery.isLoading}
            >
              {downloadQuery.isLoading ? '다운로드 중...' : label}
            </button>
            {/* 에러 처리 */}
            {downloadQuery.isError && (
              <p className="text-red-500 mt-2">
                {`${label} 중 오류가 발생했습니다.`}
              </p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default DownloadPolicy;
