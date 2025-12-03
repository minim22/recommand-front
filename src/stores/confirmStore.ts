import { defineStore } from "pinia";
import { ref } from "vue";

export const useConfirmStore = defineStore("confirm", () => {
    const visible = ref(false);
    const message = ref("");
    let resolver: (value: boolean) => void;

    const show = (msg: string) => {
        message.value = msg;
        visible.value = true;

        return new Promise<boolean>((resolve) => {
        resolver = resolve;
        });
    };

    const resolve = (value: boolean) => {
        visible.value = false;
        resolver(value);
    };

    return { visible, message, show, resolve };
    });
