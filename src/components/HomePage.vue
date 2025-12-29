<template>
  <div class="home-page">
    <!-- Hero Slider -->
    <section class="hero-slider">
      <div class="slider-container">
        <transition-group name="slide" tag="div" class="slides">
          <div
            v-for="(slide, index) in heroSlides"
            :key="slide.id"
            v-show="currentSlide === index"
            class="slide"
            :style="{ backgroundImage: `url(${slide.image})` }"
          >
            <div class="slide-overlay"></div>
            <div class="slide-content">
              <span class="slide-badge">{{ slide.badge }}</span>
              <h1 class="slide-title">{{ slide.title }}</h1>
              <p class="slide-desc">{{ slide.description }}</p>
              <div class="slide-actions">
                <button class="btn-play" @click="handleSlideClick(slide)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  자세히 보기
                </button>
                <button class="btn-info" @click="detailClick(slide)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                  상세 정보
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
      
      <!-- 슬라이더 인디케이터 -->
      <div class="slider-indicators">
        <button
          v-for="(slide, index) in heroSlides"
          :key="index"
          :class="['indicator', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        >
          <span class="indicator-progress" v-if="currentSlide === index"></span>
        </button>
      </div>
      
      <!-- 슬라이더 화살표 -->
      <button class="slider-arrow slider-prev" @click="prevSlide">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
      </button>
      <button class="slider-arrow slider-next" @click="nextSlide">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
      </button>
      
      <!-- 하단 글로우 라인 -->
      <div class="hero-glow-line"></div>
    </section>

    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>콘텐츠를 불러오는 중...</p>
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

        <!-- 영화/게임 리스트 -->
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
            @click="handleCardClick(row.id, item.id)"
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
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import { useRouter } from 'vue-router';

const router = useRouter();

// 상태 관리
const loading = ref(false);
const error = ref("");
const movies = ref<Movie[]>([]);
const musics = ref<Music[]>([]);
const games = ref<Game[]>([]);

// 슬라이더 관련
const currentSlide = ref(0);
const sliderInterval = ref<number | null>(null);
const SLIDE_DURATION = 5000; // 5초

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

interface Music {
  id: number;
  albumId: string;
  albumName: string;
  albumType: string;
  artistNames: string;
  voteAverage: number;
  releaseDate: string;
  albumImageMedium: string;
}

interface Game {
  id: number;
  name: string;
  slug: string;
  summary: string;
  clickCnt: number;
  screenshotUrl: string;
  createdAt: string;
}

interface ApiResponse {
  status: number;
  code: string;
  title: string;
  message: string;
  data: Movie[] | Music[] | Game[];
  timestamp: string;
  transactionId: string;
}

interface HeroSlide {
  id: string;
  type: 'movie' | 'music' | 'game';
  badge: string;
  title: string;
  description: string;
  image: string;
  itemId: number;
}

// 히어로 슬라이드 데이터 (영화/음악/게임 인기 1위씩)
const heroSlides = computed<HeroSlide[]>(() => {
  const slides: HeroSlide[] = [];
  
  // 영화 인기 1위
  if (movies.value.length > 0) {
    const topMovie = movies.value[0];
    slides.push({
      id: `movie-${topMovie.id}`,
      type: 'movie',
      badge: '🎬 인기 영화',
      title: topMovie.title,
      description: topMovie.overview?.slice(0, 120) + '...' || '지금 가장 인기있는 영화를 만나보세요.',
      image: topMovie.posterPath,
      itemId: topMovie.id
    });
  }
  
  // 음악 인기 1위
  if (musics.value.length > 0) {
    const topMusic = musics.value[0];
    slides.push({
      id: `music-${topMusic.id}`,
      type: 'music',
      badge: '🎵 인기 음악',
      title: topMusic.albumName,
      description: `${topMusic.artistNames} · ${topMusic.albumType}`,
      image: topMusic.albumImageMedium,
      itemId: topMusic.id
    });
  }
  
  // 게임 인기 1위
  if (games.value.length > 0) {
    const topGame = games.value[0];
    slides.push({
      id: `game-${topGame.id}`,
      type: 'game',
      badge: '🎮 인기 게임',
      title: topGame.name,
      description: topGame.summary?.slice(0, 120) + '...' || '지금 가장 인기있는 게임을 만나보세요.',
      image: `${API_BASE_URL}${topGame.screenshotUrl}`,
      itemId: topGame.id
    });
  }
  
  return slides;
});

