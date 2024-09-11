import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import useUserStore from '../../shared/store/user-store'; // Zustand를 사용한 유저 상태 관리
import useAuthStore from '../../shared/store/auth-store'; // Zustand를 사용한 로그인 상태 관리
import { useNavigate } from '@tanstack/react-router';

// 로그인 API 호출 함수
const loginUser = async (data: LoginParams): Promise<User> => {
  const response = await axios.post(
    'http://localhost:3000/api/users/login',
    data
  );
  return response.data.user; // { id, username, role, email }
};

export const useLogin = () => {
  const updateUser = useUserStore((state) => state.updateUser); // 유저 상태 업데이트 함수
  const login = useAuthStore((state) => state.login); // 로그인 상태 업데이트 함수
  const navigate = useNavigate(); // 라우터에서 제공하는 navigate 함수

  // useMutation을 사용해 로그인 처리
  return useMutation({
    mutationFn: loginUser,
    onMutate: (variables) => {
      // mutationFn이 실행되기 전에 실행됨, 낙관적 업데이트 같은 처리 가능
      console.log('Login request initiated with:', variables);
    },
    onSuccess: (userData) => {
      // 성공적으로 로그인되었을 때 실행됨
      const { id, username, role, email } = userData;
      updateUser({ id, username, role, email }); // 유저 상태 업데이트
      login(); // 로그인 상태 업데이트
      navigate({ to: '/' });
    },
    onError: (error, variables, context) => {
      // 로그인 중 에러가 발생했을 때 실행됨
      console.error('Login failed:', error);
    },
    onSettled: (data, error, variables, context) => {
      // 작업이 성공하든 실패하든, 완료 후 항상 실행됨
      console.log('Login mutation settled');
    },
    retry: 3, // 로그인 실패 시 최대 3번까지 재시도
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000), // 재시도 지연 시간
  });
};
