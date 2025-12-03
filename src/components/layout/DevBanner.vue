<template>
  <div class="dev-banner">
    <span>🚧 DEVELOPMENT MODE</span>
  </div>
</template>

<script setup lang="ts">
/**
 * Dev 환경에서만 보여줄 배너
 * - Layout에서 v-if 조건으로 렌더됨
 * - 컴포넌트 자체는 단순한 표시만 함
 */
</script>

<style scoped>
.dev-banner {
  width: 100%;
  padding: 8px 12px;
  background: rgba(255, 193, 7, 0.9);
  color: #000;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #e8b400;
}
</style>
