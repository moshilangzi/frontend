<template>
  <div class="flex flex-col items-center">
    <video ref="videoRef" autoplay playsinline class="w-64 h-48 bg-black rounded mb-2" />
    <div class="flex gap-2">
      <button class="arco-btn arco-btn-primary" @click="start">开启音视频</button>
      <button class="arco-btn arco-btn-secondary" @click="stop">关闭</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { localStream } from '../utils/webrtc';
const videoRef = ref<HTMLVideoElement | null>(null);

async function start() {
  const stream = await localStream.start(true, true);
  if (videoRef.value) videoRef.value.srcObject = stream;
}
function stop() {
  localStream.stop();
  if (videoRef.value) videoRef.value.srcObject = null;
}
onUnmounted(stop);
</script> 