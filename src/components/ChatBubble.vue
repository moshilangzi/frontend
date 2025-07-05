<template>
  <div :class="['flex mb-2', isUser ? 'justify-end' : 'justify-start']">
    <div :class="['max-w-xs break-words rounded-lg px-4 py-2 shadow',
      isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800']">
      <div v-if="msg.type === 'text'">
        <template v-if="editing">
          <input v-model="editText" class="arco-input w-32 mr-2" />
          <button class="arco-btn arco-btn-xs arco-btn-primary" @click.stop="onEditSave">保存</button>
          <button class="arco-btn arco-btn-xs arco-btn-secondary" @click.stop="() => editing = false">取消</button>
        </template>
        <template v-else>
          <span v-if="msg.status !== 'recalled'" v-html="highlight(msg.content)"></span>
          <span v-else class="italic text-gray-400">（已撤回）</span>
          <template v-if="isUser && msg.status !== 'recalled' && msg.status !== 'failed'">
            <button class="ml-2 text-xs text-blue-200 hover:underline" @click.stop="onEdit">编辑</button>
            <button class="ml-1 text-xs text-red-200 hover:underline" @click.stop="onRecall">撤回</button>
          </template>
        </template>
      </div>
      <div v-else-if="msg.type === 'image'">
        <img :src="msg.content" alt="图片消息" class="max-h-48 rounded" />
      </div>
      <div v-else-if="msg.type === 'audio'">
        <audio :src="msg.content" controls class="w-48" />
      </div>
      <div v-else-if="msg.type === 'system'" class="text-center text-gray-400 text-sm my-2">{{ msg.content }}</div>
      <!-- 预留：语音、表情、动作等类型 -->
      <div class="text-xs mt-1 flex justify-between opacity-70">
        <span>{{ timeStr }}</span>
        <span v-if="isUser">{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, ref } from 'vue';
import type { Message } from '../store/message';
import { useMessageStore } from '../store/message';
import { useSessionStore } from '../store/session';
import { storeToRefs } from 'pinia';
const props = defineProps<{ msg: Message, search?: string }>();
const isUser = computed(() => props.msg.sender === 'user');
const timeStr = computed(() => new Date(props.msg.timestamp).toLocaleTimeString());
const statusText = computed(() => {
  if (props.msg.status === 'read') {
    if (isUser.value) return '对方已读';
    else return '已读';
  }
  switch (props.msg.status) {
    case 'sending': return '发送中';
    case 'sent': return '已发送';
    case 'failed': return '失败';
    case 'recalled': return '已撤回';
    default: return '';
  }
});

function speakTTS(text: string) {
  if (!window.speechSynthesis) return;
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  window.speechSynthesis.speak(utter);
}

function highlight(text: string) {
  if (!props.search || !props.search.trim()) return text;
  const reg = new RegExp(`(${props.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(reg, '<mark>$1</mark>');
}

const editing = ref(false);
const editText = ref('');
const messageStore = useMessageStore();
const sessionStore = useSessionStore();
const { currentSessionId } = storeToRefs(sessionStore);
function onEdit() {
  editing.value = true;
  editText.value = props.msg.content;
}
function onEditSave() {
  messageStore.editMessage(currentSessionId.value, props.msg.id, editText.value);
  editing.value = false;
}
function onRecall() {
  messageStore.recallMessage(currentSessionId.value, props.msg.id);
}

watch(() => props.msg, (msg) => {
  if (msg.sender === 'ai' && msg.type === 'text') {
    speakTTS(msg.content);
  }
}, { immediate: true });
</script>

<style scoped>
.max-w-xs { max-width: 20rem; }
.max-h-48 { max-height: 12rem; }
</style> 