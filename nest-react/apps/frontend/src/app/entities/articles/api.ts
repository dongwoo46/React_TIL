import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Article } from './../../../../../backend/src/app/articles/entities/article.entity';

// searchArticles API 호출 함수
const searchArticles = async (
  data: string,
  page: number = 1,
  take: number = 10
): Promise<{ articles: Article[]; totalPages: number }> => {
  const response = await axios.get(
    'http://localhost:3000/api/articles/search',
    {
      params: {
        data,
        page,
        take,
      },
    }
  );
  return response.data; // `articles`와 `totalPages`가 포함된 응답
};

// useArticle Hook
export const useArticle = (
  data: string,
  page: number = 1,
  take: number = 10
) => {
  return useQuery<{ articles: Article[]; totalPages: number }, Error>({
    queryKey: ['searchArticles', data, page, take], // 페이지와 데이터 검색어 포함
    queryFn: async () => {
      const { articles, totalPages } = await searchArticles(data, page, take);
      return { articles, totalPages };
    },
  });
};

// searchArticles API 호출 함수
const getArticleDetails = async (id: number): Promise<Article> => {
  const response = await axios.get(`http://localhost:3000/api/articles/${id}`);
  return response.data; // `articles`와 `totalPages`가 포함된 응답
};

// useArticle Hook
// useArticleId Hook
export const useArticleId = (id: number | null) => {
  return useQuery<Article, Error>({
    queryKey: ['article-id', id],
    queryFn: () =>
      id ? getArticleDetails(id) : Promise.reject('No ID provided'), // id가 null일 때 비활성화 옵션을 사용하므로 queryFn은 항상 실행 가능
    enabled: !!id, // id가 있을 때만 쿼리 실행
  });
};
