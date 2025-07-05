import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach } from 'vitest';
import { useMessageStore } from './message';

describe('message store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should add and get messages by session', () => {
    const store = useMessageStore();
    store.addMessage('s1', { id: '1', sender: 'user', type: 'text', content: 'hello', timestamp: Date.now(), status: 'sent' });
    expect(store.getMessages('s1').length).toBe(1);
    expect(store.getMessages('s1')[0].content).toBe('hello');
  });

  it('should update message status', () => {
    const store = useMessageStore();
    store.addMessage('s1', { id: '2', sender: 'ai', type: 'text', content: 'hi', timestamp: Date.now(), status: 'sending' });
    store.updateMessageStatus('s1', '2', 'read');
    expect(store.getMessages('s1')[0].status).toBe('read');
  });
}); 