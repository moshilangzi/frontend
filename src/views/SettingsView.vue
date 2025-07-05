<template>
  <div class="max-w-lg mx-auto mt-8 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">{{ $t('user_settings') }}</h2>
    <div class="mb-4 flex gap-2 items-center">
      <span>语言：</span>
      <select v-model="$i18n.locale" class="arco-input w-32">
        <option value="zh">中文</option>
        <option value="en">English</option>
      </select>
    </div>
    <div v-if="!loggedIn">
      <input v-model="nickname" type="text" class="arco-input mb-2" :placeholder="$t('login')" />
      <button class="arco-btn arco-btn-primary w-full" @click="login">{{ $t('login') }}</button>
    </div>
    <div v-else>
      <div class="mb-2">{{ $t('current_user') }}：<span class="font-semibold">{{ user.nickname }}</span></div>
      <button class="arco-btn arco-btn-secondary w-full mb-2" @click="logout">{{ $t('logout') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../store/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();
const { user, loggedIn } = storeToRefs(userStore);
const nickname = ref('');
function login() {
  if (!nickname.value.trim()) return;
  userStore.login(nickname.value.trim());
  nickname.value = '';
}
function logout() {
  userStore.logout();
}
</script>

<style scoped>
</style> 