<template>
  <div class="toast-container">
    <transition-group name="slide-fade">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useToastStore } from "@/stores/toastStore";

const { toasts } = storeToRefs(useToastStore());
</script>

<style scoped>
.toast-container {
  position: fixed;
  right: 20px;
  bottom: 24px;
  z-index: 9100;
}

.toast-item {
  background: #333;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  margin-top: 8px;
  min-width: 200px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}

/* 애니메이션 */
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-enter-active {
  transition: all .25s ease;
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
.slide-fade-leave-active {
  transition: all .25s ease;
}
</style>
