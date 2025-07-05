import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import ResourceView from './ResourceView.vue';
import { useResourceStore } from '../store/resource';
import { i18n } from '../i18n';

describe('ResourceView', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const store = useResourceStore();
    store.resources = [
      { id: '1', type: 'image', name: 'img1', url: 'img-url', createdAt: Date.now() },
      { id: '2', type: 'audio', name: 'audio1', url: 'audio-url', createdAt: Date.now() },
    ];
  });

  it('renders image and audio resources', () => {
    const wrapper = mount(ResourceView, { global: { plugins: [i18n] } });
    expect(wrapper.find('img').exists()).toBe(true);
    expect(wrapper.find('audio').exists()).toBe(true);
    expect(wrapper.text()).toContain('img1');
    expect(wrapper.text()).toContain('audio1');
  });
}); 