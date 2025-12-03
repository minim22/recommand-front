<template>
  <LoadingOverlay />
  <AlertModal />
  <ConfirmModal />
  <ToastList />
</template>

<script setup lang="ts">
import LoadingOverlay from "@/components/ui/LoadingOverlay.vue";
import AlertModal from "@/components/ui/AlertModal.vue";
import ConfirmModal from "@/components/ui/ConfirmModal.vue";
import ToastList from "@/components/ui/ToastList.vue";
</script>
