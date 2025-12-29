<template>
  <div class="signup-bg">
    <div class="signup-card">
      <h2 class="title">회원가입</h2>

      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <input 
            v-model="email"
            type="email"
            placeholder="이메일 입력"
            required
          />
        </div>

        <div class="form-group">
          <input 
            v-model="password"
            type="password"
            placeholder="비밀번호 입력"
            required
          />
        </div>

        <div class="form-group">
          <input 
            v-model="passwordConfirm"
            type="password"
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <button class="btn primary" type="submit">
          회원가입
        </button>

        <div class="goto-login">
          이미 계정이 있으신가요?
          <span @click="goLogin">로그인하기</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from "vue";
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

// API 기본 URL
const API_BASE_URL = "http://localhost:12100";

const goLogin = () => {
  router.push('/login')
}

const handleRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) throw new Error("회원가입 실패");

    alert("회원가입 완료! 로그인해주세요.");
    router.push('/login'); // 가입 성공 후 로그인 페이지로 이동
  } catch (e) {
    console.error(e);
    alert("회원가입에 실패했습니다.");
  }
};
</script>

<style scoped>
/* 로그인 페이지와 동일한 라이트 배경 설정 */
.signup-bg {
  height: 100vh;           /* 고정 높이 */
  width: 100vw;            /* 고정 너비 */
  background: #F5F5F5;     /* 라이트 그레이 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;  /* 패딩이 높이에 영향을 주지 않도록 설정 */
  overflow: hidden;        /* 세로 스크롤 방지 */
}

/* 화이트 카드 스타일 */
.signup-card {
  width: 360px;
  padding: 32px 28px;
  border-radius: 18px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: fadeIn .6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #333; /* 어두운 텍스트 */
}

/* input 필드 스타일 통일 */
.form-group input {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  color: #333;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;
  transition: 0.2s;
}

.form-group input:focus {
  border-color: #7A5CFF;
  box-shadow: 0 0 4px rgba(122, 92, 255, 0.25);
  outline: none;
}

.form-group input::placeholder {
  color: #aaa;
}

/* 버튼 스타일 통일 (로그인 페이지와 같은 그라데이션) */
.btn {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
}

.btn.primary {
  background: linear-gradient(90deg, #7A5CFF, #9D7BFF);
  color: #fff;
  box-shadow: 0 3px 10px rgba(122, 92, 255, 0.25);
}

/* 로그인 이동 링크 */
.goto-login {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.goto-login span {
  margin-left: 6px;
  color: #7A5CFF;
  cursor: pointer;
  font-weight: 500;
}
</style>