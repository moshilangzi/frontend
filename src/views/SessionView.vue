<template>
  <div class="h-full flex flex-row">
    <SessionSidebar />
    <div class="flex-1 h-full">
      <ChatArea class="h-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatArea from '../components/ChatArea.vue';
import SessionSidebar from '../components/SessionSidebar.vue';
</script>

<style scoped>
</style> 