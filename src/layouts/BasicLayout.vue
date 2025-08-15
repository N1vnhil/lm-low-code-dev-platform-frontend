<script setup lang="ts">
import GlobalHeader from '@/components/layout/GlobalHeader.vue'
import GlobalFooter from '@/components/layout/GlobalFooter.vue'
</script>

<template>
  <a-layout class="layout">
    <GlobalHeader />

    <a-layout-content class="content">
      <RouterView />
    </a-layout-content>

    <GlobalFooter />
  </a-layout>
</template>

<style scoped>
.layout {
  min-height: 100vh;
}

.content {
  padding: 24px;
  min-height: 280px;
  background: #fff;
}

@media (max-width: 768px) {
  .content {
    padding: 12px;
  }
}
</style>
