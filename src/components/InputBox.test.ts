import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import InputBox from './InputBox.vue';
import { i18n } from '../i18n';

describe('InputBox', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders input and send button', () => {
    const wrapper = mount(InputBox, { global: { plugins: [i18n] } });
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    // 精确查找发送按钮
    const sendBtn = wrapper.findAll('button').find(btn => btn.text().includes('发送'));
    expect(sendBtn).toBeTruthy();
  });

  it('emits send event and clears input', async () => {
    const wrapper = mount(InputBox, { global: { plugins: [i18n] } });
    const input = wrapper.find('input[type="text"]');
    await input.setValue('hello world');
    const sendBtn = wrapper.findAll('button').find(btn => btn.text().includes('发送'));
    if (sendBtn) await sendBtn.trigger('click');
    expect(wrapper.emitted('send')).toBeTruthy();
    expect(wrapper.emitted('send')[0][0]).toBe('hello world');
    if (input.element) {
      expect((input.element as HTMLInputElement).value).toBe('');
    }
  });
}); 