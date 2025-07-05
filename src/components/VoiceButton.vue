<template>
  <button @click="toggle" class="arco-btn" :class="isRecording ? 'arco-btn-danger' : 'arco-btn-secondary'">
    <span v-if="isRecording">录音中...点击停止</span>
    <span v-else>🎤 语音</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useInputStore } from '../store/input';
const inputStore = useInputStore();
const { isRecording } = storeToRefs(inputStore);
const emit = defineEmits(['send-audio']);

let mediaRecorder: MediaRecorder | null = null;
let chunks: BlobPart[] = [];

async function toggle() {
  if (isRecording.value) {
    stopRecording();
  } else {
    await startRecording();
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];
    mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onload = () => {
        emit('send-audio', reader.result as string);
      };
      reader.readAsDataURL(blob);
      stream.getTracks().forEach(track => track.stop());
    };
    mediaRecorder.start();
    inputStore.setRecording(true);
  } catch (e) {
    alert('无法访问麦克风');
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    inputStore.setRecording(false);
  }
}
</script> 