import { create } from 'zustand';

interface UserState {
  id: number;
  username: string;
  role: string;
  email: string;
  // updateUser에 id를 추가한 타입 정의
  updateUser: (user: {
    id: number;
    username: string;
    role: string;
    email: string;
  }) => void;
}

const useUserStore = create<UserState>((set) => ({
  id: 0,
  username: '',
  role: '',
  email: '',

  updateUser: (user) => {
    set(() => ({
      id: user.id, // id 필드를 업데이트
      username: user.username,
      role: user.role,
      email: user.email,
    }));
  },
}));

export default useUserStore;
