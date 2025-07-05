import { defineStore } from 'pinia';
import { watch } from 'vue';

export type ResourceType = 'image' | 'audio';

export interface ResourceItem {
  id: string;
  type: ResourceType;
  name: string;
  url: string;
  createdAt: number;
}

const STORAGE_KEY = 'openavatarchat_resources';

export const useResourceStore = defineStore('resource', {
  state: () => ({
    resources: (JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')) as ResourceItem[],
  }),
  actions: {
    addResource(item: Omit<ResourceItem, 'id' | 'createdAt'>) {
      const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
      const createdAt = Date.now();
      this.resources.push({ ...item, id, createdAt });
    },
    removeResource(id: string) {
      this.resources = this.resources.filter(r => r.id !== id);
    },
    getResourcesByType(type: ResourceType) {
      return this.resources.filter(r => r.type === type);
    },
  },
});

export const setupResourceStorePersistence = (store: ReturnType<typeof useResourceStore>) => {
  watch(
    () => store.resources,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );
}; 