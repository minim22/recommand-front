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
          <span @click="$emit('go-login')">로그인하기</span>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const handleRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    });

    if (!response.ok) throw new Error("회원가입 실패");

    await response.json();
    alert("회원가입 완료! 로그인해주세요.");
  } catch (e) {
    console.error(e);
    alert("회원가입에 실패했습니다.");
  }
};
</script>

<style scoped>

/* 로그인 화면과 동일한 스타일 */
.signup-bg {
  min-height: 100vh;
  background: radial-gradient(circle at 20% 20%, #1b1b1d, #0d0d0e 70%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.signup-card {
  width: 360px;
  padding: 32px 28px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.45);
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
  color: #fff;
}

/* input */
.form-group input {
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #eee;
  font-size: 14px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.form-group input::placeholder {
  color: #aaa;
}

/* 버튼 */
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
  background: linear-gradient(90deg, #4C8BFF, #7A5CFF);
  color: #fff;
  box-shadow: 0 0 12px rgba(76, 139, 255, 0.45);
}

/* 로그인으로 이동 링크 */
.goto-login {
  text-align: center;
  color: #aaa;
  font-size: 14px;
}

.goto-login span {
  margin-left: 6px;
  color: #7A5CFF;
  cursor: pointer;
  font-weight: 500;
}
</style>