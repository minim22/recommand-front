<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-copy">
        © {{ year }} 콘텐츠 취향 추천 플랫폼. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";

const year = computed(() => new Date().getFullYear());
</script>

<style scoped>
.app-footer {
  width: 100%;
  padding: 16px;
  background: #111;
  color: #ddd;
  border-top: 1px solid #333;
  display: flex;
  justify-content: center;
}

.footer-inner {
  font-size: 13px;
  opacity: 0.8;
}

.footer-copy {
  text-align: center;
}
</style>
