import { defineStore } from 'pinia';
import { watch } from 'vue';
import { useMessageStore } from './message';

export interface Session {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessions: [] as Session[],
    currentSessionId: '' as string,
  }),
  actions: {
    addSession(name: string) {
      const id = Date.now().toString() + Math.random().toString(36).slice(2, 8);
      const now = Date.now();
      this.sessions.push({ id, name, createdAt: now, updatedAt: now });
      this.currentSessionId = id;
      // 自动插入系统欢迎消息
      const messageStore = useMessageStore();
      messageStore.addMessage(id, {
        id: now.toString() + Math.random().toString(36).slice(2, 8),
        sender: 'ai',
        type: 'system',
        content: '欢迎使用 OpenAvatarChat 数字人系统！',
        timestamp: now,
        status: 'sent',
      });
    },
    removeSession(id: string) {
      this.sessions = this.sessions.filter(s => s.id !== id);
      if (this.currentSessionId === id) {
        this.currentSessionId = this.sessions.length ? this.sessions[0].id : '';
      }
    },
    setCurrentSession(id: string) {
      this.currentSessionId = id;
    },
    renameSession(id: string, name: string) {
      const s = this.sessions.find(s => s.id === id);
      if (s) {
        s.name = name;
        s.updatedAt = Date.now();
      }
    },
  },
});

const STORAGE_KEY = 'openavatarchat_sessions';

export const setupSessionStorePersistence = (store: ReturnType<typeof useSessionStore>) => {
  watch(
    () => [store.sessions, store.currentSessionId],
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val[0]));
    },
    { deep: true }
  );
}; 