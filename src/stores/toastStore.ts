import { defineStore } from "pinia";
import { ref } from "vue";

interface Toast {
    id: number;
    message: string;
}

export const useToastStore = defineStore("toast", () => {
    const toasts = ref<Toast[]>([]);

    const push = (message: string) => {
        const id = Date.now();
        toasts.value.push({ id, message });

        setTimeout(() => remove(id), 2500);
    };

    const remove = (id: number) => {
        toasts.value = toasts.value.filter(t => t.id !== id);
    };

    return { toasts, push, remove };
});
