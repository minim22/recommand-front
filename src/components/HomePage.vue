<template>
  <div class="home-page">

    <!-- Hero Banner -->
    <section class="hero" :style="heroStyle">
      <div class="hero-overlay"></div>

      <div class="hero-text">
        <h1>{{ heroTitle }}</h1>
        <p>{{ heroDescription }}</p>
        <button class="hero-btn">자세히 보기</button>
      </div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <p>영화 목록을 불러오는 중...</p>
    </div>

    <!-- Error State -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Category Rows -->
    <section
      v-for="(row, index) in rows"
      :key="row.title"
      class="category-row"
    >
      <h2 class="row-title">{{ row.title }}</h2>

      <div class="row-wrapper">
        <!-- 왼쪽 버튼 -->
        <button 
          class="scroll-btn scroll-btn-left"
          @click="scrollLeft(index)"
          :class="{ hidden: scrollPositions[index] === 0 }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>

        <!-- 영화 리스트 -->
        <div 
          class="row-container"
          :ref="el => rowRefs[index] = el"
          @scroll="updateScrollPosition(index)"
        >
          <div
            v-for="item in row.items"
            :key="item.id"
            class="card"
            :style="{ backgroundImage: `url(${item.posterPath})` }"
            :title="item.title"
          >
            <div class="card-overlay">
              <p class="card-title">{{ item.title }}</p>
              <p class="card-rating" v-if="item.voteAverage">
                ⭐ {{ item.voteAverage.toFixed(1) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 오른쪽 버튼 -->
        <button 
          class="scroll-btn scroll-btn-right"
          @click="scrollRight(index)"
          :class="{ hidden: isAtEnd(index) }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

const heroTitle = "당신의 취향을 위한 콘텐츠 탐색";
const heroDescription =
  "영화 · 음악 · 게임 기반 개인 맞춤형 추천 플랫폼";

const heroImage = "https://i.imgur.com/Vv2NY1j.jpeg";
const heroStyle = `background-image: url('${heroImage}')`;

// 상태 관리
const loading = ref(false);
const error = ref("");
const movies = ref([]);

// 스크롤 관련
const rowRefs = ref<HTMLElement[]>([]);
const scrollPositions = ref<number[]>([]);

// API 기본 URL
const API_BASE_URL = "http://localhost:12100";

interface Movie {
  id: number;
  title: string;
  overview: string;
  genreIds: number[];
  voteAverage: number;
  popularity: number;
  releaseDate: string;
  posterPath: string;
}

interface ApiResponse {
  status: number;
  code: string;
  title: string;
  message: string;
  data: Movie[];
  timestamp: string;
  transactionId: string;
}

// 영화 데이터 가져오기
const fetchMovies = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/movie/main`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse = await response.json();
    
    if (result.status === 200 && result.data) {
      movies.value = result.data;
      console.log(`Successfully loaded ${result.data.length} movies`);
    } else {
      throw new Error(result.message || "데이터를 불러오는데 실패했습니다");
    }
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    error.value = "영화 목록을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.";
  } finally {
    loading.value = false;
  }
};

// 스크롤 함수들
const scrollLeft = (index: number) => {
  const container = rowRefs.value[index];
  if (container) {
    container.scrollBy({
      left: -container.clientWidth * 0.8, // 화면의 80%만큼 스크롤
      behavior: 'smooth'
    });
  }
};

const scrollRight = (index: number) => {
  const container = rowRefs.value[index];
  if (container) {
    container.scrollBy({
      left: container.clientWidth * 0.8,
      behavior: 'smooth'
    });
  }
};

const updateScrollPosition = (index: number) => {
  const container = rowRefs.value[index];
  if (container) {
    scrollPositions.value[index] = container.scrollLeft;
  }
};

const isAtEnd = (index: number) => {
  const container = rowRefs.value[index];
  if (!container) return false;
  
  const maxScroll = container.scrollWidth - container.clientWidth;
  return scrollPositions.value[index] >= maxScroll - 10; // 10px 여유
};

// 컴포넌트 마운트
onMounted(() => {
  fetchMovies();
});

// rows 데이터
const rows = computed(() => [
  {
    id: "movies",
    title: "당신을 위한 영화 추천",
    items: movies.value
  },
  {
    id: "music",
    title: "새로운 음악 탐색",
    items: [
      { id: 4, posterPath: "https://i.imgur.com/Xw5T0zQ.jpeg", title: "음악 1", voteAverage: 8.5 },
      { id: 5, posterPath: "https://i.imgur.com/jwqG4Lf.jpeg", title: "음악 2", voteAverage: 7.8 },
      { id: 6, posterPath: "https://i.imgur.com/3V0vM7L.jpeg", title: "음악 3", voteAverage: 9.1 }
    ]
  },
  {
    id: "games",
    title: "당신 취향의 게임 추천",
    items: [
      { id: 7, posterPath: "https://i.imgur.com/zhMlFxJ.jpeg", title: "게임 1", voteAverage: 8.2 },
      { id: 8, posterPath: "https://i.imgur.com/Oe0hJbX.jpeg", title: "게임 2", voteAverage: 7.5 },
      { id: 9, posterPath: "https://i.imgur.com/cQ4Hxtc.jpeg", title: "게임 3", voteAverage: 8.9 }
    ]
  }
]);
</script>

<style scoped>
.home-page {
  background: #0A0F1F;
  color: #fff;
  min-height: 100vh;
}

/* Loading & Error */
.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 18px;
}

.error {
  color: #ff6b6b;
}

/* HERO */
.hero {
  width: 100%;
  height: 70vh;
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 60px;
  display: flex;
  align-items: flex-end;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.05),
    #0A0F1F
  );
}

.hero-text {
  position: relative;
  max-width: 480px;
}

.hero h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #A7D7DE;
}

.hero p {
  font-size: 18px;
  opacity: 0.85;
  margin-bottom: 20px;
}

.hero-btn {
  padding: 12px 24px;
  background: #00A89B;
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s ease;
}

.hero-btn:hover {
  background: #0E6463;
}

/* Rows */
.category-row {
  margin-top: 30px;
  padding-bottom: 20px;
}

.row-title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 60px; /* 버튼 공간 확보 */
  margin-bottom: 10px;
  color: #A7D7DE;
}

/* Row Wrapper - 버튼 포함 */
.row-wrapper {
  position: relative;
  padding: 0 50px; /* 좌우 버튼 공간 */
}

.row-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 12px;
  padding: 10px 10px 20px 10px;
  scrollbar-width: none;
  scroll-behavior: smooth;
}

.row-container::-webkit-scrollbar {
  display: none;
}

/* 스크롤 버튼 */
.scroll-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  color: #fff;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
}

.row-wrapper:hover .scroll-btn {
  opacity: 1;
}

.scroll-btn:hover {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
}

.scroll-btn.hidden {
  display: none;
}

.scroll-btn-left {
  left: 0;
  border-radius: 0 6px 6px 0;
}

.scroll-btn-right {
  right: 0;
  border-radius: 6px 0 0 6px;
}

.scroll-btn svg {
  width: 32px;
  height: 32px;
}

/* Card */
.card {
  position: relative;
  width: 210px;
  height: 310px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
  cursor: pointer;
  flex-shrink: 0;
}

.card:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 20px rgba(166, 242, 196, 0.6);
  z-index: 5;
}

/* Card Overlay */
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
  padding: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #fff;
  line-height: 1.3;
}

.card-rating {
  font-size: 13px;
  margin: 0;
  color: #A7D7DE;
}
</style>