// 슬라이더 함수들
const startSlider = () => {
  stopSlider();
  sliderInterval.value = window.setInterval(() => {
    nextSlide();
  }, SLIDE_DURATION);
};

const stopSlider = () => {
  if (sliderInterval.value) {
    clearInterval(sliderInterval.value);
    sliderInterval.value = null;
  }
};

const nextSlide = () => {
  if (heroSlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length;
};

const prevSlide = () => {
  if (heroSlides.value.length === 0) return;
  currentSlide.value = (currentSlide.value - 1 + heroSlides.value.length) % heroSlides.value.length;
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  startSlider(); // 인디케이터 클릭 시 타이머 리셋
};

const handleSlideClick = (slide: HeroSlide) => {
  if (slide.type === 'movie') {
    incrementMoveClick(slide.itemId);
  } else if (slide.type === 'music') {
    incrementMusicClick(slide.itemId);
  } else if (slide.type === 'game') {
    incrementGameClick(slide.itemId);
  }
};

// 카드 클릭 핸들러
const handleCardClick = async (rowId: string, itemId: number) => {
  console.log(`Card clicked - rowId: ${rowId}, itemId: ${itemId}`);
  
  if (rowId === 'games') {
    await incrementGameClick(itemId);
  } else if (rowId === 'movies') {
    await incrementMoveClick(itemId);
  } else if (rowId === 'musics') {
    await incrementMusicClick(itemId);
  }
};

// 영화 클릭수 증가
const incrementMoveClick = async (moveId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/movie/${moveId}/click`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Click count updated:', result);
    
    await fetchMovies();
    
  } catch (err) {
    console.error('Failed to increment click count:', err);
  }
};

// 음악 클릭수 증가
const incrementMusicClick = async (musicId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/music/${musicId}/click`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Click count updated:', result);
    
    await fetchMusics();
    
  } catch (err) {
    console.error('Failed to increment click count:', err);
  }
};

// 게임 클릭수 증가
const incrementGameClick = async (gameId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/game/${gameId}/click`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Click count updated:', result);
    
    await fetchGames();
    
  } catch (err) {
    console.error('Failed to increment click count:', err);
  }
};

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
      movies.value = result.data as Movie[];
      console.log(`Successfully loaded ${result.data.length} movies`);
    } else {
      throw new Error(result.message || "데이터를 불러오는데 실패했습니다");
    }
  } catch (err) {
    console.error("Failed to fetch movies:", err);
    error.value = "영화 목록을 불러오는데 실패했습니다.";
  } finally {
    loading.value = false;
  }
};

// 음악 데이터 가져오기
const fetchMusics = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/music/main`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse = await response.json();
    
    if (result.status === 200 && result.data) {
      musics.value = result.data as Music[];
      console.log(`Successfully loaded ${result.data.length} musics`);
    } else {
      throw new Error(result.message || "데이터를 불러오는데 실패했습니다");
    }
  } catch (err) {
    console.error("Failed to fetch musics:", err);
    error.value = "음악 목록을 불러오는데 실패했습니다.";
  } finally {
    loading.value = false;
  }
};

