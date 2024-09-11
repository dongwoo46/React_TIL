import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useUserStore from '../shared/store/user-store';
import { useNavigate } from '@tanstack/react-router'; // TanStack Router의 useNavigate 사용
import axios from 'axios';
import useAuthStore from '../shared/store/auth-store';
import { useLogin } from '../entities/user/api';

interface IFormInput {
  id: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const userStore = useUserStore();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate(); // 라우터에서 제공하는 navigate 함수
  const loginMutation = useLogin();
  // onSubmit 함수
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      // 서버에 POST 요청을 보내는 axios 호출
      // const response = await axios.post(
      //   'http://localhost:3000/api/users/login',
      //   {
      //     username: data.id,
      //     password: data.password,
      //   }
      // );
      // const { id, username, role, email } = response.data.user;

      // // 상태 업데이트
      // userStore.updateUser({ id, username, role, email });
      // login();
      loginMutation.mutate({ username: data.id, password: data.password });
      navigate({ to: '/' });
      // 업데이트된 상태를 확인
      console.log(userStore); // 현재 상태 확인
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">AUS</h1>
      <h2 className="text-2xl mb-6">로그인</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-white p-8 border border-gray-200 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 mb-2">
            ID
          </label>
          <input
            {...register('id', { required: 'ID is required' })}
            type="text"
            id="id"
            className={`w-full px-3 py-2 border ${
              errors.id ? 'border-red-500' : 'border-green-500'
            } rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.id && (
            <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            PASSWORD
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            id="password"
            className={`w-full px-3 py-2 border ${
              errors.password ? 'border-red-500' : 'border-green-500'
            } rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <a href="/signup" className="text-sm text-green-600 hover:underline">
            계정 생성하기
          </a>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            로그인
          </button>
        </div>
      </form>
      {/* 로딩, 에러 및 성공 상태 처리 */}
      {loginMutation.isPending && <p>Logging in...</p>}
      {loginMutation.isError && (
        <p>Error logging in: {loginMutation.error.message}</p>
      )}
      {loginMutation.isSuccess && <p>Successfully logged in!</p>}
    </div>
  );
};

export default Login;
