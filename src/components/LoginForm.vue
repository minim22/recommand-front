<template>
  <div class="login-bg">
    <div class="login-card">
      <h2 class="title">로그인</h2>

      <!-- 일반 로그인 -->
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input v-model="email" type="email" placeholder="이메일 입력" />
        </div>

        <div class="form-group">
          <input v-model="password" type="password" placeholder="비밀번호 입력" />
        </div>

        <button class="btn primary" type="submit">로그인</button>
      </form>

      <div class="divider">또는</div>

      <button class="btn google" @click="loginWithGoogle">Google 로그인</button>
      <button class="btn kakao" @click="loginWithKakao">Kakao 로그인</button>
    </div>

    <div class="goto-register">
      아직 계정이 없으신가요?
      <span @click="goRegister">회원가입</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = () => {}
const loginWithGoogle = () => {}
const loginWithKakao = () => {}

const goRegister = () => {
  router.push('/register')
}

</script>

<style scoped>
/* 전체 배경 - 영화/게임 플랫폼 스타일 */
/* 라이트 배경 */
.login-bg {
  min-height: 100vh;
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

/* 화이트 카드 */
.login-card {
  width: 360px;
  padding: 32px 28px;
  border-radius: 18px;
  background: #ffffff;
  backdrop-filter: blur(0px);
  border: 1px solid #e6e6e6;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #333;
}

/* input 필드 */
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
  transition: 0.2s;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #aaa;
}

.form-group input:focus {
  border-color: #7A5CFF;
  box-shadow: 0 0 4px rgba(122, 92, 255, 0.25);
  outline: none;
}

/* 기본 버튼 */
.btn {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  padding: 0;
  font-size: 15px;
  margin-bottom: 12px;
  cursor: pointer;
  border: none;
}

/* 기본 로그인 버튼: 라이트 테마용 새 컬러 */
.btn.primary {
  background: linear-gradient(90deg, #7A5CFF, #9D7BFF);
  color: #fff;
  box-shadow: 0 3px 10px rgba(122, 92, 255, 0.25);
}

/* 구글 버튼 */
.btn.google {
  background: #DB4437;
  color: #fff;
  box-shadow: 0 3px 10px rgba(219, 68, 55, 0.25);
}

/* 카카오 버튼 */
.btn.kakao {
  background: #FEE500;
  color: #3A1E1D;
  box-shadow: 0 3px 10px rgba(254, 229, 0, 0.25);
}

/* Divider */
.divider {
  text-align: center;
  color: #777;
  margin: 16px 0;
  font-size: 14px;
}

/* 회원가입 링크 */
.goto-register {
  margin-top: 16px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.goto-register span {
  margin-left: 6px;
  color: #7A5CFF;
  cursor: pointer;
  font-weight: 500;
}
</style>