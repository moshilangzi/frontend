<template>
  <div class="w-56 bg-white border-r h-full flex flex-col">
    <div class="flex items-center justify-between p-3 border-b">
      <span class="font-bold">{{ $t('session_list') }}</span>
      <button class="arco-btn arco-btn-primary arco-btn-sm" @click="addSession">{{ $t('new_session') }}</button>
    </div>
    <div class="flex-1 overflow-y-auto">
      <ul>
        <li v-for="s in sessions" :key="s.id" :class="['p-3 cursor-pointer flex justify-between items-center', s.id === currentSessionId ? 'bg-blue-50' : '']">
          <span @click="setCurrentSession(s.id)">{{ s.name }}</span>
          <button class="arco-btn arco-btn-text arco-btn-xs text-red-500" @click.stop="removeSession(s.id)">{{ $t('delete') }}</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '../store/session';
import { storeToRefs } from 'pinia';
const sessionStore = useSessionStore();
const { sessions, currentSessionId } = storeToRefs(sessionStore);

function addSession() {
  const name = prompt('请输入会话名称') || '新会话';
  sessionStore.addSession(name);
}
function setCurrentSession(id: string) {
  sessionStore.setCurrentSession(id);
}
function removeSession(id: string) {
  if (confirm('确定删除该会话？')) sessionStore.removeSession(id);
}
</script> 