// 게임 데이터 가져오기
const fetchGames = async () => {
  loading.value = true;
  error.value = "";
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/ingestion/game/main`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse = await response.json();
    
    if (result.status === 200 && result.data) {
      games.value = result.data as Game[];
      console.log(`Successfully loaded ${result.data.length} games`);
    } else {
      throw new Error(result.message || "데이터를 불러오는데 실패했습니다");
    }
  } catch (err) {
    console.error("Failed to fetch games:", err);
    error.value = "게임 목록을 불러오는데 실패했습니다.";
  } finally {
    loading.value = false;
  }
};

// 스크롤 함수들
const scrollLeft = (index: number) => {
  const container = rowRefs.value[index];
  if (container) {
    container.scrollBy({
      left: -container.clientWidth * 0.8,
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
  return scrollPositions.value[index] >= maxScroll - 10;
};

// 컴포넌트 마운트
onMounted(async () => {
  await Promise.all([fetchMovies(), fetchMusics(), fetchGames()]);
  startSlider();
});

onUnmounted(() => {
  stopSlider();
});

// 슬라이드 데이터 변경 시 슬라이더 시작
watch(heroSlides, (newSlides) => {
  if (newSlides.length > 0) {
    startSlider();
  }
});

// dtail 클릭
const detailClick = (slide: HeroSlide) => {
  // 라우터로 상세 페이지 이동
  if (slide.type === 'movie') {
    router.push(`/movie/${slide.itemId}`);
  } else if (slide.type === 'music') {
    router.push(`/music/${slide.itemId}`);
  } else if (slide.type === 'game') {
    router.push(`/game/${slide.itemId}`);
  }
};

// rows 데이터
const rows = computed(() => [
  {
    id: "movies",
    title: "당신을 위한 영화 추천",
    items: movies.value.map(movie => ({
      id: movie.id,
      posterPath: movie.posterPath,
      title: movie.title,
      voteAverage: movie.voteAverage
    }))
  },
  {
    id: "musics",
    title: "당신 취향의 음악 추천",
    items: musics.value.map(music => ({
      id: music.id,
      posterPath: music.albumImageMedium,
      title: music.albumName,
      voteAverage: null
    }))
  },
  {
    id: "games",
    title: "당신 취향의 게임 추천",
    items: games.value.map(game => ({
      id: game.id,
      posterPath: `${API_BASE_URL}${game.screenshotUrl}`,
      title: game.name,
      voteAverage: null
    }))
  }
]);
</script>

<style scoped>
.home-page {
  background: #0A0F1F;
  color: #fff;
  min-height: 100vh;
}

/* ==================== HERO SLIDER ==================== */
.hero-slider {
  position: relative;
  width: 100%;
  height: 75vh;
  min-height: 500px;
  overflow: hidden;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center top;
}

.slide-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(10, 15, 31, 0.95) 0%,
    rgba(10, 15, 31, 0.7) 40%,
    rgba(10, 15, 31, 0.3) 70%,
    transparent 100%
  ),
  linear-gradient(
    to top,
    #0A0F1F 0%,
    transparent 30%
  );
}

.slide-content {
  position: absolute;
  left: 60px;
  top: 50%;
  transform: translateY(-50%);
  max-width: 550px;
  z-index: 10;
}

.slide-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(0, 168, 155, 0.15);
  border: 1px solid rgba(0, 168, 155, 0.4);
  border-radius: 50px;
  font-size: 14px;
  font-weight: 500;
  color: #00A89B;
  margin-bottom: 20px;
  backdrop-filter: blur(10px);
}

.slide-title {
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 16px;
  color: #fff;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.slide-desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 28px;
}

.slide-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-play {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #00A89B;
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-play:hover {
  background: #00C4B4;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 168, 155, 0.4);
}

.btn-info {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);
}

.btn-info:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* 슬라이더 인디케이터 */
.slider-indicators {
  position: absolute;
  bottom: 40px;
  left: 60px;
  display: flex;
  gap: 8px;
  z-index: 20;
}

.indicator {
  width: 40px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 2px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.5);
}

.indicator.active {
  width: 60px;
  background: rgba(255, 255, 255, 0.3);
}

.indicator-progress {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #00A89B;
  animation: progress 5s linear forwards;
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

/* 슬라이더 화살표 */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 20;
  opacity: 0;
  backdrop-filter: blur(10px);
}

.hero-slider:hover .slider-arrow {
  opacity: 1;
}

.slider-arrow:hover {
  background: rgba(0, 168, 155, 0.8);
  border-color: #00A89B;
  transform: translateY(-50%) scale(1.1);
}

.slider-prev {
  left: 20px;
}

.slider-next {
  right: 20px;
}

.slider-arrow svg {
  width: 28px;
  height: 28px;
}

/* 하단 글로우 라인 */
.hero-glow-line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    #00A89B 20%, 
    #A7D7DE 50%, 
    #00A89B 80%, 
    transparent 100%
  );
  box-shadow: 0 0 20px rgba(0, 168, 155, 0.5);
}

/* 슬라이드 트랜지션 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: scale(1.05);
}

.slide-leave-to {
  opacity: 0;
}

/* ==================== LOADING & ERROR ==================== */
.loading, .error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(0, 168, 155, 0.2);
  border-top-color: #00A89B;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}

.error {
  color: #ff6b6b;
}

/* ==================== CATEGORY ROWS ==================== */
.category-row {
  margin-top: 40px;
  padding-bottom: 20px;
}

.row-title {
  font-size: 22px;
  font-weight: 600;
  margin-left: 60px;
  margin-bottom: 16px;
  color: #fff;
  position: relative;
  display: inline-block;
}

.row-title::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #00A89B, transparent);
  border-radius: 2px;
}

/* Row Wrapper */
.row-wrapper {
  position: relative;
  padding: 0 50px;
}

.row-container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 16px;
  padding: 16px 10px 24px 10px;
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
  height: 80%;
  background: linear-gradient(90deg, rgba(10, 15, 31, 0.95), transparent);
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

.scroll-btn-right {
  background: linear-gradient(-90deg, rgba(10, 15, 31, 0.95), transparent);
}

.row-wrapper:hover .scroll-btn {
  opacity: 1;
}

.scroll-btn:hover {
  color: #00A89B;
}

.scroll-btn.hidden {
  display: none;
}

.scroll-btn-left {
  left: 0;
}

.scroll-btn-right {
  right: 0;
}

.scroll-btn svg {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
}

/* ==================== CARD ==================== */
.card {
  position: relative;
  width: 200px;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover {
  transform: scale(1.08) translateY(-8px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(0, 168, 155, 0.2);
  border-color: rgba(0, 168, 155, 0.3);
  z-index: 10;
}

.card:hover::before {
  opacity: 1;
}

/* Card Overlay */
.card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px;
  transform: translateY(100%);
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card:hover .card-overlay {
  transform: translateY(0);
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 6px 0;
  color: #fff;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-rating {
  font-size: 13px;
  margin: 0;
  color: #00A89B;
  font-weight: 500;
}

/* ==================== RESPONSIVE ==================== */
@media (max-width: 768px) {
  .hero-slider {
    height: 60vh;
    min-height: 400px;
  }
  
  .slide-content {
    left: 24px;
    right: 24px;
    max-width: none;
  }
  
  .slide-title {
    font-size: 28px;
  }
  
  .slide-desc {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .slide-actions {
    flex-direction: column;
  }
  
  .btn-play, .btn-info {
    width: 100%;
    justify-content: center;
  }
  
  .slider-indicators {
    left: 24px;
    bottom: 24px;
  }
  
  .slider-arrow {
    display: none;
  }
  
  .row-title {
    margin-left: 24px;
    font-size: 18px;
  }
  
  .row-wrapper {
    padding: 0 16px;
  }
  
  .scroll-btn {
    display: none;
  }
  
  .card {
    width: 150px;
    height: 225px;
  }
}
</style>