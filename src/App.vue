<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";

// UI Pack
import GlobalUIContainer from "@/components/ui/GlobalUIContainer.vue";

defineProps({
  showDevBanner: Boolean
});

</script>

<template>
  <AppHeader />
  <router-view />
  <AppFooter />

  <DevBanner v-if="showDevBanner" />

  <!-- UI 컴포넌트 -->
  <GlobalUIContainer />
</template>