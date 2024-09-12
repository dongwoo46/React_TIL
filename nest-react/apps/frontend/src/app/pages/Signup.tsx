import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

interface IFormInput {
  id: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/signup',
        {
          username: data.id,
          password: data.password,
          role: 'SuperAdmin',
          email: 'sniper442@example.com',
        }
      );
      console.log('Signup successful:', response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Signup failed:', error.response.data);
      } else {
        console.error('Signup failed:', error);
      }
    }
  };
  // 패스워드 확인 필드와 패스워드 필드가 동일한지 검사하는 유효성 검사 함수
  const validatePasswordConfirmation = (value: string) => {
    return value === watch('password') || 'Passwords do not match';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-green-600 mb-4">AUS</h1>
      <h2 className="text-2xl mb-6">계정 생성</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-white p-8 border border-gray-200 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 mb-2">
            ID
          </label>
          <input
            {...register('id', {
              required: 'ID is required',
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
                message: 'ID must contain both letters and numbers',
              },
            })}
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            password
          </label>
          <input
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                message:
                  'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character',
              },
            })}
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
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">
            password 확인
          </label>
          <input
            {...register('confirmPassword', {
              required: 'Password confirmation is required',
              validate: validatePasswordConfirmation,
            })}
            type="password"
            id="confirmPassword"
            className={`w-full px-3 py-2 border ${
              errors.confirmPassword ? 'border-red-500' : 'border-green-500'
            } rounded focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
