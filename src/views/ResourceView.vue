<template>
  <div class="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow">
    <h2 class="text-xl font-bold mb-4">{{ $t('resource_manage') }}</h2>
    <div class="mb-4">
      <input type="file" @change="onFileChange" multiple />
    </div>
    <div v-if="images.length">
      <h3 class="font-semibold mb-2">{{ $t('image') }}</h3>
      <div class="flex flex-wrap gap-4 mb-4">
        <div v-for="img in images" :key="img.id" class="relative w-32 h-32 border rounded overflow-hidden">
          <img :src="img.url" :alt="img.name" class="object-cover w-full h-full" />
          <div class="absolute bottom-1 left-1 bg-white bg-opacity-70 text-xs px-1 rounded">{{ img.name }}</div>
          <button class="absolute top-1 right-1 arco-btn arco-btn-xs arco-btn-danger" @click="remove(img.id)">&times;</button>
        </div>
      </div>
    </div>
    <div v-if="audios.length">
      <h3 class="font-semibold mb-2">{{ $t('audio') }}</h3>
      <ul>
        <li v-for="audio in audios" :key="audio.id" class="mb-2 flex items-center gap-2">
          <audio :src="audio.url" controls class="flex-1" />
          <span>{{ audio.name }}</span>
          <button class="arco-btn arco-btn-xs arco-btn-danger" @click="remove(audio.id)">&times;</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResourceStore } from '../store/resource';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const resourceStore = useResourceStore();
const { resources } = storeToRefs(resourceStore);
const images = computed(() => resources.value.filter(r => r.type === 'image'));
const audios = computed(() => resources.value.filter(r => r.type === 'audio'));

function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (!files) return;
  Array.from(files).forEach(file => {
    const type = file.type.startsWith('image') ? 'image' : file.type.startsWith('audio') ? 'audio' : '';
    if (!type) return;
    const reader = new FileReader();
    reader.onload = () => {
      resourceStore.addResource({
        type,
        name: file.name,
        url: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  });
}
function remove(id: string) {
  resourceStore.removeResource(id);
}
</script>

<style scoped>
</style> 