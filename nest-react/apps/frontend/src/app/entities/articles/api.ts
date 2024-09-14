import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import useUserStore from '../../shared/store/user-store'; // Zustand를 사용한 유저 상태 관리
import useAuthStore from '../../shared/store/auth-store'; // Zustand를 사용한 로그인 상태 관리
import { useNavigate } from '@tanstack/react-router';
import { Article } from './../../../../../backend/src/app/articles/entities/article.entity';

// SearchArticles 타입 정의 (필요한 경우 수정)
interface SearchArticles {
  title?: string;
  context?: string;
}

// searchArticles API 호출 함수
const searchArticles = async (data: SearchArticles): Promise<Article[]> => {
  const response = await axios.get(
    'http://localhost:3000/api/articles/search',
    {
      params: {
        ...(data.title && { title: data.title }),
        ...(data.context && { context: data.context }),
      },
    }
  );
  return response.data; // 응답 데이터 반환 (user 대신 data 전체를 반환)
};

// useArticle Hook
export const useArticle = (data: SearchArticles) => {
  // useQuery를 사용해 검색 결과를 가져옴
  return useQuery({
    queryKey: ['searchArticles'],
    queryFn: async () => {
      const articles = await searchArticles(data);
      return articles;
    },
  });
};
