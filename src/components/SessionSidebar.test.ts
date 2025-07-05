import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SessionSidebar from './SessionSidebar.vue';
import { useSessionStore } from '../store/session';
import { i18n } from '../i18n';

describe('SessionSidebar', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useSessionStore();
    store.sessions = [
      { id: '1', name: '会话1', createdAt: Date.now(), updatedAt: Date.now() },
      { id: '2', name: '会话2', createdAt: Date.now(), updatedAt: Date.now() },
    ];
    store.currentSessionId = '1';
  });

  it('renders session list', () => {
    const wrapper = mount(SessionSidebar, { global: { plugins: [i18n] } });
    expect(wrapper.text()).toContain('会话1');
    expect(wrapper.text()).toContain('会话2');
  });

  it('switches session on click', async () => {
    const wrapper = mount(SessionSidebar, { global: { plugins: [i18n] } });
    await wrapper.findAll('li')[1].find('span').trigger('click');
    const store = useSessionStore();
    expect(store.currentSessionId).toBe('2');
  });
}); 