import { defineStore } from 'pinia';
import { watch } from 'vue';

export type MessageType = 'text' | 'image' | 'audio' | 'emoji' | 'action' | 'system';
export type MessageStatus = 'sending' | 'sent' | 'read' | 'failed' | 'recalled';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  type: MessageType;
  content: string;
  timestamp: number;
  status: MessageStatus;
}

const STORAGE_KEY = 'openavatarchat_messages';

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: (JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')) as Record<string, Message[]>,
  }),
  actions: {
    getMessages(sessionId: string) {
      return this.messages[sessionId] || [];
    },
    addMessage(sessionId: string, msg: Message) {
      if (!this.messages[sessionId]) this.messages[sessionId] = [];
      this.messages[sessionId].push(msg);
    },
    updateMessageStatus(sessionId: string, id: string, status: MessageStatus) {
      const msgs = this.messages[sessionId];
      if (!msgs) return;
      const msg = msgs.find(m => m.id === id);
      if (msg) msg.status = status;
    },
    clearMessages(sessionId: string) {
      this.messages[sessionId] = [];
    },
    recallMessage(sessionId: string, id: string) {
      const msgs = this.messages[sessionId];
      if (!msgs) return;
      const msg = msgs.find(m => m.id === id);
      if (msg) msg.status = 'recalled';
    },
    editMessage(sessionId: string, id: string, newContent: string) {
      const msgs = this.messages[sessionId];
      if (!msgs) return;
      const msg = msgs.find(m => m.id === id);
      if (msg) msg.content = newContent;
    },
    editMessageExternal(sessionId: string, id: string, newContent: string) {
      const msgs = this.messages[sessionId];
      if (!msgs) return;
      const msg = msgs.find(m => m.id === id);
      if (msg) msg.content = newContent;
    },
    recallMessageExternal(sessionId: string, id: string) {
      const msgs = this.messages[sessionId];
      if (!msgs) return;
      const msg = msgs.find(m => m.id === id);
      if (msg) msg.status = 'recalled';
    },
  },
});

export function setupMessageStorePersistence(store: ReturnType<typeof useMessageStore>) {
  watch(
    () => store.messages,
    (val) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
    },
    { deep: true }
  );
} 