<template>
  <div class="flex items-center gap-2">
    <input
      v-model="inputText"
      @keyup.enter="onSend"
      type="text"
      class="flex-1 border rounded px-3 py-2 focus:outline-none"
      placeholder="请输入消息..."
      :disabled="disabled"
    />
    <input type="file" accept="image/*" class="hidden" ref="fileInput" @change="onFileChange" />
    <button @click="triggerFile" :disabled="disabled" class="arco-btn arco-btn-secondary">图片</button>
    <button @click="onSend" :disabled="disabled || !inputText.trim()" class="arco-btn arco-btn-primary">发送</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useInputStore } from '../store/input';
const inputStore = useInputStore();
const { inputText } = storeToRefs(inputStore);
const emit = defineEmits(['send', 'send-image']);
const props = defineProps<{ disabled?: boolean }>();
const fileInput = ref<HTMLInputElement | null>(null);

function onSend() {
  if (!inputText.value.trim() || props.disabled) return;
  emit('send', inputText.value);
  inputStore.clearInput();
}
function triggerFile() {
  fileInput.value?.click();
}
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files || !files[0]) return;
  const file = files[0];
  const reader = new FileReader();
  reader.onload = () => {
    emit('send-image', reader.result as string);
  };
  reader.readAsDataURL(file);
  fileInput.value!.value = '';
}
</script> 