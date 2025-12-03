import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useUserStore = defineStore("user", () => {
    // 상태값
    const token = ref<string | null>(localStorage.getItem("token"));
    const username = ref<string>(localStorage.getItem("username") || "");

    // 로그인 여부 계산
    const isLoggedIn = computed(() => Boolean(token.value));

    // 로그인 처리
    const login = (userToken: string, userName: string) => {
        token.value = userToken;
        username.value = userName;

        // localStorage 반영
        localStorage.setItem("token", userToken);
        localStorage.setItem("username", userName);
    };

    // 로그아웃 처리
    const logout = () => {
        token.value = null;
        username.value = "";

        localStorage.removeItem("token");
        localStorage.removeItem("username");
    };

    return {
        token,
        username,
        isLoggedIn,
        login,
        logout,
    };
});
