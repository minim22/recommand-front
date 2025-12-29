<template>
    <header class="app-header">
        <div class="header-inner">

            <!-- 로고 -->
            <div class="logo" @click="goHome">
            <img
                src="@/assets/logo.png"
                alt="PREFIND Logo"
                class="logo-image"
            />
        </div>

        <!-- 네비게이션 (로그인 후 표시 가능) -->
        <nav v-if="isLoggedIn" class="nav">
            <button @click="goTo('movies')">영화</button>
            <button @click="goTo('music')">음악</button>
            <button @click="goTo('games')">게임</button>
            <button @click="goTo('profile')">내 정보</button>
        </nav>

        <!-- 우측 사용자영역 -->
        <div class="user-area">
            <button v-if="!isLoggedIn" class="login-btn" @click="goLogin">로그인</button>

            <div v-else class="user-info">
                <span class="user-name">{{ username }} 님</span>
                <button class="logout-btn" @click="logout">로그아웃</button>
            </div>
            </div>

        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

// 로그인 여부
const isLoggedIn = computed(() => userStore.isLoggedIn);
const username = computed(() => userStore.username);

// 이동 함수
const goHome = () => router.push("/");
const goLogin = () => router.push("/login");
const goTo = (path: string) => router.push(`/${path}`);

// 로그아웃
const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.app-header {
  width: 100%;
  background: #181818;
  color: #fff;
  border-bottom: 1px solid #333;
  padding: 5px 0;
}

.header-inner {
  max-width: 100%;
  height: 50px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* 로고 */
.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-image {
  height: 50px; /* 원하는 크기로 조정 */
  object-fit: contain;
}

.logo-text {
  font-weight: 700;
  font-size: 18px;
}

/* 네비 */
.nav button {
  background: transparent;
  color: #ddd;
  margin-right: 16px;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.nav button:hover {
  color: #fff;
}

/* 사용자 영역 */
.user-area {
  display: flex;
  align-items: center;
}

.login-btn,
.logout-btn {
  background: #444;
  border: 1px solid #555;
  padding: 6px 12px;
  border-radius: 4px;
  color: #ddd;
  cursor: pointer;
}

.login-btn:hover,
.logout-btn:hover {
  background: #666;
}

/* username */
.user-name {
  margin-right: 12px;
  font-size: 14px;
}
</style>