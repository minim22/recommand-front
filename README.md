
## 기본구조
my-vue3-project/
│
├── node_modules/      # npm으로 설치된 프로젝트 의존성 라이브러리들이 모여있는 곳 (직접 수정 X)
│
├── public/            # Vite가 처리하지 않고 정적으로 서빙되는 파일들
│   └── favicon.ico    # 브라우저 탭에 표시되는 아이콘
│
├── src/               # [핵심] 실제 소스 코드가 위치하는 곳 (개발 작업의 주 무대)
│   ├── assets/        # 컴포넌트에서 import해서 사용할 이미지, 폰트, CSS 등
│   │   └── logo.svg
│   │
│   ├── components/    # 재사용 가능한 Vue 컴포넌트(.vue 파일)들을 모아두는 폴더
│   │   └── HelloWorld.vue
│   │
│   ├── App.vue        # 최상위 루트 컴포넌트. 모든 컴포넌트의 부모.
│   └── main.js        # Vue 앱 인스턴스를 생성하고 마운트하는 진입점 파일
│
├── index.html         # [중요] 브라우저가 가장 먼저 읽는 HTML 파일 (앱의 진입점)
├── package.json       # 프로젝트 메타데이터, 스크립트 명령어, 의존성 버전 관리 파일
├── vite.config.js     # Vite 빌드 도구 설정 파일
└── README.md          # 프로젝트 설명 파일