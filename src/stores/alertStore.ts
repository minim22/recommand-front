import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore("alert", () => {
    const visible = ref(false);
    const message = ref("");

    const show = (msg: string) => {
        message.value = msg;
        visible.value = true;
    };

    const hide = () => {
        visible.value = false;
    };

    return { visible, message, show, hide };
});
