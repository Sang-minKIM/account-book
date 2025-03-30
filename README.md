## About Project 🚋
- 회사 프로젝트 아키텍처 설계를 연습해보기 위해 빠르게 소비내역 CRUD부터 시작했습니다.
- 이전부터 가계부를 작성하는 습관을 들이고 싶었기에 계속해서 서비스를 발전시켜보기로 했습니다.

### 0. 서비스 설계
-  프론트엔드 구조는 “[우아콘2023 **프론트엔드 상태관리 실전 편**](https://www.youtube.com/watch?v=nkXIpGjVxWU&t=1158s)” 발표를 참고하였습니다.
      <img width="700" alt="image" src="https://github.com/user-attachments/assets/dc9ada21-e66e-4122-8d98-4ac1aa6ea544" />

- 패키지 매니저는 pnpm을 사용합니다. 심볼릭 링크를 이용해서 의존성 구조를 flat하게 표현하고, 하드 링크로 디스크 공간 효율을 높인 점이 매력적이었습니다.
- 빌드도구는 vite를 사용합니다. 플러그인을 활용한 config가 쉽고, esbuild를 활용하여 빠른 개발 서버 동작을 보장하는 것이 좋았습니다.
- 서버 상태 관리를 위해 TanStack-Query를 사용합니다. 선언적인 데이터 fetching, suspense를 활용하여 로딩 상태 처리, 쿼리 키를 기반으로 캐싱이 되는 점이 좋았습니다.
- Supabase를 활용해 백엔드를 구축했습니다.
  - 현재는 Supabase의 REST API 기능을 사용합니다. (Edge functions를 이용한 API 제공 예정)
  
### 1. 거래 내역 화면
- 거래내역을 테이블 형태로 한눈에 볼 수 있도록 제공합니다.
- 화면 전환 없이 바로 거래 내역을 추가할 수 있는 Form을 제공합니다.
- 테이블의 셀을 더블클릭하면 수정이 가능합니다. 엑셀처럼 사용할 수 있게 하고 싶었습니다.
    ![image](https://github.com/user-attachments/assets/103e1332-ead7-405c-9c65-10701b741884)
    ![image](https://github.com/user-attachments/assets/18c68f26-f6cf-4c90-a72d-bb58f07e3935)



### 2. 카테고리별 소비 화면
- 카테고리별 사용 금액을 도넛 차트로 제공합니다.
- 도넛 차트를 SVG로 직접 구현했습니다.
   ![image](https://github.com/user-attachments/assets/d1af7f09-b794-4344-bea4-30e1751f7efc)
  
  
### 3. 캘린더 화면
- 일자별 입출금 내역을 달력 형태로 제공합니다. 토스의 UI가 마음에 들어서 비슷하게 만들었습니다.
   ![image](https://github.com/user-attachments/assets/28b40225-6097-45f2-b5d0-945e37e5bbd0)
