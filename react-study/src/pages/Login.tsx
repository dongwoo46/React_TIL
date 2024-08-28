import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('Form Data:', data);
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
    </div>
  );
};

export default Login;
