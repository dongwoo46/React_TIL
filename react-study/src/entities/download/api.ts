import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 데이터 요청 함수
const commonDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/net_common/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useCommonDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['commonDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => commonDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

// 데이터 요청 함수
const helpDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/net_help/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useHelpDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['helpDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => helpDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

// 데이터 요청 함수
const snortDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/net_snort/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useSnortDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['snortDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => snortDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

// 데이터 요청 함수
const cncIpDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/cti_cnc_ip/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useCncIpDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['cncIpDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => cncIpDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

// 데이터 요청 함수
const attackerIpDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/cti_attacker_ip/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useAttackerIpDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['attackerIpDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => attackerIpDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

const malwareDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/cti_malware/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useMalwareDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['malwareDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => malwareDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

const domainDownloadClosed = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/cti_domain/download/closed',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useDomainDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['domainDownloadClosed', aes], // queryKey에 aes 값을 포함
    queryFn: () => domainDownloadClosed(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

const dynamicSnortDownload = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/dynamic_snort/download/',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useDynamicSnortDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['dynamicSnortDownload', aes], // queryKey에 aes 값을 포함
    queryFn: () => dynamicSnortDownload(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};

const dynamicScoreDownload = async (aes: string): Promise<any> => {
  const response = await axios.get(
    import.meta.env.VITE_HOST_URL + '/dynamic_score/download/',
    {
      withCredentials: true, // 쿠키를 전송하기 위해 설정
      headers: {
        aes: aes, // AES 헤더 추가
      },
      responseType: 'blob', // 응답을 blob으로 받음 (파일)
    }
  );

  const headers = response.headers; // 헤더를 가져옵니다.
  return { data: response.data, headers }; // 데이터와 헤더를 반환합니다.
};

// useMembers Hook
export const useDynamicScoreDownload = (aes: string) => {
  return useQuery<any, Error>({
    queryKey: ['dynamicScoreDownload', aes], // queryKey에 aes 값을 포함
    queryFn: () => dynamicScoreDownload(aes), // aes 값을 넘겨줌
    enabled: false, // 기본적으로 비활성화하여 초기에는 요청이 발생하지 않음
    refetchOnWindowFocus: false, // 포커스가 창으로 돌아올 때 쿼리 자동 실행 방지
  });
};
