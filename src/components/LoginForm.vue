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
        <button class="btn google gsi-material-button">
          <div class="gsi-material-button-state"></div>
          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlns:xlink="http://www.w3.org/1999/xlink" style="display: block;">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span class="gsi-material-button-contents">Google 로그인</span>
            <span style="display: none;">Google 로그인</span>
          </div>
        </button>
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
  height: 100vh;           /* 고정 높이 */
  width: 100vw;            /* 고정 너비 */
  background: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;           /* 패딩을 약간 줄여서 카드 위아래 여유 확보 */
  box-sizing: border-box;  /* 패딩이 높이에 포함되도록 설정 */
  overflow: hidden;        /* 내부 요소가 넘쳐도 스크롤 생성 방지 */
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
.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: #f2f2f2;
  background-image: none;
  border: none;
  -webkit-border-radius: 4px;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 46px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: 100%;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 10px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
}

.gsi-material-button:disabled .gsi-material-button-state {
  background-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state, 
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #001d35;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #001d35;
  opacity: 8%;
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