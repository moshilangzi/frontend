<template>
  <div class="flex flex-col h-full">
    <div class="flex items-center gap-2 mb-2">
      <input v-model="searchText" type="text" class="arco-input w-48" placeholder="搜索消息..." />
      <select v-model="filterType" class="arco-input w-32">
        <option value="">全部类型</option>
        <option value="text">文本</option>
        <option value="image">图片</option>
        <option value="audio">音频</option>
        <option value="system">系统</option>
      </select>
    </div>
    <div class="flex-1 overflow-y-auto px-4 py-2" ref="listRef">
      <ChatBubble v-for="msg in filteredMessages" :key="msg.id" :msg="msg" :search="searchText" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useMessageStore } from '../store/message';
import { useSessionStore } from '../store/session';
import ChatBubble from './ChatBubble.vue';
import { socketClient } from '../ws/socket';

const messageStore = useMessageStore();
const sessionStore = useSessionStore();
const { currentSessionId } = storeToRefs(sessionStore);
const searchText = ref('');
const filterType = ref('');
const messages = computed(() => messageStore.getMessages(currentSessionId.value));
const filteredMessages = computed(() => {
  return messages.value.filter(m => {
    const typeMatch = !filterType.value || m.type === filterType.value;
    const textMatch = !searchText.value || (m.type === 'text' && m.content.includes(searchText.value)) || (m.type !== 'text' && m.type !== 'audio' && m.content.includes(searchText.value));
    return typeMatch && textMatch;
  });
});
const listRef = ref<HTMLElement | null>(null);

watch(messages, async (newMsgs) => {
  await nextTick();
  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight;
  }
  // 自动上报已读回执
  newMsgs.forEach(msg => {
    if (msg.sender === 'ai' && msg.status !== 'read') {
      messageStore.updateMessageStatus(currentSessionId.value, msg.id, 'read');
      socketClient.send('message_status', { id: msg.id, status: 'read', sessionId: currentSessionId.value });
    }
  });
});
</script> 