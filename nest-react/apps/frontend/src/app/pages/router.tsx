import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
  NotFoundRoute,
  RouterProvider,
  useNavigate,
} from '@tanstack/react-router';
import { Header, Sidebar } from '../widgets';
import { Home } from './Home';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import Login from './Login';
import Signup from './Signup';
import useAuthStore from '../shared/store/auth-store';
import { useEffect } from 'react';
import { Article } from './Article';
import { User } from './User';
import { TanstackArticle } from './TanstackArticle';

// Root 라우트 생성
const rootRoute = createRootRoute();

// Main Route (Header와 Sidebar를 포함하는 레이아웃)
const mainRoute = createRoute({
  id: 'main',
  getParentRoute: () => rootRoute, // mainRoute는 rootRoute의 자식
  component: () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn); // 로그인 상태 가져오기
    const navigate = useNavigate(); // 라우터에서 제공하는 navigate 함수

    useEffect(() => {
      if (!isLoggedIn) {
        // 로그인하지 않은 경우 리다이렉트
        navigate({ to: '/login' });
      }
    }, [isLoggedIn, navigate]);

    return (
      <div className="flex flex-col h-screen">
        <Header /> {/* 모든 페이지에 공통으로 적용되는 Header */}
        <div className="flex flex-1">
          <Sidebar /> {/* 모든 페이지에 공통으로 적용되는 Sidebar */}
          <main className="flex-1 p-6">
            <Outlet /> {/* 자식 라우트 렌더링 */}
          </main>
        </div>
      </div>
    );
  },
});

// Home과 About 경로 생성 (mainRoute의 자식으로 적용)
const homeRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/', // Home 페이지는 '/' 경로
  component: Home,
});

const userRoute = createRoute({
  getParentRoute: () => mainRoute,
  path: '/user', // About 페이지는 '/about' 경로
  component: User,
});

// Login 경로 (Header와 Sidebar 없는 라우트로 rootRoute의 자식)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute, // loginRoute는 rootRoute의 자식으로, Header나 Sidebar 없음
  path: 'login', // Login 페이지는 '/login' 경로
  component: Login,
});

const signupRoute = createRoute({
  getParentRoute: () => rootRoute, // loginRoute는 rootRoute의 자식으로, Header나 Sidebar 없음
  path: 'signup', // Login 페이지는 '/login' 경로
  component: Signup,
});

const ArticleRoute = createRoute({
  getParentRoute: () => mainRoute, //
  path: '/article',
  component: Article,
});

const TanstackArticleRoute = createRoute({
  getParentRoute: () => mainRoute, //
  path: '/tanstack-article',
  component: TanstackArticle,
});

// 404 Not Found Route (라우트가 없을 때 보여줄 페이지)
const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => <div>404 Not Found</div>, // 커스텀 404 페이지
});

// 라우트 트리 구성
const routeTree = rootRoute.addChildren([
  mainRoute.addChildren([
    homeRoute,
    userRoute,
    ArticleRoute,
    TanstackArticleRoute,
  ]), // mainRoute의 자식으로 Home과 About 추가
  loginRoute, // loginRoute는 rootRoute의 자식
  signupRoute,
  notFoundRoute, // NotFoundRoute 추가
]);

// Router 생성
export const router = createRouter({
  routeTree,
});

// Router에 Devtools 연결 (개발 도구)
export const App = () => (
  <>
    <RouterProvider router={router} />
    <TanStackRouterDevtools router={router} position="bottom-right" />
  </>
);
