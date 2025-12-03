<template>
  <transition name="fade">
    <div v-if="visible" class="modal-overlay">
      <div class="modal-box">
        <h3 class="title">확인</h3>
        <p class="message">{{ message }}</p>

        <div class="actions">
          <button class="btn cancel" @click="cancel">취소</button>
          <button class="btn confirm" @click="confirm">확인</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useConfirmStore } from "@/stores/confirmStore";

const confirmStore = useConfirmStore();
const { visible, message } = storeToRefs(confirmStore);

const confirm = () => confirmStore.resolve(true);
const cancel = () => confirmStore.resolve(false);
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
  width: 360px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15);
}

.title {
  font-size: 18px;
  margin-bottom: 12px;
}

.message {
  margin-bottom: 24px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn {
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.cancel {
  background: #ddd;
}

.confirm {
  background: #3b82f6;
  color: white;
}
</style>
