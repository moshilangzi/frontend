<template>
  <div class="flex flex-col h-full relative">
    <div class="flex-1 overflow-y-auto pb-28">
      <ChatMessageList />
    </div>
    <div class="absolute bottom-0 left-0 w-full bg-white p-4 border-t flex items-end gap-2 z-10">
      <VoiceButton @send-audio="handleSendAudio" />
      <InputBox @send="handleSend" @send-image="handleSendImage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '../store/message';
import { useInputStore } from '../store/input';
import { useSessionStore } from '../store/session';
import { storeToRefs } from 'pinia';
import ChatMessageList from './ChatMessageList.vue';
import InputBox from './InputBox.vue';
import VoiceButton from './VoiceButton.vue';
import { socketClient } from '../ws/socket';
import { onMounted, onUnmounted } from 'vue';

const messageStore = useMessageStore();
const inputStore = useInputStore();
const sessionStore = useSessionStore();
const { currentSessionId } = storeToRefs(sessionStore);

function handleSend(text: string) {
  if (!currentSessionId.value) return;
  const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
  const msg = {
    id,
    sender: 'user' as const,
    type: 'text' as const,
    content: text,
    timestamp: Date.now(),
    status: 'sending' as const,
  };
  messageStore.addMessage(currentSessionId.value, msg);
  socketClient.send('chat_message', { ...msg, sessionId: currentSessionId.value });
}

function handleSendImage(imgData: string) {
  if (!currentSessionId.value) return;
  const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
  const msg = {
    id,
    sender: 'user' as const,
    type: 'image' as const,
    content: imgData,
    timestamp: Date.now(),
    status: 'sending' as const,
  };
  messageStore.addMessage(currentSessionId.value, msg);
  socketClient.send('chat_message', { ...msg, sessionId: currentSessionId.value });
}

function handleSendAudio(audioData: string) {
  if (!currentSessionId.value) return;
  const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
  const msg = {
    id,
    sender: 'user' as const,
    type: 'audio' as const,
    content: audioData,
    timestamp: Date.now(),
    status: 'sending' as const,
  };
  messageStore.addMessage(currentSessionId.value, msg);
  socketClient.send('chat_message', { ...msg, sessionId: currentSessionId.value });
}

async function addAITTSReply(text: string) {
  // 生成 TTS 音频并插入 audio 消息
  if (!currentSessionId.value || !window.speechSynthesis) return;
  const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = 'zh-CN';
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks: BlobPart[] = [];
  mediaRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'audio/webm' });
    const reader = new FileReader();
    reader.onload = () => {
      const msg = {
        id,
        sender: 'ai' as const,
        type: 'audio' as const,
        content: reader.result as string,
        timestamp: Date.now(),
        status: 'sent' as const,
      };
      messageStore.addMessage(currentSessionId.value, msg);
      socketClient.send('chat_message', { ...msg, sessionId: currentSessionId.value });
    };
    reader.readAsDataURL(blob);
    stream.getTracks().forEach(track => track.stop());
  };
  mediaRecorder.start();
  window.speechSynthesis.speak(utter);
  setTimeout(() => { mediaRecorder.stop(); }, 1200);
}

function handleSocketMessage(msg: any) {
  if (!msg.sessionId || msg.sessionId !== currentSessionId.value) return;
  messageStore.addMessage(currentSessionId.value, {
    ...msg,
    sender: (msg.sender === 'user' ? 'user' : 'ai') as 'user' | 'ai',
    type: msg.type,
    status: 'sent',
    id: msg.id || (Date.now().toString() + Math.random().toString(36).slice(2, 8)),
    timestamp: msg.timestamp || Date.now(),
  });
  if (msg.sender === 'ai' && msg.type === 'text') {
    addAITTSReply(msg.content);
  }
}

function handleStatusUpdate({ id, status, sessionId }: { id: string; status: string; sessionId: string }) {
  if (!id || !status || sessionId !== currentSessionId.value) return;
  if (["sending", "sent", "read", "failed", "recalled"].includes(status)) {
    messageStore.updateMessageStatus(currentSessionId.value, id, status as any);
  }
}

function handleEditMessage({ id, content, sessionId }: { id: string; content: string; sessionId: string }) {
  if (!id || !sessionId || sessionId !== currentSessionId.value) return;
  messageStore.editMessageExternal(currentSessionId.value, id, content);
}
function handleRecallMessage({ id, sessionId }: { id: string; sessionId: string }) {
  if (!id || !sessionId || sessionId !== currentSessionId.value) return;
  messageStore.recallMessageExternal(currentSessionId.value, id);
}

onMounted(() => {
  socketClient.on('chat_message', handleSocketMessage);
  socketClient.on('message_status', handleStatusUpdate);
  socketClient.on('edit_message', handleEditMessage);
  socketClient.on('recall_message', handleRecallMessage);
});
onUnmounted(() => {
  socketClient.off('chat_message', handleSocketMessage);
  socketClient.off('message_status', handleStatusUpdate);
  socketClient.off('edit_message', handleEditMessage);
  socketClient.off('recall_message', handleRecallMessage);
});

function getAIReply(userText: string): string {
  // 简单模拟，可扩展为更复杂逻辑
  const replies = [
    '你好！很高兴为你服务。',
    '你刚才说：' + userText,
    '请详细描述你的需求。',
    '收到！我们会尽快处理。',
    '这是AI的自动回复示例。'
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
</script> 