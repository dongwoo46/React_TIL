// types.d.ts (혹은 다른 타입 선언 파일)

import { router } from './router'; // 생성한 라우터 인스턴스를 가져옴

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router; // 라우터의 타입을 등록
  }
}
