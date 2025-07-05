<template>
  <div class="h-full min-h-[calc(100vh-64px)] w-full flex flex-row bg-gradient-to-r from-blue-50 to-purple-100 p-4 gap-4 rounded-xl shadow-lg">
    <!-- 左侧：历史会话列表 -->
    <div class="w-[15%] min-w-[180px] max-w-[240px] h-full flex flex-col">
      <div class="flex-1 bg-white/90 rounded-2xl shadow-lg p-2 flex flex-col overflow-y-auto hover:shadow-2xl transition-shadow duration-200 h-full">
        <SessionSidebar class="w-full h-full" />
      </div>
    </div>
    <!-- 中间：数字人展示区（最大化、渐变卡片） -->
    <div class="flex-1 h-full flex flex-col items-center justify-center">
      <div class="w-full h-full bg-gradient-to-br from-white via-blue-50 to-purple-100 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-0 border border-blue-100 hover:shadow-3xl transition-shadow duration-200 h-full">
        <AvatarRenderer class="w-full h-full rounded-2xl" />
      </div>
    </div>
    <!-- 右侧：聊天输入与消息区，输入框固定底部 -->
    <div class="w-[28%] min-w-[320px] max-w-[480px] h-full flex flex-col">
      <div class="relative flex-1 bg-white/95 rounded-2xl shadow-lg flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-200 h-full">
        <ChatArea class="flex-1 h-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatArea from '../components/ChatArea.vue';
import SessionSidebar from '../components/SessionSidebar.vue';
import AvatarRenderer from '../three/AvatarRenderer.vue';
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(90deg, #f0f6ff 0%, #e0c3fc 100%);
}
.bg-gradient-to-br {
  background: linear-gradient(135deg, #fff 0%, #f0f6ff 60%, #e0c3fc 100%);
}
::-webkit-scrollbar {
  width: 8px;
  background: #f0f6ff;
}
::-webkit-scrollbar-thumb {
  background: #e0e7ef;
  border-radius: 4px;
}
</style> 