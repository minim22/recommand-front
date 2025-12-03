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

    <!-- Category Rows -->
    <section
      v-for="row in rows"
      :key="row.title"
      class="category-row"
    >
      <h2 class="row-title">{{ row.title }}</h2>

      <div class="row-container">
        <div
          v-for="item in row.items"
          :key="item.id"
          class="card"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const heroTitle = "당신의 취향을 위한 콘텐츠 탐색";
const heroDescription =
  "영화 · 음악 · 게임 기반 개인 맞춤형 추천 플랫폼";

// 블루톤 배너 이미지 (실제 이미지로 교체 가능)
const heroImage = "https://i.imgur.com/Vv2NY1j.jpeg";

const heroStyle = `background-image: url('${heroImage}')`;

const rows = [
  {
    id: "movies",
    title: "당신을 위한 영화 추천",
    items: [
        { id: 1, image: "https://media.themoviedb.org/t/p/w220_and_h330_face/mpOQpOKdo2XJnTqRzo1lTmDNsc1.jpg" },
        { id: 2, image: "https://picsum.photos/id/1025/300/450" },
        { id: 3, image: "https://picsum.photos/id/1035/300/450" }
    ]
  },
  {
    id: "music",
    title: "새로운 음악 탐색",
    items: [
      { id: 4, image: "https://i.imgur.com/Xw5T0zQ.jpeg" },
      { id: 5, image: "https://i.imgur.com/jwqG4Lf.jpeg" },
      { id: 6, image: "https://i.imgur.com/3V0vM7L.jpeg" }
    ]
  },
  {
    id: "games",
    title: "당신 취향의 게임 추천",
    items: [
      { id: 7, image: "https://i.imgur.com/zhMlFxJ.jpeg" },
      { id: 8, image: "https://i.imgur.com/Oe0hJbX.jpeg" },
      { id: 9, image: "https://i.imgur.com/cQ4Hxtc.jpeg" }
    ]
  }
];
</script>

<style scoped>
.home-page {
  background: #0A0F1F;
  color: #fff;
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
  color: #A7D7DE; /* text mint */
}

.hero p {
  font-size: 18px;
  opacity: 0.85;
  margin-bottom: 20px;
}

/* Primary Button */
.hero-btn {
  padding: 12px 24px;
  background: #00A89B;      /* primary */
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  transition: background 0.2s ease;
}

.hero-btn:hover {
  background: #0E6463;      /* primary dark */
}

/* Rows */
.category-row {
  margin-top: 30px;
}

.row-title {
  font-size: 20px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 10px;
  color: #A7D7DE;            /* mint title */
}

.row-container {
  display: flex;
  overflow-x: auto;
  gap: 12px;
  padding-left: 20px;
  padding-bottom: 10px;
  scrollbar-width: none;
}

.row-container::-webkit-scrollbar {
  display: none;
}

.card {
  width: 210px;
  height: 310px;
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  transition: transform 0.25s ease-out, box-shadow 0.25s ease-out;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 20px rgba(166, 242, 196, 0.6); /* accent glow */
}

</style>