import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ChatBubble from './ChatBubble.vue';

const baseMsg = {
  id: '1',
  sender: 'user' as const,
  timestamp: Date.now(),
  status: 'sent' as const,
};

describe('ChatBubble', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  it('renders text message', () => {
    const wrapper = mount(ChatBubble, { props: { msg: { ...baseMsg, type: 'text', content: 'hello' } } });
    expect(wrapper.text()).toContain('hello');
  });
  it('renders image message', () => {
    const wrapper = mount(ChatBubble, { props: { msg: { ...baseMsg, type: 'image', content: 'img-url' } } });
    expect(wrapper.find('img').exists()).toBe(true);
  });
  it('renders audio message', () => {
    const wrapper = mount(ChatBubble, { props: { msg: { ...baseMsg, type: 'audio', content: 'audio-url' } } });
    expect(wrapper.find('audio').exists()).toBe(true);
  });
  it('renders system message', () => {
    const wrapper = mount(ChatBubble, { props: { msg: { ...baseMsg, type: 'system', content: '系统提示' } } });
    expect(wrapper.text()).toContain('系统提示');
  });
}); 