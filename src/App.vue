<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
const router = useRouter();
const route = useRoute();
const activeMenu = ref(route.path);
watch(() => route.path, (val) => { activeMenu.value = val; });
function onMenuClick(key: string) {
  router.push(key);
}
</script>

<template>
  <a-layout class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
    <a-layout-header class="bg-white shadow flex items-center justify-between px-8 rounded-b-2xl">
      <div class="text-2xl font-extrabold tracking-wide text-purple-700 flex items-center gap-2">
        <span style="font-size:2rem;">🤖</span> OpenAvatarChat
      </div>
      <a-menu mode="horizontal" :selected-keys="[activeMenu]" @menu-item-click="onMenuClick" class="bg-transparent border-none">
        <a-menu-item key="/">{{ $t('main') }}</a-menu-item>
        <a-menu-item key="/session">{{ $t('session') }}</a-menu-item>
        <a-menu-item key="/settings">{{ $t('settings') }}</a-menu-item>
        <a-menu-item key="/resources">{{ $t('resources') }}</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="bg-transparent p-6">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<style scoped>
.bg-white { background: #fff; }
.shadow { box-shadow: 0 2px 8px #f0f1f2; }
.bg-gradient-to-br {
  background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
}
.rounded-b-2xl {
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}
</style>
