<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-box">
        <h3 class="title">알림</h3>
        <p class="message">{{ message }}</p>

        <button class="btn" @click="close">확인</button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useAlertStore } from "@/stores/alertStore";

const alertStore = useAlertStore();
const { visible, message } = storeToRefs(alertStore);

const close = () => alertStore.hide();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
}

.modal-box {
  background: #fff;
  padding: 24px 32px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.title {
  margin: 0;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: 600;
}

.message {
  margin-bottom: 20px;
  font-size: 15px;
  color: #444;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn:hover {
  background: #2563eb;
}
</style>
