<template>
  <!-- 전역 로딩 오버레이 -->
  <LoadingOverlay />

  <!-- 알림 모달 -->
  <AlertModal />

  <!-- 확인 모달 -->
  <ConfirmModal />

  <!-- 토스트 알림 -->
  <ToastList />
</template>

<script setup lang="ts">
/**
 * 금융/대기업 전역 UI 구성 패턴
 * - 모든 전역 UI는 1개 Container에 모아두기
 * - Layout 내부에서 렌더링 → App.vue는 최소화
 * - import 단일화로 유지보수성 강화
 */

import LoadingOverlay from "@/components/common/LoadingOverlay.vue";
import AlertModal from "@/components/common/AlertModal.vue";
import ConfirmModal from "@/components/common/ConfirmModal.vue";
import ToastList from "@/components/common/ToastList.vue";
</script>

<style scoped>
/* 필요한 스타일이 없다면 비워도 됨 */
</style>